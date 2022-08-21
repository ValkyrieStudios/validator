'use strict';

import Is from '@valkyriestudios/utils/is';

export default function vGreaterThanOrEqual (val, param = undefined) {
    //  Convert param into float
    const check = parseFloat(param);

    //  If param is not numerical or nan, return false
    if (!Is.Number(check)) return false;

    //  Is value is string, use length for validation
    if (Is.String(val) || Is.Array(val)) return val.length >= check;

    //  If value is numerical, use primitive for validation
    if (Is.Number(val)) return val >= check;

    return false;
}
