import {type Brand} from './_types';

const RGX = /^\d{3}-\d{2}-\d{4}$/;

export type SSN = Brand<string, 'SSN'>;

/**
 * Validate that a provided value is a valid format for a Social Security Number
 *
 * @param {unknown} val - Value to verify
 */
function vSSN (val: unknown): val is SSN {
    return typeof val === 'string' && RGX.test(val);
}

export {vSSN, vSSN as default};
