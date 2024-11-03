import {describe, it} from 'node:test';
import * as assert from 'node:assert/strict';
import vUlid from '../../../lib/functions/vUlid';
import CONSTANTS from '../../constants';

describe('Validation - ULID', () => {
    const validUlid = '01ARZ3NDEKTSV4RRFFQ69G5FAV'; // 26-character uppercase alphanumeric string

    const invalidUlids = [
        '01ARZ3NDEKTSV4RRFFQ69G5FA',   // Too short (25 characters)
        '01ARZ3NDEKTSV4RRFFQ69G5FAVA', // Too long (27 characters)
        '01ARZ3NDEKTSV4RRFFQ69G5faV',  // Lowercase character included
        '01ARZ3NDEKTSV4R!FFQ69G5FAV',  // Special character (!)
        '0123456789ABCDEFGHIJKLMNOPQ', // Contains unsupported letters (P, Q)
        '',                            // Empty string
    ];

    it('Should not be valid for a non/empty string', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(vUlid(el) === false);
    });

    it('Does not see invalid ULIDs as valid', () => {
        for (const el of invalidUlids) {
            assert.strictEqual(vUlid(el), false);
        }
    });

    it('Correctly validates valid ULID format', () => {
        assert.strictEqual(vUlid(validUlid), true);
    });
});
