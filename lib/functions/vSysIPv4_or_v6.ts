import {RGX as RGX_IPV4} from './vSysIPv4';
import {RGX as RGX_IPV6} from './vSysIPv6';

/**
 * Validate that a provided value is either a valid IPv4 or a valid IPv6 address
 *
 * @param {unknown} val - Value to verify
 * @returns {boolean} Whether or not it's valid
 */
function vSysIPv4_or_v6 (val:unknown):val is string {
    return typeof val === 'string' && (RGX_IPV4.test(val) || RGX_IPV6.test(val));
}

export {vSysIPv4_or_v6, vSysIPv4_or_v6 as default};
