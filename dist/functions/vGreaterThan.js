'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vGreaterThan;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vGreaterThan(val) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  //  Convert param into float
  var check = parseFloat(param); //  If param is not numerical or nan, return false

  if (!_is["default"].Number(check)) return false; //  Is value is string, use length for validation

  if (_is["default"].String(val) || _is["default"].Array(val)) return val.length > check; //  If value is numerical, use primitive for validation

  if (_is["default"].Number(val)) return val > check;
  return false;
}