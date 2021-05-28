"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;require("source-map-support/register");
var _app = _interopRequireDefault(require("./app"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}




const server = _app.default.listen(_app.default.get('port'), () => {
  console.log(
  '  App is running at http://localhost:%d in %s mode',
  _app.default.get('port'),
  _app.default.get('env'));

  console.log('  Press CTRL-C to stop\n');
});var _default =

server;exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOlsic2VydmVyIiwiYXBwIiwibGlzdGVuIiwiZ2V0IiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6IjtBQUNBLG9EOzs7OztBQUtBLE1BQU1BLE1BQU0sR0FBR0MsYUFBSUMsTUFBSixDQUFXRCxhQUFJRSxHQUFKLENBQVEsTUFBUixDQUFYLEVBQTRCLE1BQU07QUFDL0NDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUjtBQUNFLHNEQURGO0FBRUVKLGVBQUlFLEdBQUosQ0FBUSxNQUFSLENBRkY7QUFHRUYsZUFBSUUsR0FBSixDQUFRLEtBQVIsQ0FIRjs7QUFLQUMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksMEJBQVo7QUFDRCxDQVBjLENBQWYsQzs7QUFTZUwsTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFJlZ2lzdGVyIEV4cHJlc3NKcyBBcHBsaWNhdGlvblxuaW1wb3J0IGFwcCBmcm9tICdAL2FwcCc7XG5cbi8qKlxuICogU3RhcnQgRXhwcmVzcyBzZXJ2ZXIuXG4gKi9cbmNvbnN0IHNlcnZlciA9IGFwcC5saXN0ZW4oYXBwLmdldCgncG9ydCcpLCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFxuICAgICcgIEFwcCBpcyBydW5uaW5nIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JWQgaW4gJXMgbW9kZScsXG4gICAgYXBwLmdldCgncG9ydCcpLFxuICAgIGFwcC5nZXQoJ2VudicpLFxuICApO1xuICBjb25zb2xlLmxvZygnICBQcmVzcyBDVFJMLUMgdG8gc3RvcFxcbicpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZlcjtcbiJdfQ==