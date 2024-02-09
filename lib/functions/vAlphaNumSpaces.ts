'use strict';

/**
 * Validate that a value is a string which only contain alphabetical, numerical and space characters
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vAlphaNumSpaces (val:string|never):boolean {
    return typeof val === 'string' && /^[a-zA-Z0-9 ]*$/ig.test(val);
}
