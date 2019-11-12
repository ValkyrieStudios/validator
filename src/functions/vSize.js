'use strict';

import { isNumber, isNumericalNaN } from '@valkyriestudios/utils/number';
import {isString} from '@valkyriestudios/utils/string';
import {isArray} from '@valkyriestudios/utils/array';

export default function vSize (val, equals = undefined) {
    if (!val || !equals) return false;

    //  Convert equals into float
    let check = parseFloat(equals);

    //  If equals is not numerical or nan, return false
    if (!isNumber(check) || isNumericalNaN(check)) return false;

    return (isString(val) || isArray(val))
        ? val.length === check
        : false;
}
