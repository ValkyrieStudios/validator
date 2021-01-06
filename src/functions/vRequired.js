'use strict';

import isString     from '@valkyriestudios/utils/string/is';
import isArray      from '@valkyriestudios/utils/array/is';

export default function vRequired (val) {
    if (val === null || val === undefined) return false;

    if (isString(val)) return !(val.trim() === '');

    if (isArray(val)) return !(val.length === 0);

    return true;
}
