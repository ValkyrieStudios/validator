'use strict';

import fnv1A   from '@valkyriestudios/utils/hash/fnv1A';
import memoize from '@valkyriestudios/utils/caching/memoize';

const memoizedHashParams = memoize((params:any[]) => {
    const hashed = [];
    for (const el of params) hashed.push(fnv1A(el));
    return hashed;
});

/**
 * Validate that a provided value is in an array of values
 * 
 * @param val - Value to verify
 * @param params - Array of possible values
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vIn (val:any, params:any[]):boolean {
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