/**
 * Validate that a provided value is strictly equal to null
 *
 * @param {unknown} val - Value to verify
 */
function vNull (val:unknown):val is null {
    return val === null;
}

export {vNull, vNull as default};
