import {isDateFormat} from '@valkyriestudios/utils/date/isFormat';

/**
 * Validate that a provided value is a valid ISO date string WITH milliseconds
 *
 * @param {unknown} val - Value to verify
 */
export function vDateISO (val:unknown):val is string {
    return typeof val === 'string' && val.trim().length > 0 && isDateFormat(val, 'ISO');
}

/**
 * Validate that a provided value is a string in the format of YYYY-MM-DD
 *
 * @param {unknown} val - Value to verify
 */
export function vDateDay (val:unknown):val is string {
    return typeof val === 'string' && val.trim().length > 0 && isDateFormat(val, 'YYYY-MM-DD');
}
