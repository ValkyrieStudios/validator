'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vSize;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vSize(val) {
  var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (!val || !equals) return false;

  //  Convert equals into float
  var check = parseFloat(equals);

  //  If equals is not numerical or nan, return false
  if (!_is["default"].Number(check)) return false;
  return _is["default"].String(val) || _is["default"].Array(val) ? val.length === check : false;
}