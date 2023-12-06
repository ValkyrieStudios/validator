'use strict';

import Is from '@valkyriestudios/utils/is.js';

export default function vBoolean (val, equals = null) {
    return Is.Boolean(val) && equals !== null
        ? !!val === !!equals
        : Is.Boolean(val);
}
