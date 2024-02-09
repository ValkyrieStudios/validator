'use strict';

/**
 * Validate that a provided value is a valid date string
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vDateString (val:string|never):boolean {
    return (
        typeof val === 'string' &&
        val.trim().length > 0 &&
        !isNaN(Date.parse(val)) &&
        !isNaN(new Date(val).getTime())
    );
}
