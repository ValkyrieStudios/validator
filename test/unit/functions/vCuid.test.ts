import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import Validator from '../../../lib';

describe('vCuid', () => {
    const VALID_CUID = 'cjld2cjxh0000qzrmn831i7rn';

    it('Should be valid when passed a correct CUID', () => {
        expect(new Validator({a: 'cuid'}).check({a: VALID_CUID})).toBe(true);
    });

    it('Should be invalid when passed a non-string or empty after trimming string value', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            expect(new Validator({a: 'cuid'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'cuid', params: []}],
                },
            });
        }
    });

    it('Should be invalid when passed a string value below 25 characters', () => {
        for (let i = 1; i < 25; i++) {
            expect(new Validator({a: 'cuid'}).validate({a: VALID_CUID.substring(0, i)})).toEqual({
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'cuid', params: []}]},
            });
        }
    });

    it('Should be invalid when passed a string value above 25 characters', () => {
        expect(new Validator({a: 'cuid'}).validate({a: `${VALID_CUID}a`})).toEqual({
            is_valid: false,
            count: 1,
            errors: {a: [{msg: 'cuid', params: []}]},
        });
    });

    it('Should be invalid if it does not start with the lowercase letter "c"', () => {
        const badCuid = `d${VALID_CUID.substring(1)}`;
        expect(new Validator({a: 'cuid'}).validate({a: badCuid})).toEqual({
            is_valid: false,
            count: 1,
            errors: {a: [{msg: 'cuid', params: []}]},
        });
    });
});
