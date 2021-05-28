import Knex, {QueryBuilder, Raw, Transaction} from 'knex';
import {sortedUniq, uniq} from 'lodash';
import knexnest from 'knexnest';
import {Logger} from 'winston';
import {BadRequestError, MethodNotAllowedError, NotFoundError} from '@/helpers/errors';
import {
  IFilterParam,
  IOrderingParam,
  IHandlerArguments,
  IQueryFields,
  IQueryFindParam,
  IQueryGetParam,
  IUpdateQueryParams,
  isIPageRequest,
  JSONObject,
  IPageRequest,
} from '@/typings';
import {toSnakeCase} from '@/helpers';

const QUERY_DEFAULT_PAGE_SIZE = parseInt(process.env.QUERY_DEFAULT_PAGE_SIZE || '10', 10);
const QUERY_DEFAULT_PAGE = parseInt(process.env.QUERY_DEFAULT_PAGE || '1', 10);

type ICollectionResponse<T> = Promise<{data: T[], page: {total: number}}>;

const attachFilters = (sql: QueryBuilder, filters: IFilterParam[] = []) => {
  filters.forEach((f: IFilterParam, idx: number) => {
    const first = idx === 0;
    if (f.type === 'raw') {
      // tslint:disable-next-line:no-any
      sql = first ? (sql.whereRaw as any)(...(typeof f.args === 'string' ? [f.args] : f.args)) : (sql.andWhereRaw as any)(...(typeof f.args === 'string' ? [f.args] : f.args));
    } else {
      // tslint:disable-next-line:no-any
      sql = first ? (sql.where as any)(...(typeof f.args === 'string' ? [f.args] : f.args)) : (sql.andWhere as any)(...(typeof f.args === 'string' ? [f.args] : f.args));
    }
  });
  return sql;
};

const dedupeAndConstructIncludes = (fields: IQueryFields, include: string[] = []): string[] => {
  if (include.includes('*')) {
    return [...Object.values(fields).map((v) => v.key)];
  }
  return uniq(['default', ...include]);
};

export const getOffsetLimitFromPageRequest = (params: IPageRequest = {page: QUERY_DEFAULT_PAGE, size: QUERY_DEFAULT_PAGE_SIZE}): {limit: number, offset: number} => {
  const {page = QUERY_DEFAULT_PAGE, size = QUERY_DEFAULT_PAGE_SIZE} = params;
  if (!isIPageRequest({page, size})) {
    throw BadRequestError('page & size must be a positive integer');
  }
  const limit = size || QUERY_DEFAULT_PAGE_SIZE;
  const offset = ((page || QUERY_DEFAULT_PAGE) - 1) * (limit);
  return {limit, offset};
};

export interface IDefaultQueryParams {
  filters?: IFilterParam[];
  includes?: string[];
  include?: string[];
  ordering?: IOrderingParam[];
  limit?: number|null;
  offset?: number|null;
  distinct?: boolean;
}

export interface ISequence {
  rows: ISequenceIds[];
}

export interface ISequenceIds {
  id: string;
}

export type IBaseQueryOptions = Partial<{
  idColumnName: string,
  allowDelete: boolean,
  preDelete: (...args: unknown[]) => Promise<unknown>,
  preCreate: (...args: unknown[]) => Promise<unknown>,
  preUpdate: (...args: unknown[]) => Promise<unknown>,
  postUpdate: (...args: unknown[]) => Promise<unknown>,
  postCreate: (...args: unknown[]) => Promise<unknown>,
}>;

abstract class Query<T = unknown, C = unknown> {

  private static async getNewID(knex: Knex, transaction: Transaction): Promise<string> {
    const {rows} = (await knex.raw<ISequence>('select sequence.next_id() as id').transacting(transaction));
    const {id} = rows[0];
    return id;
  }

  // @ts-ignore
  #_fieldDefinitions: IQueryFields;
  #_init = false;
  #_idColumnName = 'id';
  #_allowDelete = false;

  readonly #_preCreate: (trx?: Transaction) => Promise<unknown>;
  readonly #_postCreate: (trx?: Transaction) => Promise<unknown>;
  readonly #_preUpdate: (trx?: Transaction) => Promise<unknown>;
  readonly #_postUpdate: (trx?: Transaction) => Promise<unknown>;
  readonly #_preDelete: (trx?: Transaction) => Promise<unknown>;

