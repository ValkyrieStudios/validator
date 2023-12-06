'use strict';

import vIPv4 from './vSysIPv4.mjs';
import vIPv6 from './vSysIPv6.mjs';

export default function vSysIPv4_or_v6 (val) {
    return vIPv4(val) || vIPv6(val);
}
