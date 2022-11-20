'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vArray;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vArray(val) {
  return _is["default"].Array(val);
}