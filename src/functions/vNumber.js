'use strict';

import {isNumber, isNumericalNaN} from '@valkyriestudios/utils/number';

export default function vNumber (val) {
    return isNumber(val) && !isNumericalNaN(val);
}
