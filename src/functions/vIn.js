'use strict';

import isString     from '@valkyriestudios/utils/string/is';
import isBoolean    from '@valkyriestudios/utils/boolean/is';
import isNumber     from '@valkyriestudios/utils/number/is';
import fnv1A        from '@valkyriestudios/utils/hash/fnv1A';

export default function vIn (val, params = undefined) {
    if (params === undefined) return false;

    if (isString(val) || isNumber(val) || isBoolean(val)) {
        return params.indexOf(val) > -1;
    }

    const hashed = [...params].map(el => fnv1A(el));
    return hashed.indexOf(fnv1A(val)) > -1;
}
