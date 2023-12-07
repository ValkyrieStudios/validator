'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vDateString;
function vDateString(val) {
  return typeof val === 'string' && val.trim().length > 0 && !isNaN(Date.parse(val)) && !isNaN(new Date(val).getTime());
}