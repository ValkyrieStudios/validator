'use strict';

import vUrl from './vUrl.mjs';

export default function vUrlNoQuery (val) {
    return vUrl(val) && val.indexOf('?') < 0 && val.indexOf('&') < 0;
}
