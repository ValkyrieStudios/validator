'use strict';

import { isString } from '@valkyriestudios/utils/string';

export default function vAlphaNumSpacesMultiline (val) {
    if (!isString(val)) return false;

    return val ? /^[a-zA-Z0-9\s]*$/igm.test(val) : false;
}