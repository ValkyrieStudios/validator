const CODES = ['AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA'] as const;

export type Continent = (typeof CODES)[number];

const SET = new Set(CODES);

/**
 * Validate that a provided value is a continent code
 *
 * @param {unknown} val - Value to verify
 */
function vContinent (val:unknown):val is Continent {
    return SET.has(val as Continent);
}

export {vContinent, vContinent as default};
