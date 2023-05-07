'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vSysMac;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vSysMac(val) {
  if (!_is["default"].NotEmptyString(val)) return !1;
  if (/^([0-9A-Fa-f]{2}-){5}([0-9A-Fa-f]{2})$/.test(val)) return !0;
  if (/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/.test(val)) return !0;
  if (/^([0-9A-Fa-f]{3}\.){3}([0-9A-Fa-f]{3})$/.test(val)) return !0;
  if (/^([0-9A-Fa-f]{2}:){3}FF:FE:([0-9A-Fa-f]{2}:){2}[0-9A-Fa-f]{2}$/.test(val)) return !0;
  if (/^([0-9A-Fa-f]{2}-){3}FF-FE-([0-9A-Fa-f]{2}-){2}[0-9A-Fa-f]{2}$/.test(val)) return !0;
  if (/^[0-9A-Fa-f]{4}:[0-9A-Fa-f]{2}FF:FE[0-9A-Fa-f]{2}:[0-9A-Fa-f]{4}$/.test(val)) return !0;
  if (/^[0-9A-Fa-f]{4}-[0-9A-Fa-f]{2}FF-FE[0-9A-Fa-f]{2}-[0-9A-Fa-f]{4}$/.test(val)) return !0;
  return !1;
}