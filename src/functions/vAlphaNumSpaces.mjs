'use strict';

import Is from '@valkyriestudios/utils/is.js';

export default function vAlphaNumSpaces (val) {
    if (!Is.String(val)) return false;

    return /^[a-zA-Z0-9 ]*$/ig.test(val);
}
