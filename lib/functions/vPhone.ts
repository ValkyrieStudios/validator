import {type Phone} from '../types';

const RGX = /^\+?\d{0,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

/**
 * Validate that a string is a valid phone number (will match phone numbers entered with
 * delimiters such as spaces, dots, brackets, etc, and supports international phone numbers)
 * Take Note: Does not check that the phone number is in use
 *
 * @param {unknown} val - Value to verify
 */
function vPhone (val:unknown):val is Phone {
    if (typeof val !== 'string') return false;

    /* If number of digits is less than 5, return false */
    if ((val.match(/\d/g) || []).length < 5) return false;

    /* Check parts */
    const sparts = val.replace(/(\.|-)/g, ' ').split(' ');
    for (const el of sparts) {
        const first = el[0];
        const last  = el[el.length - 1];
        if (first === '(' && last !== ')') return false;
        if (last === ')' && first !== '(') return false;
    }

    /* Will match phone numbers entered with delimiters (spaces, dots, brackets and dashes) */
    return RGX.test(val);
}

export {vPhone, vPhone as default};
