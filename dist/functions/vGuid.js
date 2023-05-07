'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vGuid;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vGuid(val) {
  if (!_is["default"].NotEmptyString(val) || val.length !== 36) return !1;
  return /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/g.test(val);
}