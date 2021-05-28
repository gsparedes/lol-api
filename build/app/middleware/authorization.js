"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _bluebird = require("bluebird");require("source-map-support/register");var _helpers = require("../../helpers");var _default = function () {var _ref = (0, _bluebird.coroutine)(


  function* (req, res, next) {
    if ((0, _helpers.shouldSkipAuth)(req)) {
      return next();
    }

    return next();
  });return function (_x, _x2, _x3) {return _ref.apply(this, arguments);};}();exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvbWlkZGxld2FyZS9hdXRob3JpemF0aW9uLnRzIl0sIm5hbWVzIjpbInJlcSIsInJlcyIsIm5leHQiXSwibWFwcGluZ3MiOiIrS0FBQSx3Qzs7O0FBR2UsYUFBT0EsR0FBUCxFQUFxQkMsR0FBckIsRUFBb0NDLElBQXBDLEVBQTJEO0FBQ3hFLFFBQUksNkJBQWVGLEdBQWYsQ0FBSixFQUF5QjtBQUN2QixhQUFPRSxJQUFJLEVBQVg7QUFDRDs7QUFFRCxXQUFPQSxJQUFJLEVBQVg7QUFDRCxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtzaG91bGRTa2lwQXV0aH0gZnJvbSAnQC9oZWxwZXJzJztcbmltcG9ydCB7TmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZX0gZnJvbSAnZXhwcmVzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICBpZiAoc2hvdWxkU2tpcEF1dGgocmVxKSkge1xuICAgIHJldHVybiBuZXh0KCk7XG4gIH1cbiAgLy8gVE9ETyBBdXRob3JpemUgdGhlIHJlcXVlc3QgKGRvIHdlIHRydXN0IHRoZSBwcmluY2lwYWw/KVxuICByZXR1cm4gbmV4dCgpO1xufTtcbiJdfQ==