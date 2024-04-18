'use strict';

/**
 * Validate that a provided value is greater than a provided number.
 * If passed a string or array this will validate on length
 *
 * @param val - Value to verify
 * @param bound - Lower bound to validate against (not inclusive)
 *
 * @returns {boolean} Whether or not it's valid
 */
function vGreaterThan (
    val:string|number|unknown[],
    bound:number
):boolean {
    /* Normalize */
    const n_bound:number = typeof bound === 'string' ? parseFloat(bound) : bound;

    /* If bound normalized is not numerical return false */
    if (!Number.isFinite(n_bound)) return false;

    /**
     * If   value is string or array, use length for validation
     * Elif number use value for validation
     * El   return false
     */
    if (typeof val === 'string' || Array.isArray(val)) {
        return val.length > n_bound;
    } else if (typeof val === 'number' && Number.isFinite(val)) {
        return val > n_bound;
    } else {
        return false;
    }
}

export {vGreaterThan, vGreaterThan as default};
