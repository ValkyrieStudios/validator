import {describe, it, expect} from 'vitest';
import vUlid from '../../../lib/functions/vUlid';
import CONSTANTS from '../../constants';

describe('Validation - ULID', () => {
    const invalidUlids = [
        '01ARZ3NDEKTSV4RRFFQ69G5FA',    // Too short (25 characters)
        '01ARZ3NDEKTSV4RRFFQ69G5FAVA',  // Too long (27 characters)
        '01ARZ3NDEKTSV4R!FFQ69G5FAV',   // Special character (!)
        '01ARZ3NDEKTSV4RRFFQ69G5FAI',   // Contains unsupported letter 'I'
        '01ARZ3NDEKTSV4RRFFQ69G5FAL',   // Contains unsupported letter 'L'
        '01ARZ3NDEKTSV4RRFFQ69G5FAO',   // Contains unsupported letter 'O'
        '01ARZ3NDEKTSV4RRFFQ69G5FAU',   // Contains unsupported letter 'U'
        '',                             // Empty string
    ];

    const validUlids = [
        '01ARZ3NDEKTSV4RRFFQ69G5FAV',   // Typical valid ULID
        '01B4EJZ23X8PQV4RR9MSZ6SR87',   // Another valid ULID with different characters
        '01BX5ZZKBKACTAV9WEVGEMMVRY',   // ULID with max range for time and randomness
        '01C94F3N3BZ9AJ6Y8FG7MZ7S5Z',   // Another valid ULID within range
        '01D78XYFJ49KXAF3TC6MKP9VYZ',   // Different mix of valid characters
        '01ARZ3NDEKTSV4RRFFQ69G5faV',   // Lowercase character included
    ];

    it('Should not be valid for a non/empty string', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) expect(vUlid(el)).toBe(false);
    });

    it('Does not see invalid ULIDs as valid', () => {
        for (const el of invalidUlids) {
            expect(vUlid(el)).toBe(false);
        }
    });

    it('Correctly validates valid ULID format', () => {
        for (const el of validUlids) {
            expect(vUlid(el)).toBe(true);
        }
    });
});
