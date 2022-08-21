'use strict';

import Is 		from '@valkyriestudios/utils/is';
import fnv1A    from '@valkyriestudios/utils/hash/fnv1A';

export default function vIn (val, params = undefined) {
    if (!Is.NotEmptyArray(params) && !Is.NotEmptyString(params)) return false;

    if (Is.String(val) || Is.Number(val) || Is.Boolean(val)) {
        return params.indexOf(val) > -1;
    }

    const hashed = [...params].map(el => fnv1A(el));
    return hashed.indexOf(fnv1A(val)) > -1;
}
