import {isNumber} from '@valkyriestudios/core-utils/number';
import {isString} from '@valkyriestudios/core-utils/string';
import {isArray}  from '@valkyriestudios/core-utils/array';

export default function vMin (val, minimum) {
    if (!val || !minimum) {
        return false;
    }

    if (isNumber(val)) {
        return (val >= minimum);
    }

    return (isString(val) || isArray(val))
        ? val.length >= minimum
        : false;
}
