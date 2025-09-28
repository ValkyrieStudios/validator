import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import {
    vUuidV1,
    vUuidV2,
    vUuidV3,
    vUuidV4,
    vUuidV5,
    vUuidV6,
    vUuidV7,
    vUuidV8,
    vUuid,
} from '../../../lib/functions/vUuid';

describe('Validation - UUID', () => {
    const validUuidV1 = '550e8400-e29b-11d4-a716-446655440000';
    const validUuidV2 = '550e8400-e29b-21d4-a716-446655440000';
    const validUuidV3 = '550e8400-e29b-31d4-a716-446655440000';
    const validUuidV4 = '550e8400-e29b-41d4-a716-446655440000';
    const validUuidV5 = '550e8400-e29b-51d4-a716-446655440000';
    const validUuidV6 = '550e8400-e29b-61d4-a716-446655440000';
    const validUuidV7 = '550e8400-e29b-71d4-a716-446655440000';
    const validUuidV8 = '550e8400-e29b-81d4-a716-446655440000';

    const invalidUuids = [
        '1234567890abcdef1234567890abcdef',         // Missing dashes
        '12345678-1234-1234-1234-123456789',        // Too short
        '12345678-1234-1234-1234-1234567890123',    // Too long
        '12345678-1234-9234-1234-123456789012',     // Invalid version (9)
        'g2345678-1234-1234-1234-123456789012',     // Invalid character (non-hex)
        '12345678_1234-1234-1234-123456789012',     // Underscore instead of dash
        '12345678-1234.1234-1234-123456789012',     // Dot instead of dash
        '1234-5678-1234-1234-123456789012',         // Incorrect dash placement
        '550e8400-e29b-41d4-a716-44665544000',      // Missing last character
        '550e8400-e29b-41d4-a716-44665544000000',   // Extra characters at the end
        'abcd-efgh-ijkl-mnop-qrstuvwx-yz123456',    // Random alphanumeric string with hyphens
        '550e8400e29b41d4a716446655440000',         // Missing dashes entirely
        '550E8400-E29B-91D4-A716-446655440000',     // UUIDs are case-insensitive, but this would fail for inexistent version 9
        '550e8400-e29b-61d4-a716-4466554400zz',     // Hex-encoded with invalid 'zz' suffix
    ];

    describe('vUuid1', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vUuidV1(el)).toBe(false);
        });

        it('Does not see other version uuids as valid', () => {
            expect(vUuidV1(validUuidV2)).toBe(false);
            expect(vUuidV1(validUuidV3)).toBe(false);
            expect(vUuidV1(validUuidV4)).toBe(false);
            expect(vUuidV1(validUuidV5)).toBe(false);
            expect(vUuidV5(validUuidV6)).toBe(false);
            expect(vUuidV5(validUuidV7)).toBe(false);
            expect(vUuidV5(validUuidV8)).toBe(false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                expect(vUuidV1(el)).toBe(false);
            }
        });

        it('Correctly validates format', () => {
            expect(vUuidV1(validUuidV1)).toBe(true);
        });
    });

    describe('vUuid2', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vUuidV2(el)).toBe(false);
        });

        it('Does not see other version uuids as valid', () => {
            expect(vUuidV2(validUuidV1)).toBe(false);
            expect(vUuidV2(validUuidV3)).toBe(false);
            expect(vUuidV2(validUuidV4)).toBe(false);
            expect(vUuidV2(validUuidV5)).toBe(false);
            expect(vUuidV5(validUuidV6)).toBe(false);
            expect(vUuidV5(validUuidV7)).toBe(false);
            expect(vUuidV5(validUuidV8)).toBe(false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                expect(vUuidV2(el)).toBe(false);
            }
        });

        it('Correctly validates format', () => {
            expect(vUuidV2(validUuidV2)).toBe(true);
            expect(vUuidV2(validUuidV1)).toBe(false);
        });
    });

    describe('vUuid3', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vUuidV3(el)).toBe(false);
        });

        it('Does not see other version uuids as valid', () => {
            expect(vUuidV3(validUuidV1)).toBe(false);
            expect(vUuidV3(validUuidV2)).toBe(false);
            expect(vUuidV3(validUuidV4)).toBe(false);
            expect(vUuidV3(validUuidV5)).toBe(false);
            expect(vUuidV5(validUuidV6)).toBe(false);
            expect(vUuidV5(validUuidV7)).toBe(false);
            expect(vUuidV5(validUuidV8)).toBe(false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                expect(vUuidV3(el)).toBe(false);
            }
        });

        it('Correctly validates format', () => {
            expect(vUuidV3(validUuidV3)).toBe(true);
            expect(vUuidV3(validUuidV1)).toBe(false);
        });
    });

    describe('vUuid4', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vUuidV4(el)).toBe(false);
        });

        it('Does not see other version uuids as valid', () => {
            expect(vUuidV4(validUuidV1)).toBe(false);
            expect(vUuidV4(validUuidV2)).toBe(false);
            expect(vUuidV4(validUuidV3)).toBe(false);
            expect(vUuidV4(validUuidV5)).toBe(false);
            expect(vUuidV5(validUuidV6)).toBe(false);
            expect(vUuidV5(validUuidV7)).toBe(false);
            expect(vUuidV5(validUuidV8)).toBe(false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                expect(vUuidV4(el)).toBe(false);
            }
        });

        it('Correctly validates format', () => {
            expect(vUuidV4(validUuidV4)).toBe(true);
            expect(vUuidV4(validUuidV1)).toBe(false);
        });
    });

    describe('vUuid5', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vUuidV5(el)).toBe(false);
        });

        it('Does not see other version uuids as valid', () => {
            expect(vUuidV5(validUuidV1)).toBe(false);
            expect(vUuidV5(validUuidV2)).toBe(false);
            expect(vUuidV5(validUuidV3)).toBe(false);
            expect(vUuidV5(validUuidV4)).toBe(false);
            expect(vUuidV5(validUuidV6)).toBe(false);
            expect(vUuidV5(validUuidV7)).toBe(false);
            expect(vUuidV5(validUuidV8)).toBe(false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                expect(vUuidV5(el)).toBe(false);
            }
        });

        it('Correctly validates format', () => {
            expect(vUuidV5(validUuidV5)).toBe(true);
            expect(vUuidV5(validUuidV1)).toBe(false);
        });
    });

    describe('vUuid6', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vUuidV6(el)).toBe(false);
        });

        it('Does not see other version uuids as valid', () => {
            expect(vUuidV6(validUuidV1)).toBe(false);
            expect(vUuidV6(validUuidV2)).toBe(false);
            expect(vUuidV6(validUuidV3)).toBe(false);
            expect(vUuidV6(validUuidV4)).toBe(false);
            expect(vUuidV6(validUuidV5)).toBe(false);
            expect(vUuidV6(validUuidV7)).toBe(false);
            expect(vUuidV6(validUuidV8)).toBe(false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                expect(vUuidV6(el)).toBe(false);
            }
        });

        it('Correctly validates format', () => {
            expect(vUuidV6(validUuidV6)).toBe(true);
        });
    });

    describe('vUuid7', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vUuidV7(el)).toBe(false);
        });

        it('Does not see other version uuids as valid', () => {
            expect(vUuidV7(validUuidV1)).toBe(false);
            expect(vUuidV7(validUuidV2)).toBe(false);
            expect(vUuidV7(validUuidV3)).toBe(false);
            expect(vUuidV7(validUuidV4)).toBe(false);
            expect(vUuidV7(validUuidV5)).toBe(false);
            expect(vUuidV7(validUuidV6)).toBe(false);
            expect(vUuidV7(validUuidV8)).toBe(false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                expect(vUuidV7(el)).toBe(false);
            }
        });

        it('Correctly validates format', () => {
            expect(vUuidV7(validUuidV7)).toBe(true);
        });
    });

    describe('vUuid8', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vUuidV8(el)).toBe(false);
        });

        it('Does not see other version uuids as valid', () => {
            expect(vUuidV8(validUuidV1)).toBe(false);
            expect(vUuidV8(validUuidV2)).toBe(false);
            expect(vUuidV8(validUuidV3)).toBe(false);
            expect(vUuidV8(validUuidV4)).toBe(false);
            expect(vUuidV8(validUuidV5)).toBe(false);
            expect(vUuidV8(validUuidV6)).toBe(false);
            expect(vUuidV8(validUuidV7)).toBe(false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                expect(vUuidV8(el)).toBe(false);
            }
        });

        it('Correctly validates format', () => {
            expect(vUuidV8(validUuidV8)).toBe(true);
        });
    });

    describe('vUuid', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vUuid(el)).toBe(false);
        });

        it('Does not see non-uuids as valid', () => {
            for (const el of invalidUuids) {
                expect(vUuid(el)).toBe(false);
            }
        });

        it('Correctly validates any UUID format (v1 to v5)', () => {
            expect(vUuid(validUuidV1)).toBe(true);
            expect(vUuid(validUuidV2)).toBe(true);
            expect(vUuid(validUuidV3)).toBe(true);
            expect(vUuid(validUuidV4)).toBe(true);
            expect(vUuid(validUuidV5)).toBe(true);
            expect(vUuid(validUuidV6)).toBe(true);
            expect(vUuid(validUuidV7)).toBe(true);
            expect(vUuid(validUuidV8)).toBe(true);
        });
    });
});
