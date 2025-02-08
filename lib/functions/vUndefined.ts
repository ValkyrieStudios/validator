/**
 * Validate that a provided value is undefined
 *
 * @param {unknown} val - Value to verify
 */
function vUndefined (val:unknown):val is undefined {
    return val === undefined;
}

export {vUndefined, vUndefined as default};
