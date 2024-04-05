'use strict';

const SET = new Set(['AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA']);

/**
 * Validate that a provided value is a continent code
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
export default function vContinent (val:string):boolean {
    return SET.has(val);
}
