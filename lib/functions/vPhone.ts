'use strict';

/**
 * Validate that a string is a valid phone number (will match phone numbers entered with
 * delimiters such as spaces, dots, brackets, etc, and supports international phone numbers)
 * Take Note: Does not check that the phone number is in use
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vPhone (val:string):boolean {
    if (typeof val !== 'string' || val.trim().length === 0) return false;

    /* If number of digits is less than 5, return false */
    if ((val.match(/\d/g) || []).length < 5) return false;

    //  Check parts
    const sparts = `${val}`.replace(/(\.|-)/g, ' ').split(' ').map(el => el.trim());
    for (const el of sparts) {
        if (el.charAt(0) === '(' && el.charAt(el.length - 1) !== ')') return false;
        if (el.charAt(el.length - 1) === ')' && el.charAt(0) !== '(') return false;
    }

    //  Will match phone numbers entered with delimiters (spaces, dots, brackets and dashes)
    return /^\+?\d{0,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(val);
}
