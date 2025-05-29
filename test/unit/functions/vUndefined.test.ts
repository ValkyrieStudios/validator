import {describe, it, expect} from 'vitest';
import Validator from '../../../lib';
import vUndefined from '../../../lib/functions/vUndefined';

describe('vUndefined', () => {
    it('Should be valid if passed undefined', () => {
        expect(
            new Validator({a: '?'}).validate({a: undefined})
        ).toEqual({is_valid: true, count: 0, errors: {}});
        expect(vUndefined(undefined)).toBe(true);
    });

    it('Should be invalid if passed a value', () => {
        expect(!vUndefined('hi')).toBe(true);
    });

    it('Should be valid if does not exist', () => {
        expect(
            new Validator({a: '?'}).validate({})
        ).toEqual({is_valid: true, count: 0, errors: {}});
    });

    it('Should be valid if passed undefined when working in a conditional group', () => {
        expect(
            new Validator({a: ['true', '?']}).validate({a: undefined})
        ).toEqual({is_valid: true, count: 0, errors: {}});

        expect(
            new Validator({a: ['true', '?']}).validate({})
        ).toEqual({is_valid: true, count: 0, errors: {}});

        expect(
            new Validator({a: ['true', '?']}).validate({a: true})
        ).toEqual({is_valid: true, count: 0, errors: {}});
    });
});
