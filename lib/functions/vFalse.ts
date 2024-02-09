'use strict';

/**
 * Validate that a provided value is strictly equal to false
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vFalse (val:boolean|never):boolean {
    return val === false;
}
