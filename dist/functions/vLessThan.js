'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vLessThan;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vLessThan(val) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var check = parseFloat(param);
  if (!_is["default"].Number(check)) return !1;
  if (_is["default"].String(val) || _is["default"].Array(val)) return val.length < check;
  if (_is["default"].Number(val)) return val < check;
  return !1;
}