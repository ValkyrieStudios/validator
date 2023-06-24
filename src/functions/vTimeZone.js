'use strict';

import Is from '@valkyriestudios/utils/is';

export default function vTimeZone (val) {
    if (!Is.NotEmptyString(val)) return false;

    try {
        if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
            return false;
        }

        //  The following throws an error if timezone is not valid
        Intl.DateTimeFormat(undefined, {timeZone: val});

        return true;
    } catch (err) {
        return false;
    }
}
