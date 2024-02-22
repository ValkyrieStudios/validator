'use strict';

/**
 * Validate that a provided value is a valid guid according to rfc 4122
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
export default function vGuid (val:string):boolean {
    // A RFC-4122 GUID is 36 characters in length
    if (typeof val !== 'string' || val.length !== 36) return false;

    // Verify according to the RFC4122 spec (case-insensitive)
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);
}
