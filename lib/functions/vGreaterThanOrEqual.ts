/**
 * Validate that a provided value is greater than or equal a provided number.
 * If passed a string or array this will validate on length
 *
 * @param {string|number|unknown[]} val - Value to verify
 * @param {number} bound - Lower bound to validate against (inclusive)
 * @returns {boolean} Whether or not it's valid
 */
function vGreaterThanOrEqual (
    val:string|number|unknown[],
    bound:number
):boolean {
    /* Normalize */
    const n_bound:number = typeof bound === 'string' ? parseFloat(bound) : bound;

    /* If bound normalized is not numerical return false */
    if (!Number.isFinite(n_bound)) return false;

    /* Check on string or array */
    if (typeof val === 'string' || Array.isArray(val)) return val.length >= n_bound;

    return Number.isFinite(val) && val >= n_bound;
}

export {vGreaterThanOrEqual, vGreaterThanOrEqual as default};
