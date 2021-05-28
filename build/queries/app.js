"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;require("source-map-support/register");
var _knex2 = _interopRequireDefault(require("../knex"));
var _events = require("events");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classPrivateFieldSet(receiver, privateMap, value) {var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");_classApplyDescriptorSet(receiver, descriptor, value);return value;}function _classExtractFieldDescriptor(receiver, privateMap, action) {if (!privateMap.has(receiver)) {throw new TypeError("attempted to " + action + " private field on non-instance");}return privateMap.get(receiver);}function _classApplyDescriptorSet(receiver, descriptor, value) {if (descriptor.set) {descriptor.set.call(receiver, value);} else {if (!descriptor.writable) {throw new TypeError("attempted to set read only private field");}descriptor.value = value;}}var _knex = new WeakMap();

class AppQueries extends _events.EventEmitter {

  static initialize(instance) {
    if (!self) {
      AppQueries.self = instance;
      (0, _knex2.default)().
      then((knex) => {
        _classPrivateFieldSet(AppQueries.self, _knex, knex);
      }).
      catch((e) => AppQueries.self.emit('error', e));
    } else {
      throw TypeError('There is already an instance of the AppQueries class!');
    }
  }

  constructor() {
    super();_knex.set(this, { writable: true, value: void 0 });
    _classPrivateFieldSet(this, _knex, null);
    AppQueries.initialize(this);
  }}exports.default = AppQueries;_defineProperty(AppQueries, "self", void 0);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9xdWVyaWVzL2FwcC50cyJdLCJuYW1lcyI6WyJBcHBRdWVyaWVzIiwiRXZlbnRFbWl0dGVyIiwiaW5pdGlhbGl6ZSIsImluc3RhbmNlIiwic2VsZiIsInRoZW4iLCJrbmV4IiwiY2F0Y2giLCJlIiwiZW1pdCIsIlR5cGVFcnJvciIsImNvbnN0cnVjdG9yIl0sIm1hcHBpbmdzIjoiO0FBQ0E7QUFDQSxnQzs7QUFFZSxNQUFNQSxVQUFOLFNBQXlCQyxvQkFBekIsQ0FBc0M7O0FBRTNCLFNBQVZDLFVBQVUsQ0FBQ0MsUUFBRCxFQUF1QjtBQUM3QyxRQUFJLENBQUNDLElBQUwsRUFBVztBQUNUSixNQUFBQSxVQUFVLENBQUNJLElBQVgsR0FBa0JELFFBQWxCO0FBQ0E7QUFDR0UsTUFBQUEsSUFESCxDQUNRLENBQUNDLElBQUQsS0FBVTtBQUNkLDhCQUFBTixVQUFVLENBQUNJLElBQVgsU0FBd0JFLElBQXhCO0FBQ0QsT0FISDtBQUlHQyxNQUFBQSxLQUpILENBSVMsQ0FBQ0MsQ0FBRCxLQUFPUixVQUFVLENBQUNJLElBQVgsQ0FBZ0JLLElBQWhCLENBQXFCLE9BQXJCLEVBQThCRCxDQUE5QixDQUpoQjtBQUtELEtBUEQsTUFPTztBQUNMLFlBQU1FLFNBQVMsQ0FBQyx1REFBRCxDQUFmO0FBQ0Q7QUFDRjs7QUFFREMsRUFBQUEsV0FBVyxHQUFHO0FBQ1osWUFEWTtBQUVaLHVDQUFhLElBQWI7QUFDQVgsSUFBQUEsVUFBVSxDQUFDRSxVQUFYLENBQXNCLElBQXRCO0FBQ0QsR0FuQmtELEMsNkNBQWhDRixVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEtuZXggZnJvbSAna25leCc7XG5pbXBvcnQgS25leENvbm5lY3Rpb24gZnJvbSAnQC9rbmV4JztcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBRdWVyaWVzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgcHVibGljIHN0YXRpYyBzZWxmOiBBcHBRdWVyaWVzO1xuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUoaW5zdGFuY2U6IEFwcFF1ZXJpZXMpIHtcbiAgICBpZiAoIXNlbGYpIHtcbiAgICAgIEFwcFF1ZXJpZXMuc2VsZiA9IGluc3RhbmNlO1xuICAgICAgS25leENvbm5lY3Rpb24oKVxuICAgICAgICAudGhlbigoa25leCkgPT4ge1xuICAgICAgICAgIEFwcFF1ZXJpZXMuc2VsZi4ja25leCA9IGtuZXg7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZSkgPT4gQXBwUXVlcmllcy5zZWxmLmVtaXQoJ2Vycm9yJywgZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1RoZXJlIGlzIGFscmVhZHkgYW4gaW5zdGFuY2Ugb2YgdGhlIEFwcFF1ZXJpZXMgY2xhc3MhJyk7XG4gICAgfVxuICB9XG4gICNrbmV4OiBLbmV4fG51bGw7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy4ja25leCA9IG51bGw7XG4gICAgQXBwUXVlcmllcy5pbml0aWFsaXplKHRoaXMpO1xuICB9XG59XG4iXX0=