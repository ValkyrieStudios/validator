'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vBetweenInclusive;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vBetweenInclusive(val) {
  var param_before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var param_after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var check_after = parseFloat(param_after);
  var check_before = parseFloat(param_before);
  if (!_is["default"].Number(check_after)) return !1;
  if (!_is["default"].Number(check_before)) return !1;
  if (_is["default"].String(val) || _is["default"].Array(val)) return val.length >= check_before && val.length <= check_after;
  if (_is["default"].Number(val)) return val >= check_before && val <= check_after;
  return !1;
}