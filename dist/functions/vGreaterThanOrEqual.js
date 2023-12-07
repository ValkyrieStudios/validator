'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vGreaterThanOrEqual;
function vGreaterThanOrEqual(val) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var check = parseFloat(param);
  if (!Number.isFinite(check)) return !1;
  if (typeof val === 'string' || Array.isArray(val)) return val.length >= check;
  if (Number.isFinite(val)) return val >= check;
  return !1;
}