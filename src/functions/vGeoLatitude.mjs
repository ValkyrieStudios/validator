'use strict';

import Is from '@valkyriestudios/utils/is.js';

export default function vGeoLatitude (val) {
    return Is.Number(val) && val >= -90 && val <= 90;
}
