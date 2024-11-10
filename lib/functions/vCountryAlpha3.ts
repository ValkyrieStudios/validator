import {type CountryAlpha3, COUNTRY_ALPHA3} from '../types';

const SET = new Set(COUNTRY_ALPHA3);

/**
 * Validate that a provided value is an alpha-3 code according to ISO 3166-1
 *
 * @param {unknown} val - Value to verify
 */
function vCountryAlpha3 (val:unknown):val is CountryAlpha3 {
    return SET.has(val as CountryAlpha3);
}

export {vCountryAlpha3, vCountryAlpha3 as default};
