import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import Validator from '../../../lib';

describe('vFile', () => {
    it('Should be invalid if not passed a file', () => {
        for (const el of CONSTANTS.NOT_FILE) {
            expect(new Validator({a: 'file'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'file', params: []}],
                },
            });
        }
    });

    it('Should be valid if passed a file', () => {
        for (const el of CONSTANTS.IS_FILE) {
            expect(new Validator({a: 'file'}).validate({a: el})).toEqual({
                is_valid: true,
                count: 0,
                errors: {},
            });
        }
    });
});
