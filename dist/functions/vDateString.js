'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vDateString;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vDateString(val) {
  return _is["default"].NotEmptyString(val) && new Date(val) !== 'Invalid Date' && !isNaN(new Date(val)) && _is["default"].NumberAbove(new Date(val).getTime(), 0) && _is["default"].NumberAbove(Date.parse(val), 0);
}