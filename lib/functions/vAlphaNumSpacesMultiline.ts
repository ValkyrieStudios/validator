const RGX = /^[\w\s]*$/m;

/**
 * Validate that a value is a string which only contain alphabetical, numerical, spaces and line breaks
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vAlphaNumSpacesMultiline (val:unknown):val is string {
    return typeof val === 'string' && RGX.test(val);
}

export {vAlphaNumSpacesMultiline, vAlphaNumSpacesMultiline as default};
