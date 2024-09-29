/**
 * Validate that a provided value is lower than or equal a provided number.
 *
 * @param {string|number|unknown[]|File|Blob} val - Value to verify
 * @param {number} bound - Upper bound to validate against (inclusive)
 */
function vLessThanOrEqual (
    val:string|number|unknown[]|File|Blob,
    bound:number
):boolean {
    /* Normalize */
    const n_bound:number = typeof bound === 'string' ? parseFloat(bound) : bound;

    /* If bound normalized is not numerical return false */
    if (!Number.isFinite(n_bound)) return false;

    if (typeof val === 'string' || Array.isArray(val)) {
        return val.length <= n_bound;
    } else if (val instanceof File || val instanceof Blob) {
        return val.size <= n_bound;
    } else {
        return Number.isFinite(val) && val <= n_bound;
    }
}

export {vLessThanOrEqual, vLessThanOrEqual as default};
