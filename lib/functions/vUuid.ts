import {
    type UUID_1,
    type UUID_2,
    type UUID_3,
    type UUID_4,
    type UUID_5,
    type UUID_6,
    type UUID_7,
    type UUID_8,
    type UUID,
} from '../types';

const UUID_V1_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V2_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-2[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V3_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V4_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V5_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V6_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-6[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V7_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_V8_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const UUID_RGX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function hasUuidDashes (val: unknown): val is string {
    return (
        typeof val === 'string' &&
        val.length === 36 &&
        val[8] === '-' &&
        val[13] === '-' &&
        val[18] === '-' &&
        val[23] === '-'
    );
}

/**
 * Validate that a provided value is a valid UUID according to RFC 4122
 */
function vUuid (val: unknown): val is UUID {
    return hasUuidDashes(val) && UUID_RGX.test(val);
}

/**
 * Validate that a provided value is a valid UUID v1
 */
function vUuidV1 (val: unknown): val is UUID_1 {
    return hasUuidDashes(val) && UUID_V1_RGX.test(val);
}

/**
 * Validate that a provided value is a valid UUID v2
 */
function vUuidV2 (val: unknown): val is UUID_2 {
    return hasUuidDashes(val) && UUID_V2_RGX.test(val);
}

/**
 * Validate that a provided value is a valid UUID v3
 */
function vUuidV3 (val: unknown): val is UUID_3 {
    return hasUuidDashes(val) && UUID_V3_RGX.test(val);
}

/**
 * Validate that a provided value is a valid UUID v4
 */
function vUuidV4 (val: unknown): val is UUID_4 {
    return hasUuidDashes(val) && UUID_V4_RGX.test(val);
}

/**
 * Validate that a provided value is a valid UUID v5
 */
function vUuidV5 (val: unknown): val is UUID_5 {
    return hasUuidDashes(val) && UUID_V5_RGX.test(val);
}

/**
 * Validate that a provided value is a valid UUID v6
 */
function vUuidV6 (val: unknown): val is UUID_6 {
    return hasUuidDashes(val) && UUID_V6_RGX.test(val);
}

/**
 * Validate that a provided value is a valid UUID v7
 */
function vUuidV7 (val: unknown): val is UUID_7 {
    return hasUuidDashes(val) && UUID_V7_RGX.test(val);
}

/**
 * Validate that a provided value is a valid UUID v8
 */
function vUuidV8 (val: unknown): val is UUID_8 {
    return hasUuidDashes(val) && UUID_V8_RGX.test(val);
}

export {vUuid, vUuidV1, vUuidV2, vUuidV3, vUuidV4, vUuidV5, vUuidV6, vUuidV7, vUuidV8};
