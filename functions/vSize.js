import {isString} from '@valkyriestudios/core-utils/string';
import {isArray}  from '@valkyriestudios/core-utils/array';

export default function vSize (val, equals) {
    if (!val || !equals) {
        return false;
    }

    return (isString(val) || isArray(val))
        ? val.length === equals
        : false;
}