  protected readonly preCreate: (trx?: Transaction) => Promise<unknown>;
  protected readonly preUpdate: (trx?: Transaction) => Promise<unknown>;
  protected readonly postCreate: (trx: Transaction) => Promise<unknown>;
  protected readonly postUpdate: (trx: Transaction) => Promise<unknown>;
  protected readonly preDelete: (trx?: Transaction) => Promise<unknown>;

  protected abstract FIELD_DEFINITIONS: (knex: Knex) => IQueryFields;
  protected abstract name: string;
  protected abstract TABLE: string;
  protected readonly knex: Knex;
  protected readonly logger: Logger;
  protected readonly objectType: string|null = null;
  protected readonly auditable: boolean = false;

  public constructor(knex: Knex, logger: Logger, options?: IBaseQueryOptions) {
    if (knex === undefined || logger === undefined) {
      throw new Error('Invalid parameters supplied to constructor: Knex or logger is undefined');
    }
    this.knex = knex;
    this.logger = logger;

    this.#_idColumnName = (options || {}).idColumnName || 'id';
    this.#_allowDelete = (options || {}).allowDelete || false;

    const preDelete = (options || {}).preDelete || (async () => Promise.resolve(null));
    const preCreate = (options || {}).preCreate || (async () => Promise.resolve(null));
    const preUpdate = (options || {}).preUpdate || (async () => Promise.resolve(null));
    const postUpdate = (options || {}).postUpdate || (async () => Promise.resolve(null));
    const postCreate = (options || {}).postCreate || (async () => Promise.resolve(null));

    this.#_preCreate = preCreate.bind(this, knex, logger);
    this.#_postCreate = postCreate.bind(this, knex, logger);
    this.#_preDelete = preDelete.bind(this, knex, logger);
    this.#_preUpdate = preUpdate.bind(this, knex, logger);
    this.#_postUpdate = postUpdate.bind(this, knex, logger);
    this.preCreate = this.#_preCreate;
    this.postCreate = this.#_postCreate;
    this.preUpdate = this.#_preUpdate;
    this.postUpdate = this.#_postUpdate;
    this.preDelete = this.#_preDelete;
  }

  public async queryHandler<V = T>({sql, expectList = true, ignoreKeys}: IHandlerArguments): Promise<V|V[]> {
    this.init();
    const rows = await knexnest(sql, true);
    const result = rows.map((row: JSONObject) => toSnakeCase(row, {ignoreSnakeKey: ignoreKeys}));
    if (expectList) {
      return result;
    }
    const [record] = result;
    if (!record) {
      throw NotFoundError(`${this.name} not found`);
    }
    return record as V|V[];
  }

