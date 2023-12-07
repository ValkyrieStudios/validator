'use strict';

export default function vSize (val, equals = undefined) {
    if (!val || !equals) return false;

    //  Convert equals into float
    const check = parseFloat(equals);

    //  If equals is not numerical or nan, return false
    if (!Number.isFinite(check)) return false;

    return typeof val === 'string' || Array.isArray(val)
        ? val.length === check
        : false;
}
