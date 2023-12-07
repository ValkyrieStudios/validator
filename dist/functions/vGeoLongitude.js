'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vGeoLongitude;
function vGeoLongitude(val) {
  return Number.isFinite(val) && val >= -180 && val <= 180;
}