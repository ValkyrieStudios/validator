'use strict';

const RGX = /^#([\da-f]{3}){1,2}$/i;

/**
 * Validate that a provided value is a hexadecimal color string (with the # included)
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
export default function vColorHex (val:string):boolean {
    return typeof val === 'string' && RGX.test(val);
}
