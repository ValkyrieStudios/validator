'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vSize;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/number/is"));

var _isNumericalNaN = _interopRequireDefault(require("@valkyriestudios/utils/number/isNumericalNaN"));

var _is2 = _interopRequireDefault(require("@valkyriestudios/utils/string/is"));

var _is3 = _interopRequireDefault(require("@valkyriestudios/utils/array/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vSize(val) {
  var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (!val || !equals) return false; //  Convert equals into float

  var check = parseFloat(equals); //  If equals is not numerical or nan, return false

  if (!(0, _is["default"])(check) || (0, _isNumericalNaN["default"])(check)) return false;
  return (0, _is2["default"])(val) || (0, _is3["default"])(val) ? val.length === check : false;
}