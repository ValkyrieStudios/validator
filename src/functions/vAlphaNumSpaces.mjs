'use strict';

export default function vAlphaNumSpaces (val) {
    return typeof val === 'string' && /^[a-zA-Z0-9 ]*$/ig.test(val);
}
