'use strict';

export default function vAlphaNumSpacesMultiline (val) {
    return typeof val === 'string' && /^[a-zA-Z0-9\s]*$/igm.test(val);
}
