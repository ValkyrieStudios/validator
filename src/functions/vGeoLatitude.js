'use strict';

import Is from '@valkyriestudios/utils/is';

export default function vGeoLatitude (val) {
    return Is.Number(val) && val >= -90 && val <= 90;
}
