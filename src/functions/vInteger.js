'use strict';

import {isNumber, isNumericalNaN} from '@valkyriestudios/utils/number';

export default function vInteger (val) {
    if (!isNumber(val)) return false;
    if (isNumericalNaN(val)) return false;
    return Math.floor(val) === val;
}
