'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});
exports.default = vEqualTo;

var _equal = require('@valkyriestudios/utils/equal');

function vEqualTo(val_a, val_b) {
    return !!(0, _equal.equal)(val_a, val_b);
}