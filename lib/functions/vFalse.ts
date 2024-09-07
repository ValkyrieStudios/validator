/**
 * Validate that a provided value is strictly equal to false
 *
 * @param {unknown} val - Value to verify
 */
function vFalse (val:unknown):val is false {
    return val === false;
}

export {vFalse, vFalse as default};
