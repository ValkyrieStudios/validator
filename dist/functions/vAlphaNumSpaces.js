'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vAlphaNumSpaces;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vAlphaNumSpaces(val) {
  if (!_is["default"].String(val)) return !1;
  return /^[a-zA-Z0-9 ]*$/ig.test(val);
}