'use strict';

const MAP:Map<string, boolean> = new Map();
for (const el of ['AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA']) MAP.set(el, true);

/**
 * Validate that a provided value is a continent code
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vContinent (val:string|never):boolean {
    return typeof val === 'string' && MAP.has(val);
}
