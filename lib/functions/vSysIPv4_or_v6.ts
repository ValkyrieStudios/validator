import {RGX as RGX_IPV4, type IP_V4} from './vSysIPv4';
import {RGX as RGX_IPV6, type IP_V6} from './vSysIPv6';

export type IP = IP_V4 | IP_V6;

/**
 * Validate that a provided value is either a valid IPv4 or a valid IPv6 address
 *
 * @param {unknown} val - Value to verify
 */
function vSysIPv4_or_v6 (val:unknown):val is IP {
    return typeof val === 'string' && (RGX_IPV4.test(val) || RGX_IPV6.test(val));
}

export {vSysIPv4_or_v6, vSysIPv4_or_v6 as default};
