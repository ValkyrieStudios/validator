const RGX = /^[\w ]*$/;

/**
 * Validate that a value is a string which only contain alphabetical, numerical and space characters
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vAlphaNumSpaces (val:unknown):val is string {
    return typeof val === 'string' && RGX.test(val);
}

export {vAlphaNumSpaces, vAlphaNumSpaces as default};
