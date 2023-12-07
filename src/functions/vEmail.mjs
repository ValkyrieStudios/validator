'use strict';

//  Based on RFC3696 (https://datatracker.ietf.org/doc/html/rfc3696)

export default function vEmail (val) {
    if (typeof val !== 'string' || val.trim().length !== val.length || val.length === 0) return false;

    const parts = val.split('@');
    if (parts.length !== 2) return false;

    //  Validate username length (max 64 chars)
    if (parts[0].length > 64) return false;

    //  Baseline validation for username
    if (/^(")?[A-Z0-9&._%+-]+(")?$/gi.test(parts[0]) === false) return false;

    //  Username Special case: can not start with dot (.)
    if (parts[0].substring(0, 1) === '.') return false;

    //  Username Special case: can not end with dot (.)
    if (parts[0].substring(parts[0].length - 1, parts[1].length) === '.') return false;

    //  Username Special case: can not contain consecutive dot chars (.)
    if (/[.]{2,}/.test(parts[0]) === true) return false;

    //  Validate domain length
    if (parts[1].length > 253) return false;

    //  Validate domain content
    //  eslint-disable-next-line max-len
    if (/^(?:(?=[a-z0-9-]{1,63}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{1,63}z)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ig.test(parts[1]) !== false) return true;
    if (/^\w+([.-]?\w+)*(\.\w{2,5})+$/.test(parts[1]) === false) return false;

    return true;
}
