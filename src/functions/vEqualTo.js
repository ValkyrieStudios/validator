'use strict';

import {equal} from '@valkyriestudios/utils/equal';

export default function vEqualTo (val_a, val_b) {
    return !!equal(val_a, val_b);
}
