'use strict';

/**
 * Validate that a provided value is strictly equal to true
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vTrue (val:boolean):boolean {
    return val === true;
}

export {vTrue, vTrue as default};
