'use strict';

/**
 * Validate that a provided value is a valid guid according to rfc 4122
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vGuid (val:string):boolean {
    //  A RFC-4122 guid is 36 characters in length
    if (typeof val !== 'string' || val.length !== 36) return false;

    //  Verify according to the rfc4122 spec
    return /^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$/g.test(val);
}
