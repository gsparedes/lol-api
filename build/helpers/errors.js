"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.generic = generic;exports.Confict = exports.BadEntity = exports.ConflictError = exports.BadRequestError = exports.UnauthorizedError = exports.ForbiddenError = exports.NotFoundError = exports.MethodNotAllowedError = exports.Unauthorized = exports.LolStatsError = void 0;require("source-map-support/register");function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classPrivateFieldSet(receiver, privateMap, value) {var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");_classApplyDescriptorSet(receiver, descriptor, value);return value;}function _classExtractFieldDescriptor(receiver, privateMap, action) {if (!privateMap.has(receiver)) {throw new TypeError("attempted to " + action + " private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorSet(receiver, descriptor, value) {if (descriptor.set) {descriptor.set.call(receiver, value);} else {if (!descriptor.writable) {throw new TypeError("attempted to set read only private field");}descriptor.value = value;}}var _type = new WeakMap();class LolStatsError extends Error {




  constructor(code, message) {
    super();_defineProperty(this, "application", process.env.APPLICATION || 'unnamed');_defineProperty(this, "code", void 0);_type.set(this, { writable: true, value: void 0 });
    this.code = code;
    this.message = message || '';
    _classPrivateFieldSet(this, _type, 'LolStatsError');
  }}exports.LolStatsError = LolStatsError;var _inner = new WeakMap();


class Unauthorized extends LolStatsError {


  constructor(error) {
    super(401);_defineProperty(this, "status", void 0);_inner.set(this, { writable: true, value: void 0 });
    this.name = 'UnauthorizedError';
    this.message = (error === null || error === void 0 ? void 0 : error.message) || 'Unauthorized';
    Error.call(this, this.message);
    Error.captureStackTrace(this, this.constructor);
    this.status = 401;
    _classPrivateFieldSet(this, _inner, error || new Error('Unauthorized'));
  }}exports.Unauthorized = Unauthorized;


function generic(message, code) {
  return new LolStatsError(code || 500, message);
}

const MethodNotAllowedError = (message) => {
  return generic(message, 405);
};exports.MethodNotAllowedError = MethodNotAllowedError;

const NotFoundError = (message) => {
  return generic(message, 404);
};exports.NotFoundError = NotFoundError;

const ForbiddenError = (message) => {
  return generic(message, 403);
};exports.ForbiddenError = ForbiddenError;

const UnauthorizedError = (error) => {
  return new Unauthorized(error);
};exports.UnauthorizedError = UnauthorizedError;

const BadRequestError = (message) => {
  return generic(message, 400);
};exports.BadRequestError = BadRequestError;

const ConflictError = (message) => {
  return generic(message, 409);
};exports.ConflictError = ConflictError;

const BadEntity = (message) => {
  return generic(message, 422);
};exports.BadEntity = BadEntity;

const Confict = (message) => {
  return generic(message, 409);
};exports.Confict = Confict;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2Vycm9ycy50cyJdLCJuYW1lcyI6WyJMb2xTdGF0c0Vycm9yIiwiRXJyb3IiLCJjb25zdHJ1Y3RvciIsImNvZGUiLCJtZXNzYWdlIiwicHJvY2VzcyIsImVudiIsIkFQUExJQ0FUSU9OIiwiVW5hdXRob3JpemVkIiwiZXJyb3IiLCJuYW1lIiwiY2FsbCIsImNhcHR1cmVTdGFja1RyYWNlIiwic3RhdHVzIiwiZ2VuZXJpYyIsIk1ldGhvZE5vdEFsbG93ZWRFcnJvciIsIk5vdEZvdW5kRXJyb3IiLCJGb3JiaWRkZW5FcnJvciIsIlVuYXV0aG9yaXplZEVycm9yIiwiQmFkUmVxdWVzdEVycm9yIiwiQ29uZmxpY3RFcnJvciIsIkJhZEVudGl0eSIsIkNvbmZpY3QiXSwibWFwcGluZ3MiOiJ3d0NBQU8sTUFBTUEsYUFBTixTQUE0QkMsS0FBNUIsQ0FBa0M7Ozs7O0FBS3JDQyxFQUFBQSxXQUFXLENBQUNDLElBQUQsRUFBZUMsT0FBZixFQUEyQztBQUNwRCxZQURvRCxxQ0FKaEJDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxXQUFaLElBQTJCLFNBSVg7QUFFcEQsU0FBS0osSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFPLElBQUksRUFBMUI7QUFDQSx1Q0FBYSxlQUFiO0FBQ0QsR0FWb0MsQzs7O0FBYWxDLE1BQU1JLFlBQU4sU0FBMkJSLGFBQTNCLENBQXlDOzs7QUFHNUNFLEVBQUFBLFdBQVcsQ0FBQ08sS0FBRCxFQUFnQjtBQUN6QixVQUFNLEdBQU4sRUFEeUI7QUFFekIsU0FBS0MsSUFBTCxHQUFZLG1CQUFaO0FBQ0EsU0FBS04sT0FBTCxHQUFlLENBQUFLLEtBQUssU0FBTCxJQUFBQSxLQUFLLFdBQUwsWUFBQUEsS0FBSyxDQUFFTCxPQUFQLEtBQWtCLGNBQWpDO0FBQ0FILElBQUFBLEtBQUssQ0FBQ1UsSUFBTixDQUFXLElBQVgsRUFBaUIsS0FBS1AsT0FBdEI7QUFDQUgsSUFBQUEsS0FBSyxDQUFDVyxpQkFBTixDQUF3QixJQUF4QixFQUE4QixLQUFLVixXQUFuQztBQUNBLFNBQUtXLE1BQUwsR0FBYyxHQUFkO0FBQ0Esd0NBQWNKLEtBQUssSUFBSSxJQUFJUixLQUFKLENBQVUsY0FBVixDQUF2QjtBQUNELEdBWDJDLEM7OztBQWN6QyxTQUFTYSxPQUFULENBQWlCVixPQUFqQixFQUE2Q0QsSUFBN0MsRUFBMkU7QUFDOUUsU0FBTyxJQUFJSCxhQUFKLENBQWtCRyxJQUFJLElBQUksR0FBMUIsRUFBK0JDLE9BQS9CLENBQVA7QUFDRDs7QUFFSSxNQUFNVyxxQkFBcUIsR0FBRyxDQUFDWCxPQUFELEtBQStDO0FBQ2hGLFNBQU9VLE9BQU8sQ0FBQ1YsT0FBRCxFQUFVLEdBQVYsQ0FBZDtBQUNELENBRkksQzs7QUFJQSxNQUFNWSxhQUFhLEdBQUcsQ0FBQ1osT0FBRCxLQUErQztBQUN4RSxTQUFPVSxPQUFPLENBQUNWLE9BQUQsRUFBVSxHQUFWLENBQWQ7QUFDRCxDQUZJLEM7O0FBSUEsTUFBTWEsY0FBYyxHQUFHLENBQUNiLE9BQUQsS0FBK0M7QUFDekUsU0FBT1UsT0FBTyxDQUFDVixPQUFELEVBQVUsR0FBVixDQUFkO0FBQ0QsQ0FGSSxDOztBQUlBLE1BQU1jLGlCQUFpQixHQUFHLENBQUNULEtBQUQsS0FBaUM7QUFDOUQsU0FBTyxJQUFJRCxZQUFKLENBQWlCQyxLQUFqQixDQUFQO0FBQ0QsQ0FGSSxDOztBQUlBLE1BQU1VLGVBQWUsR0FBRyxDQUFDZixPQUFELEtBQStDO0FBQzFFLFNBQU9VLE9BQU8sQ0FBQ1YsT0FBRCxFQUFVLEdBQVYsQ0FBZDtBQUNELENBRkksQzs7QUFJQSxNQUFNZ0IsYUFBYSxHQUFHLENBQUNoQixPQUFELEtBQStDO0FBQ3hFLFNBQU9VLE9BQU8sQ0FBQ1YsT0FBRCxFQUFVLEdBQVYsQ0FBZDtBQUNELENBRkksQzs7QUFJQSxNQUFNaUIsU0FBUyxHQUFHLENBQUNqQixPQUFELEtBQStDO0FBQ3BFLFNBQU9VLE9BQU8sQ0FBQ1YsT0FBRCxFQUFVLEdBQVYsQ0FBZDtBQUNELENBRkksQzs7QUFJQSxNQUFNa0IsT0FBTyxHQUFHLENBQUNsQixPQUFELEtBQStDO0FBQ2xFLFNBQU9VLE9BQU8sQ0FBQ1YsT0FBRCxFQUFVLEdBQVYsQ0FBZDtBQUNELENBRkksQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBMb2xTdGF0c0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIHB1YmxpYyByZWFkb25seSBhcHBsaWNhdGlvbjogc3RyaW5nID0gcHJvY2Vzcy5lbnYuQVBQTElDQVRJT04gfHwgJ3VubmFtZWQnO1xuICAgIHB1YmxpYyByZWFkb25seSBjb2RlOiBudW1iZXI7XG4gICAgI3R5cGU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGNvZGU6IG51bWJlciwgbWVzc2FnZT86IHN0cmluZ3x1bmRlZmluZWQpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCAnJztcbiAgICAgIHRoaXMuI3R5cGUgPSAnTG9sU3RhdHNFcnJvcic7XG4gICAgfVxuICB9XG5cbmV4cG9ydCBjbGFzcyBVbmF1dGhvcml6ZWQgZXh0ZW5kcyBMb2xTdGF0c0Vycm9yIHtcbiAgICBwdWJsaWMgc3RhdHVzOiBzdHJpbmd8bnVtYmVyO1xuICAgICNpbm5lcjogRXJyb3I7XG4gICAgY29uc3RydWN0b3IoZXJyb3I/OiBFcnJvcikge1xuICAgICAgc3VwZXIoNDAxKTtcbiAgICAgIHRoaXMubmFtZSA9ICdVbmF1dGhvcml6ZWRFcnJvcic7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSBlcnJvcj8ubWVzc2FnZSB8fCAnVW5hdXRob3JpemVkJztcbiAgICAgIEVycm9yLmNhbGwodGhpcywgdGhpcy5tZXNzYWdlKTtcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgICAgdGhpcy5zdGF0dXMgPSA0MDE7XG4gICAgICB0aGlzLiNpbm5lciA9IGVycm9yIHx8IG5ldyBFcnJvcignVW5hdXRob3JpemVkJyk7XG4gICAgfVxuICB9XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmljKG1lc3NhZ2U/OiBzdHJpbmd8dW5kZWZpbmVkLCBjb2RlPzogbnVtYmVyKTogTG9sU3RhdHNFcnJvciB7XG4gICAgcmV0dXJuIG5ldyBMb2xTdGF0c0Vycm9yKGNvZGUgfHwgNTAwLCBtZXNzYWdlKTtcbiAgfVxuXG5leHBvcnQgY29uc3QgTWV0aG9kTm90QWxsb3dlZEVycm9yID0gKG1lc3NhZ2U/OiBzdHJpbmd8dW5kZWZpbmVkKTogTG9sU3RhdHNFcnJvciA9PiB7XG4gICAgcmV0dXJuIGdlbmVyaWMobWVzc2FnZSwgNDA1KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IE5vdEZvdW5kRXJyb3IgPSAobWVzc2FnZT86IHN0cmluZ3x1bmRlZmluZWQpOiBMb2xTdGF0c0Vycm9yID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpYyhtZXNzYWdlLCA0MDQpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgRm9yYmlkZGVuRXJyb3IgPSAobWVzc2FnZT86IHN0cmluZ3x1bmRlZmluZWQpOiBMb2xTdGF0c0Vycm9yID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpYyhtZXNzYWdlLCA0MDMpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgVW5hdXRob3JpemVkRXJyb3IgPSAoZXJyb3I/OiBFcnJvcik6IFVuYXV0aG9yaXplZCA9PiB7XG4gICAgcmV0dXJuIG5ldyBVbmF1dGhvcml6ZWQoZXJyb3IpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgQmFkUmVxdWVzdEVycm9yID0gKG1lc3NhZ2U/OiBzdHJpbmd8dW5kZWZpbmVkKTogTG9sU3RhdHNFcnJvciA9PiB7XG4gICAgcmV0dXJuIGdlbmVyaWMobWVzc2FnZSwgNDAwKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IENvbmZsaWN0RXJyb3IgPSAobWVzc2FnZT86IHN0cmluZ3x1bmRlZmluZWQpOiBMb2xTdGF0c0Vycm9yID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpYyhtZXNzYWdlLCA0MDkpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgQmFkRW50aXR5ID0gKG1lc3NhZ2U/OiBzdHJpbmd8dW5kZWZpbmVkKTogTG9sU3RhdHNFcnJvciA9PiB7XG4gICAgcmV0dXJuIGdlbmVyaWMobWVzc2FnZSwgNDIyKTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IENvbmZpY3QgPSAobWVzc2FnZT86IHN0cmluZ3x1bmRlZmluZWQpOiBMb2xTdGF0c0Vycm9yID0+IHtcbiAgICByZXR1cm4gZ2VuZXJpYyhtZXNzYWdlLCA0MDkpO1xuICB9O1xuIl19