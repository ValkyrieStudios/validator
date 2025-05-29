/**
 * Validate that a provided value is lower than a provided number.
 *
 * @param {string|number|unknown[]|File|Blob} val - Value to verify
 * @param {number} bound - Upper bound to validate against (not inclusive)
 */
function vLessThan (
    val:string|number|unknown[]|File|Blob,
    bound:number
):boolean {
    /* Normalize */
    const n_bound:number = typeof bound === 'string' ? parseFloat(bound) : bound;

    /* If bound normalized is not numerical return false */
    if (!Number.isFinite(n_bound)) return false;

    if (typeof val === 'string' || Array.isArray(val)) {
        return val.length < n_bound;
    } else if (Number.isFinite(val)) {
        return (val as number) < n_bound;
    } else if (val instanceof File || val instanceof Blob) {
        return val.size < n_bound;
    } else {
        return false;
    }
}

export {vLessThan, vLessThan as default};
