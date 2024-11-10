import {type Continent, CONTINENTS} from '../types';

const SET = new Set(CONTINENTS);

/**
 * Validate that a provided value is a continent code
 *
 * @param {unknown} val - Value to verify
 */
function vContinent (val:unknown):val is Continent {
    return SET.has(val as Continent);
}

export {vContinent, vContinent as default};
