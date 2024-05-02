'use strict';

import {vSysIPv4} from './vSysIPv4';
import {vSysIPv6} from './vSysIPv6';

/**
 * Validate that a provided value is either a valid IPv4 or a valid IPv6 address
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vSysIPv4_or_v6 (val:unknown):val is string {
    return vSysIPv4(val) || vSysIPv6(val);
}

export {vSysIPv4_or_v6, vSysIPv4_or_v6 as default};
