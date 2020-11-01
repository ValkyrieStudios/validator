'use strict';

import equal from '@valkyriestudios/utils/equal';

export default function vEqualTo (val_a, val_b = undefined) {
    if (val_b === undefined) return false;
    return !!equal(val_a, val_b);
}
