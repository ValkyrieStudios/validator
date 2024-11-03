import {describe, it} from 'node:test';
import * as assert from 'node:assert/strict';
import vSsn from '../../../lib/functions/vSSN';

describe('Validation - vSsn', () => {
    it('Correctly validates valid SSN formats', () => {
        assert.strictEqual(vSsn('123-45-6789'), true);
        assert.strictEqual(vSsn('987-65-4321'), true);
        assert.strictEqual(vSsn('001-01-0001'), true); // Valid format, though real SSNs may not start with "001"
    });

    it('Rejects invalid SSN formats', () => {
        assert.strictEqual(vSsn('123456789'), false); // Missing dashes
        assert.strictEqual(vSsn('123-45-678'), false); // Too short
        assert.strictEqual(vSsn('123-45-67890'), false); // Too long
        assert.strictEqual(vSsn('12-345-6789'), false); // Incorrect grouping
        assert.strictEqual(vSsn('abc-de-ghij'), false); // Non-numeric characters
        assert.strictEqual(vSsn(''), false); // Empty string
    });

    it('Rejects non-string inputs', () => {
        assert.strictEqual(vSsn(123456789), false);
        assert.strictEqual(vSsn(null), false);
        assert.strictEqual(vSsn(undefined), false);
        assert.strictEqual(vSsn({}), false);
        assert.strictEqual(vSsn([]), false);
        assert.strictEqual(vSsn(true), false);
    });

    it('Handles edge cases with leading and trailing spaces', () => {
        assert.strictEqual(vSsn(' 123-45-6789'), false); // Leading space
        assert.strictEqual(vSsn('123-45-6789 '), false); // Trailing space
        assert.strictEqual(vSsn(' 123-45-6789 '), false); // Leading and trailing spaces
    });

    it('Handles edge cases with additional formatting characters', () => {
        assert.strictEqual(vSsn('123.45.6789'), false); // Dots instead of dashes
        assert.strictEqual(vSsn('123/45/6789'), false); // Slashes instead of dashes
        assert.strictEqual(vSsn('123_45_6789'), false); // Underscores instead of dashes
    });
});
