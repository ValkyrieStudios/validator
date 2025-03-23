import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import Validator        from '../../../lib';
import CONSTANTS        from '../../constants';

describe('vLessThan', () => {
    it('Should be invalid when no params are passed', () => {
        assert.ok(!Validator.create({a: 'literal:'}).check({a: 'hello'}));
    });

    it('Should be invalid when params are passed but value is not a string with content', () => {
        const v = Validator.create({a: 'literal:hello'});
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) assert.ok(!v.check({a: el}));
    });

    it('Should be invalid when params and value are passed but value is not equal to the param', () => {
        const v = Validator.create({a: 'literal:hello'});
        for (const el of ['  hello    ', ' hello', 'hello ', 'holla', 'hella', 'hellu', 'foo', 'bar']) assert.ok(!v.check({a: el}));
    });

    it('Should be valid when passed exactly the param value', () => {
        const v = Validator.create({a: 'literal:hello'});
        assert.ok(v.check({a: 'hello'}));
    });
});
