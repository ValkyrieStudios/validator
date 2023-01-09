'use strict';

import Is from '@valkyriestudios/utils/is';

export default function vDateString (val) {
    return (
        Is.NotEmptyString(val) &&
        new Date(val) !== 'Invalid Date' &&
        !isNaN(new Date(val)) &&
        Is.NumberAbove(new Date(val).getTime(), 0) &&
        Is.NumberAbove(Date.parse(val), 0)
    );
}
