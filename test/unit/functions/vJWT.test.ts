import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import Validator from '../../../lib';

describe('vJWT', () => {
    // eslint-disable-next-line max-len
    const VALID_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    it('Should be valid when passed a correct JWT', () => {
        expect(new Validator({a: 'jwt'}).check({a: VALID_JWT})).toBe(true);
    });

    it('Should be invalid when passed a non-string or empty after trimming string value', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            expect(new Validator({a: 'jwt'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'jwt', params: []}],
                },
            });
        }
    });

    it('Should be invalid when passed a string below the practical 15 character limit', () => {
        expect(new Validator({a: 'jwt'}).validate({a: 'a.b.c'})).toEqual({
            is_valid: false,
            count: 1,
            errors: {a: [{msg: 'jwt', params: []}]},
        });
    });

    it('Should be invalid when the structure lacks the correct number of dots', () => {
        const badJwts = [
            VALID_JWT.replace(/\./g, ''), // 0 dots
            VALID_JWT.substring(0, VALID_JWT.lastIndexOf('.')), // 1 dot
            `${VALID_JWT}.extra`, // 3 dots
        ];

        for (const bad of badJwts) {
            expect(new Validator({a: 'jwt'}).validate({a: bad})).toEqual({
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'jwt', params: []}]},
            });
        }
    });

    it('Should be invalid when containing non-Base64Url characters', () => {
        const badJwt = VALID_JWT.replace('SflK', 'Sfl@');
        expect(new Validator({a: 'jwt'}).validate({a: badJwt})).toEqual({
            is_valid: false,
            count: 1,
            errors: {a: [{msg: 'jwt', params: []}]},
        });
    });
});
