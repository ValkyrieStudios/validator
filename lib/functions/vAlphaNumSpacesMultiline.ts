'use strict';

/**
 * Validate that a value is a string which only contain alphabetical, numerical, spaces and line breaks
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vAlphaNumSpacesMultiline (val:string):boolean {
    return typeof val === 'string' && /^[a-zA-Z0-9\s]*$/igm.test(val);
}
