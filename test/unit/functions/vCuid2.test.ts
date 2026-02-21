import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import Validator from '../../../lib';

describe('vCuid2', () => {
    const VALID_CUID2 = 'tz4a98xxat96iws9zmbrgj3a';

    it('Should be valid when passed a correct CUID2', () => {
        expect(new Validator({a: 'cuid_2'}).check({a: VALID_CUID2})).toBe(true);
    });

    it('Should be valid for the minimum allowed length (2 chars)', () => {
        expect(new Validator({a: 'cuid_2'}).check({a: 'a1'})).toBe(true);
    });

    it('Should be valid for the maximum allowed length (32 chars)', () => {
        expect(new Validator({a: 'cuid_2'}).check({a: 'a1234567890123456789012345678901'})).toBe(true);
    });

    it('Should be invalid when passed a non-string or empty after trimming string value', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            expect(new Validator({a: 'cuid_2'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'cuid_2', params: []}],
                },
            });
        }
    });

    it('Should be invalid if length is below 2 characters', () => {
        expect(new Validator({a: 'cuid_2'}).validate({a: 't'})).toEqual({
            is_valid: false,
            count: 1,
            errors: {a: [{msg: 'cuid_2', params: []}]},
        });
    });

    it('Should be invalid if length is above 32 characters', () => {
        expect(new Validator({a: 'cuid_2'}).validate({a: 'a12345678901234567890123456789012'})).toEqual({
            is_valid: false,
            count: 1,
            errors: {a: [{msg: 'cuid_2', params: []}]},
        });
    });

    it('Should be invalid if it starts with a number', () => {
        const badCuid = `1${VALID_CUID2.substring(1)}`;
        expect(new Validator({a: 'cuid_2'}).validate({a: badCuid})).toEqual({
            is_valid: false,
            count: 1,
            errors: {a: [{msg: 'cuid_2', params: []}]},
        });
    });

    it('Should be invalid if it contains uppercase characters', () => {
        const badCuid = `T${VALID_CUID2.substring(1)}`;
        expect(new Validator({a: 'cuid_2'}).validate({a: badCuid})).toEqual({
            is_valid: false,
            count: 1,
            errors: {a: [{msg: 'cuid_2', params: []}]},
        });
    });
});
