import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import Validator from '../../../lib';

describe('vTrue', () => {
    it('Should be invalid if not passed a boolean', () => {
        for (const el of CONSTANTS.NOT_BOOLEAN) {
            expect(new Validator({a: 'true'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {a: [{msg: el === undefined ? 'not_found' : 'true', params: []}]},
            });
        }
    });

    it('Should be invalid if passed false', () => {
        expect(new Validator({a: 'true'}).validate({a: false})).toEqual({
            is_valid: false,
            count: 1,
            errors: {a: [{msg: 'true', params: []}]},
        });
    });

    it('Should be valid if passed true', () => {
        expect(new Validator({a: 'true'}).validate({a: true})).toEqual({
            is_valid: true,
            count: 0,
            errors: {},
        });
    });
});
