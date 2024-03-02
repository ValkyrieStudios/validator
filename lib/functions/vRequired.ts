'use strict';

/**
 * Validate that a provided value is not empty.
 * Take note: arrays will be seen as valid if at least 1 element is present
 * Take note: strings will be seen as valid if when trimmed the length is bigger than 0
 * Take note: null, undefined and NaN will not be valid
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
export default function vRequired (val:unknown):boolean {
    if (val === null || val === undefined || Number.isNaN(val)) return false;

    if (typeof val === 'string') {
        return val.trim().length > 0;
    } else if (Array.isArray(val)) {
        return val.length > 0;
    } else {
        return true;
    }
}
