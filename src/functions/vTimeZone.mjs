'use strict';

export default function vTimeZone (val) {
    if (typeof val !== 'string' || val.trim().length === 0) return false;

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
