/**
 * Validate that a provided value is strictly equal to false
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vFalse (val:unknown):val is false {
    return val === false;
}

export {vFalse, vFalse as default};
