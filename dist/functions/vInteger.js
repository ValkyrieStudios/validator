'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vInteger;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/number/is"));

var _isNumericalNaN = _interopRequireDefault(require("@valkyriestudios/utils/number/isNumericalNaN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vInteger(val) {
  if (!(0, _is["default"])(val)) return false;
  if ((0, _isNumericalNaN["default"])(val)) return false;
  return Math.floor(val) === val;
}