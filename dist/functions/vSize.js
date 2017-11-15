'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.default = vSize;

var _string = require('@valkyriestudios/utils/string');

var _array = require('@valkyriestudios/utils/array');

function vSize(val, equals) {
    if (!val || !equals) {
        return !1;
    }

    return (0, _string.isString)(val) || (0, _array.isArray)(val) ? val.length === equals : !1;
}