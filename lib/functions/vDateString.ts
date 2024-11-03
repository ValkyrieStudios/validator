import {type Brand} from './_types';

export type DateString = Brand<string, 'DateString'>;

/**
 * Validate that a provided value is a valid date string
 *
 * @param {unknown} val - Value to verify
 */
function vDateString (val:unknown):val is DateString {
    return (
        typeof val === 'string' &&
        val.trim().length > 0 &&
        !isNaN(Date.parse(val)) &&
        !isNaN(new Date(val).getTime())
    ) as boolean;
}

export {vDateString, vDateString as default};
