'use strict';

import Is from '@valkyriestudios/utils/is';

export default function vSize (val, equals = undefined) {
    if (!val || !equals) return false;

    //  Convert equals into float
    const check = parseFloat(equals);

    //  If equals is not numerical or nan, return false
    if (!Is.Number(check)) return false;

    return Is.String(val) || Is.Array(val)
        ? val.length === check
        : false;
}
