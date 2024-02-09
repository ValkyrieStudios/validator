'use strict';

/**
 * Validate that a provided value is between two numbers, if passed a string or array this will validate on length
 * 
 * @param val - Value to verify
 * @param lower_bound - Lower bound to validate against (inclusive)
 * @param upper_bound - Upper bound to validate against (inclusive)
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vBetweenInclusive (
    val:string|number|any[]|never,
    lower_bound:string|number,
    upper_bound:string|number
):boolean {
    //  Normalize
    const _upper_bound:number = typeof upper_bound === 'string' ? parseFloat(upper_bound) : upper_bound;
    const _lower_bound:number = typeof lower_bound === 'string' ? parseFloat(lower_bound) : lower_bound;

    //  If upper or lower bound normalized is not numerical return false
    if (!Number.isFinite(_upper_bound) || !Number.isFinite(_lower_bound)) return false;

    //  If value is string or array, use length for validation
    //  Else if number use value for validation
    //  Else return false
    if (typeof val === 'string' || Array.isArray(val)) {
        return val.length >= _lower_bound && val.length <= _upper_bound;
    } else if (Number.isFinite(val)) {
        return val >= _lower_bound && val <= _upper_bound;
    } else {
        return false;
    }
}
