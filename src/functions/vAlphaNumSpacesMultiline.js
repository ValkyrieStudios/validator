'use strict';

import Is from '@valkyriestudios/utils/is';

export default function vAlphaNumSpacesMultiline (val) {
    if (!Is.String(val)) return false;

    return /^[a-zA-Z0-9\s]*$/igm.test(val);
}
