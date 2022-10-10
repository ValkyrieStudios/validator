'use strict';

import Is from '@valkyriestudios/utils/is';

export default function vRequired (val) {
    if (val === null || val === undefined) return false;

    if (Is.String(val)) return Is.NotEmptyString(val);

    if (Is.Array(val)) return Is.NotEmptyArray(val);

    return true;
}
