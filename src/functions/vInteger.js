'use strict';

import Is from '@valkyriestudios/utils/is';

export default function vInteger (val) {
    if (!Is.Number(val)) return false;
    if (!Number.isFinite(val)) return false;
    return Math.floor(val) === val;
}
