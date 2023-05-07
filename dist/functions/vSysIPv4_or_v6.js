'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vSysIPv4_or_v6;
var _vSysIPv = _interopRequireDefault(require("./vSysIPv4"));
var _vSysIPv2 = _interopRequireDefault(require("./vSysIPv6"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vSysIPv4_or_v6(val) {
  return (0, _vSysIPv["default"])(val) || (0, _vSysIPv2["default"])(val);
}