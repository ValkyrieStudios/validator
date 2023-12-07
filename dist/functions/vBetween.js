'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vBetween;
function vBetween(val) {
  var param_before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var param_after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var check_after = parseFloat(param_after);
  var check_before = parseFloat(param_before);
  if (!Number.isFinite(check_after)) return !1;
  if (!Number.isFinite(check_before)) return !1;
  if (typeof val === 'string' || Array.isArray(val)) return val.length > check_before && val.length < check_after;
  if (Number.isFinite(val)) return val > check_before && val < check_after;
  return !1;
}