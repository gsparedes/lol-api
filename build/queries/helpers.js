"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getNewID = getNewID;exports.getManyIDs = getManyIDs;exports.randomID = void 0;var _bluebird = require("bluebird");require("source-map-support/register");

const randomID = () => Math.floor(Math.random() * (9223372036854775807 - 1 + 1) + 1).toString();exports.randomID = randomID;function

getNewID(_x, _x2) {return _getNewID.apply(this, arguments);}function _getNewID() {_getNewID = (0, _bluebird.coroutine)(function* (knex, transaction) {
    const { rows } = yield knex.raw('select sequence.next_id() as id').transacting(transaction);
    const { id } = rows[0];
    return id;
  });return _getNewID.apply(this, arguments);}function

getManyIDs(_x3, _x4, _x5) {return _getManyIDs.apply(this, arguments);}function _getManyIDs() {_getManyIDs = (0, _bluebird.coroutine)(function* (knex, transaction, quantity) {
    if (!quantity) {
      return [];
    }
    const { rows } = yield (
      knex.raw(
      Array(quantity - 1).fill('select sequence.next_id() as id union').concat(['select sequence.next_id() as id']).join(' ')).
      transacting(transaction));
    return Promise.resolve(rows.map(({ id }) => id));
  });return _getManyIDs.apply(this, arguments);}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9xdWVyaWVzL2hlbHBlcnMudHMiXSwibmFtZXMiOlsicmFuZG9tSUQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsImdldE5ld0lEIiwia25leCIsInRyYW5zYWN0aW9uIiwicm93cyIsInJhdyIsInRyYW5zYWN0aW5nIiwiaWQiLCJnZXRNYW55SURzIiwicXVhbnRpdHkiLCJBcnJheSIsImZpbGwiLCJjb25jYXQiLCJqb2luIiwiUHJvbWlzZSIsInJlc29sdmUiLCJtYXAiXSwibWFwcGluZ3MiOiI7O0FBRU8sTUFBTUEsUUFBUSxHQUFHLE1BQU1DLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsTUFBaUIsc0JBQXNCLENBQXRCLEdBQTBCLENBQTNDLElBQWdELENBQTNELEVBQThEQyxRQUE5RCxFQUF2QixDOztBQUVlQyxRLCtHQUFmLFdBQXdCQyxJQUF4QixFQUFvQ0MsV0FBcEMsRUFBK0U7QUFDcEYsVUFBTSxFQUFDQyxJQUFELFdBQWdCRixJQUFJLENBQUNHLEdBQUwsQ0FBUyxpQ0FBVCxFQUE0Q0MsV0FBNUMsQ0FBd0RILFdBQXhELENBQXRCO0FBQ0EsVUFBTSxFQUFDSSxFQUFELEtBQU9ILElBQUksQ0FBQyxDQUFELENBQWpCO0FBQ0EsV0FBT0csRUFBUDtBQUNELEc7O0FBRXFCQyxVLDJIQUFmLFdBQTBCTixJQUExQixFQUFzQ0MsV0FBdEMsRUFBZ0VNLFFBQWhFLEVBQXFHO0FBQzFHLFFBQUksQ0FBQ0EsUUFBTCxFQUFlO0FBQ2IsYUFBTyxFQUFQO0FBQ0Q7QUFDRCxVQUFNLEVBQUNMLElBQUQ7QUFDSEYsTUFBQUEsSUFBSSxDQUFDRyxHQUFMO0FBQ0NLLE1BQUFBLEtBQUssQ0FBQ0QsUUFBUSxHQUFHLENBQVosQ0FBTCxDQUFvQkUsSUFBcEIsQ0FBeUIsdUNBQXpCLEVBQWtFQyxNQUFsRSxDQUF5RSxDQUFDLGlDQUFELENBQXpFLEVBQThHQyxJQUE5RyxDQUFtSCxHQUFuSCxDQURELENBQUQ7QUFFR1AsTUFBQUEsV0FGSCxDQUVlSCxXQUZmLENBREksQ0FBTjtBQUlBLFdBQU9XLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQlgsSUFBSSxDQUFDWSxHQUFMLENBQVMsQ0FBQyxFQUFDVCxFQUFELEVBQUQsS0FBd0JBLEVBQWpDLENBQWhCLENBQVA7QUFDRCxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEtuZXgsIHtUcmFuc2FjdGlvbn0gZnJvbSAna25leCc7XG5cbmV4cG9ydCBjb25zdCByYW5kb21JRCA9ICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg5MjIzMzcyMDM2ODU0Nzc1ODA3IC0gMSArIDEpICsgMSkudG9TdHJpbmcoKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldE5ld0lEKGtuZXg6IEtuZXgsIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHtyb3dzfSA9IChhd2FpdCBrbmV4LnJhdygnc2VsZWN0IHNlcXVlbmNlLm5leHRfaWQoKSBhcyBpZCcpLnRyYW5zYWN0aW5nKHRyYW5zYWN0aW9uKSk7XG4gIGNvbnN0IHtpZH0gPSByb3dzWzBdO1xuICByZXR1cm4gaWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRNYW55SURzKGtuZXg6IEtuZXgsIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbiwgcXVhbnRpdHk6IG51bWJlcik6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgaWYgKCFxdWFudGl0eSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBjb25zdCB7cm93c30gPSAoYXdhaXRcbiAgICAoa25leC5yYXcoXG4gICAgICBBcnJheShxdWFudGl0eSAtIDEpLmZpbGwoJ3NlbGVjdCBzZXF1ZW5jZS5uZXh0X2lkKCkgYXMgaWQgdW5pb24nKS5jb25jYXQoWydzZWxlY3Qgc2VxdWVuY2UubmV4dF9pZCgpIGFzIGlkJ10pLmpvaW4oJyAnKSxcbiAgICApKS50cmFuc2FjdGluZyh0cmFuc2FjdGlvbikpO1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJvd3MubWFwKCh7aWR9OiB7aWQ6IHN0cmluZ30pID0+IGlkKSk7XG59XG4iXX0=