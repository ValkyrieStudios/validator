'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vColorHex;
function vColorHex(val) {
  return typeof val === 'string' && /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(val);
}