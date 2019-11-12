'use strict';

import { isNumber, isNumericalNaN } from '@valkyriestudios/utils/number';
import { isString } from '@valkyriestudios/utils/string';
import { isArray } from '@valkyriestudios/utils/array';

export default function vLessThanOrEqual (val, param = undefined) {
    if (param === undefined) return false;

    //  Convert param into float
    let check = parseFloat(param);

    //  If param is not numerical or nan, return false
    if (!isNumber(check) || isNumericalNaN(check)) return false;

    //  Is value is string, use length for validation
    if (isString(val) || isArray(val)) return val.length <= check;

    //  If value is numerical, use primitive for validation
    if (isNumber(val) && !isNumericalNaN(val)) return val <= check;

    return false;
}
