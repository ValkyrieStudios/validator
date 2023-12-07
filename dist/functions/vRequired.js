'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vRequired;
function vRequired(val) {
  if (val === null || val === undefined || Number.isNaN(val)) return !1;
  if (typeof val === 'string') {
    return val.trim().length > 0;
  }
  if (Array.isArray(val)) {
    return val.length > 0;
  }
  return !0;
}