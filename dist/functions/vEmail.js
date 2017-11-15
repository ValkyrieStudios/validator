"use strict";

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.default = vEmail;
function vEmail(val) {
    return val ? /[A-Z0-9._%+-]+\@[A-Z0-9.-]+\.[A-Z]{2,10}/igm.test(val.trim()) : !1;
}