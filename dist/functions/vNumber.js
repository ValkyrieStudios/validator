'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vNumber;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/number/is"));

var _isNumericalNaN = _interopRequireDefault(require("@valkyriestudios/utils/number/isNumericalNaN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vNumber(val) {
  return (0, _is["default"])(val) && !(0, _isNumericalNaN["default"])(val);
}