/**
 * Validate that a provided value is between two numbers
 *
 * @param {string|number|unknown[]|File|Blob} val - Value to verify
 * @param {number} lower_bound - Lower bound to validate against (not inclusive)
 * @param {number} upper_bound - Upper bound to validate against (not inclusive)
 */
function vBetween (
    val:string|number|unknown[]|File|Blob,
    lower_bound:number,
    upper_bound:number
):boolean {
    /* Normalize */
    const n_upper_bound:number = typeof upper_bound === 'string' ? parseFloat(upper_bound) : upper_bound;
    const n_lower_bound:number = typeof lower_bound === 'string' ? parseFloat(lower_bound) : lower_bound;

    /* If upper or lower bound normalized is not numerical return false */
    if (!Number.isFinite(n_upper_bound) || !Number.isFinite(n_lower_bound)) return false;

    if (typeof val === 'string' || Array.isArray(val)) {
        const len = val.length;
        return len > n_lower_bound && len < n_upper_bound;
    } else if (val instanceof File || val instanceof Blob) {
        const len = val.size;
        return len > n_lower_bound && len < n_upper_bound;
    } else {
        return Number.isFinite(val) && val > n_lower_bound && val < n_upper_bound;
    }
}

export {vBetween, vBetween as default};
