'use strict';

import vLessThanOrEqual from './vLessThanOrEqual.mjs';

export default function vMax (val, maximum = undefined) {
    return vLessThanOrEqual(val, maximum);
}
