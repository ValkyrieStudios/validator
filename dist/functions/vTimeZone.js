'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vTimeZone;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vTimeZone(val) {
  if (!_is["default"].NotEmptyString(val)) return !1;
  try {
    if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
      return !1;
    }
    Intl.DateTimeFormat(undefined, {
      timeZone: val
    });
    return !0;
  } catch (err) {
    return !1;
  }
}