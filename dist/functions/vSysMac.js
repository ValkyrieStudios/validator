'use strict';
Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vSysMac;
function vSysMac(val) {
  if (typeof val !== 'string') return !1;
  if (/^([0-9A-Fa-f]{2}-){5}([0-9A-Fa-f]{2})$/.test(val)) return !0;
  if (/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/.test(val)) return !0;
  if (/^([0-9A-Fa-f]{3}\.){3}([0-9A-Fa-f]{3})$/.test(val)) return !0;
  if (/^([0-9A-Fa-f]{2}:){3}FF:FE:([0-9A-Fa-f]{2}:){2}[0-9A-Fa-f]{2}$/.test(val)) return !0;
  if (/^([0-9A-Fa-f]{2}-){3}FF-FE-([0-9A-Fa-f]{2}-){2}[0-9A-Fa-f]{2}$/.test(val)) return !0;
  if (/^[0-9A-Fa-f]{4}:[0-9A-Fa-f]{2}FF:FE[0-9A-Fa-f]{2}:[0-9A-Fa-f]{4}$/.test(val)) return !0;
  if (/^[0-9A-Fa-f]{4}-[0-9A-Fa-f]{2}FF-FE[0-9A-Fa-f]{2}-[0-9A-Fa-f]{4}$/.test(val)) return !0;
  return !1;
}