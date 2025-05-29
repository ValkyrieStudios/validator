import {describe, it, expect} from 'vitest';
import {vEAN8, vEAN13, vEAN} from '../../../lib/functions/vEAN';
import CONSTANTS from '../../constants';

describe('Validation - EAN', () => {
    const validEAN8 = '12345670';   // Valid EAN-8 format
    const validEAN13 = '1234567890128'; // Valid EAN-13 format

    const invalidEANs = [
        '1234567',       // Too short for EAN-8
        '123456789012',  // Too short for EAN-13
        '12345678901234', // Too long for EAN-13
        'abcdefg8',      // Non-numeric characters in EAN-8
        '1234567x90128', // Non-numeric characters in EAN-13
        '123456789012x', // Non-numeric character at the end
        '',              // Empty string
    ];

    describe('vEAN8', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vEAN8(el)).toBe(false);
        });

        it('Does not see EAN-13 identifiers as valid', () => {
            expect(vEAN8(validEAN13)).toBe(false);
        });

        it('Does not see invalid EANs as valid', () => {
            for (const el of invalidEANs) {
                expect(vEAN8(el)).toBe(false);
            }
        });

        it('Correctly validates valid EAN-8 format', () => {
            expect(vEAN8(validEAN8)).toBe(true);
        });
    });

    describe('vEAN13', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vEAN13(el)).toBe(false);
        });

        it('Does not see EAN-8 identifiers as valid', () => {
            expect(vEAN13(validEAN8)).toBe(false);
        });

        it('Does not see invalid EANs as valid', () => {
            for (const el of invalidEANs) {
                expect(vEAN13(el)).toBe(false);
            }
        });

        it('Correctly validates valid EAN-13 format', () => {
            expect(vEAN13(validEAN13)).toBe(true);
        });
    });

    describe('vEAN', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vEAN(el)).toBe(false);
        });

        it('Does not see invalid EANs as valid', () => {
            for (const el of invalidEANs) {
                expect(vEAN(el)).toBe(false);
            }
        });

        it('Correctly validates any valid EAN-8 or EAN-13 format', () => {
            expect(vEAN(validEAN8)).toBe(true);
            expect(vEAN(validEAN13)).toBe(true);
        });
    });
});
