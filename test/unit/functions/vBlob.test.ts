import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import Validator from '../../../lib';

describe('vBlob', () => {
    it('Should be invalid if not passed a blob', () => {
        for (const el of CONSTANTS.NOT_BLOB) {
            expect(new Validator({a: 'blob'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'blob', params: []}],
                },
            });
        }
    });

    it('Should be valid if passed a file (as files extend blob)', () => {
        for (const el of CONSTANTS.IS_FILE) {
            expect(new Validator({a: 'blob'}).validate({a: el})).toEqual({
                is_valid: true,
                count: 0,
                errors: {},
            });
        }
    });

    it('Should be valid if passed a blob', () => {
        for (const el of CONSTANTS.IS_BLOB) {
            expect(new Validator({a: 'blob'}).validate({a: el})).toEqual({
                is_valid: true,
                count: 0,
                errors: {},
            });
        }
    });
});
