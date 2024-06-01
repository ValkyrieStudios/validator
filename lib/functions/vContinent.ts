'use strict';

const CODES = ['AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA'] as const;

export type Continent = (typeof CODES)[number];

const SET = new Set(CODES);

/**
 * Validate that a provided value is a continent code
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vContinent (val:unknown):val is Continent {
    return SET.has(val as Continent);
}

export {vContinent, vContinent as default};
