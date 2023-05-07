'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vEmail;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vEmail(val) {
  if (!_is["default"].NotEmptyString(val) || val.trim().length !== val.length) return !1;
  var parts = val.split('@');
  if (parts.length !== 2) return !1;
  if (parts[0].length > 64) return !1;
  if (/^(")?[A-Z0-9._%+-]+(")?$/gi.test(parts[0]) === !1) return !1;
  if (parts[0].substring(0, 1) === '.') return !1;
  if (parts[0].substring(parts[0].length - 1, parts[1].length) === '.') return !1;
  if (/[.]{2,}/.test(parts[0]) === !0) return !1;
  if (parts[1].length > 253) return !1;
  if (/^(?:(?=[a-z0-9-]{1,63}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{1,63}z)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ig.test(parts[1]) !== !1) return !0;
  if (/^\w+([.-]?\w+)*(\.\w{2,5})+$/.test(parts[1]) === !1) return !1;
  return !0;
}