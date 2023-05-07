'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vGeoLatitude;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vGeoLatitude(val) {
  return _is["default"].Number(val) && val >= -90 && val <= 90;
}