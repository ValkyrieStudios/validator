'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vGuid;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vGuid(val) {
  //  A RFC-4122 guid is 36 characters in length
  if (!_is["default"].NotEmptyString(val) || val.length !== 36) return false;

  //  Verify according to the rfc4122 spec
  return /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/g.test(val);
}