'use strict';

import isNumber         from '@valkyriestudios/utils/number/is';
import isNumericalNaN   from '@valkyriestudios/utils/number/isNumericalNaN';

export default function vInteger (val) {
    if (!isNumber(val)) return false;
    if (isNumericalNaN(val)) return false;
    return Math.floor(val) === val;
}
