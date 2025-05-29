import {describe, it, expect} from 'vitest';
import vSsn from '../../../lib/functions/vSSN';

describe('Validation - vSsn', () => {
    it('Correctly validates valid SSN formats', () => {
        expect(vSsn('123-45-6789')).toBe(true);
        expect(vSsn('987-65-4321')).toBe(true);
        expect(vSsn('001-01-0001')).toBe(true); // Valid format, though real SSNs may not start with "001"
    });

    it('Rejects invalid SSN formats', () => {
        expect(vSsn('123456789')).toBe(false); // Missing dashes
        expect(vSsn('123-45-678')).toBe(false); // Too short
        expect(vSsn('123-45-67890')).toBe(false); // Too long
        expect(vSsn('12-345-6789')).toBe(false); // Incorrect grouping
        expect(vSsn('abc-de-ghij')).toBe(false); // Non-numeric characters
        expect(vSsn('')).toBe(false); // Empty string
    });

    it('Rejects non-string inputs', () => {
        expect(vSsn(123456789)).toBe(false);
        expect(vSsn(null)).toBe(false);
        expect(vSsn(undefined)).toBe(false);
        expect(vSsn({})).toBe(false);
        expect(vSsn([])).toBe(false);
        expect(vSsn(true)).toBe(false);
    });

    it('Handles edge cases with leading and trailing spaces', () => {
        expect(vSsn(' 123-45-6789')).toBe(false); // Leading space
        expect(vSsn('123-45-6789 ')).toBe(false); // Trailing space
        expect(vSsn(' 123-45-6789 ')).toBe(false); // Leading and trailing spaces
    });

    it('Handles edge cases with additional formatting characters', () => {
        expect(vSsn('123.45.6789')).toBe(false); // Dots instead of dashes
        expect(vSsn('123/45/6789')).toBe(false); // Slashes instead of dashes
        expect(vSsn('123_45_6789')).toBe(false); // Underscores instead of dashes
    });
});
