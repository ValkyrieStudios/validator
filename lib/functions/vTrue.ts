'use strict';

/**
 * Validate that a provided value is strictly equal to true
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vTrue (val:boolean|never):boolean {
    return val === true;
}