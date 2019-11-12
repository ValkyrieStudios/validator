'use strict';

import vGreaterThanOrEqual from './vGreaterThanOrEqual';

export default function vMin (val, minimum = undefined) {
    return vGreaterThanOrEqual(val, minimum);
}
