'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import Validator        from '../../src/index.mjs';

describe('vMin', () => {
    it('Should be invalid when no params are passed', () => {
        const evaluation = new Validator({a: 'min:<meta.params>'}).validate({a: 10});

        assert.equal(evaluation.is_valid, false);
        assert.deepEqual(evaluation.errors.a, [{msg: 'min', params: [undefined]}]);
    });

    it('Should return a correct error message when invalid', () => {
        const evaluation = new Validator({a: 'min:10'}).validate({a: 5});
        assert.equal(evaluation.is_valid, false);
        assert.deepEqual(evaluation.errors.a, [{msg: 'min', params: ['10']}]);
    });

    it('Should allow a string as an acceptable value', () => {
        const evaluation = new Validator({a: 'min:4'}).validate({a: 'hello'});
        assert.ok(evaluation.is_valid);
    });

    it('Should allow an array as an acceptable value', () => {
        const evaluation = new Validator({a: 'min:5'}).validate({a: ['foo', 'bar', 'bar', 'foo', 'hello', 'world']});
        assert.ok(evaluation.is_valid);
    });

    it('Should allow a numerical value as an acceptable value', () => {
        const evaluation = new Validator({a: 'min:10'}).validate({a: 15});
        assert.ok(evaluation.is_valid);
    });

    it('Should disallow NaN values', () => {
        const evaluation = new Validator({a: 'min:10'}).validate({a: Number.NaN});
        assert.equal(evaluation.is_valid, false);
    });

    it('Should only allow numerical values as parameter in the rule', () => {
        const evaluation = new Validator({a: 'min:foo'}).validate({a: 5});
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
            i1: ['oh', 'say', 'can', 'you', 'see'],
            j1: 'abc',
            l1: new Array(3),
            m1: Object.create(null),
        };

        const valid_keys    = ['a1', 'b1', 'c1', 'j1', 'i1', 'l1'];
        const invalid_keys  = ['d1', 'e1', 'f1', 'g1', 'h1', 'm1'];
        const rules         = [...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'min:2';
            return acc;
        }, {});

        const evaluation = new Validator(rules).validate(typechecks);

        assert.equal(evaluation.is_valid, false);

        valid_keys.forEach(key => assert.deepEqual(evaluation.errors[key], []));
        invalid_keys.forEach(key => assert.deepEqual(evaluation.errors[key], [{msg:'min', params: ['2']}]));
    });

    describe('String', () => {
        it('Should validate a string whose length is greater than the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'min:10'}).validate({a: 'The fox leaped over the fence'});
            assert.ok(evaluation.is_valid);
        });

        it('Should validate a string whose length is equal to the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'min:11'}).validate({a: 'hello world'});
            assert.ok(evaluation.is_valid);
        });

        it('Should validate a string whose length is smaller than the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'min:8'}).validate({a: 'Frantic'});
            assert.equal(evaluation.is_valid, false);
        });
    });

    describe('Array', () => {
        it('Should validate an array whose length is greater than the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'min:5'}).validate({a: [1,2,3,4,5]});
            assert.ok(evaluation.is_valid);
        });

        it('Should validate an array whose length is equal to the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'min:2'}).validate({a: ['foo', 'bar']});
            assert.ok(evaluation.is_valid);
        });

        it('Should validate an array whose length is smaller than the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'min:3'}).validate({a: ['foo']});
            assert.equal(evaluation.is_valid, false);
        });
    });

    describe('Number', () => {
        it('Should validate a number greater than the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'min:1000'}).validate({a: 10425});
            assert.ok(evaluation.is_valid);
        });

        it('Should validate a number equal to the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'min:42'}).validate({a: 42});
            assert.ok(evaluation.is_valid);
        });

        it('Should validate a number smaller than the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'min:502'}).validate({a: 59});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate negative number ranges that are above the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'min:-500'}).validate({a: -245});
            assert.ok(evaluation.is_valid);
        });

        it('Should validate negative number ranges that are below the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'min:-20'}).validate({a: -45});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate negative number ranges that are equal to the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'min:-999'}).validate({a: -999});
            assert.ok(evaluation.is_valid);
        });
    });
});
