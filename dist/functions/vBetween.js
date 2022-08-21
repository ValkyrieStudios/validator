'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vBetween;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vBetween(val) {
  var param_before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var param_after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  //  Convert param into float
  var check_after = parseFloat(param_after);
  var check_before = parseFloat(param_before); //  If param_after is not numerical or nan, return false

  if (!_is["default"].Number(check_after)) return false; //  If param_before is not numerical or nan, return false

  if (!_is["default"].Number(check_before)) return false; //  Is value is string, use length for validation

  if (_is["default"].String(val) || _is["default"].Array(val)) return val.length > check_before && val.length < check_after; //  If value is numerical, use primitive for validation

  if (_is["default"].Number(val)) return val > check_before && val < check_after;
  return false;
}