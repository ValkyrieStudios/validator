'use strict';

import {isString} from '@valkyriestudios/utils/string';
import {isArray}  from '@valkyriestudios/utils/array';

export default function vSize (val, equals) {
    if (!val || !equals) {
        return false;
    }

    return (isString(val) || isArray(val))
        ? val.length === equals
        : false;
}
