import {type CountryAlpha2, COUNTRY_ALPHA2} from '../types';

const SET = new Set(COUNTRY_ALPHA2);

/**
 * Validate that a provided value is an alpha-2 code according to ISO 3166-1
 *
 * @param {unknown} val - Value to verify
 */
function vCountry (val:unknown):val is CountryAlpha2 {
    return SET.has(val as CountryAlpha2);
}

export {vCountry, vCountry as default};
