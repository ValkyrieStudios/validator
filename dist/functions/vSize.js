'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vSize;
function vSize(val) {
  var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (!val || !equals) return !1;
  var check = parseFloat(equals);
  if (!Number.isFinite(check)) return !1;
  return typeof val === 'string' || Array.isArray(val) ? val.length === check : !1;
}