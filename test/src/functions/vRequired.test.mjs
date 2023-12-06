'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import Validator        from '../../../src/index.mjs';

describe('vRequired', () => {
    it('Should be valid if passed a correct value', () => {
        const subject = {
            a1: 100,
            b1: 200,
            c1: 'hello',
            d1: false,
            e1: true,
            f1: new RegExp(),
            g1: new Date(),
            h1: {},
        };

        const rules = Object.keys(subject).reduce((acc, key) => {
            acc[key] = 'required';
            return acc;
        }, {});

        const evaluation = new Validator(rules).validate(subject);
        assert.ok(evaluation.is_valid);

        Object.keys(subject).forEach(key => assert.deepEqual(evaluation.errors[key], []));
    });

    it('Should be invalid if not passed', () => {
        const evaluation = new Validator({a: 'required'}).validate({});
        assert.equal(evaluation.is_valid, false);
        assert.deepEqual(evaluation.errors.a, [{msg: 'required', params: []}]);
    });

    it('Should be invalid if passed as undefined', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: undefined});
        assert.equal(evaluation.is_valid, false);
        assert.deepEqual(evaluation.errors.a, [{msg: 'required', params: []}]);
    });

    it('Should be invalid if passed as an empty string', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: ''});
        assert.equal(evaluation.is_valid, false);
        assert.deepEqual(evaluation.errors.a, [{msg: 'required', params: []}]);
    });

    it('Should be invalid if passed a string that only contains spaces', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: ''});
        assert.equal(evaluation.is_valid, false);
        assert.deepEqual(evaluation.errors.a, [{msg: 'required', params: []}]);
    });

    it('Should be invalid if passed as an empty array', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: []});
        assert.equal(evaluation.is_valid, false);
        assert.deepEqual(evaluation.errors.a, [{msg: 'required', params: []}]);
    });

    it('Should be invalid if passed a NaN', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: Number.NaN});
        assert.equal(evaluation.is_valid, false);
        assert.deepEqual(evaluation.errors.a, [{msg: 'required', params: []}]);
    });
});
