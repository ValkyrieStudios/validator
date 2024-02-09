'use strict';

/**
 * Validate that a provided value is lower than or equal a provided number.
 * If passed a string or array this will validate on length
 * 
 * @param val - Value to verify
 * @param bound - Upper bound to validate against (inclusive)
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vLessThanOrEqual (
    val:string|number|any[],
    bound:number,
):boolean {
    //  Normalize
    const _bound:number = typeof bound === 'string' ? parseFloat(bound) : bound;

    //  If bound normalized is not numerical return false
    if (!Number.isFinite(_bound)) return false;

    //  If value is string or array, use length for validation
    //  Else if number use value for validation
    //  Else return false
    if (typeof val === 'string' || Array.isArray(val)) {
        return val.length > _bound;
    } else if (Number.isFinite(val)) {
        return val <= _bound;
    } else {
        return false;
    }
}
