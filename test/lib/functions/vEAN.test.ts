import {describe, it} from 'node:test';
import * as assert from 'node:assert/strict';
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
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(vEAN8(el) === false);
        });

        it('Does not see EAN-13 identifiers as valid', () => {
            assert.strictEqual(vEAN8(validEAN13), false);
        });

        it('Does not see invalid EANs as valid', () => {
            for (const el of invalidEANs) {
                assert.strictEqual(vEAN8(el), false);
            }
        });

        it('Correctly validates valid EAN-8 format', () => {
            assert.strictEqual(vEAN8(validEAN8), true);
        });
    });

    describe('vEAN13', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(vEAN13(el) === false);
        });

        it('Does not see EAN-8 identifiers as valid', () => {
            assert.strictEqual(vEAN13(validEAN8), false);
        });

        it('Does not see invalid EANs as valid', () => {
            for (const el of invalidEANs) {
                assert.strictEqual(vEAN13(el), false);
            }
        });

        it('Correctly validates valid EAN-13 format', () => {
            assert.strictEqual(vEAN13(validEAN13), true);
        });
    });

    describe('vEAN', () => {
        it('Should not be valid for a non/empty string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(vEAN(el) === false);
        });

        it('Does not see invalid EANs as valid', () => {
            for (const el of invalidEANs) {
                assert.strictEqual(vEAN(el), false);
            }
        });

        it('Correctly validates any valid EAN-8 or EAN-13 format', () => {
            assert.strictEqual(vEAN(validEAN8), true);
            assert.strictEqual(vEAN(validEAN13), true);
        });
    });
});
