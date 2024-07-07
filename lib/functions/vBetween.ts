/**
 * Validate that a provided value is between two numbers, if passed a string or array this will validate on length
 *
 * @param val - Value to verify
 * @param lower_bound - Lower bound to validate against (not inclusive)
 * @param upper_bound - Upper bound to validate against (not inclusive)
 *
 * @returns {boolean} Whether or not it's valid
 */
function vBetween (
    val:string|number|unknown[],
    lower_bound:number,
    upper_bound:number
):boolean {
    /* Normalize */
    const n_upper_bound:number = typeof upper_bound === 'string' ? parseFloat(upper_bound) : upper_bound;
    const n_lower_bound:number = typeof lower_bound === 'string' ? parseFloat(lower_bound) : lower_bound;

    /* If upper or lower bound normalized is not numerical return false */
    if (!Number.isFinite(n_upper_bound) || !Number.isFinite(n_lower_bound)) return false;

    /**
     * If   value is string or array, use length for validation
     * Elif number use value for validation
     * El   return false
     */
    if (typeof val === 'string' || Array.isArray(val)) {
        return val.length > n_lower_bound && val.length < n_upper_bound;
    } else if (typeof val === 'number' && Number.isFinite(val)) {
        return val > n_lower_bound && val < n_upper_bound;
    } else {
        return false;
    }
}

export {vBetween, vBetween as default};
