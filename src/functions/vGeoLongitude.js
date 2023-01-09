'use strict';

import Is from '@valkyriestudios/utils/is';

export default function vGeoLongitude (val) {
    return Is.Number(val) && val >= -180 && val <= 180;
}
