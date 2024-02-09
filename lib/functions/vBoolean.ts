'use strict';

/**
 * Validate that a provided value is a boolean
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vBoolean (val:boolean|never):boolean {
    return val === true || val === false;
}
