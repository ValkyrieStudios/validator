import {describe, it, expect} from 'vitest';
import Validator from '../../../lib';
import CONSTANTS from '../../constants';

describe('vLessThan', () => {
    it('Should be invalid when no params are passed', () => {
        expect(Validator.create({a: 'literal:'}).check({a: 'hello'})).toBe(false);
    });

    it('Should be invalid when params are passed but value is not a string with content', () => {
        const v = Validator.create({a: 'literal:hello'});
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            expect(v.check({a: el})).toBe(false);
        }
    });

    it('Should be invalid when params and value are passed but value is not equal to the param', () => {
        const v = Validator.create({a: 'literal:hello'});
        for (const el of [
            '  hello    ',
            ' hello',
            'hello ',
            'holla',
            'hella',
            'hellu',
            'foo',
            'bar',
        ]) expect(v.check({a: el})).toBe(false);
    });

    it('Should be valid when passed exactly the param value', () => {
        const v = Validator.create({a: 'literal:hello'});
        expect(v.check({a: 'hello'})).toBe(true);
    });
});
