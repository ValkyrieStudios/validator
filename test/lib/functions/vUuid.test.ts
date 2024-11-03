import {describe, it} from 'node:test';
import * as assert from 'node:assert/strict';
import CONSTANTS from '../../constants';
import {vUuidV1, vUuidV2, vUuidV3, vUuidV4, vUuidV5, vUuid} from '../../../lib/functions/vUuid';

describe('Validation - UUID', () => {
    const validUuidV1 = '550e8400-e29b-11d4-a716-446655440000';
    const validUuidV2 = '550e8400-e29b-21d4-a716-446655440000';
    const validUuidV3 = '550e8400-e29b-31d4-a716-446655440000';
    const validUuidV4 = '550e8400-e29b-41d4-a716-446655440000';
    const validUuidV5 = '550e8400-e29b-51d4-a716-446655440000';

    const invalidUuids = [
        '1234567890abcdef1234567890abcdef',    // Missing dashes
        '12345678-1234-1234-1234-123456789',   // Too short
        '12345678-1234-1234-1234-1234567890123', // Too long
        '12345678-1234-6234-1234-123456789012', // Invalid version (6)
        'g2345678-1234-1234-1234-123456789012', // Invalid character (non-hex)
        '12345678_1234-1234-1234-123456789012', // Underscore instead of dash
        '12345678-1234.1234-1234-123456789012', // Dot instead of dash
        '1234-5678-1234-1234-123456789012',     // Incorrect dash placement
        '550e8400-e29b-41d4-a716-44665544000',  // Missing last character
        '550e8400-e29b-41d4-a716-44665544000000', // Extra characters at the end
        'abcd-efgh-ijkl-mnop-qrstuvwx-yz123456', // Random alphanumeric string with hyphens
        '550e8400e29b41d4a716446655440000',      // Missing dashes entirely
        '550E8400-E29B-61D4-A716-446655440000',  // UUIDs are case-insensitive, but this would fail for inexistent version 6
        '550e8400-e29b-61d4-a716-4466554400zz',  // Hex-encoded with invalid 'zz' suffix
    ];

    describe('vUuid1', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(vUuidV1(el) === false);
        });

        it('Does not see other version uuids as valid', () => {
            assert.strictEqual(vUuidV1(validUuidV2), false);
            assert.strictEqual(vUuidV1(validUuidV3), false);
            assert.strictEqual(vUuidV1(validUuidV4), false);
            assert.strictEqual(vUuidV1(validUuidV5), false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                assert.strictEqual(vUuidV1(el), false);
            }
        });

        it('Correctly validates format', () => {
            assert.strictEqual(vUuidV1(validUuidV1), true);
        });
    });

    describe('vUuid2', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(vUuidV2(el) === false);
        });

        it('Does not see other version uuids as valid', () => {
            assert.strictEqual(vUuidV2(validUuidV1), false);
            assert.strictEqual(vUuidV2(validUuidV3), false);
            assert.strictEqual(vUuidV2(validUuidV4), false);
            assert.strictEqual(vUuidV2(validUuidV5), false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                assert.strictEqual(vUuidV2(el), false);
            }
        });

        it('Correctly validates format', () => {
            assert.strictEqual(vUuidV2(validUuidV2), true);
            assert.strictEqual(vUuidV2(validUuidV1), false);
        });
    });

    describe('vUuid3', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(vUuidV3(el) === false);
        });

        it('Does not see other version uuids as valid', () => {
            assert.strictEqual(vUuidV3(validUuidV1), false);
            assert.strictEqual(vUuidV3(validUuidV2), false);
            assert.strictEqual(vUuidV3(validUuidV4), false);
            assert.strictEqual(vUuidV3(validUuidV5), false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                assert.strictEqual(vUuidV3(el), false);
            }
        });

        it('Correctly validates format', () => {
            assert.strictEqual(vUuidV3(validUuidV3), true);
            assert.strictEqual(vUuidV3(validUuidV1), false);
        });
    });

    describe('vUuid4', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(vUuidV4(el) === false);
        });

        it('Does not see other version uuids as valid', () => {
            assert.strictEqual(vUuidV4(validUuidV1), false);
            assert.strictEqual(vUuidV4(validUuidV2), false);
            assert.strictEqual(vUuidV4(validUuidV3), false);
            assert.strictEqual(vUuidV4(validUuidV5), false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                assert.strictEqual(vUuidV4(el), false);
            }
        });

        it('Correctly validates format', () => {
            assert.strictEqual(vUuidV4(validUuidV4), true);
            assert.strictEqual(vUuidV4(validUuidV1), false);
        });
    });

    describe('vUuid5', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(vUuidV5(el) === false);
        });

        it('Does not see other version uuids as valid', () => {
            assert.strictEqual(vUuidV5(validUuidV1), false);
            assert.strictEqual(vUuidV5(validUuidV2), false);
            assert.strictEqual(vUuidV5(validUuidV3), false);
            assert.strictEqual(vUuidV5(validUuidV4), false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                assert.strictEqual(vUuidV5(el), false);
            }
        });

        it('Correctly validates format', () => {
            assert.strictEqual(vUuidV5(validUuidV5), true);
            assert.strictEqual(vUuidV5(validUuidV1), false);
        });
    });

    describe('vUuid', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(vUuid(el) === false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                assert.strictEqual(vUuid(el), false);
            }
        });

        it('Correctly validates any UUID format (v1 to v5)', () => {
            assert.strictEqual(vUuid(validUuidV1), true);
            assert.strictEqual(vUuid(validUuidV2), true);
            assert.strictEqual(vUuid(validUuidV3), true);
            assert.strictEqual(vUuid(validUuidV4), true);
            assert.strictEqual(vUuid(validUuidV5), true);
        });
    });
});
