const RGX = /^[\w\s]*$/m;

/**
 * Validate that a value is a string which only contain alphabetical, numerical, spaces and line breaks
 *
 * @param {unknown} val - Value to verify
 */
function vAlphaNumSpacesMultiline (val:unknown):val is string {
    return typeof val === 'string' && RGX.test(val);
}

export {vAlphaNumSpacesMultiline, vAlphaNumSpacesMultiline as default};
