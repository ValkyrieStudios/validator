import {type Brand} from './_types';

const ISBN_10_RGX = /^(?:\d{9}X|\d{10})$/;
const ISBN_13_RGX = /^(?:\d{13})$/;

export type ISBN_10 = Brand<string, 'ISBN_10'>;
export type ISBN_13 = Brand<string, 'ISBN_13'>;
export type ISBN = ISBN_10 | ISBN_13;

/**
 * Validate that a provided value is a valid ISBN-10 identifier
 *
 * @param {unknown} val - Value to verify
 */
function vISBN10 (val: unknown): val is ISBN_10 {
    return typeof val === 'string' && ISBN_10_RGX.test(val);
}

/**
 * Validate that a provided value is a valid ISBN-13 identifier
 *
 * @param {unknown} val - Value to verify
 */
function vISBN13 (val: unknown): val is ISBN_13 {
    return typeof val === 'string' && ISBN_13_RGX.test(val);
}

/**
 * Validate that a provided value is a valid ISBN-10 or ISBN-13 identifier
 *
 * @param {unknown} val - Value to verify
 */
function vISBN (val:unknown): val is ISBN {
    return typeof val === 'string' && (ISBN_10_RGX.test(val) || ISBN_13_RGX.test(val));
}

export {vISBN10, vISBN13, vISBN};