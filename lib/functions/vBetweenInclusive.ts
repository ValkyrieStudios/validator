/**
 * Validate that a provided value is between two numbers, if passed a string or array this will validate on length
 *
 * @param {string|number|unknown[]} val - Value to verify
 * @param {number} lower_bound - Lower bound to validate against (inclusive)
 * @param {number} upper_bound - Upper bound to validate against (inclusive)
 * @returns {boolean} Whether or not it's valid
 */
function vBetweenInclusive (
    val:string|number|unknown[],
    lower_bound:number,
    upper_bound:number
):boolean {
    /* Normalize */
    const n_upper_bound:number = typeof upper_bound === 'string' ? parseFloat(upper_bound) : upper_bound;
    const n_lower_bound:number = typeof lower_bound === 'string' ? parseFloat(lower_bound) : lower_bound;

    /* If upper or lower bound normalized is not numerical return false */
    if (!Number.isFinite(n_upper_bound) || !Number.isFinite(n_lower_bound)) return false;

    /* Check on string or array */
    if (typeof val === 'string' || Array.isArray(val)) {
        const len = val.length;
        return len >= n_lower_bound && len <= n_upper_bound;
    }

    return Number.isFinite(val) && val >= n_lower_bound && val <= n_upper_bound;
}

export {vBetweenInclusive, vBetweenInclusive as default};
