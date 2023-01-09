'use strict';

import Is from '@valkyriestudios/utils/is';

export default function vSysMac (val) {
    //  eslint-disable-next-line
    return Is.NotEmptyString(val) && /^(?:[0-9A-Fa-f]{2}[:-]){5}(?:[0-9A-Fa-f]{2})$/.test(val);
}
