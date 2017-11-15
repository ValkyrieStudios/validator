import {isString} from '@valkyriestudios/utils/string';
import {isArray}  from '@valkyriestudios/utils/array';

export default function vRequired (val) {
    if (val === null) {
        return false;
    }

    if (isString(val)) {
        if (val.trim() === '') {
            return false;
        }
    } else if (isArray(val)) {
        if (val.length === 0) {
            return false;
        }
    }

    return true;
}