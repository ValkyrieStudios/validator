'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vAlphaNumSpaces;
function vAlphaNumSpaces(val) {
  return typeof val === 'string' && /^[a-zA-Z0-9 ]*$/ig.test(val);
}