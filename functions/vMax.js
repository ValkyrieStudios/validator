import {isNumber} from '@valkyriestudios/core-utils/number';
import {isString} from '@valkyriestudios/core-utils/string';
import {isArray} from '@valkyriestudios/core-utils/array';

export default function vMax (val, maximum) {
    if (!val || !maximum) {
        return false;
    }

    if (isNumber(val)) {
        return (val <= maximum);
    }

    return (isString(val) || isArray(val))
        ? val.length <= maximum
        : false;
}
