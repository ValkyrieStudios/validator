'use strict';

import Is from '@valkyriestudios/utils/is';

export default function vPhone (val) {
    return (
        Is.NotEmptyString(val) &&
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(val)
    );
}