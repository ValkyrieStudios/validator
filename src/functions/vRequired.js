'use strict';

import {isNumericalNaN} from '@valkyriestudios/utils/number';
import {isString} from '@valkyriestudios/utils/string';
import {isArray} from '@valkyriestudios/utils/array';

export default function vRequired (val) {
    if (val === null || val === undefined) return false;

    if (isString(val)) return !(val.trim() === '');

    if (isArray(val)) return !(val.length === 0);

    if (isNumericalNaN(val)) return false;

    return true;
}
