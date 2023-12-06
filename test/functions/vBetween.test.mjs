'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../constants.mjs';
import Validator        from '../../src/index.mjs';

describe('vBetween', () => {
    it('Should be invalid when no params or not all params are passed', () => {
        const evaluation = new Validator({a: 'between:<min>,<max>'}).validate({a: 10});
        assert.equal(evaluation.is_valid, false);
        assert.deepEqual(evaluation.errors.a, [{msg: 'between', params: [undefined, undefined]}]);

        const evaluation2 = new Validator({a: 'between:<min>,<max>'}).validate({a: 10, min: 5});
        assert.equal(evaluation2.is_valid, false);
        assert.deepEqual(evaluation2.errors.a, [{msg: 'between', params: [undefined, undefined]}]);

        const evaluation3 = new Validator({a: 'between:<min>,<max>'}).validate({a: 10, max: 15});
        assert.equal(evaluation3.is_valid, false);
        assert.deepEqual(evaluation3.errors.a, [{msg: 'between', params: [undefined, undefined]}]);
    });

    it('Should be invalid when params are passed but not all are numeric', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            const evaluation = new Validator({a: 'between:<min>,<max>'}).validate({a: 10, min: el, max: 20});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg: 'between', params: [undefined, undefined]}]);
        }

        for (const el of CONSTANTS.NOT_NUMERIC) {
            const evaluation = new Validator({a: 'between:<min>,<max>'}).validate({a: 10, min: 0, max: el});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg: 'between', params: [undefined, undefined]}]);
        }

        for (const el of CONSTANTS.NOT_NUMERIC) {
            const evaluation = new Validator({a: 'between:<min>,<max>'}).validate({a: 10, min: el, max: el});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg: 'between', params: [undefined, undefined]}]);
        }
    });

    it('Should be invalid when incorrect params are passed as part of string literal', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            const evaluation = new Validator({a: `between:0,${el}`}).validate({a: 10});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg: 'between', params: ['0', 'hi']}]);
        }

        for (const el of CONSTANTS.NOT_NUMERIC) {
            const evaluation = new Validator({a: `between:${el},0`}).validate({a: 10});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg: 'between', params: ['0', 'hi']}]);
        }

        for (const el of CONSTANTS.NOT_NUMERIC) {
            const evaluation = new Validator({a: `between:${el},${el}`}).validate({a: 10});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg: 'between', params: ['0', 'hi']}]);
        }

        const evaluation3 = new Validator({a: 'between:0'}).validate({a: 10});
        assert.equal(evaluation3.is_valid, false);
        assert.deepEqual(evaluation3.errors.a, [{msg: 'between', params: ['0']}]);

        const evaluation5 = new Validator({a: 'between'}).validate({a: 10});
        assert.equal(evaluation5.is_valid, false);
        assert.deepEqual(evaluation5.errors.a, [{msg: 'between', params: []}]);
    });

    it('Should return a correct error message when invalid', () => {
        const evaluation = new Validator({a: 'between:5,15'}).validate({a: 25});
        assert.equal(evaluation.is_valid, false);
        assert.deepEqual(evaluation.errors.a, [{msg: 'between', params: ['5', '15']}]);
    });

    it('Should allow a string as an acceptable value', () => {
        const evaluation = new Validator({a: 'between:4,10'}).validate({a: 'hello'});
        assert.ok(evaluation.is_valid);
    });

    it('Should allow an array as an acceptable value', () => {
        const evaluation = new Validator({a: 'between:5,10'}).validate({a: ['foo', 'bar', 'bar', 'foo', 'hello', 'world']});
        assert.ok(evaluation.is_valid);
    });

    it('Should allow a numerical value as an acceptable value', () => {
        const evaluation = new Validator({a: 'between:10,20'}).validate({a: 15});
        assert.ok(evaluation.is_valid);
    });

    it('Should disallow NaN values', () => {
        const evaluation = new Validator({a: 'between:10,20'}).validate({a: Number.NaN});
        assert.equal(evaluation.is_valid, false);
    });

    it('Should only allow numerical values as parameter in the rule', () => {
        const evaluation = new Validator({a: 'between:foo,bar'}).validate({a: 5});
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
            i1: ['hey', 'hi', 'hello'],
            j1: 'abc',
            l1: new Array(3),
            m1: Object.create(null),
        };

        const valid_keys    = ['a1', 'b1', 'c1', 'j1', 'i1', 'l1'];
        const invalid_keys  = ['d1', 'e1', 'f1', 'g1', 'h1', 'm1'];
        const rules         = [...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'between:2,300';
            return acc;
        }, {});

        const evaluation = new Validator(rules).validate(typechecks);

        assert.equal(evaluation.is_valid, false);

        valid_keys.forEach(key => assert.deepEqual(evaluation.errors[key], []));
        invalid_keys.forEach(key => assert.deepEqual(evaluation.errors[key], [{msg:'between', params: ['2', '300']}]));
    });

    describe('String', () => {
        it('Should validate a string whose length is between the provided parameters as valid', () => {
            const evaluation = new Validator({a: 'between:10,30'}).validate({a: 'The fox leaped over the fence'});
            assert.ok(evaluation.is_valid);
        });

        it('Should validate a string whose length is equal to the start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:11,15'}).validate({a: 'hello world'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate a string whose length is equal to the end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:1,11'}).validate({a: 'hello world'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate a string whose length is smaller than the start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:10,20'}).validate({a: 'Frantic'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate a string whose length is larger than the end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:2,5'}).validate({a: 'Frantic'});
            assert.equal(evaluation.is_valid, false);
        });
    });

    describe('Array', () => {
        it('Should validate an array whose length is between the provided parameters as valid', () => {
            const evaluation = new Validator({a: 'between:2,6'}).validate({a: ['The', 'fox', 'leaped']});
            assert.ok(evaluation.is_valid);
        });

        it('Should validate an array whose length is equal to the start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:3,10'}).validate({a: ['The', 'Fox', 'leaped']});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate an array whose length is equal to the end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:1,3'}).validate({a: ['The', 'Fox', 'leaped']});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate an array whose length is smaller than the start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:10,20'}).validate({a: ['Strong']});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate a string whose length is larger than the end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:2,5'}).validate({a: ['The', 'fox', 'leaped', 'over', 'the', 'fence']});
            assert.equal(evaluation.is_valid, false);
        });
    });

    describe('Number', () => {
        it('Should validate a number greater than the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'between:1000,100000'}).validate({a: 10425});
            assert.ok(evaluation.is_valid);
        });

        it('Should validate a number equal to the provided start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:42,100'}).validate({a: 42});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate a number equal to the provided end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:1,42'}).validate({a: 42});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate a number smaller than the provided start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:100,200'}).validate({a: 59});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate a number larger than the provided end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:10,25'}).validate({a: 59});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate negative number ranges that are above the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'between:-500,-200'}).validate({a: -245});
            assert.ok(evaluation.is_valid);
        });

        it('Should validate negative number ranges that are below the provided start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:-60,-50'}).validate({a: -45});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate negative number ranges that are above the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:-40,-20'}).validate({a: -45});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate negative number ranges that are equal to the provided start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:-999,-100'}).validate({a: -999});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should validate negative number ranges that are equal to the provided end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:-10000,-999'}).validate({a: -999});
            assert.equal(evaluation.is_valid, false);
        });
    });
});
