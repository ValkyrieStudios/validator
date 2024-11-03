import {describe, it} from 'node:test';
import * as assert from 'node:assert/strict';
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
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(vISBN10(el) === false);
        });

        it('Does not see ISBN-13 identifiers as valid', () => {
            assert.strictEqual(vISBN10(validISBN13), false);
        });

        it('Does not see invalid ISBNs as valid', () => {
            for (const el of invalidISBNs) {
                assert.strictEqual(vISBN10(el), false);
            }
        });

        it('Correctly validates valid ISBN-10 format', () => {
            assert.strictEqual(vISBN10(validISBN10), true);
            assert.strictEqual(vISBN10(validISBN10Numeric), true);
        });
    });

    describe('vISBN13', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(vISBN13(el) === false);
        });

        it('Does not see ISBN-10 identifiers as valid', () => {
            assert.strictEqual(vISBN13(validISBN10), false);
            assert.strictEqual(vISBN13(validISBN10Numeric), false);
        });

        it('Does not see invalid ISBNs as valid', () => {
            for (const el of invalidISBNs) {
                assert.strictEqual(vISBN13(el), false);
            }
        });

        it('Correctly validates valid ISBN-13 format', () => {
            assert.strictEqual(vISBN13(validISBN13), true);
        });
    });

    describe('vISBN', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(vISBN(el) === false);
        });

        it('Does not see invalid ISBNs as valid', () => {
            for (const el of invalidISBNs) {
                assert.strictEqual(vISBN(el), false);
            }
        });

        it('Correctly validates any valid ISBN-10 or ISBN-13 format', () => {
            assert.strictEqual(vISBN(validISBN10), true);
            assert.strictEqual(vISBN(validISBN10Numeric), true);
            assert.strictEqual(vISBN(validISBN13), true);
        });
    });
});
