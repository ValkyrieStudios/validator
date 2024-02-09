'use strict';

/**
 * Validate that a provided value is a valid email address
 * For more info: RFC3696 (https://datatracker.ietf.org/doc/html/rfc3696)
 * Take note: This does not validate email existence
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vEmail (val:string|never):boolean {
    if (typeof val !== 'string' || val.trim().length !== val.length || val.length === 0) return false;

    const parts = val.split('@');

    //  Validate 2 parts exist (a single @ sign needs to be present)
    if (parts.length !== 2) return false;

    //  Validate username length (max 64 chars)
    if (parts[0].length > 64) return false;

    //  Baseline validation for username
    if (!/^(")?[A-Z0-9&._%+-]+(")?$/gi.test(parts[0])) return false;

    //  Username Special case: can not start with dot (.)
    if (parts[0].charAt(0) === '.') return false;

    //  Username Special case: can not end with dot (.)
    if (parts[0].charAt(parts[0].length - 1) === '.') return false;

    //  Username Special case: can not contain consecutive dot chars (.)
    if (/[.]{2,}/.test(parts[0])) return false;

    //  Validate domain length
    if (parts[1].length > 253) return false;

    //  Validate domain content
    //  eslint-disable-next-line max-len
    if (/^(?:(?=[a-z0-9-]{1,63}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{1,63}z)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ig.test(parts[1])) return true;
    if (!/^(\w{1,})([.-]?\w)*(\.\w{2,63})+$/.test(parts[1])) return false;

    return true;
}
