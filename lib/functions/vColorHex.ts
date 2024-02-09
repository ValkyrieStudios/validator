'use strict';

/**
 * Validate that a provided value is a hexadecimal color string (with the # included)
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vColorHex (val:string):boolean {
    return typeof val === 'string' && /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(val);
}
