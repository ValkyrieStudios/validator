'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.default = vMin;

var _number = require('@valkyriestudios/utils/number');

var _string = require('@valkyriestudios/utils/string');

var _array = require('@valkyriestudios/utils/array');

function vMin(val, minimum) {
    if (!val || !minimum) {
        return !1;
    }

    if ((0, _number.isNumber)(val)) {
        return val >= minimum;
    }

    return (0, _string.isString)(val) || (0, _array.isArray)(val) ? val.length >= minimum : !1;
}