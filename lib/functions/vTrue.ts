/**
 * Validate that a provided value is strictly equal to true
 *
 * @param {unknown} val - Value to verify
 */
function vTrue (val:unknown):val is true {
    return val === true;
}

export {vTrue, vTrue as default};
