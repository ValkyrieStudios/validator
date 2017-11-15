import {isNumber} from '@valkyriestudios/utils/number';
import {isString} from '@valkyriestudios/utils/string';
import {isArray}  from '@valkyriestudios/utils/array';

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
