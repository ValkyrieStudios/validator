'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.default = vMax;

var _number = require('@valkyriestudios/utils/number');

var _string = require('@valkyriestudios/utils/string');

var _array = require('@valkyriestudios/utils/array');

function vMax(val, maximum) {
    if (!val || !maximum) {
        return !1;
    }

    if ((0, _number.isNumber)(val)) {
        return val <= maximum;
    }

    return (0, _string.isString)(val) || (0, _array.isArray)(val) ? val.length <= maximum : !1;
}