import {type Brand} from './_types';

const UUID_V1_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V2_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-2[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V3_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V4_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V5_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type UUID_1 = Brand<string, 'UUID_V1'>;
export type UUID_2 = Brand<string, 'UUID_V2'>;
export type UUID_3 = Brand<string, 'UUID_V3'>;
export type UUID_4 = Brand<string, 'UUID_V4'>;
export type UUID_5 = Brand<string, 'UUID_V5'>;
export type UUID = UUID_1 | UUID_2 | UUID_3 | UUID_4 | UUID_5;

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
