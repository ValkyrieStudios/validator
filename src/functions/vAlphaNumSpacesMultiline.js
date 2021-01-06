'use strict';

import isString from '@valkyriestudios/utils/string/is';

export default function vAlphaNumSpacesMultiline (val) {
    if (!isString(val)) return false;

    return /^[a-zA-Z0-9\s]*$/igm.test(val);
}
