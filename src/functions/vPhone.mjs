'use strict';

export default function vPhone (val) {
    if (typeof val !== 'string' || val.trim().length === 0) return false;

    //  If number of digits is less than 5, return false
    if ((val.match(/\d/g) || []).length < 5) return false;

    //	Check parts
    const sparts = `${val}`.replace(/\./g, ' ').replace(/-/g, ' ').split(' ').map(el => el.trim());
    for (const el of sparts) {
        if (el.startsWith('(') && !el.endsWith(')')) return false;
        if (el.endsWith(')') && !el.startsWith('(')) return false;
    }

    //	Will match phone numbers entered with delimiters (spaces, dots, brackets and dashes)
    return /^\+?\d{0,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(val);
}
