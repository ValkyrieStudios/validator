const RGX = /^#([\da-f]{3}){1,2}$/i;

/**
 * Validate that a provided value is a hexadecimal color string (with the # included)
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vColorHex (val:unknown):val is string {
    return typeof val === 'string' && RGX.test(val);
}

export {vColorHex, vColorHex as default};
