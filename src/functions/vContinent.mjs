'use strict';

const MAP = new Map();
for (const el of [
    'AF',
    'AN',
    'AS',
    'EU',
    'NA',
    'OC',
    'SA',
]) MAP.set(el, true);

export default function vContinent (val) {
    return typeof val === 'string' && MAP.has(val);
}
