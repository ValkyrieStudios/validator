'use strict';

import Is           from '@valkyriestudios/utils/is.js';
import mapKey       from '@valkyriestudios/utils/array/mapKey.js';
import countries    from '@valkyriestudios/utils/data/countries.json';

const MAP = mapKey(countries, 'al2');

export default function vCountry (val) {
    if (!Is.NeString(val)) return false;
    return MAP.hasOwnProperty(val);
}