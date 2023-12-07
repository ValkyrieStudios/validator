'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vTimeZone;
function vTimeZone(val) {
  if (typeof val !== 'string' || val.trim().length === 0) return !1;
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