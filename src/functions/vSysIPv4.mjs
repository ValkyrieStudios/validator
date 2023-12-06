'use strict';

import Is from '@valkyriestudios/utils/is.js';

export default function vSysIPv4 (val) {
    //  eslint-disable-next-line
    return Is.NotEmptyString(val) && /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val);
}
