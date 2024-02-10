'use strict';

import vIPv4 from './vSysIPv4';
import vIPv6 from './vSysIPv6';

/**
 * Validate that a provided value is either a valid IPv4 or a valid IPv6 address
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vSysIPv4_or_v6 (val:string):boolean {
    return vIPv4(val) || vIPv6(val);
}