  public async total({column, filters = [], includes = [], include = [], distinct}: {column: string, filters?: IFilterParam[], includes?: string[], include?: string[], distinct?: boolean}, trx?: Transaction): Promise<number> {
    this.init();
    const {knex} = this;
    let sql: QueryBuilder = (trx ? knex(this.TABLE).transacting(trx) : knex(this.TABLE));
    dedupeAndConstructIncludes(this.FIELD_DEFINITIONS(knex), [...include, ...includes])
      .forEach((c: string) => {
        if (this.#_fieldDefinitions[c] && (this.#_fieldDefinitions[c] as object).hasOwnProperty('joins')) {
          // tslint:disable-next-line:no-any
          (this.#_fieldDefinitions[c] as any).joins.forEach((j: {type: string; args: unknown[]}|string[]) => {
            if (Array.isArray(j)) {
              // tslint:disable-next-line:no-any
              sql = (sql.join as any)(...j);
            } else if (!j.type) {
              // tslint:disable-next-line:no-any
              sql = (sql.join as any)(...j.args);
            } else if (j.type === 'left') {
              // tslint:disable-next-line:no-any
              sql = (sql.leftJoin as any)(...j.args);
            } else if (j.type === 'inner') {
              // tslint:disable-next-line:no-any
              sql = (sql.join as any)(...j.args);
            } else {
              // tslint:disable-next-line:no-any
              sql = (sql.joinRaw as any)(...j.args);
            }
          });
        }
      });
    sql = distinct ? sql.countDistinct(`${column} as count`) : sql.count(`${column} as count`);
    sql = attachFilters(sql, filters);
    const result = await sql.first();
    return parseInt(result!.count, 10);
  }

  public defaultQuery({
    filters = [],
    includes = [],
    include = [],
    ordering = [],
    limit,
    offset,
    distinct = false,
  }: IDefaultQueryParams,
                      trx?: Transaction,
): QueryBuilder {
    this.init();
    const {knex} = this;
    let sql: QueryBuilder = (trx ? knex(this.TABLE).transacting(trx) : knex(this.TABLE));
    let fields: Array<string|Raw<{}>> = [];
    const groupBys: {type: unknown; args: string[]} = {type: null, args: []};
    // tslint:disable-next-line:no-any
    const getAliasName = (field: any, index: number): string|null => {
      try {
        const [alias] = field.split(' ').reverse();
        const [, aliasName] = alias.trim().split('_');
        return aliasName;
      } catch (e) {
        if (field.toSQL !== undefined) {
          const {sql: sqlString} = field.toSQL();
          return getAliasName(sqlString, index);
        }
        return null;
      }
    };

    dedupeAndConstructIncludes(this.FIELD_DEFINITIONS(knex), [...includes, ...include])
      .forEach((c: string) => {
        if (this.#_fieldDefinitions[c]) {
          const joins = (this.#_fieldDefinitions[c]).joins || [];
          const groupBy = (this.#_fieldDefinitions[c]).groupBy || [];
          const order = (this.#_fieldDefinitions[c]).ordering || [];

          // Process Join arguments
          joins.forEach((j) => {
            if (Array.isArray(j)) {
              // tslint:disable-next-line:no-any
              sql = (sql.join as any)(...j);
            } else if (!j.type) {
              // tslint:disable-next-line:no-any
              sql = (sql.join as any)(...j.args);
            } else if (j.type === 'left') {
              // tslint:disable-next-line:no-any
              sql = (sql.leftJoin as any)(...j.args);
            } else if (j.type === 'inner') {
              // tslint:disable-next-line:no-any
              sql = (sql.join as any)(...j.args);
            } else {
              // tslint:disable-next-line:no-any
              sql = (sql.joinRaw as any)(...j.args);
            }
          });

          // Handle group by statements
          groupBy.forEach((j) => {
            groupBys.args.push(...j.args as string[]);
          });

          order.forEach((j) => {
            ordering.push(j);
          });

          // Resolve duplicate select aliases when requesting populated resources
          const fieldAliases = fields.map(getAliasName);
          const fieldsToAdd = (this.#_fieldDefinitions[c]).fields.map(getAliasName);
          const indecesToRemove: number[] = [];
          fieldsToAdd.forEach((f: string|null) => {
            const conflictingIndex = fieldAliases.findIndex((v) => v === f);
            if (conflictingIndex > -1) {
              indecesToRemove.push(conflictingIndex);
            }
          });
          sortedUniq(indecesToRemove).forEach((current, index: number) => {
            fields = [...fields.slice(0, (current - index)), ...fields.slice((current - index) + 1)];
          });
          fields.push(...this.#_fieldDefinitions[c].fields as string|Raw[]);
        }
      });
    sql = distinct ? sql.distinct(fields) : sql.select(fields);
    sql = attachFilters(sql, filters);
    if (limit) {
      sql = sql.limit(limit);
    }
    if (offset) {
      sql = sql.offset(offset);
    }
    if (groupBys.args.length) {
      sql = sql.groupBy(...groupBys.args);
    }
    ordering.forEach((o) => {
      if (o.type === 'raw') {
        // tslint:disable-next-line:no-any
        sql = (sql.orderByRaw as any)(...o.args);
      } else {
        // tslint:disable-next-line:no-any
        sql = (sql.orderBy as any)(...o.args);
      }
    });
    this.logger.debug(sql.toQuery());
    return sql;
  }

  public async update<V>(params: Omit<IUpdateQueryParams<V>, 'product' | 'organization'>, trx?: Transaction): Promise<T> {
    this.init();
    const {knex} = this;
    const {id, secondaryId, data} = params;
    await this.#_preUpdate(trx);

    return this.transactable<T>(async (transaction: Transaction) => {
      await knex(this.tableNoAlias())
        .transacting(transaction)
        .update(data as object)
        .where(this.#_idColumnName, id as string);
      await this.#_postUpdate(transaction);
      return this.get({id: id as string}, transaction);
    }, trx);
  }

  public async get(params: IQueryGetParam, trx?: Transaction): Promise<T>;
  public async get<V, U = undefined>(params: IQueryGetParam, trx?: Transaction): Promise<U extends undefined ? T : U>;
  public async get<V = undefined>(params: IQueryGetParam, trx?: Transaction): Promise<V extends undefined ? T : V>;
  public async get<_V = unknown, U = undefined>(params: IQueryGetParam, trx?: Transaction): Promise<U extends undefined ? T : U> {
    const {id, include = [], includes, filters = []} = params;
    this.init();
    const sql = this.defaultQuery({
      filters: [
        {args: [`${this.tableAlias()}.${this.#_idColumnName}`, id]},
        ...filters,
      ],
      includes: includes || include,
    }, trx);
    return this.queryOne<U extends undefined ? T : U>(sql);
  }

  public async collection<V, U = undefined>(params: IQueryFindParam, trx?: Transaction): ICollectionResponse<U extends undefined ? T : U>;
  public async collection(params: IQueryFindParam, trx?: Transaction): ICollectionResponse<T>;
  public async collection<V = undefined>(params: IQueryFindParam, trx?: Transaction): ICollectionResponse<V extends undefined ? T : V>;
  public async collection<_V = unknown, U = undefined>(params: IQueryFindParam = {}, trx?: Transaction): ICollectionResponse<U extends undefined ? T : U> {
    const total = await this.total({
      column: `${this.tableAlias()}.${this.#_idColumnName}`,
      filters: params.filters || [],
      include: params.includes || params.include || [],
      distinct: params.distinct || true,
    }, trx);

    const pageRequest = getOffsetLimitFromPageRequest(params.pagination);

    const data = await this.queryList<U extends undefined ? T : U>(
      this.defaultQuery({
        ...pageRequest,
        ...params, // predefined offset and limit parameters will override pagination request!
      }, trx),
      params.ignoreKeys,
    );
    return {
      data,
      page: {total},
    };
  }

  public async exists(id: string, trx?: Transaction): Promise<boolean> {
    try {
      const data = await this.get({id}, trx);
      return data !== undefined;
    } catch (e) {
      return false;
    }
  }

  public async create(data: C, trx?: Transaction, forceId?: string): Promise<T> {
    const {knex} = this;
    let id;
    await this.#_preCreate(trx);
    return this.transactable(async (transaction: Transaction) => {
      if (forceId) {
        id = forceId;
      } else {
        id = await Query.getNewID(knex, transaction);
      }

      await knex(this.tableNoAlias())
        .transacting(transaction)
        .insert({
          ...data,
          id: forceId || id,
        });
      await this.#_postCreate(transaction);
      console.log('end of create');
      return this.get({id: forceId || id}, transaction);
    }, trx);
  }

  public tableNoAlias = () => this.TABLE.trim().split(' ')[0];
  public tableAlias = () => this.TABLE.trim().split(' ')[2];

  public async delete(params: {filters?: IFilterParam[], [key: string]: unknown} = {}, trx?: Transaction): Promise<boolean> {
    const {filters = []} = params;
    if (!this.#_allowDelete) {
      throw MethodNotAllowedError();
    }
    return this.transactable<boolean>(async (transaction: Transaction) => {
      await this.#_preDelete(transaction);
      let sql = this.knex(this.tableNoAlias()).transacting(transaction);
      sql = attachFilters(sql, filters);
      const numDeleted = await sql.delete();
      this.logger.verbose(`Removed ${numDeleted} records from ${this.tableNoAlias()}`);
      return true;
    }, trx);
  }

  protected async transactable<V>(query: (transaction: Transaction) => unknown, trx?: Transaction): Promise<V> {
    this.init();
    let value;
    if (trx) {
      value = await query(trx);
    } else {
      value = await this.knex.transaction(async function t(transaction) {
        try {
          return query(transaction) as V;
        } catch (error) {
          throw error;
        }
      }) as V;
    }
    return value as V;
  }

  protected selectTable = (trx?: Transaction, tableNameWithAlias?: string) => trx ? this.knex(tableNameWithAlias || this.TABLE).transacting(trx) : this.knex(tableNameWithAlias || this.TABLE);

  protected async queryOne<V = T>(sql: QueryBuilder, ignoreKeys?: string[]): Promise<V> {
    return await this.queryHandler<V>({sql, expectList: false, ignoreKeys}) as V;
  }

  protected async queryList<V = T>(sql: QueryBuilder, ignoreKeys?: string[]): Promise<V[]> {
    return await this.queryHandler<V>({sql, ignoreKeys, expectList: true}) as V[];
  }

  protected count = async (sql: QueryBuilder): Promise<number> => {
    const [{count = '0'}] = await sql;
    return parseInt(count, 10);
  }

  private init() {
    if (!this.#_init) {
      try {
        this.#_fieldDefinitions = this.FIELD_DEFINITIONS(this.knex);
        this.#_init = true;
      } catch (e) {
        this.logger.error(e);
      }
    }
    return this;
  }
}

export default Query;
