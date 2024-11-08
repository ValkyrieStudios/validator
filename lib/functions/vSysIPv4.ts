import {type Brand} from './_types';

export const RGX = /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; /* eslint-disable-line max-len */

export type IP_V4 = Brand<string, 'IP_V4'>;

/**
 * Validate that a provided value is a valid IPv4 address
 *
 * @param {unknown} val - Value to verify
 */
function vSysIPv4 (val:unknown):val is IP_V4 {
    return typeof val === 'string' && RGX.test(val);
}

export {vSysIPv4, vSysIPv4 as default};
