import {JSONObject} from './json';
import {QueryInterface, Raw} from 'knex';

export type IQueryType = 'disbursement'|'enrollment'| 'offer'| 'session'|'qualified_transaction';

export interface IFilterParam {
  args: string|string[]|[string, ...Array<string|number|string[]|boolean|object|object[]|null>];
  type?: 'raw';
}

export interface IOrderingParam {
  args: Array<string|object[]|object|JSONObject>;
  type?: string;
}

export interface IJoinParam {
  args: [string, ...Array<string|JSONObject[]|(() => JSONObject)>];
  type?: 'left'|'raw'|'inner';
}

export interface IGroupByParam {
  args: string[]|[string, ...Array<string|number|string[]|boolean|object|object[]>];
  type?: 'left'|'raw'|'inner'|null;
}

export interface IFieldsKey {
  key: string;
  fields: Array<string|Raw<{}>|{[key: string]: string|Raw<{}>}>;
  joins?: Array<IJoinParam|string[]>;
  groupBy?: IGroupByParam[];
  ordering?: IOrderingParam[];
}

export interface IQueryFields {
  default: IFieldsKey;
  [key: string]: IFieldsKey;
}

export interface IHandlerArguments {
  sql: QueryInterface;
  expectList?: boolean;
  ordering?: IOrderingParam[];
  limit?: null|number;
  offset?: null|number;
  ignoreKeys?: string[];
  collections?: string[];
}

export interface IQueryFindParam {
  filters?: IFilterParam[];
  includes?: string[];
  include?: string[];
  ordering?: IOrderingParam[];
  limit?: null|number;
  offset?: null|number;
  pagination?: IPageRequest;
  ignoreKeys?: string[];
  distinct?: boolean;
}

export interface IPageRequest {
  page?: number;
  size?: number;
}

// tslint:disable-next-line:no-any
export function isIPageRequest(arg: any): arg is IPageRequest {
  return arg.page > 0 && arg.size > 0 && arg.size % 1 === 0 && arg.page % 1 === 0;
}

export interface IUpdateBasicParams {
  [key: string]: unknown;
}

export interface IUpdateStateParams extends IUpdateBasicParams {
  state?: string|null;
}

export interface IUpdateQueryParams<T = unknown> {
  id: string;
  secondary_id?: string;
  updated_by: string;
  include?: string[];
  data: T;
  [key: string]: unknown|JSONObject;
}

export interface IQueryGetParam {
  id: string|number;
  type?: IQueryType;
  include?: string[];
  filters?: IFilterParam[];
  includes?: string[];
  ordering?: IOrderingParam[];
  ignoreKeys?: string[];
}

export interface IStateUpdatePath {
  [key: string]: Array<string|null|undefined>;
}

export interface IFieldsKey {
  key: string;
  fields: Array<string|Raw<{}>|{[key: string]: string|Raw<{}>}>;
  joins?: Array<IJoinParam|string[]>;
  groupBy?: IGroupByParam[];
  ordering?: IOrderingParam[];
}
