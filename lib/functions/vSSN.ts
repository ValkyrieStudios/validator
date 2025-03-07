import {type SSN} from '../types';

const RGX = /^\d{3}-\d{2}-\d{4}$/;

/**
 * Validate that a provided value is a valid format for a Social Security Number
 *
 * @param {unknown} val - Value to verify
 */
function vSSN (val: unknown): val is SSN {
    return typeof val === 'string' && RGX.test(val);
}

export {vSSN, vSSN as default};
