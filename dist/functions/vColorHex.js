'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vColorHex;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vColorHex(val) {
  if (!_is["default"].NotEmptyString(val)) return !1;
  return !!/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(val.trim());
}