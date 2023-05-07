'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vRequired;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vRequired(val) {
  if (val === null || val === undefined) return !1;
  if (_is["default"].String(val)) return _is["default"].NotEmptyString(val);
  if (_is["default"].Array(val)) return _is["default"].NotEmptyArray(val);
  return !0;
}