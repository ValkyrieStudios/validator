/**
 * Validate that a provided value has a specific size, this only
 * applies to strings and arrays and checks on length
 *
 * @param {string|unknown[]} val - Value to verify
 * @param {number} equals - Size to validate against
 */
function vSize (
    val:string|unknown[],
    equals:number
):boolean {
    //  Only allow strings or arrays here
    if (typeof val !== 'string' && !Array.isArray(val)) return false;

    //  Normalize
    const n_equals:number = typeof equals === 'string' ? parseFloat(equals) : equals;

    //  If equals is not numerical or nan, return false
    if (!Number.isInteger(n_equals)) return false;

    return val.length === n_equals;
}

export {vSize, vSize as default};
