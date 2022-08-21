'use strict';

import Is from '@valkyriestudios/utils/is';

export default function vColorHex (data) {
    if (!Is.NotEmptyString(data)) return false;

    return !!/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(data.trim());
}
