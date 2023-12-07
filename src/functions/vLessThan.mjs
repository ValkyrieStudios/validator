'use strict';

export default function vLessThan (val, param = undefined) {
    //  Convert param into float
    const check = parseFloat(param);

    //  If param is not numerical or nan, return false
    if (!Number.isFinite(check)) return false;

    //  Is value is string, use length for validation
    if (typeof val === 'string' || Array.isArray(val)) return val.length < check;

    //  If value is numerical, use primitive for validation
    if (Number.isFinite(val)) return val < check;

    return false;
}
