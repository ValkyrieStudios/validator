import {describe, it, expect} from 'vitest';
import {vISBN10, vISBN13, vISBN} from '../../../lib/functions/vISBN';
import CONSTANTS from '../../constants';

describe('Validation - ISBN', () => {
    const validISBN10 = '123456789X';   // Valid ISBN-10 with 'X' check digit
    const validISBN10Numeric = '1234567890'; // Valid ISBN-10 with numeric check digit
    const validISBN13 = '9781234567897'; // Valid ISBN-13 format

    const invalidISBNs = [
        '12345678X',       // Too short for ISBN-10
        '123456789012',    // Too short for ISBN-13
        '12345678901234',  // Too long for ISBN-13
        'abcdefghij',      // Non-numeric characters in ISBN-10
        '978123456789X',   // Non-numeric character in ISBN-13
        '1234567890X',     // Extra character in ISBN-10
        '978123456789012', // Too long for ISBN-13
        '',                // Empty string
    ];

    describe('vISBN10', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vISBN10(el)).toBe(false);
        });

        it('Does not see ISBN-13 identifiers as valid', () => {
            expect(vISBN10(validISBN13)).toBe(false);
        });

        it('Does not see invalid ISBNs as valid', () => {
            for (const el of invalidISBNs) {
                expect(vISBN10(el)).toBe(false);
            }
        });

        it('Correctly validates valid ISBN-10 format', () => {
            expect(vISBN10(validISBN10)).toBe(true);
            expect(vISBN10(validISBN10Numeric)).toBe(true);
        });
    });

    describe('vISBN13', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vISBN13(el)).toBe(false);
        });

        it('Does not see ISBN-10 identifiers as valid', () => {
            expect(vISBN13(validISBN10)).toBe(false);
            expect(vISBN13(validISBN10Numeric)).toBe(false);
        });

        it('Does not see invalid ISBNs as valid', () => {
            for (const el of invalidISBNs) {
                expect(vISBN13(el)).toBe(false);
            }
        });

        it('Correctly validates valid ISBN-13 format', () => {
            expect(vISBN13(validISBN13)).toBe(true);
        });
    });

    describe('vISBN', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vISBN(el)).toBe(false);
        });

        it('Does not see invalid ISBNs as valid', () => {
            for (const el of invalidISBNs) {
                expect(vISBN(el)).toBe(false);
            }
        });

        it('Correctly validates any valid ISBN-10 or ISBN-13 format', () => {
            expect(vISBN(validISBN10)).toBe(true);
            expect(vISBN(validISBN10Numeric)).toBe(true);
            expect(vISBN(validISBN13)).toBe(true);
        });
    });
});
