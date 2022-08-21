'use strict';

import isNumber         from '@valkyriestudios/utils/number/is';
import isNumericalNaN   from '@valkyriestudios/utils/number/isNumericalNaN';
import isString         from '@valkyriestudios/utils/string/is';
import isArray          from '@valkyriestudios/utils/array/is';

export default function vBetween (val, param_before = undefined, param_after = undefined) {
    //  Convert param into float
    const check_after = parseFloat(param_after);
    const check_before = parseFloat(param_before);

    //  If param_after is not numerical or nan, return false
    if (!isNumber(check_after) || isNumericalNaN(check_after)) return false;

    //  If param_before is not numerical or nan, return false
    if (!isNumber(check_before) || isNumericalNaN(check_before)) return false;

    //  Is value is string, use length for validation
    if (isString(val) || isArray(val)) return val.length > check_before && val.length < check_after;

    //  If value is numerical, use primitive for validation
    if (isNumber(val) && !isNumericalNaN(val)) return val > check_before && val < check_after;

    return false;
}
