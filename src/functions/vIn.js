'use strict';

import { isString }     from '@valkyriestudios/utils/string';
import { isBoolean }    from '@valkyriestudios/utils/boolean';
import { isNumber }     from '@valkyriestudios/utils/number';
import { fnv1A }        from '@valkyriestudios/utils/hash';

export default function vIn (val, params = undefined) {
    if (params === undefined) return false;

    if (isString(val) || isNumber(val) || isBoolean(val)) {
        return params.indexOf(val) > -1;
    }

    const hashed = [...params].map(el => fnv1A(el));
    return hashed.indexOf(fnv1A(val)) > -1;
}
