import {type Brand} from './_types';

const RGX = /^#([\da-f]{3}){1,2}$/i;

export type ColorHex = Brand<string, 'ColorHex'>;

/**
 * Validate that a provided value is a hexadecimal color string (with the # included)
 *
 * @param {unknown} val - Value to verify
 */
function vColorHex (val:unknown):val is ColorHex {
    return typeof val === 'string' && RGX.test(val);
}

export {vColorHex, vColorHex as default};
