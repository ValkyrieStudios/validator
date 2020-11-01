'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vRequired;

var _isNumericalNaN = _interopRequireDefault(require("@valkyriestudios/utils/number/isNumericalNaN"));

var _is = _interopRequireDefault(require("@valkyriestudios/utils/string/is"));

var _is2 = _interopRequireDefault(require("@valkyriestudios/utils/array/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vRequired(val) {
  if (val === null || val === undefined) return false;
  if ((0, _is["default"])(val)) return !(val.trim() === '');
  if ((0, _is2["default"])(val)) return !(val.length === 0);
  if ((0, _isNumericalNaN["default"])(val)) return false;
  return true;
}