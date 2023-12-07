'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vSysIPv4;
function vSysIPv4(val) {
  return typeof val === 'string' && /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val);
}