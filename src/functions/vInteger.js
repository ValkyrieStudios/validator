'use strict';

import isNumber from '@valkyriestudios/utils/number/is';

export default function vInteger (val) {
    if (!isNumber(val)) return false;
    if (!Number.isFinite(val)) return false;
    return Math.floor(val) === val;
}
