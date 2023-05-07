'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vSize;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vSize(val) {
  var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (!val || !equals) return !1;
  var check = parseFloat(equals);
  if (!_is["default"].Number(check)) return !1;
  return _is["default"].String(val) || _is["default"].Array(val) ? val.length === check : !1;
}