'use strict';

export default function vBetweenInclusive (val, param_before = undefined, param_after = undefined) {
    //  Convert param into float
    const check_after = parseFloat(param_after);
    const check_before = parseFloat(param_before);

    //  If param_after is not numerical or nan, return false
    if (!Number.isFinite(check_after)) return false;

    //  If param_before is not numerical or nan, return false
    if (!Number.isFinite(check_before)) return false;

    //  If value is string or array , use length for validation
    if (typeof val === 'string' || Array.isArray(val)) return val.length >= check_before && val.length <= check_after;

    //  If value is numerical, use primitive for validation
    if (Number.isFinite(val)) return val >= check_before && val <= check_after;

    return false;
}
