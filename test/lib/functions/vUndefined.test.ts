import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import Validator        from '../../../lib';
import vUndefined from '../../../lib/functions/vUndefined';

describe('vUndefined', () => {
    it('Should be valid if passed undefined', () => {
        assert.deepEqual(
            new Validator({a: '?'}).validate({a: undefined}),
            {is_valid: true, count: 0, errors: {}}
        );
        assert.ok(vUndefined(undefined));
    });

    it('Should be invalid if passed a value', () => {
        assert.ok(!vUndefined('hi'));
    });

    it('Should be valid if does not exist', () => {
        assert.deepEqual(
            new Validator({a: '?'}).validate({}),
            {is_valid: true, count: 0, errors: {}}
        );
    });

    it('Should be valid if passed undefined when working in a conditional group', () => {
        assert.deepEqual(
            new Validator({a: ['true', '?']}).validate({a: undefined}),
            {is_valid: true, count: 0, errors: {}}
        );

        assert.deepEqual(
            new Validator({a: ['true', '?']}).validate({}),
            {is_valid: true, count: 0, errors: {}}
        );

        assert.deepEqual(
            new Validator({a: ['true', '?']}).validate({a: true}),
            {is_valid: true, count: 0, errors: {}}
        );
    });
});
