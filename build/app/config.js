"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;require("source-map-support/register");var _express = _interopRequireDefault(require("express"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const app = (0, _express.default)();


if (!/\d{4,}/.test(process.env.APP_PORT || '')) {
  throw new Error('APP_PORT env variable is not set!');
}


app.set('port', process.env.APP_PORT);var _default =

app;exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAvY29uZmlnLnRzIl0sIm5hbWVzIjpbImFwcCIsInRlc3QiLCJwcm9jZXNzIiwiZW52IiwiQVBQX1BPUlQiLCJFcnJvciIsInNldCJdLCJtYXBwaW5ncyI6IjJJQUFBLDBEOzs7QUFHQSxNQUFNQSxHQUFHLEdBQUcsdUJBQVo7OztBQUdBLElBQUksQ0FBQyxTQUFTQyxJQUFULENBQWNDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLElBQXdCLEVBQXRDLENBQUwsRUFBZ0Q7QUFDOUMsUUFBTSxJQUFJQyxLQUFKLENBQVUsbUNBQVYsQ0FBTjtBQUNEOzs7QUFHREwsR0FBRyxDQUFDTSxHQUFKLENBQVEsTUFBUixFQUFnQkosT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQTVCLEU7O0FBRWVKLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcblxuLy8gQ3JlYXRlIEV4cHJlc3Mgc2VydmVyXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbi8vIENvbmZpZ3VyZSBFeHByZXNzIHBvcnRcbmlmICghL1xcZHs0LH0vLnRlc3QocHJvY2Vzcy5lbnYuQVBQX1BPUlQgfHwgJycpKSB7XG4gIHRocm93IG5ldyBFcnJvcignQVBQX1BPUlQgZW52IHZhcmlhYmxlIGlzIG5vdCBzZXQhJyk7XG59XG5cbi8vIEV4cHJlc3MgY29uZmlndXJhdGlvblxuYXBwLnNldCgncG9ydCcsIHByb2Nlc3MuZW52LkFQUF9QT1JUKTtcblxuZXhwb3J0IGRlZmF1bHQgYXBwO1xuIl19