"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Log = exports.default = void 0;require("source-map-support/register");require("bluebird-global");
var _winston = _interopRequireWildcard(require("winston"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class Log {



  constructor() {_defineProperty(this, "logger", void 0);_defineProperty(this, "rejectionHandler", void 0);
    this.logger = (0, _winston.createLogger)({
      exitOnError: false,
      level: process.env.LOG_LEVEL,
      levels: _winston.default.config.npm.levels });

    this.rejectionHandler = new _winston.ExceptionHandler(this.logger);
    const customizedHandler = (level, ...args) => {
      const [message, ...otherArgs] = args;
      if (message instanceof Error) {
        return this.logger.log({ level, message: message });
      }
      const error = otherArgs.find((a) => a instanceof Error);
      return this.logger.log(level, message, error, ...otherArgs);
    };
    Object.keys(_winston.default.config.npm.levels).forEach(
    (level) => this.logger[level] = customizedHandler.bind(this, level));

  }}exports.Log = Log;var _default =


new Log();exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dnZXIudHMiXSwibmFtZXMiOlsiTG9nIiwiY29uc3RydWN0b3IiLCJsb2dnZXIiLCJleGl0T25FcnJvciIsImxldmVsIiwicHJvY2VzcyIsImVudiIsIkxPR19MRVZFTCIsImxldmVscyIsIndpbnN0b24iLCJjb25maWciLCJucG0iLCJyZWplY3Rpb25IYW5kbGVyIiwiRXhjZXB0aW9uSGFuZGxlciIsImN1c3RvbWl6ZWRIYW5kbGVyIiwiYXJncyIsIm1lc3NhZ2UiLCJvdGhlckFyZ3MiLCJFcnJvciIsImxvZyIsImVycm9yIiwiZmluZCIsImEiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImJpbmQiXSwibWFwcGluZ3MiOiJ5SkFBQTtBQUNBLDJEOztBQUVBLE1BQU1BLEdBQU4sQ0FBVTs7OztBQUlSQyxFQUFBQSxXQUFXLEdBQUc7QUFDWixTQUFLQyxNQUFMLEdBQWMsMkJBQWE7QUFDekJDLE1BQUFBLFdBQVcsRUFBRSxLQURZO0FBRXpCQyxNQUFBQSxLQUFLLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxTQUZNO0FBR3pCQyxNQUFBQSxNQUFNLEVBQUVDLGlCQUFRQyxNQUFSLENBQWVDLEdBQWYsQ0FBbUJILE1BSEYsRUFBYixDQUFkOztBQUtBLFNBQUtJLGdCQUFMLEdBQXdCLElBQUlDLHlCQUFKLENBQXFCLEtBQUtYLE1BQTFCLENBQXhCO0FBQ0EsVUFBTVksaUJBQWlCLEdBQUcsQ0FBQ1YsS0FBRCxFQUFnQixHQUFHVyxJQUFuQixLQUFpQztBQUN6RCxZQUFNLENBQUNDLE9BQUQsRUFBVSxHQUFHQyxTQUFiLElBQTBCRixJQUFoQztBQUNBLFVBQUlDLE9BQU8sWUFBWUUsS0FBdkIsRUFBOEI7QUFDNUIsZUFBTyxLQUFLaEIsTUFBTCxDQUFZaUIsR0FBWixDQUFnQixFQUFDZixLQUFELEVBQVFZLE9BQU8sRUFBRUEsT0FBakIsRUFBaEIsQ0FBUDtBQUNEO0FBQ0QsWUFBTUksS0FBSyxHQUFHSCxTQUFTLENBQUNJLElBQVYsQ0FBZSxDQUFDQyxDQUFELEtBQVlBLENBQUMsWUFBWUosS0FBeEMsQ0FBZDtBQUNBLGFBQU8sS0FBS2hCLE1BQUwsQ0FBWWlCLEdBQVosQ0FBZ0JmLEtBQWhCLEVBQXVCWSxPQUF2QixFQUFnQ0ksS0FBaEMsRUFBdUMsR0FBR0gsU0FBMUMsQ0FBUDtBQUNELEtBUEQ7QUFRQU0sSUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVlmLGlCQUFRQyxNQUFSLENBQWVDLEdBQWYsQ0FBbUJILE1BQS9CLEVBQXVDaUIsT0FBdkM7QUFDRSxLQUFDckIsS0FBRCxLQUFZLEtBQUtGLE1BQU4sQ0FBcUJFLEtBQXJCLElBQThCVSxpQkFBaUIsQ0FBQ1ksSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNkJ0QixLQUE3QixDQUQzQzs7QUFHRCxHQXRCTyxDOzs7QUF5QkssSUFBSUosR0FBSixFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdibHVlYmlyZC1nbG9iYWwnO1xuaW1wb3J0IHdpbnN0b24sIHtjcmVhdGVMb2dnZXIsIEV4Y2VwdGlvbkhhbmRsZXIsIExvZ2dlcn0gZnJvbSAnd2luc3Rvbic7XG5cbmNsYXNzIExvZyB7XG4gIHB1YmxpYyByZWFkb25seSBsb2dnZXI6IExvZ2dlcjtcbiAgcHJpdmF0ZSByZWFkb25seSByZWplY3Rpb25IYW5kbGVyOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sb2dnZXIgPSBjcmVhdGVMb2dnZXIoe1xuICAgICAgZXhpdE9uRXJyb3I6IGZhbHNlLFxuICAgICAgbGV2ZWw6IHByb2Nlc3MuZW52LkxPR19MRVZFTCxcbiAgICAgIGxldmVsczogd2luc3Rvbi5jb25maWcubnBtLmxldmVscyxcbiAgICB9KSBhcyBMb2dnZXI7XG4gICAgdGhpcy5yZWplY3Rpb25IYW5kbGVyID0gbmV3IEV4Y2VwdGlvbkhhbmRsZXIodGhpcy5sb2dnZXIpO1xuICAgIGNvbnN0IGN1c3RvbWl6ZWRIYW5kbGVyID0gKGxldmVsOiBzdHJpbmcsIC4uLmFyZ3M6IGFueSkgPT4ge1xuICAgICAgY29uc3QgW21lc3NhZ2UsIC4uLm90aGVyQXJnc10gPSBhcmdzO1xuICAgICAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2dnZXIubG9nKHtsZXZlbCwgbWVzc2FnZTogbWVzc2FnZSBhcyBhbnl9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVycm9yID0gb3RoZXJBcmdzLmZpbmQoKGE6IGFueSkgPT4gYSBpbnN0YW5jZW9mIEVycm9yKTtcbiAgICAgIHJldHVybiB0aGlzLmxvZ2dlci5sb2cobGV2ZWwsIG1lc3NhZ2UsIGVycm9yLCAuLi5vdGhlckFyZ3MpO1xuICAgIH07XG4gICAgT2JqZWN0LmtleXMod2luc3Rvbi5jb25maWcubnBtLmxldmVscykuZm9yRWFjaChcbiAgICAgIChsZXZlbCkgPT4gKHRoaXMubG9nZ2VyIGFzIGFueSlbbGV2ZWxdID0gY3VzdG9taXplZEhhbmRsZXIuYmluZCh0aGlzLCBsZXZlbCksXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgTG9nKCk7XG5leHBvcnQge0xvZ307XG4iXX0=