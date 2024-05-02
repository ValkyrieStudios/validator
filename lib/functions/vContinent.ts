'use strict';

const SET = new Set(['AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA']);

/**
 * Validate that a provided value is a continent code
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vContinent (val:unknown):val is string {
    return SET.has(val as string);
}

export {vContinent, vContinent as default};
