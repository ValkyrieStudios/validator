'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vGeoLatitude;
function vGeoLatitude(val) {
  return Number.isFinite(val) && val >= -90 && val <= 90;
}