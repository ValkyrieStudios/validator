'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import Validator        from '../../../src/index.mjs';

describe('vSize', () => {
    it('Should be invalid when no params are passed', () => {
        const evaluation = new Validator({a: 'size:<meta.params>'}).validate({a: 'hello'});

        assert.equal(evaluation.is_valid, false);
        assert.deepEqual(evaluation.errors.a, [{msg: 'size', params: [undefined]}]);
    });

    it('Should be invalid when non-numeric params are passed as part of params', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: 'size:<meta>'}).validate({a: 10, meta: el});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg: 'size', params: [el]}]);
        }
    });

    it('Should be invalid when non-numeric params are passed as part of rule', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: `size:${el}`}).validate({a: 10});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg: 'size', params: [`${el}`]}]);
        }
    });

    it('Should return a correct error message when invalid', () => {
        const evaluation = new Validator({a: 'size:10'}).validate({a: 'this is a string'});
        assert.equal(evaluation.is_valid, false);
        assert.deepEqual(evaluation.errors.a, [{msg: 'size', params: ['10']}]);
    });

    it('Should allow a string as an acceptable value', () => {
        const evaluation = new Validator({a: 'size:16'}).validate({a: 'this is a string'});
        assert.ok(evaluation.is_valid);
    });

    it('Should allow an array as an acceptable value', () => {
        const evaluation = new Validator({a: 'size:5'}).validate({a: ['foo', 'bar', 'hello', 'world', 'sweet']});
        assert.ok(evaluation.is_valid);
    });

    it('Should only allow numerical values as parameter in the rule', () => {
        const evaluation = new Validator({a: 'size:foo'}).validate({a: 'bar'});
        assert.equal(evaluation.is_valid, false);
    });

    it('Should not allow other types as values', () => {
        const typechecks = {
            a1: 100,
            b1: 200,
            c1: 'hello',
            d1: false,
            e1: true,
            f1: new RegExp(),
            g1: new Date(),
            h1: {},
            i1: [1,2,3,4,5],
            j1: '',
            l1: new Array(5),
            m1: Object.create(null),
        };

        const valid_keys    = ['c1', 'i1', 'l1'];
        const invalid_keys  = ['a1', 'b1', 'd1', 'e1', 'f1', 'g1', 'h1', 'j1', 'm1'];
        const rules         = [...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'size:5';
            return acc;
        }, {});

        const evaluation = new Validator(rules).validate(typechecks);

        assert.equal(evaluation.is_valid, false);

        valid_keys.forEach(key => assert.deepEqual(evaluation.errors[key], []));
        invalid_keys.forEach(key => assert.deepEqual(evaluation.errors[key], [{msg:'size', params: ['5']}]));
    });

    describe('String', () => {
        it('Should validate a string whose length is smaller than the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'size:10'}).validate({a: 'hello'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate a string whose length is equal to the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'size:11'}).validate({a: 'hello world'});
            assert.ok(evaluation.is_valid);
        });

        it('Should validate a string whose length is larger than the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'size:8'}).validate({a: 'hello world'});
            assert.equal(evaluation.is_valid, false);
        });
    });

    describe('Array', () => {
        it('Should validate an array whose length is smaller than the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'size:10'}).validate({a: ['foo', 'bar']});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate an array whose length is equal to the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'size:5'}).validate({a: ['apple', 'pear', 'orange', 'melon', 'grape']});
            assert.ok(evaluation.is_valid);
        });

        it('Should validate an array whose length is larger than the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'size:4'}).validate({a: ['apple', 'pear', 'orange', 'melon', 'grape']});
            assert.equal(evaluation.is_valid, false);
        });
    });
});
