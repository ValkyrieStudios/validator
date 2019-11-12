'use strict';

import vLessThanOrEqual from './vLessThanOrEqual';

export default function vMax (val, maximum = undefined) {
    return vLessThanOrEqual(val, maximum);
}
