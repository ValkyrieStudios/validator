import {type CUID2} from '../types';

/* Cuid2 starts with a lowercase letter, followed by 1 to 31 lowercase base36 chars */
const CUID2_RGX = /^[a-z][a-z0-9]{1,31}$/;

/**
 * Validate that a provided value is a valid Cuid2 identifier
 *
 * @param {unknown} val - Value to verify
 */
function vCuid2 (val: unknown): val is CUID2 {
    return typeof val === 'string' && val.length >= 2 && val.length <= 32 && CUID2_RGX.test(val);
}

export {vCuid2, vCuid2 as default};
