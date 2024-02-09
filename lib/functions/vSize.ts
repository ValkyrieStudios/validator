'use strict';

/**
 * Validate that a provided value has a specific size, this only
 * applies to strings and arrays and checks on length
 * 
 * @param val - Value to verify
 * @param size - Size to validate against
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vSize (
    val:string|any[],
    equals:number
):boolean {
    //  Only allow strings or arrays here
    if (typeof val !== 'string' && !Array.isArray(val)) return false;

    //  Normalize
    const _equals:number = typeof equals === 'string' ? parseFloat(equals) : equals;

    //  If equals is not numerical or nan, return false
    if (!Number.isFinite(_equals)) return false;

    return val.length === _equals;
}
