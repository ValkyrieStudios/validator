import {type JWT} from '../types';

/* JWTs are Base64Url encoded (A-Z, a-z, 0-9, -, _) separated by two dots */
const JWT_RGX = /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/;

/**
 * Validate that a provided value is a valid JSON Web Token (JWT)
 *
 * @param {unknown} val - Value to verify
 */
function vJWT (val: unknown): val is JWT {
    return typeof val === 'string' && val.length > 15 && JWT_RGX.test(val);
}

export {vJWT, vJWT as default};
