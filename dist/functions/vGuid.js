'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vGuid;
function vGuid(val) {
  if (typeof val !== 'string' || val.length !== 36) return !1;
  return /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/g.test(val);
}