'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vColorHex;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vColorHex(val) {
  if (!_is["default"].NotEmptyString(val)) return false;
  return !!/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(val.trim());
}