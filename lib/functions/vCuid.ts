import {type CUID} from '../types';

/* CUIDs are always exactly 25 chars, starting with 'c', followed by base36 */
const CUID_RGX = /^c[a-z0-9]{24}$/i;

/**
 * Validate that a provided value is a valid classic CUID identifier
 *
 * @param {unknown} val - Value to verify
 */
function vCuid (val: unknown): val is CUID {
    /* Fast-path: Must be exactly 25 chars and start with 'c' (charCode 99) */
    return typeof val === 'string' &&
        val.length === 25 &&
        val.charCodeAt(0) === 99 &&
        CUID_RGX.test(val);
}

export {vCuid, vCuid as default};
