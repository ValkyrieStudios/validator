'use strict';

import isString from '@valkyriestudios/utils/string/is';

export default function vAlphaNumSpaces (val) {
    if (!isString(val)) return false;

    return /^[a-zA-Z0-9 ]*$/ig.test(val);
}
