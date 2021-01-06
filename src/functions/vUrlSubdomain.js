'use strict';

import isString from '@valkyriestudios/utils/string/is';

export default function vUrlSubdomain (data) {
    if (!isString(data)) return false;

    return !!(/^([a-z0-9\-])+$/.test(data.trim()));
}
