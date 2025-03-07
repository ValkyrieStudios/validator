import {
    type EAN_8,
    type EAN_13,
    type EAN,
} from '../types';

const EAN_8_RGX = /^\d{8}$/;
const EAN_13_RGX = /^\d{13}$/;

/* https://euro-chamber.eu/product/european-article-number-ean/ */

/**
 * Validate that a provided value is a valid EAN-8 identifier
 *
 * @param {unknown} val - Value to verify
 */
function vEAN8 (val: unknown): val is EAN_8 {
    return typeof val === 'string' && EAN_8_RGX.test(val);
}

/**
 * Validate that a provided value is a valid EAN-13 identifier
 *
 * @param {unknown} val - Value to verify
 */
function vEAN13 (val: unknown): val is EAN_13 {
    return typeof val === 'string' && EAN_13_RGX.test(val);
}

/**
 * Validate that a provided value is a valid EAN-8 or EAN-13 identifier
 *
 * @param {unknown} val - Value to verify
 */
function vEAN (val:unknown): val is EAN {
    return typeof val === 'string' && (EAN_8_RGX.test(val) || EAN_13_RGX.test(val));
}

export {vEAN8, vEAN13, vEAN};
