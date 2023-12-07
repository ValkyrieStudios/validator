'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vEmail;
function vEmail(val) {
  if (typeof val !== 'string' || val.trim().length !== val.length || val.length === 0) return !1;
  var parts = val.split('@');
  if (parts.length !== 2) return !1;
  if (parts[0].length > 64) return !1;
  if (/^(")?[A-Z0-9&._%+-]+(")?$/gi.test(parts[0]) === !1) return !1;
  if (parts[0].charAt(0) === '.') return !1;
  if (parts[0].charAt(parts[0].length - 1) === '.') return !1;
  if (/[.]{2,}/.test(parts[0]) === !0) return !1;
  if (parts[1].length > 253) return !1;
  if (/^(?:(?=[a-z0-9-]{1,63}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{1,63}z)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ig.test(parts[1]) !== !1) return !0;
  if (/^(\w{1,})([.-]?\w)*(\.\w{2,6})+$/.test(parts[1]) === !1) return !1;
  return !0;
}