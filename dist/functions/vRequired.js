'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.default = vRequired;

var _string = require('@valkyriestudios/utils/string');

var _array = require('@valkyriestudios/utils/array');

function vRequired(val) {
    if (val === null) {
        return !1;
    }

    if ((0, _string.isString)(val)) {
        if (val.trim() === '') {
            return !1;
        }
    } else if ((0, _array.isArray)(val)) {
        if (val.length === 0) {
            return !1;
        }
    }

    return !0;
}