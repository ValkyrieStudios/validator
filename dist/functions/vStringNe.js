'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vNeString;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vNeString(val) {
  return _is["default"].NotEmptyString(val);
}