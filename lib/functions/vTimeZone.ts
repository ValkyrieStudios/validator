import {type TimeZone, TIMEZONES} from '../types';

const SET = new Set(TIMEZONES);

/**
 * Validate that a provided value is a time_zone string
 *
 * @param {unknown} val - Value to verify
 */
function vTimeZone (val:unknown):val is TimeZone {
    return SET.has(val as TimeZone);
}

export {vTimeZone, vTimeZone as default};
