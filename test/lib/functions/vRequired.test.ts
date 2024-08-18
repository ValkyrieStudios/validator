import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import Validator        from '../../../lib';

describe('vRequired', () => {
    it('Should be valid if passed a correct value', () => {
        const subject = {
            a1: 100,
            b1: 200,
            c1: 'hello',
            d1: false,
            e1: true,
            g1: new Date(),
            h1: {},
        };

        const rules = Object.keys(subject).reduce((acc, key) => {
            acc[key] = 'required';
            return acc;
        }, {});

        const evaluation = new Validator(rules).validate(subject);
        assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
    });

    it('Should be invalid if not passed', () => {
        const evaluation = new Validator({a: 'required'}).validate({});
        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'not_found', params: []}],
            },
        });
    });

    it('Should be invalid if passed as undefined', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: undefined});
        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'not_found', params: []}],
            },
        });
    });

    it('Should be invalid if passed as an empty string', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: ''});
        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'required', params: []}],
            },
        });
    });

    it('Should be invalid if passed a string that only contains spaces', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: ''});
        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'required', params: []}],
            },
        });
    });

    it('Should be invalid if passed as an empty array', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: []});
        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'required', params: []}],
            },
        });
    });

    it('Should be invalid if passed a NaN', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: Number.NaN});
        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'required', params: []}],
            },
        });
    });
});
