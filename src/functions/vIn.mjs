'use strict';

import fnv1A   from '@valkyriestudios/utils/src/hash/fnv1A.mjs';
import memoize from '@valkyriestudios/utils/src/caching/memoize.mjs';

const memoizedHashParams = memoize(params => {
    const hashed = [];
    for (const el of params) hashed.push(fnv1A(el));
    return hashed;
});

export default function vIn (val, params) {
    if (!Array.isArray(params) || params.length === 0) return false;

    //  Primitive check
    if (
        typeof val === 'string' ||
        Number.isFinite(val) ||
        val === true ||
        val === false
    ) return params.indexOf(val) > -1;

    //  FNV Hash params
    return memoizedHashParams(params).indexOf(fnv1A(val)) > -1;
}
