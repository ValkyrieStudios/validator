'use strict';

import {vUrl} from './vUrl';

/**
 * Validate that a provided value is a url without any query string values
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vUrlNoQuery (val:string):boolean {
    return vUrl(val) && val.indexOf('?') < 0 && val.indexOf('&') < 0;
}

export {vUrlNoQuery, vUrlNoQuery as default};
