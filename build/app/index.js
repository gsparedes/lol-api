"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _bluebird = require("bluebird");require("source-map-support/register");var _config = _interopRequireDefault(require("./config"));


require("./middleware");


require("./controllers");


require("./errors");


var _queries = _interopRequireDefault(require("../queries"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}




_queries.default.on('ready', function () {var _ref = (0, _bluebird.coroutine)(function* (queries) {
    _config.default.set('queries', queries);
    _config.default.emit('services:ready');
  });return function (_x) {return _ref.apply(this, arguments);};}());var _default =

_config.default;exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvaW5kZXgudHMiXSwibmFtZXMiOlsiUXVlcmllcyIsIm9uIiwicXVlcmllcyIsImFwcCIsInNldCIsImVtaXQiXSwibWFwcGluZ3MiOiIrS0FBQTs7O0FBR0E7OztBQUdBOzs7QUFHQTs7O0FBR0EsNkQ7Ozs7O0FBS0FBLGlCQUFRQyxFQUFSLENBQVcsT0FBWCxtREFBb0IsV0FBT0MsT0FBUCxFQUFtQjtBQUNyQ0Msb0JBQUlDLEdBQUosQ0FBUSxTQUFSLEVBQW1CRixPQUFuQjtBQUNBQyxvQkFBSUUsSUFBSixDQUFTLGdCQUFUO0FBQ0QsR0FIRCxrRTs7QUFLZUYsZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcHAgZnJvbSAnLi9jb25maWcnO1xuXG4vLyBBdHRhY2ggbWlkZGxld2FyZVxuaW1wb3J0ICcuL21pZGRsZXdhcmUnO1xuXG4vLyBBdHRhY2ggY29udHJvbGxlcnNcbmltcG9ydCAnLi9jb250cm9sbGVycyc7XG5cbi8vIFJlZ2lzdGVyIGVycm9yIGhhbmRsaW5nXG5pbXBvcnQgJy4vZXJyb3JzJztcblxuLy8gUmVnaXN0ZXIgc2VjcmV0c1xuaW1wb3J0IFF1ZXJpZXMgZnJvbSAnQC9xdWVyaWVzJztcblxuLy8gUmVnaXN0ZXIgYXBwbGljYXRpb24gc2VydmljZXNcbi8vIGltcG9ydCAnLi9zZXJ2aWNlcyc7XG5cblF1ZXJpZXMub24oJ3JlYWR5JywgYXN5bmMgKHF1ZXJpZXMpID0+IHtcbiAgYXBwLnNldCgncXVlcmllcycsIHF1ZXJpZXMpO1xuICBhcHAuZW1pdCgnc2VydmljZXM6cmVhZHknKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhcHA7XG4iXX0=