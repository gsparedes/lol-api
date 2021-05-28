"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.knex = exports.default = void 0;var _bluebird = require("bluebird");require("source-map-support/register");
var _config = require("./queries/config");

let init = false;
let knex = null;exports.knex = knex;var _default =

() => new Promise(function () {var _ref = (0, _bluebird.coroutine)(function* (resolve, reject) {
    try {
      if (!init) {
        exports.knex = knex = yield (0, _config.KnexConnection)();
        init = true;
      }
      if (!knex) {
        throw new Error('Knex not defined when it was expected  to be');
      }
      resolve(knex);
    } catch (e) {
      reject(e);
    }
  });return function (_x, _x2) {return _ref.apply(this, arguments);};}());exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbmV4LnRzIl0sIm5hbWVzIjpbImluaXQiLCJrbmV4IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJFcnJvciIsImUiXSwibWFwcGluZ3MiOiI7QUFDQTs7QUFFQSxJQUFJQSxJQUFhLEdBQUcsS0FBcEI7QUFDQSxJQUFJQyxJQUFlLEdBQUcsSUFBdEIsQzs7QUFFZSxNQUFxQixJQUFJQyxPQUFKLGtEQUFZLFdBQU9DLE9BQVAsRUFBZ0JDLE1BQWhCLEVBQTJCO0FBQ3pFLFFBQUk7QUFDRixVQUFJLENBQUNKLElBQUwsRUFBVztBQUNULHVCQUFBQyxJQUFJLFNBQVMsNkJBQWI7QUFDQUQsUUFBQUEsSUFBSSxHQUFHLElBQVA7QUFDRDtBQUNELFVBQUksQ0FBQ0MsSUFBTCxFQUFXO0FBQ1QsY0FBTSxJQUFJSSxLQUFKLENBQVUsOENBQVYsQ0FBTjtBQUNEO0FBQ0RGLE1BQUFBLE9BQU8sQ0FBQ0YsSUFBRCxDQUFQO0FBQ0QsS0FURCxDQVNFLE9BQU9LLENBQVAsRUFBVTtBQUNWRixNQUFBQSxNQUFNLENBQUNFLENBQUQsQ0FBTjtBQUNEO0FBQ0YsR0FibUMsc0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgS25leCBmcm9tICdrbmV4JztcbmltcG9ydCB7S25leENvbm5lY3Rpb259IGZyb20gJ0AvcXVlcmllcy9jb25maWcnO1xuXG5sZXQgaW5pdDogYm9vbGVhbiA9IGZhbHNlO1xubGV0IGtuZXg6IEtuZXh8bnVsbCA9IG51bGw7XG5cbmV4cG9ydCBkZWZhdWx0ICgpOiBQcm9taXNlPEtuZXg+ID0+IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoIWluaXQpIHtcbiAgICAgIGtuZXggPSBhd2FpdCBLbmV4Q29ubmVjdGlvbigpO1xuICAgICAgaW5pdCA9IHRydWU7XG4gICAgfVxuICAgIGlmICgha25leCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdLbmV4IG5vdCBkZWZpbmVkIHdoZW4gaXQgd2FzIGV4cGVjdGVkICB0byBiZScpO1xuICAgIH1cbiAgICByZXNvbHZlKGtuZXgpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmVqZWN0KGUpO1xuICB9XG59KTtcblxuZXhwb3J0IHtrbmV4fTtcbiJdfQ==