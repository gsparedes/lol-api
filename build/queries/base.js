"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.getOffsetLimitFromPageRequest = void 0;var _bluebird = require("bluebird");require("source-map-support/register");
var _lodash = require("lodash");
var _knexnest = _interopRequireDefault(require("knexnest"));

var _errors = require("../helpers/errors");
var _typings = require("../typings");











var _helpers = require("../helpers");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) {symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});}keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classPrivateFieldGet(receiver, privateMap) {var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");return _classApplyDescriptorGet(receiver, descriptor);}function _classApplyDescriptorGet(receiver, descriptor) {if (descriptor.get) {return descriptor.get.call(receiver);}return descriptor.value;}function _classPrivateFieldSet(receiver, privateMap, value) {var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");_classApplyDescriptorSet(receiver, descriptor, value);return value;}function _classExtractFieldDescriptor(receiver, privateMap, action) {if (!privateMap.has(receiver)) {throw new TypeError("attempted to " + action + " private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorSet(receiver, descriptor, value) {if (descriptor.set) {descriptor.set.call(receiver, value);} else {if (!descriptor.writable) {throw new TypeError("attempted to set read only private field");}descriptor.value = value;}}

const QUERY_DEFAULT_PAGE_SIZE = parseInt(process.env.QUERY_DEFAULT_PAGE_SIZE || '10', 10);
const QUERY_DEFAULT_PAGE = parseInt(process.env.QUERY_DEFAULT_PAGE || '1', 10);



const attachFilters = (sql, filters = []) => {
  filters.forEach((f, idx) => {
    const first = idx === 0;
    if (f.type === 'raw') {

      sql = first ? sql.whereRaw(...(typeof f.args === 'string' ? [f.args] : f.args)) : sql.andWhereRaw(...(typeof f.args === 'string' ? [f.args] : f.args));
    } else {

      sql = first ? sql.where(...(typeof f.args === 'string' ? [f.args] : f.args)) : sql.andWhere(...(typeof f.args === 'string' ? [f.args] : f.args));
    }
  });
  return sql;
};

const dedupeAndConstructIncludes = (fields, include = []) => {
  if (include.includes('*')) {
    return [...Object.values(fields).map((v) => v.key)];
  }
  return (0, _lodash.uniq)(['default', ...include]);
};

const getOffsetLimitFromPageRequest = (params = { page: QUERY_DEFAULT_PAGE, size: QUERY_DEFAULT_PAGE_SIZE }) => {
  const { page = QUERY_DEFAULT_PAGE, size = QUERY_DEFAULT_PAGE_SIZE } = params;
  if (!(0, _typings.isIPageRequest)({ page, size })) {
    throw (0, _errors.BadRequestError)('page & size must be a positive integer');
  }
  const limit = size || QUERY_DEFAULT_PAGE_SIZE;
  const offset = ((page || QUERY_DEFAULT_PAGE) - 1) * limit;
  return { limit, offset };
};exports.getOffsetLimitFromPageRequest = getOffsetLimitFromPageRequest;var _fieldDefinitions = new WeakMap();var _init = new WeakMap();var _idColumnName = new WeakMap();var _allowDelete = new WeakMap();var _preCreate = new WeakMap();var _postCreate = new WeakMap();var _preUpdate = new WeakMap();var _postUpdate = new WeakMap();var _preDelete = new WeakMap();





























class Query {

  static getNewID(knex, transaction) {return (0, _bluebird.coroutine)(function* () {
      const { rows } = yield knex.raw('select sequence.next_id() as id').transacting(transaction);
      const { id } = rows[0];
      return id;})();
  }



























  constructor(knex, logger, options) {_fieldDefinitions.set(this, { writable: true, value: void 0 });_init.set(this, { writable: true, value: false });_idColumnName.set(this, { writable: true, value: 'id' });_allowDelete.set(this, { writable: true, value: false });_preCreate.set(this, { writable: true, value: void 0 });_postCreate.set(this, { writable: true, value: void 0 });_preUpdate.set(this, { writable: true, value: void 0 });_postUpdate.set(this, { writable: true, value: void 0 });_preDelete.set(this, { writable: true, value: void 0 });_defineProperty(this, "preCreate", void 0);_defineProperty(this, "preUpdate", void 0);_defineProperty(this, "postCreate", void 0);_defineProperty(this, "postUpdate", void 0);_defineProperty(this, "preDelete", void 0);_defineProperty(this, "FIELD_DEFINITIONS", void 0);_defineProperty(this, "name", void 0);_defineProperty(this, "TABLE", void 0);_defineProperty(this, "knex", void 0);_defineProperty(this, "logger", void 0);_defineProperty(this, "objectType", null);_defineProperty(this, "auditable", false);_defineProperty(this, "tableNoAlias",
















































































































































































































































































    () => this.TABLE.trim().split(' ')[0]);_defineProperty(this, "tableAlias",
    () => this.TABLE.trim().split(' ')[2]);_defineProperty(this, "selectTable",

































    (trx, tableNameWithAlias) => trx ? this.knex(tableNameWithAlias || this.TABLE).transacting(trx) : this.knex(tableNameWithAlias || this.TABLE));_defineProperty(this, "count", function () {var _ref = (0, _bluebird.coroutine)(









      function* (sql) {
        const [{ count = '0' }] = yield sql;
        return parseInt(count, 10);
      });return function (_x) {return _ref.apply(this, arguments);};}());if (knex === undefined || logger === undefined) {throw new Error('Invalid parameters supplied to constructor: Knex or logger is undefined');}this.knex = knex;this.logger = logger;_classPrivateFieldSet(this, _idColumnName, (options || {}).idColumnName || 'id');_classPrivateFieldSet(this, _allowDelete, (options || {}).allowDelete || false);const preDelete = (options || {}).preDelete || (0, _bluebird.coroutine)(function* () {return Promise.resolve(null);});const preCreate = (options || {}).preCreate || (0, _bluebird.coroutine)(function* () {return Promise.resolve(null);});const preUpdate = (options || {}).preUpdate || (0, _bluebird.coroutine)(function* () {return Promise.resolve(null);});const postUpdate = (options || {}).postUpdate || (0, _bluebird.coroutine)(function* () {return Promise.resolve(null);});const postCreate = (options || {}).postCreate || (0, _bluebird.coroutine)(function* () {return Promise.resolve(null);});_classPrivateFieldSet(this, _preCreate, preCreate.bind(this, knex, logger));_classPrivateFieldSet(this, _postCreate, postCreate.bind(this, knex, logger));_classPrivateFieldSet(this, _preDelete, preDelete.bind(this, knex, logger));_classPrivateFieldSet(this, _preUpdate, preUpdate.bind(this, knex, logger));_classPrivateFieldSet(this, _postUpdate, postUpdate.bind(this, knex, logger));this.preCreate = _classPrivateFieldGet(this, _preCreate);this.postCreate = _classPrivateFieldGet(this, _postCreate);this.preUpdate = _classPrivateFieldGet(this, _preUpdate);this.postUpdate = _classPrivateFieldGet(this, _postUpdate);this.preDelete = _classPrivateFieldGet(this, _preDelete);}queryHandler({ sql, expectList = true, ignoreKeys }) {var _this = this;return (0, _bluebird.coroutine)(function* () {_this.init();const rows = yield (0, _knexnest.default)(sql, true);const result = rows.map((row) => (0, _helpers.toSnakeCase)(row, { ignoreSnakeKey: ignoreKeys }));if (expectList) {return result;}const [record] = result;if (!record) {throw (0, _errors.NotFoundError)(`${_this.name} not found`);}return record;})();}total({ column, filters = [], includes = [], include = [], distinct }, trx) {var _this2 = this;return (0, _bluebird.coroutine)(function* () {_this2.init();const { knex } = _this2;let sql = trx ? knex(_this2.TABLE).transacting(trx) : knex(_this2.TABLE);dedupeAndConstructIncludes(_this2.FIELD_DEFINITIONS(knex), [...include, ...includes]).forEach((c) => {if (_classPrivateFieldGet(_this2, _fieldDefinitions)[c] && _classPrivateFieldGet(_this2, _fieldDefinitions)[c].hasOwnProperty('joins')) {_classPrivateFieldGet(_this2, _fieldDefinitions)[c].joins.forEach((j) => {if (Array.isArray(j)) {sql = sql.join(...j);} else if (!j.type) {sql = sql.join(...j.args);} else if (j.type === 'left') {sql = sql.leftJoin(...j.args);} else if (j.type === 'inner') {sql = sql.join(...j.args);} else {sql = sql.joinRaw(...j.args);}});}});sql = distinct ? sql.countDistinct(`${column} as count`) : sql.count(`${column} as count`);sql = attachFilters(sql, filters);const result = yield sql.first();return parseInt(result.count, 10);})();}defaultQuery({ filters = [], includes = [], include = [], ordering = [], limit, offset, distinct = false }, trx) {this.init();const { knex } = this;let sql = trx ? knex(this.TABLE).transacting(trx) : knex(this.TABLE);let fields = [];const groupBys = { type: null, args: [] };const getAliasName = (field, index) => {try {const [alias] = field.split(' ').reverse();const [, aliasName] = alias.trim().split('_');return aliasName;} catch (e) {if (field.toSQL !== undefined) {const { sql: sqlString } = field.toSQL();return getAliasName(sqlString, index);}return null;}};dedupeAndConstructIncludes(this.FIELD_DEFINITIONS(knex), [...includes, ...include]).forEach((c) => {if (_classPrivateFieldGet(this, _fieldDefinitions)[c]) {const joins = _classPrivateFieldGet(this, _fieldDefinitions)[c].joins || [];const groupBy = _classPrivateFieldGet(this, _fieldDefinitions)[c].groupBy || [];const order = _classPrivateFieldGet(this, _fieldDefinitions)[c].ordering || [];joins.forEach((j) => {if (Array.isArray(j)) {sql = sql.join(...j);} else if (!j.type) {sql = sql.join(...j.args);} else if (j.type === 'left') {sql = sql.leftJoin(...j.args);} else if (j.type === 'inner') {sql = sql.join(...j.args);} else {sql = sql.joinRaw(...j.args);}});groupBy.forEach((j) => {groupBys.args.push(...j.args);});order.forEach((j) => {ordering.push(j);});const fieldAliases = fields.map(getAliasName);const fieldsToAdd = _classPrivateFieldGet(this, _fieldDefinitions)[c].fields.map(getAliasName);const indecesToRemove = [];fieldsToAdd.forEach((f) => {const conflictingIndex = fieldAliases.findIndex((v) => v === f);if (conflictingIndex > -1) {indecesToRemove.push(conflictingIndex);}});(0, _lodash.sortedUniq)(indecesToRemove).forEach((current, index) => {fields = [...fields.slice(0, current - index), ...fields.slice(current - index + 1)];});fields.push(..._classPrivateFieldGet(this, _fieldDefinitions)[c].fields);}});sql = distinct ? sql.distinct(fields) : sql.select(fields);sql = attachFilters(sql, filters);if (limit) {sql = sql.limit(limit);}if (offset) {sql = sql.offset(offset);}if (groupBys.args.length) {sql = sql.groupBy(...groupBys.args);}ordering.forEach((o) => {if (o.type === 'raw') {sql = sql.orderByRaw(...o.args);} else {sql = sql.orderBy(...o.args);}});this.logger.debug(sql.toQuery());return sql;}update(params, trx) {var _this3 = this;return (0, _bluebird.coroutine)(function* () {_this3.init();const { knex } = _this3;const { id, secondaryId, data } = params;yield _classPrivateFieldGet(_this3, _preUpdate).call(_this3, trx);return _this3.transactable(function () {var _ref7 = (0, _bluebird.coroutine)(function* (transaction) {yield knex(_this3.tableNoAlias()).transacting(transaction).update(data).where(_classPrivateFieldGet(_this3, _idColumnName), id);yield _classPrivateFieldGet(_this3, _postUpdate).call(_this3, transaction);return _this3.get({ id: id }, transaction);});return function (_x2) {return _ref7.apply(this, arguments);};}(), trx);})();}get(params, trx) {var _this4 = this;return (0, _bluebird.coroutine)(function* () {const { id, include = [], includes, filters = [] } = params;_this4.init();const sql = _this4.defaultQuery({ filters: [{ args: [`${_this4.tableAlias()}.${_classPrivateFieldGet(_this4, _idColumnName)}`, id] }, ...filters], includes: includes || include }, trx);return _this4.queryOne(sql);})();}collection(params = {}, trx) {var _this5 = this;return (0, _bluebird.coroutine)(function* () {const total = yield _this5.total({ column: `${_this5.tableAlias()}.${_classPrivateFieldGet(_this5, _idColumnName)}`, filters: params.filters || [], include: params.includes || params.include || [], distinct: params.distinct || true }, trx);const pageRequest = getOffsetLimitFromPageRequest(params.pagination);const data = yield _this5.queryList(_this5.defaultQuery(_objectSpread(_objectSpread({}, pageRequest), params), trx), params.ignoreKeys);return { data, page: { total } };})();}exists(id, trx) {var _this6 = this;return (0, _bluebird.coroutine)(function* () {try {const data = yield _this6.get({ id }, trx);return data !== undefined;} catch (e) {return false;}})();}create(data, trx, forceId) {var _this7 = this;return (0, _bluebird.coroutine)(function* () {const { knex } = _this7;let id;yield _classPrivateFieldGet(_this7, _preCreate).call(_this7, trx);return _this7.transactable(function () {var _ref8 = (0, _bluebird.coroutine)(function* (transaction) {if (forceId) {id = forceId;} else {id = yield Query.getNewID(knex, transaction);}yield knex(_this7.tableNoAlias()).transacting(transaction).insert(_objectSpread(_objectSpread({}, data), {}, { id: forceId || id }));yield _classPrivateFieldGet(_this7, _postCreate).call(_this7, transaction);console.log('end of create');return _this7.get({ id: forceId || id }, transaction);});return function (_x3) {return _ref8.apply(this, arguments);};}(), trx);})();}delete(params = {}, trx) {var _this8 = this;return (0, _bluebird.coroutine)(function* () {const { filters = [] } = params;if (!_classPrivateFieldGet(_this8, _allowDelete)) {throw (0, _errors.MethodNotAllowedError)();}return _this8.transactable(function () {var _ref9 = (0, _bluebird.coroutine)(function* (transaction) {yield _classPrivateFieldGet(_this8, _preDelete).call(_this8, transaction);let sql = _this8.knex(_this8.tableNoAlias()).transacting(transaction);sql = attachFilters(sql, filters);const numDeleted = yield sql.delete();_this8.logger.verbose(`Removed ${numDeleted} records from ${_this8.tableNoAlias()}`);return true;});return function (_x4) {return _ref9.apply(this, arguments);};}(), trx);})();}transactable(query, trx) {var _this9 = this;return (0, _bluebird.coroutine)(function* () {_this9.init();let value;if (trx) {value = yield query(trx);} else {value = yield _this9.knex.transaction(function () {var _t = (0, _bluebird.coroutine)(function* (transaction) {try {return query(transaction);} catch (error) {throw error;}});function t(_x5) {return _t.apply(this, arguments);}return t;}());}return value;})();}queryOne(sql, ignoreKeys) {var _this10 = this;return (0, _bluebird.coroutine)(function* () {return yield _this10.queryHandler({ sql, expectList: false, ignoreKeys });})();}queryList(sql, ignoreKeys) {var _this11 = this;return (0, _bluebird.coroutine)(function* () {return yield _this11.queryHandler({ sql, ignoreKeys, expectList: true });})();}

  init() {
    if (!_classPrivateFieldGet(this, _init)) {
      try {
        _classPrivateFieldSet(this, _fieldDefinitions, this.FIELD_DEFINITIONS(this.knex));
        _classPrivateFieldSet(this, _init, true);
      } catch (e) {
        this.logger.error(e);
      }
    }
    return this;
  }}var _default =


Query;exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9xdWVyaWVzL2Jhc2UudHMiXSwibmFtZXMiOlsiUVVFUllfREVGQVVMVF9QQUdFX1NJWkUiLCJwYXJzZUludCIsInByb2Nlc3MiLCJlbnYiLCJRVUVSWV9ERUZBVUxUX1BBR0UiLCJhdHRhY2hGaWx0ZXJzIiwic3FsIiwiZmlsdGVycyIsImZvckVhY2giLCJmIiwiaWR4IiwiZmlyc3QiLCJ0eXBlIiwid2hlcmVSYXciLCJhcmdzIiwiYW5kV2hlcmVSYXciLCJ3aGVyZSIsImFuZFdoZXJlIiwiZGVkdXBlQW5kQ29uc3RydWN0SW5jbHVkZXMiLCJmaWVsZHMiLCJpbmNsdWRlIiwiaW5jbHVkZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJtYXAiLCJ2Iiwia2V5IiwiZ2V0T2Zmc2V0TGltaXRGcm9tUGFnZVJlcXVlc3QiLCJwYXJhbXMiLCJwYWdlIiwic2l6ZSIsImxpbWl0Iiwib2Zmc2V0IiwiUXVlcnkiLCJnZXROZXdJRCIsImtuZXgiLCJ0cmFuc2FjdGlvbiIsInJvd3MiLCJyYXciLCJ0cmFuc2FjdGluZyIsImlkIiwiY29uc3RydWN0b3IiLCJsb2dnZXIiLCJvcHRpb25zIiwiVEFCTEUiLCJ0cmltIiwic3BsaXQiLCJ0cngiLCJ0YWJsZU5hbWVXaXRoQWxpYXMiLCJjb3VudCIsInVuZGVmaW5lZCIsIkVycm9yIiwiaWRDb2x1bW5OYW1lIiwiYWxsb3dEZWxldGUiLCJwcmVEZWxldGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInByZUNyZWF0ZSIsInByZVVwZGF0ZSIsInBvc3RVcGRhdGUiLCJwb3N0Q3JlYXRlIiwiYmluZCIsInF1ZXJ5SGFuZGxlciIsImV4cGVjdExpc3QiLCJpZ25vcmVLZXlzIiwiaW5pdCIsInJlc3VsdCIsInJvdyIsImlnbm9yZVNuYWtlS2V5IiwicmVjb3JkIiwibmFtZSIsInRvdGFsIiwiY29sdW1uIiwiZGlzdGluY3QiLCJGSUVMRF9ERUZJTklUSU9OUyIsImMiLCJoYXNPd25Qcm9wZXJ0eSIsImpvaW5zIiwiaiIsIkFycmF5IiwiaXNBcnJheSIsImpvaW4iLCJsZWZ0Sm9pbiIsImpvaW5SYXciLCJjb3VudERpc3RpbmN0IiwiZGVmYXVsdFF1ZXJ5Iiwib3JkZXJpbmciLCJncm91cEJ5cyIsImdldEFsaWFzTmFtZSIsImZpZWxkIiwiaW5kZXgiLCJhbGlhcyIsInJldmVyc2UiLCJhbGlhc05hbWUiLCJlIiwidG9TUUwiLCJzcWxTdHJpbmciLCJncm91cEJ5Iiwib3JkZXIiLCJwdXNoIiwiZmllbGRBbGlhc2VzIiwiZmllbGRzVG9BZGQiLCJpbmRlY2VzVG9SZW1vdmUiLCJjb25mbGljdGluZ0luZGV4IiwiZmluZEluZGV4IiwiY3VycmVudCIsInNsaWNlIiwic2VsZWN0IiwibGVuZ3RoIiwibyIsIm9yZGVyQnlSYXciLCJvcmRlckJ5IiwiZGVidWciLCJ0b1F1ZXJ5IiwidXBkYXRlIiwic2Vjb25kYXJ5SWQiLCJkYXRhIiwidHJhbnNhY3RhYmxlIiwidGFibGVOb0FsaWFzIiwiZ2V0IiwidGFibGVBbGlhcyIsInF1ZXJ5T25lIiwiY29sbGVjdGlvbiIsInBhZ2VSZXF1ZXN0IiwicGFnaW5hdGlvbiIsInF1ZXJ5TGlzdCIsImV4aXN0cyIsImNyZWF0ZSIsImZvcmNlSWQiLCJpbnNlcnQiLCJjb25zb2xlIiwibG9nIiwiZGVsZXRlIiwibnVtRGVsZXRlZCIsInZlcmJvc2UiLCJxdWVyeSIsInZhbHVlIiwiZXJyb3IiLCJ0Il0sIm1hcHBpbmdzIjoiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFZQSxxQzs7QUFFQSxNQUFNQSx1QkFBdUIsR0FBR0MsUUFBUSxDQUFDQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUgsdUJBQVosSUFBdUMsSUFBeEMsRUFBOEMsRUFBOUMsQ0FBeEM7QUFDQSxNQUFNSSxrQkFBa0IsR0FBR0gsUUFBUSxDQUFDQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsa0JBQVosSUFBa0MsR0FBbkMsRUFBd0MsRUFBeEMsQ0FBbkM7Ozs7QUFJQSxNQUFNQyxhQUFhLEdBQUcsQ0FBQ0MsR0FBRCxFQUFv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QTJCMEQsVUFBM0IsRUFBZ0Usa0VBQ3ZGLGFBQWEsT0FBSSxDQUFDRixZQUFMLENBQXFCLEVBQUN4RCxHQUFELEVBQU0wRCxVQUFOLEVBQWtCRCxVQUFVLEVBQUUsSUFBOUIsRUFBckIsQ0FBYixDQUR1RixLQUV4Rjs7QUFPT0UsRUFBQUEsSUFBSSxHQUFHO0FBQ2IsUUFBSSx1QkFBQyxJQUFELFFBQUosRUFBa0I7QUFDaEIsVUFBSTtBQUNGLHVEQUEwQixLQUFLUyxpQkFBTCxDQUF1QixLQUFLdkMsSUFBNUIsQ0FBMUI7QUFDQSwyQ0FBYyxJQUFkO0FBQ0QsT0FIRCxDQUdFLE9BQU8yRCxDQUFQLEVBQVU7QUFDVixhQUFLcEQsTUFBTCxDQUFZK0YsS0FBWixDQUFrQjNDLENBQWxCO0FBQ0Q7QUFDRjtBQUNELFdBQU8sSUFBUDtBQUNELEdBL1c0QyxDOzs7QUFrWGhDN0QsSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBLbmV4LCB7UXVlcnlCdWlsZGVyLCBSYXcsIFRyYW5zYWN0aW9ufSBmcm9tICdrbmV4JztcbmltcG9ydCB7c29ydGVkVW5pcSwgdW5pcX0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBrbmV4bmVzdCBmcm9tICdrbmV4bmVzdCc7XG5pbXBvcnQge0xvZ2dlcn0gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQge0JhZFJlcXVlc3RFcnJvciwgTWV0aG9kTm90QWxsb3dlZEVycm9yLCBOb3RGb3VuZEVycm9yfSBmcm9tICdAL2hlbHBlcnMvZXJyb3JzJztcbmltcG9ydCB7XG4gIElGaWx0ZXJQYXJhbSxcbiAgSU9yZGVyaW5nUGFyYW0sXG4gIElIYW5kbGVyQXJndW1lbnRzLFxuICBJUXVlcnlGaWVsZHMsXG4gIElRdWVyeUZpbmRQYXJhbSxcbiAgSVF1ZXJ5R2V0UGFyYW0sXG4gIElVcGRhdGVRdWVyeVBhcmFtcyxcbiAgaXNJUGFnZVJlcXVlc3QsXG4gIEpTT05PYmplY3QsXG4gIElQYWdlUmVxdWVzdCxcbn0gZnJvbSAnQC90eXBpbmdzJztcbmltcG9ydCB7dG9TbmFrZUNhc2V9IGZyb20gJ0AvaGVscGVycyc7XG5cbmNvbnN0IFFVRVJZX0RFRkFVTFRfUEFHRV9TSVpFID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuUVVFUllfREVGQVVMVF9QQUdFX1NJWkUgfHwgJzEwJywgMTApO1xuY29uc3QgUVVFUllfREVGQVVMVF9QQUdFID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuUVVFUllfREVGQVVMVF9QQUdFIHx8ICcxJywgMTApO1xuXG50eXBlIElDb2xsZWN0aW9uUmVzcG9uc2U8VD4gPSBQcm9taXNlPHtkYXRhOiBUW10sIHBhZ2U6IHt0b3RhbDogbnVtYmVyfX0+O1xuXG5jb25zdCBhdHRhY2hGaWx0ZXJzID0gKHNxbDogUXVlcnlCdWlsZGVyLCBmaWx0ZXJzOiBJRmlsdGVyUGFyYW1bXSA9IFtdKSA9PiB7XG4gIGZpbHRlcnMuZm9yRWFjaCgoZjogSUZpbHRlclBhcmFtLCBpZHg6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGZpcnN0ID0gaWR4ID09PSAwO1xuICAgIGlmIChmLnR5cGUgPT09ICdyYXcnKSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICBzcWwgPSBmaXJzdCA/IChzcWwud2hlcmVSYXcgYXMgYW55KSguLi4odHlwZW9mIGYuYXJncyA9PT0gJ3N0cmluZycgPyBbZi5hcmdzXSA6IGYuYXJncykpIDogKHNxbC5hbmRXaGVyZVJhdyBhcyBhbnkpKC4uLih0eXBlb2YgZi5hcmdzID09PSAnc3RyaW5nJyA/IFtmLmFyZ3NdIDogZi5hcmdzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgIHNxbCA9IGZpcnN0ID8gKHNxbC53aGVyZSBhcyBhbnkpKC4uLih0eXBlb2YgZi5hcmdzID09PSAnc3RyaW5nJyA/IFtmLmFyZ3NdIDogZi5hcmdzKSkgOiAoc3FsLmFuZFdoZXJlIGFzIGFueSkoLi4uKHR5cGVvZiBmLmFyZ3MgPT09ICdzdHJpbmcnID8gW2YuYXJnc10gOiBmLmFyZ3MpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc3FsO1xufTtcblxuY29uc3QgZGVkdXBlQW5kQ29uc3RydWN0SW5jbHVkZXMgPSAoZmllbGRzOiBJUXVlcnlGaWVsZHMsIGluY2x1ZGU6IHN0cmluZ1tdID0gW10pOiBzdHJpbmdbXSA9PiB7XG4gIGlmIChpbmNsdWRlLmluY2x1ZGVzKCcqJykpIHtcbiAgICByZXR1cm4gWy4uLk9iamVjdC52YWx1ZXMoZmllbGRzKS5tYXAoKHYpID0+IHYua2V5KV07XG4gIH1cbiAgcmV0dXJuIHVuaXEoWydkZWZhdWx0JywgLi4uaW5jbHVkZV0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldE9mZnNldExpbWl0RnJvbVBhZ2VSZXF1ZXN0ID0gKHBhcmFtczogSVBhZ2VSZXF1ZXN0ID0ge3BhZ2U6IFFVRVJZX0RFRkFVTFRfUEFHRSwgc2l6ZTogUVVFUllfREVGQVVMVF9QQUdFX1NJWkV9KToge2xpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyfSA9PiB7XG4gIGNvbnN0IHtwYWdlID0gUVVFUllfREVGQVVMVF9QQUdFLCBzaXplID0gUVVFUllfREVGQVVMVF9QQUdFX1NJWkV9ID0gcGFyYW1zO1xuICBpZiAoIWlzSVBhZ2VSZXF1ZXN0KHtwYWdlLCBzaXplfSkpIHtcbiAgICB0aHJvdyBCYWRSZXF1ZXN0RXJyb3IoJ3BhZ2UgJiBzaXplIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyJyk7XG4gIH1cbiAgY29uc3QgbGltaXQgPSBzaXplIHx8IFFVRVJZX0RFRkFVTFRfUEFHRV9TSVpFO1xuICBjb25zdCBvZmZzZXQgPSAoKHBhZ2UgfHwgUVVFUllfREVGQVVMVF9QQUdFKSAtIDEpICogKGxpbWl0KTtcbiAgcmV0dXJuIHtsaW1pdCwgb2Zmc2V0fTtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURlZmF1bHRRdWVyeVBhcmFtcyB7XG4gIGZpbHRlcnM/OiBJRmlsdGVyUGFyYW1bXTtcbiAgaW5jbHVkZXM/OiBzdHJpbmdbXTtcbiAgaW5jbHVkZT86IHN0cmluZ1tdO1xuICBvcmRlcmluZz86IElPcmRlcmluZ1BhcmFtW107XG4gIGxpbWl0PzogbnVtYmVyfG51bGw7XG4gIG9mZnNldD86IG51bWJlcnxudWxsO1xuICBkaXN0aW5jdD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNlcXVlbmNlIHtcbiAgcm93czogSVNlcXVlbmNlSWRzW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNlcXVlbmNlSWRzIHtcbiAgaWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgSUJhc2VRdWVyeU9wdGlvbnMgPSBQYXJ0aWFsPHtcbiAgaWRDb2x1bW5OYW1lOiBzdHJpbmcsXG4gIGFsbG93RGVsZXRlOiBib29sZWFuLFxuICBwcmVEZWxldGU6ICguLi5hcmdzOiB1bmtub3duW10pID0+IFByb21pc2U8dW5rbm93bj4sXG4gIHByZUNyZWF0ZTogKC4uLmFyZ3M6IHVua25vd25bXSkgPT4gUHJvbWlzZTx1bmtub3duPixcbiAgcHJlVXBkYXRlOiAoLi4uYXJnczogdW5rbm93bltdKSA9PiBQcm9taXNlPHVua25vd24+LFxuICBwb3N0VXBkYXRlOiAoLi4uYXJnczogdW5rbm93bltdKSA9PiBQcm9taXNlPHVua25vd24+LFxuICBwb3N0Q3JlYXRlOiAoLi4uYXJnczogdW5rbm93bltdKSA9PiBQcm9taXNlPHVua25vd24+LFxufT47XG5cbmFic3RyYWN0IGNsYXNzIFF1ZXJ5PFQgPSB1bmtub3duLCBDID0gdW5rbm93bj4ge1xuXG4gIHByaXZhdGUgc3RhdGljIGFzeW5jIGdldE5ld0lEKGtuZXg6IEtuZXgsIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3Qge3Jvd3N9ID0gKGF3YWl0IGtuZXgucmF3PElTZXF1ZW5jZT4oJ3NlbGVjdCBzZXF1ZW5jZS5uZXh0X2lkKCkgYXMgaWQnKS50cmFuc2FjdGluZyh0cmFuc2FjdGlvbikpO1xuICAgIGNvbnN0IHtpZH0gPSByb3dzWzBdO1xuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIC8vIEB0cy1pZ25vcmVcbiAgI19maWVsZERlZmluaXRpb25zOiBJUXVlcnlGaWVsZHM7XG4gICNfaW5pdCA9IGZhbHNlO1xuICAjX2lkQ29sdW1uTmFtZSA9ICdpZCc7XG4gICNfYWxsb3dEZWxldGUgPSBmYWxzZTtcblxuICByZWFkb25seSAjX3ByZUNyZWF0ZTogKHRyeD86IFRyYW5zYWN0aW9uKSA9PiBQcm9taXNlPHVua25vd24+O1xuICByZWFkb25seSAjX3Bvc3RDcmVhdGU6ICh0cng/OiBUcmFuc2FjdGlvbikgPT4gUHJvbWlzZTx1bmtub3duPjtcbiAgcmVhZG9ubHkgI19wcmVVcGRhdGU6ICh0cng/OiBUcmFuc2FjdGlvbikgPT4gUHJvbWlzZTx1bmtub3duPjtcbiAgcmVhZG9ubHkgI19wb3N0VXBkYXRlOiAodHJ4PzogVHJhbnNhY3Rpb24pID0+IFByb21pc2U8dW5rbm93bj47XG4gIHJlYWRvbmx5ICNfcHJlRGVsZXRlOiAodHJ4PzogVHJhbnNhY3Rpb24pID0+IFByb21pc2U8dW5rbm93bj47XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHByZUNyZWF0ZTogKHRyeD86IFRyYW5zYWN0aW9uKSA9PiBQcm9taXNlPHVua25vd24+O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgcHJlVXBkYXRlOiAodHJ4PzogVHJhbnNhY3Rpb24pID0+IFByb21pc2U8dW5rbm93bj47XG4gIHByb3RlY3RlZCByZWFkb25seSBwb3N0Q3JlYXRlOiAodHJ4OiBUcmFuc2FjdGlvbikgPT4gUHJvbWlzZTx1bmtub3duPjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHBvc3RVcGRhdGU6ICh0cng6IFRyYW5zYWN0aW9uKSA9PiBQcm9taXNlPHVua25vd24+O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgcHJlRGVsZXRlOiAodHJ4PzogVHJhbnNhY3Rpb24pID0+IFByb21pc2U8dW5rbm93bj47XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IEZJRUxEX0RFRklOSVRJT05TOiAoa25leDogS25leCkgPT4gSVF1ZXJ5RmllbGRzO1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgbmFtZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgVEFCTEU6IHN0cmluZztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGtuZXg6IEtuZXg7XG4gIHByb3RlY3RlZCByZWFkb25seSBsb2dnZXI6IExvZ2dlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IG9iamVjdFR5cGU6IHN0cmluZ3xudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGF1ZGl0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihrbmV4OiBLbmV4LCBsb2dnZXI6IExvZ2dlciwgb3B0aW9ucz86IElCYXNlUXVlcnlPcHRpb25zKSB7XG4gICAgaWYgKGtuZXggPT09IHVuZGVmaW5lZCB8fCBsb2dnZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBhcmFtZXRlcnMgc3VwcGxpZWQgdG8gY29uc3RydWN0b3I6IEtuZXggb3IgbG9nZ2VyIGlzIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICB0aGlzLmtuZXggPSBrbmV4O1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuXG4gICAgdGhpcy4jX2lkQ29sdW1uTmFtZSA9IChvcHRpb25zIHx8IHt9KS5pZENvbHVtbk5hbWUgfHwgJ2lkJztcbiAgICB0aGlzLiNfYWxsb3dEZWxldGUgPSAob3B0aW9ucyB8fCB7fSkuYWxsb3dEZWxldGUgfHwgZmFsc2U7XG5cbiAgICBjb25zdCBwcmVEZWxldGUgPSAob3B0aW9ucyB8fCB7fSkucHJlRGVsZXRlIHx8IChhc3luYyAoKSA9PiBQcm9taXNlLnJlc29sdmUobnVsbCkpO1xuICAgIGNvbnN0IHByZUNyZWF0ZSA9IChvcHRpb25zIHx8IHt9KS5wcmVDcmVhdGUgfHwgKGFzeW5jICgpID0+IFByb21pc2UucmVzb2x2ZShudWxsKSk7XG4gICAgY29uc3QgcHJlVXBkYXRlID0gKG9wdGlvbnMgfHwge30pLnByZVVwZGF0ZSB8fCAoYXN5bmMgKCkgPT4gUHJvbWlzZS5yZXNvbHZlKG51bGwpKTtcbiAgICBjb25zdCBwb3N0VXBkYXRlID0gKG9wdGlvbnMgfHwge30pLnBvc3RVcGRhdGUgfHwgKGFzeW5jICgpID0+IFByb21pc2UucmVzb2x2ZShudWxsKSk7XG4gICAgY29uc3QgcG9zdENyZWF0ZSA9IChvcHRpb25zIHx8IHt9KS5wb3N0Q3JlYXRlIHx8IChhc3luYyAoKSA9PiBQcm9taXNlLnJlc29sdmUobnVsbCkpO1xuXG4gICAgdGhpcy4jX3ByZUNyZWF0ZSA9IHByZUNyZWF0ZS5iaW5kKHRoaXMsIGtuZXgsIGxvZ2dlcik7XG4gICAgdGhpcy4jX3Bvc3RDcmVhdGUgPSBwb3N0Q3JlYXRlLmJpbmQodGhpcywga25leCwgbG9nZ2VyKTtcbiAgICB0aGlzLiNfcHJlRGVsZXRlID0gcHJlRGVsZXRlLmJpbmQodGhpcywga25leCwgbG9nZ2VyKTtcbiAgICB0aGlzLiNfcHJlVXBkYXRlID0gcHJlVXBkYXRlLmJpbmQodGhpcywga25leCwgbG9nZ2VyKTtcbiAgICB0aGlzLiNfcG9zdFVwZGF0ZSA9IHBvc3RVcGRhdGUuYmluZCh0aGlzLCBrbmV4LCBsb2dnZXIpO1xuICAgIHRoaXMucHJlQ3JlYXRlID0gdGhpcy4jX3ByZUNyZWF0ZTtcbiAgICB0aGlzLnBvc3RDcmVhdGUgPSB0aGlzLiNfcG9zdENyZWF0ZTtcbiAgICB0aGlzLnByZVVwZGF0ZSA9IHRoaXMuI19wcmVVcGRhdGU7XG4gICAgdGhpcy5wb3N0VXBkYXRlID0gdGhpcy4jX3Bvc3RVcGRhdGU7XG4gICAgdGhpcy5wcmVEZWxldGUgPSB0aGlzLiNfcHJlRGVsZXRlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHF1ZXJ5SGFuZGxlcjxWID0gVD4oe3NxbCwgZXhwZWN0TGlzdCA9IHRydWUsIGlnbm9yZUtleXN9OiBJSGFuZGxlckFyZ3VtZW50cyk6IFByb21pc2U8VnxWW10+IHtcbiAgICB0aGlzLmluaXQoKTtcbiAgICBjb25zdCByb3dzID0gYXdhaXQga25leG5lc3Qoc3FsLCB0cnVlKTtcbiAgICBjb25zdCByZXN1bHQgPSByb3dzLm1hcCgocm93OiBKU09OT2JqZWN0KSA9PiB0b1NuYWtlQ2FzZShyb3csIHtpZ25vcmVTbmFrZUtleTogaWdub3JlS2V5c30pKTtcbiAgICBpZiAoZXhwZWN0TGlzdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgY29uc3QgW3JlY29yZF0gPSByZXN1bHQ7XG4gICAgaWYgKCFyZWNvcmQpIHtcbiAgICAgIHRocm93IE5vdEZvdW5kRXJyb3IoYCR7dGhpcy5uYW1lfSBub3QgZm91bmRgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlY29yZCBhcyBWfFZbXTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB0b3RhbCh7Y29sdW1uLCBmaWx0ZXJzID0gW10sIGluY2x1ZGVzID0gW10sIGluY2x1ZGUgPSBbXSwgZGlzdGluY3R9OiB7Y29sdW1uOiBzdHJpbmcsIGZpbHRlcnM/OiBJRmlsdGVyUGFyYW1bXSwgaW5jbHVkZXM/OiBzdHJpbmdbXSwgaW5jbHVkZT86IHN0cmluZ1tdLCBkaXN0aW5jdD86IGJvb2xlYW59LCB0cng/OiBUcmFuc2FjdGlvbik6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgY29uc3Qge2tuZXh9ID0gdGhpcztcbiAgICBsZXQgc3FsOiBRdWVyeUJ1aWxkZXIgPSAodHJ4ID8ga25leCh0aGlzLlRBQkxFKS50cmFuc2FjdGluZyh0cngpIDoga25leCh0aGlzLlRBQkxFKSk7XG4gICAgZGVkdXBlQW5kQ29uc3RydWN0SW5jbHVkZXModGhpcy5GSUVMRF9ERUZJTklUSU9OUyhrbmV4KSwgWy4uLmluY2x1ZGUsIC4uLmluY2x1ZGVzXSlcbiAgICAgIC5mb3JFYWNoKChjOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuI19maWVsZERlZmluaXRpb25zW2NdICYmICh0aGlzLiNfZmllbGREZWZpbml0aW9uc1tjXSBhcyBvYmplY3QpLmhhc093blByb3BlcnR5KCdqb2lucycpKSB7XG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICAgICh0aGlzLiNfZmllbGREZWZpbml0aW9uc1tjXSBhcyBhbnkpLmpvaW5zLmZvckVhY2goKGo6IHt0eXBlOiBzdHJpbmc7IGFyZ3M6IHVua25vd25bXX18c3RyaW5nW10pID0+IHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGopKSB7XG4gICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgICAgICAgc3FsID0gKHNxbC5qb2luIGFzIGFueSkoLi4uaik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFqLnR5cGUpIHtcbiAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICAgICAgICBzcWwgPSAoc3FsLmpvaW4gYXMgYW55KSguLi5qLmFyZ3MpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChqLnR5cGUgPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICAgICAgICAgIHNxbCA9IChzcWwubGVmdEpvaW4gYXMgYW55KSguLi5qLmFyZ3MpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChqLnR5cGUgPT09ICdpbm5lcicpIHtcbiAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICAgICAgICBzcWwgPSAoc3FsLmpvaW4gYXMgYW55KSguLi5qLmFyZ3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICAgICAgICBzcWwgPSAoc3FsLmpvaW5SYXcgYXMgYW55KSguLi5qLmFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBzcWwgPSBkaXN0aW5jdCA/IHNxbC5jb3VudERpc3RpbmN0KGAke2NvbHVtbn0gYXMgY291bnRgKSA6IHNxbC5jb3VudChgJHtjb2x1bW59IGFzIGNvdW50YCk7XG4gICAgc3FsID0gYXR0YWNoRmlsdGVycyhzcWwsIGZpbHRlcnMpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNxbC5maXJzdCgpO1xuICAgIHJldHVybiBwYXJzZUludChyZXN1bHQhLmNvdW50LCAxMCk7XG4gIH1cblxuICBwdWJsaWMgZGVmYXVsdFF1ZXJ5KHtcbiAgICBmaWx0ZXJzID0gW10sXG4gICAgaW5jbHVkZXMgPSBbXSxcbiAgICBpbmNsdWRlID0gW10sXG4gICAgb3JkZXJpbmcgPSBbXSxcbiAgICBsaW1pdCxcbiAgICBvZmZzZXQsXG4gICAgZGlzdGluY3QgPSBmYWxzZSxcbiAgfTogSURlZmF1bHRRdWVyeVBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgICB0cng/OiBUcmFuc2FjdGlvbixcbik6IFF1ZXJ5QnVpbGRlciB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgY29uc3Qge2tuZXh9ID0gdGhpcztcbiAgICBsZXQgc3FsOiBRdWVyeUJ1aWxkZXIgPSAodHJ4ID8ga25leCh0aGlzLlRBQkxFKS50cmFuc2FjdGluZyh0cngpIDoga25leCh0aGlzLlRBQkxFKSk7XG4gICAgbGV0IGZpZWxkczogQXJyYXk8c3RyaW5nfFJhdzx7fT4+ID0gW107XG4gICAgY29uc3QgZ3JvdXBCeXM6IHt0eXBlOiB1bmtub3duOyBhcmdzOiBzdHJpbmdbXX0gPSB7dHlwZTogbnVsbCwgYXJnczogW119O1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICBjb25zdCBnZXRBbGlhc05hbWUgPSAoZmllbGQ6IGFueSwgaW5kZXg6IG51bWJlcik6IHN0cmluZ3xudWxsID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IFthbGlhc10gPSBmaWVsZC5zcGxpdCgnICcpLnJldmVyc2UoKTtcbiAgICAgICAgY29uc3QgWywgYWxpYXNOYW1lXSA9IGFsaWFzLnRyaW0oKS5zcGxpdCgnXycpO1xuICAgICAgICByZXR1cm4gYWxpYXNOYW1lO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZmllbGQudG9TUUwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IHtzcWw6IHNxbFN0cmluZ30gPSBmaWVsZC50b1NRTCgpO1xuICAgICAgICAgIHJldHVybiBnZXRBbGlhc05hbWUoc3FsU3RyaW5nLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRlZHVwZUFuZENvbnN0cnVjdEluY2x1ZGVzKHRoaXMuRklFTERfREVGSU5JVElPTlMoa25leCksIFsuLi5pbmNsdWRlcywgLi4uaW5jbHVkZV0pXG4gICAgICAuZm9yRWFjaCgoYzogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLiNfZmllbGREZWZpbml0aW9uc1tjXSkge1xuICAgICAgICAgIGNvbnN0IGpvaW5zID0gKHRoaXMuI19maWVsZERlZmluaXRpb25zW2NdKS5qb2lucyB8fCBbXTtcbiAgICAgICAgICBjb25zdCBncm91cEJ5ID0gKHRoaXMuI19maWVsZERlZmluaXRpb25zW2NdKS5ncm91cEJ5IHx8IFtdO1xuICAgICAgICAgIGNvbnN0IG9yZGVyID0gKHRoaXMuI19maWVsZERlZmluaXRpb25zW2NdKS5vcmRlcmluZyB8fCBbXTtcblxuICAgICAgICAgIC8vIFByb2Nlc3MgSm9pbiBhcmd1bWVudHNcbiAgICAgICAgICBqb2lucy5mb3JFYWNoKChqKSA9PiB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShqKSkge1xuICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICAgICAgICAgIHNxbCA9IChzcWwuam9pbiBhcyBhbnkpKC4uLmopO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghai50eXBlKSB7XG4gICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgICAgICAgc3FsID0gKHNxbC5qb2luIGFzIGFueSkoLi4uai5hcmdzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoai50eXBlID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICAgICAgICBzcWwgPSAoc3FsLmxlZnRKb2luIGFzIGFueSkoLi4uai5hcmdzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoai50eXBlID09PSAnaW5uZXInKSB7XG4gICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgICAgICAgc3FsID0gKHNxbC5qb2luIGFzIGFueSkoLi4uai5hcmdzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgICAgICAgc3FsID0gKHNxbC5qb2luUmF3IGFzIGFueSkoLi4uai5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIEhhbmRsZSBncm91cCBieSBzdGF0ZW1lbnRzXG4gICAgICAgICAgZ3JvdXBCeS5mb3JFYWNoKChqKSA9PiB7XG4gICAgICAgICAgICBncm91cEJ5cy5hcmdzLnB1c2goLi4uai5hcmdzIGFzIHN0cmluZ1tdKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIG9yZGVyLmZvckVhY2goKGopID0+IHtcbiAgICAgICAgICAgIG9yZGVyaW5nLnB1c2goaik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBSZXNvbHZlIGR1cGxpY2F0ZSBzZWxlY3QgYWxpYXNlcyB3aGVuIHJlcXVlc3RpbmcgcG9wdWxhdGVkIHJlc291cmNlc1xuICAgICAgICAgIGNvbnN0IGZpZWxkQWxpYXNlcyA9IGZpZWxkcy5tYXAoZ2V0QWxpYXNOYW1lKTtcbiAgICAgICAgICBjb25zdCBmaWVsZHNUb0FkZCA9ICh0aGlzLiNfZmllbGREZWZpbml0aW9uc1tjXSkuZmllbGRzLm1hcChnZXRBbGlhc05hbWUpO1xuICAgICAgICAgIGNvbnN0IGluZGVjZXNUb1JlbW92ZTogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICBmaWVsZHNUb0FkZC5mb3JFYWNoKChmOiBzdHJpbmd8bnVsbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uZmxpY3RpbmdJbmRleCA9IGZpZWxkQWxpYXNlcy5maW5kSW5kZXgoKHYpID0+IHYgPT09IGYpO1xuICAgICAgICAgICAgaWYgKGNvbmZsaWN0aW5nSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICBpbmRlY2VzVG9SZW1vdmUucHVzaChjb25mbGljdGluZ0luZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzb3J0ZWRVbmlxKGluZGVjZXNUb1JlbW92ZSkuZm9yRWFjaCgoY3VycmVudCwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgZmllbGRzID0gWy4uLmZpZWxkcy5zbGljZSgwLCAoY3VycmVudCAtIGluZGV4KSksIC4uLmZpZWxkcy5zbGljZSgoY3VycmVudCAtIGluZGV4KSArIDEpXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBmaWVsZHMucHVzaCguLi50aGlzLiNfZmllbGREZWZpbml0aW9uc1tjXS5maWVsZHMgYXMgc3RyaW5nfFJhd1tdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgc3FsID0gZGlzdGluY3QgPyBzcWwuZGlzdGluY3QoZmllbGRzKSA6IHNxbC5zZWxlY3QoZmllbGRzKTtcbiAgICBzcWwgPSBhdHRhY2hGaWx0ZXJzKHNxbCwgZmlsdGVycyk7XG4gICAgaWYgKGxpbWl0KSB7XG4gICAgICBzcWwgPSBzcWwubGltaXQobGltaXQpO1xuICAgIH1cbiAgICBpZiAob2Zmc2V0KSB7XG4gICAgICBzcWwgPSBzcWwub2Zmc2V0KG9mZnNldCk7XG4gICAgfVxuICAgIGlmIChncm91cEJ5cy5hcmdzLmxlbmd0aCkge1xuICAgICAgc3FsID0gc3FsLmdyb3VwQnkoLi4uZ3JvdXBCeXMuYXJncyk7XG4gICAgfVxuICAgIG9yZGVyaW5nLmZvckVhY2goKG8pID0+IHtcbiAgICAgIGlmIChvLnR5cGUgPT09ICdyYXcnKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgc3FsID0gKHNxbC5vcmRlckJ5UmF3IGFzIGFueSkoLi4uby5hcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgICAgICAgc3FsID0gKHNxbC5vcmRlckJ5IGFzIGFueSkoLi4uby5hcmdzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhzcWwudG9RdWVyeSgpKTtcbiAgICByZXR1cm4gc3FsO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHVwZGF0ZTxWPihwYXJhbXM6IE9taXQ8SVVwZGF0ZVF1ZXJ5UGFyYW1zPFY+LCAncHJvZHVjdCcgfCAnb3JnYW5pemF0aW9uJz4sIHRyeD86IFRyYW5zYWN0aW9uKTogUHJvbWlzZTxUPiB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgY29uc3Qge2tuZXh9ID0gdGhpcztcbiAgICBjb25zdCB7aWQsIHNlY29uZGFyeUlkLCBkYXRhfSA9IHBhcmFtcztcbiAgICBhd2FpdCB0aGlzLiNfcHJlVXBkYXRlKHRyeCk7XG5cbiAgICByZXR1cm4gdGhpcy50cmFuc2FjdGFibGU8VD4oYXN5bmMgKHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbikgPT4ge1xuICAgICAgYXdhaXQga25leCh0aGlzLnRhYmxlTm9BbGlhcygpKVxuICAgICAgICAudHJhbnNhY3RpbmcodHJhbnNhY3Rpb24pXG4gICAgICAgIC51cGRhdGUoZGF0YSBhcyBvYmplY3QpXG4gICAgICAgIC53aGVyZSh0aGlzLiNfaWRDb2x1bW5OYW1lLCBpZCBhcyBzdHJpbmcpO1xuICAgICAgYXdhaXQgdGhpcy4jX3Bvc3RVcGRhdGUodHJhbnNhY3Rpb24pO1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KHtpZDogaWQgYXMgc3RyaW5nfSwgdHJhbnNhY3Rpb24pO1xuICAgIH0sIHRyeCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0KHBhcmFtczogSVF1ZXJ5R2V0UGFyYW0sIHRyeD86IFRyYW5zYWN0aW9uKTogUHJvbWlzZTxUPjtcbiAgcHVibGljIGFzeW5jIGdldDxWLCBVID0gdW5kZWZpbmVkPihwYXJhbXM6IElRdWVyeUdldFBhcmFtLCB0cng/OiBUcmFuc2FjdGlvbik6IFByb21pc2U8VSBleHRlbmRzIHVuZGVmaW5lZCA/IFQgOiBVPjtcbiAgcHVibGljIGFzeW5jIGdldDxWID0gdW5kZWZpbmVkPihwYXJhbXM6IElRdWVyeUdldFBhcmFtLCB0cng/OiBUcmFuc2FjdGlvbik6IFByb21pc2U8ViBleHRlbmRzIHVuZGVmaW5lZCA/IFQgOiBWPjtcbiAgcHVibGljIGFzeW5jIGdldDxfViA9IHVua25vd24sIFUgPSB1bmRlZmluZWQ+KHBhcmFtczogSVF1ZXJ5R2V0UGFyYW0sIHRyeD86IFRyYW5zYWN0aW9uKTogUHJvbWlzZTxVIGV4dGVuZHMgdW5kZWZpbmVkID8gVCA6IFU+IHtcbiAgICBjb25zdCB7aWQsIGluY2x1ZGUgPSBbXSwgaW5jbHVkZXMsIGZpbHRlcnMgPSBbXX0gPSBwYXJhbXM7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgY29uc3Qgc3FsID0gdGhpcy5kZWZhdWx0UXVlcnkoe1xuICAgICAgZmlsdGVyczogW1xuICAgICAgICB7YXJnczogW2Ake3RoaXMudGFibGVBbGlhcygpfS4ke3RoaXMuI19pZENvbHVtbk5hbWV9YCwgaWRdfSxcbiAgICAgICAgLi4uZmlsdGVycyxcbiAgICAgIF0sXG4gICAgICBpbmNsdWRlczogaW5jbHVkZXMgfHwgaW5jbHVkZSxcbiAgICB9LCB0cngpO1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5T25lPFUgZXh0ZW5kcyB1bmRlZmluZWQgPyBUIDogVT4oc3FsKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb2xsZWN0aW9uPFYsIFUgPSB1bmRlZmluZWQ+KHBhcmFtczogSVF1ZXJ5RmluZFBhcmFtLCB0cng/OiBUcmFuc2FjdGlvbik6IElDb2xsZWN0aW9uUmVzcG9uc2U8VSBleHRlbmRzIHVuZGVmaW5lZCA/IFQgOiBVPjtcbiAgcHVibGljIGFzeW5jIGNvbGxlY3Rpb24ocGFyYW1zOiBJUXVlcnlGaW5kUGFyYW0sIHRyeD86IFRyYW5zYWN0aW9uKTogSUNvbGxlY3Rpb25SZXNwb25zZTxUPjtcbiAgcHVibGljIGFzeW5jIGNvbGxlY3Rpb248ViA9IHVuZGVmaW5lZD4ocGFyYW1zOiBJUXVlcnlGaW5kUGFyYW0sIHRyeD86IFRyYW5zYWN0aW9uKTogSUNvbGxlY3Rpb25SZXNwb25zZTxWIGV4dGVuZHMgdW5kZWZpbmVkID8gVCA6IFY+O1xuICBwdWJsaWMgYXN5bmMgY29sbGVjdGlvbjxfViA9IHVua25vd24sIFUgPSB1bmRlZmluZWQ+KHBhcmFtczogSVF1ZXJ5RmluZFBhcmFtID0ge30sIHRyeD86IFRyYW5zYWN0aW9uKTogSUNvbGxlY3Rpb25SZXNwb25zZTxVIGV4dGVuZHMgdW5kZWZpbmVkID8gVCA6IFU+IHtcbiAgICBjb25zdCB0b3RhbCA9IGF3YWl0IHRoaXMudG90YWwoe1xuICAgICAgY29sdW1uOiBgJHt0aGlzLnRhYmxlQWxpYXMoKX0uJHt0aGlzLiNfaWRDb2x1bW5OYW1lfWAsXG4gICAgICBmaWx0ZXJzOiBwYXJhbXMuZmlsdGVycyB8fCBbXSxcbiAgICAgIGluY2x1ZGU6IHBhcmFtcy5pbmNsdWRlcyB8fCBwYXJhbXMuaW5jbHVkZSB8fCBbXSxcbiAgICAgIGRpc3RpbmN0OiBwYXJhbXMuZGlzdGluY3QgfHwgdHJ1ZSxcbiAgICB9LCB0cngpO1xuXG4gICAgY29uc3QgcGFnZVJlcXVlc3QgPSBnZXRPZmZzZXRMaW1pdEZyb21QYWdlUmVxdWVzdChwYXJhbXMucGFnaW5hdGlvbik7XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5xdWVyeUxpc3Q8VSBleHRlbmRzIHVuZGVmaW5lZCA/IFQgOiBVPihcbiAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5KHtcbiAgICAgICAgLi4ucGFnZVJlcXVlc3QsXG4gICAgICAgIC4uLnBhcmFtcywgLy8gcHJlZGVmaW5lZCBvZmZzZXQgYW5kIGxpbWl0IHBhcmFtZXRlcnMgd2lsbCBvdmVycmlkZSBwYWdpbmF0aW9uIHJlcXVlc3QhXG4gICAgICB9LCB0cngpLFxuICAgICAgcGFyYW1zLmlnbm9yZUtleXMsXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YSxcbiAgICAgIHBhZ2U6IHt0b3RhbH0sXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBleGlzdHMoaWQ6IHN0cmluZywgdHJ4PzogVHJhbnNhY3Rpb24pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZ2V0KHtpZH0sIHRyeCk7XG4gICAgICByZXR1cm4gZGF0YSAhPT0gdW5kZWZpbmVkO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY3JlYXRlKGRhdGE6IEMsIHRyeD86IFRyYW5zYWN0aW9uLCBmb3JjZUlkPzogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG4gICAgY29uc3Qge2tuZXh9ID0gdGhpcztcbiAgICBsZXQgaWQ7XG4gICAgYXdhaXQgdGhpcy4jX3ByZUNyZWF0ZSh0cngpO1xuICAgIHJldHVybiB0aGlzLnRyYW5zYWN0YWJsZShhc3luYyAodHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uKSA9PiB7XG4gICAgICBpZiAoZm9yY2VJZCkge1xuICAgICAgICBpZCA9IGZvcmNlSWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZCA9IGF3YWl0IFF1ZXJ5LmdldE5ld0lEKGtuZXgsIHRyYW5zYWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQga25leCh0aGlzLnRhYmxlTm9BbGlhcygpKVxuICAgICAgICAudHJhbnNhY3RpbmcodHJhbnNhY3Rpb24pXG4gICAgICAgIC5pbnNlcnQoe1xuICAgICAgICAgIC4uLmRhdGEsXG4gICAgICAgICAgaWQ6IGZvcmNlSWQgfHwgaWQsXG4gICAgICAgIH0pO1xuICAgICAgYXdhaXQgdGhpcy4jX3Bvc3RDcmVhdGUodHJhbnNhY3Rpb24pO1xuICAgICAgY29uc29sZS5sb2coJ2VuZCBvZiBjcmVhdGUnKTtcbiAgICAgIHJldHVybiB0aGlzLmdldCh7aWQ6IGZvcmNlSWQgfHwgaWR9LCB0cmFuc2FjdGlvbik7XG4gICAgfSwgdHJ4KTtcbiAgfVxuXG4gIHB1YmxpYyB0YWJsZU5vQWxpYXMgPSAoKSA9PiB0aGlzLlRBQkxFLnRyaW0oKS5zcGxpdCgnICcpWzBdO1xuICBwdWJsaWMgdGFibGVBbGlhcyA9ICgpID0+IHRoaXMuVEFCTEUudHJpbSgpLnNwbGl0KCcgJylbMl07XG5cbiAgcHVibGljIGFzeW5jIGRlbGV0ZShwYXJhbXM6IHtmaWx0ZXJzPzogSUZpbHRlclBhcmFtW10sIFtrZXk6IHN0cmluZ106IHVua25vd259ID0ge30sIHRyeD86IFRyYW5zYWN0aW9uKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qge2ZpbHRlcnMgPSBbXX0gPSBwYXJhbXM7XG4gICAgaWYgKCF0aGlzLiNfYWxsb3dEZWxldGUpIHtcbiAgICAgIHRocm93IE1ldGhvZE5vdEFsbG93ZWRFcnJvcigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy50cmFuc2FjdGFibGU8Ym9vbGVhbj4oYXN5bmMgKHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbikgPT4ge1xuICAgICAgYXdhaXQgdGhpcy4jX3ByZURlbGV0ZSh0cmFuc2FjdGlvbik7XG4gICAgICBsZXQgc3FsID0gdGhpcy5rbmV4KHRoaXMudGFibGVOb0FsaWFzKCkpLnRyYW5zYWN0aW5nKHRyYW5zYWN0aW9uKTtcbiAgICAgIHNxbCA9IGF0dGFjaEZpbHRlcnMoc3FsLCBmaWx0ZXJzKTtcbiAgICAgIGNvbnN0IG51bURlbGV0ZWQgPSBhd2FpdCBzcWwuZGVsZXRlKCk7XG4gICAgICB0aGlzLmxvZ2dlci52ZXJib3NlKGBSZW1vdmVkICR7bnVtRGVsZXRlZH0gcmVjb3JkcyBmcm9tICR7dGhpcy50YWJsZU5vQWxpYXMoKX1gKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sIHRyeCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgdHJhbnNhY3RhYmxlPFY+KHF1ZXJ5OiAodHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uKSA9PiB1bmtub3duLCB0cng/OiBUcmFuc2FjdGlvbik6IFByb21pc2U8Vj4ge1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIGxldCB2YWx1ZTtcbiAgICBpZiAodHJ4KSB7XG4gICAgICB2YWx1ZSA9IGF3YWl0IHF1ZXJ5KHRyeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gYXdhaXQgdGhpcy5rbmV4LnRyYW5zYWN0aW9uKGFzeW5jIGZ1bmN0aW9uIHQodHJhbnNhY3Rpb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gcXVlcnkodHJhbnNhY3Rpb24pIGFzIFY7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH0pIGFzIFY7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZSBhcyBWO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNlbGVjdFRhYmxlID0gKHRyeD86IFRyYW5zYWN0aW9uLCB0YWJsZU5hbWVXaXRoQWxpYXM/OiBzdHJpbmcpID0+IHRyeCA/IHRoaXMua25leCh0YWJsZU5hbWVXaXRoQWxpYXMgfHwgdGhpcy5UQUJMRSkudHJhbnNhY3RpbmcodHJ4KSA6IHRoaXMua25leCh0YWJsZU5hbWVXaXRoQWxpYXMgfHwgdGhpcy5UQUJMRSk7XG5cbiAgcHJvdGVjdGVkIGFzeW5jIHF1ZXJ5T25lPFYgPSBUPihzcWw6IFF1ZXJ5QnVpbGRlciwgaWdub3JlS2V5cz86IHN0cmluZ1tdKTogUHJvbWlzZTxWPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucXVlcnlIYW5kbGVyPFY+KHtzcWwsIGV4cGVjdExpc3Q6IGZhbHNlLCBpZ25vcmVLZXlzfSkgYXMgVjtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBxdWVyeUxpc3Q8ViA9IFQ+KHNxbDogUXVlcnlCdWlsZGVyLCBpZ25vcmVLZXlzPzogc3RyaW5nW10pOiBQcm9taXNlPFZbXT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnF1ZXJ5SGFuZGxlcjxWPih7c3FsLCBpZ25vcmVLZXlzLCBleHBlY3RMaXN0OiB0cnVlfSkgYXMgVltdO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvdW50ID0gYXN5bmMgKHNxbDogUXVlcnlCdWlsZGVyKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgICBjb25zdCBbe2NvdW50ID0gJzAnfV0gPSBhd2FpdCBzcWw7XG4gICAgcmV0dXJuIHBhcnNlSW50KGNvdW50LCAxMCk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLiNfaW5pdCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy4jX2ZpZWxkRGVmaW5pdGlvbnMgPSB0aGlzLkZJRUxEX0RFRklOSVRJT05TKHRoaXMua25leCk7XG4gICAgICAgIHRoaXMuI19pbml0ID0gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFF1ZXJ5O1xuIl19