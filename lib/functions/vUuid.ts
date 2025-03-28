import {
    type UUID_1,
    type UUID_2,
    type UUID_3,
    type UUID_4,
    type UUID_5,
    type UUID,
} from '../types';

const UUID_V1_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V2_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-2[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V3_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V4_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V5_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Validate that a provided value is a valid UUID according to RFC 4122
 *
 * @param {unknown} val - Value to verify
 */
function vUuid (val: unknown): val is UUID {
    return typeof val === 'string' && val.length === 36 && UUID_RGX.test(val);
}

/**
 * Validate that a provided value is a valid UUID v1 according to RFC 4122
 *
 * @param {unknown} val - Value to verify
 */
function vUuidV1 (val: unknown): val is UUID_1 {
    return typeof val === 'string' && val.length === 36 && UUID_V1_RGX.test(val);
}

/**
 * Validate that a provided value is a valid UUID v2 according to RFC 4122
 *
 * @param {unknown} val - Value to verify
 */
function vUuidV2 (val: unknown): val is UUID_2 {
    return typeof val === 'string' && val.length === 36 && UUID_V2_RGX.test(val);
}

/**
 * Validate that a provided value is a valid UUID v3 according to RFC 4122
 *
 * @param {unknown} val - Value to verify
 */
function vUuidV3 (val: unknown): val is UUID_3 {
    return typeof val === 'string' && val.length === 36 && UUID_V3_RGX.test(val);
}

/**
 * Validate that a provided value is a valid UUID v4 according to RFC 4122
 *
 * @param {unknown} val - Value to verify
 */
function vUuidV4 (val: unknown): val is UUID_4 {
    return typeof val === 'string' && val.length === 36 && UUID_V4_RGX.test(val);
}

/**
 * Validate that a provided value is a valid UUID v5 according to RFC 4122
 *
 * @param {unknown} val - Value to verify
 */
function vUuidV5 (val: unknown): val is UUID_5 {
    return typeof val === 'string' && val.length === 36 && UUID_V5_RGX.test(val);
}

export {vUuid, vUuidV1, vUuidV2, vUuidV3, vUuidV4, vUuidV5};
