'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vAlphaNumSpacesMultiline;
function vAlphaNumSpacesMultiline(val) {
  return typeof val === 'string' && /^[a-zA-Z0-9\s]*$/igm.test(val);
}