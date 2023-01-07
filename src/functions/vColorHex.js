'use strict';

import Is from '@valkyriestudios/utils/is';

export default function vColorHex (val) {
    if (!Is.NotEmptyString(val)) return false;

    return !!/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(val.trim());
}
