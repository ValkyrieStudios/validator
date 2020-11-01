'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vLessThan;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/number/is"));

var _isNumericalNaN = _interopRequireDefault(require("@valkyriestudios/utils/number/isNumericalNaN"));

var _is2 = _interopRequireDefault(require("@valkyriestudios/utils/string/is"));

var _is3 = _interopRequireDefault(require("@valkyriestudios/utils/array/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vLessThan(val) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (param === undefined) return false; //  Convert param into float

  var check = parseFloat(param); //  If param is not numerical or nan, return false

  if (!(0, _is["default"])(check) || (0, _isNumericalNaN["default"])(check)) return false; //  Is value is string, use length for validation

  if ((0, _is2["default"])(val) || (0, _is3["default"])(val)) return val.length < check; //  If value is numerical, use primitive for validation

  if ((0, _is["default"])(val) && !(0, _isNumericalNaN["default"])(val)) return val < check;
  return false;
}