"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.default = vAlphaNumSpaces;
function vAlphaNumSpaces(val) {
    return val ? /^([a-z0-9\s])+$/igm.test(val) : !1;
}