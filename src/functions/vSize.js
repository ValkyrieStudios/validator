'use strict';

import isNumber         from '@valkyriestudios/utils/number/is';
import isNumericalNaN   from '@valkyriestudios/utils/number/isNumericalNaN';
import isString         from '@valkyriestudios/utils/string/is';
import isArray          from '@valkyriestudios/utils/array/is';

export default function vSize (val, equals = undefined) {
    if (!val || !equals) return false;

    //  Convert equals into float
    const check = parseFloat(equals);

    //  If equals is not numerical or nan, return false
    if (!isNumber(check) || isNumericalNaN(check)) return false;

    return isString(val) || isArray(val)
        ? val.length === check
        : false;
}
