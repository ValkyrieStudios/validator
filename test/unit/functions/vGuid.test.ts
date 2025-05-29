import guid from '@valkyriestudios/utils/hash/guid';
import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import Validator from '../../../lib';

describe('vGuid', () => {
    it('Should be valid when passed a guid (10.000 runs)', () => {
        const v = new Validator({a: 'guid'});

        for (let i = 0; i < 10000; i++) {
            expect(v.check({a: guid()})).toBe(true);
        }
    });

    it('Should be invalid when passed a non-string or empty after trimming string value', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            expect(new Validator({a: 'guid'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'guid', params: []}],
                },
            });
        }
    });

    it('Should be invalid when passed a string value below 36 characters', () => {
        const uid = guid();
        for (let i = 1; i < 36; i++) {
            expect(new Validator({a: 'guid'}).validate({a: uid.substr(0, i)})).toEqual({
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'guid', params: []}]},
            });
        }
    });

    it('Should be invalid when passed a string value above 36', () => {
        let uid = guid();
        for (let i = 1; i <= 48; i++) {
            uid = `${uid}a`;
            expect(new Validator({a: 'guid'}).validate({a: uid})).toEqual({
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'guid', params: []}]},
            });
        }
    });

    it('Should be invalid when passed a string that is not a valid guid but has the same length as a guid', () => {
        expect(new Validator({a: 'guid'}).validate({a: 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'})).toEqual({
            is_valid: false,
            count: 1,
            errors: {a: [{msg: 'guid', params: []}]},
        });
    });
});
