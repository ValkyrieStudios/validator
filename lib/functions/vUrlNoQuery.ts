import {vUrl} from './vUrl';

/**
 * Validate that a provided value is a url without any query string values
 *
 * @param {unknown} val - Value to verify
 */
function vUrlNoQuery (val:unknown):val is string {
    return vUrl(val) && val.indexOf('?') < 0 && val.indexOf('&') < 0;
}

export {vUrlNoQuery, vUrlNoQuery as default};
