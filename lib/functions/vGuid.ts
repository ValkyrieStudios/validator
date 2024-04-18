'use strict';

const RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Validate that a provided value is a valid guid according to rfc 4122
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vGuid (val:string):boolean {
    return typeof val === 'string' &&
        val.length === 36 && /* A RFC-4122 GUID is 36 characters in length */
        RGX.test(val); /* Verify according to the RFC4122 spec (case-insensitive) */
}

export {vGuid, vGuid as default};
