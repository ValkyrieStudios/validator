import {type Brand} from './_types';

const RGX = /^[0-9A-HJKMNP-TV-Z]{26}$/i;

export type ULID = Brand<string, 'ULID'>;

/**
 * Validate that a provided value is a valid ulid
 *
 * @param {unknown} val - Value to verify
 */
function vUlid (val: unknown): val is ULID {
    return typeof val === 'string' && RGX.test(val);
}

export {vUlid, vUlid as default};
