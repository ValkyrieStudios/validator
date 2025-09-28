import {isDateFormat} from '@valkyriestudios/utils/date/isFormat';
import {type DateString} from '../types';

/**
 * Validate that a provided value is a valid ISO date string WITH milliseconds
 *
 * @param {unknown} val - Value to verify
 */
export function vDateISO (val:unknown):val is DateString {
    return typeof val === 'string' && val[4] === '-' && val[7] === '-' && val[10] === 'T' && isDateFormat(val, 'ISO');
}

/**
 * Validate that a provided value is a string in the format of YYYY-MM-DD
 *
 * @param {unknown} val - Value to verify
 */
export function vDateDay (val:unknown):val is DateString {
    return typeof val === 'string' && val[4] === '-' && val[7] === '-' && isDateFormat(val, 'YYYY-MM-DD');
}
