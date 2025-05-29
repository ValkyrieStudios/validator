import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import Validator from '../../../lib';

describe('vNull', () => {
    it('Should be invalid if not passed null', () => {
        for (const el of [...CONSTANTS.NOT_BOOLEAN, true, false]) {
            if (el === null) continue;
            expect(new Validator({a: 'null'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'null', params: []}],
                },
            });
        }
    });

    it('Should be valid if passed null', () => {
        expect(new Validator({a: 'null'}).validate({a: null})).toEqual({
            is_valid: true,
            count: 0,
            errors: {},
        });
    });

    it('Should be valid if passed null when working in a conditional group', () => {
        expect(new Validator({a: ['true', 'null']}).validate({a: null})).toEqual({
            is_valid: true,
            count: 0,
            errors: {},
        });

        expect(new Validator({a: ['true', 'null']}).validate({a: true})).toEqual({
            is_valid: true,
            count: 0,
            errors: {},
        });
    });
});
