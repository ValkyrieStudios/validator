'use strict';

import isString from '@valkyriestudios/utils/string/is';

export default function vColorHex (data) {
    if (!isString(data)) return false;

    return !!(/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(data.trim()));
}
