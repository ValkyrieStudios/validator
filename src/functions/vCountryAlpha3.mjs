'use strict';

import Is           from '@valkyriestudios/utils/is.js';
import mapKey       from '@valkyriestudios/utils/array/mapKey.js';
import countries    from '@valkyriestudios/utils/data/countries.json';

const MAP = mapKey(countries, 'al3');

export default function vCountryAlpha3 (val) {
    if (!Is.NeString(val)) return false;
    return MAP.hasOwnProperty(val);
}
