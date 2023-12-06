'use strict';

import vGreaterThanOrEqual from './vGreaterThanOrEqual.mjs';

export default function vMin (val, minimum = undefined) {
    return vGreaterThanOrEqual(val, minimum);
}
