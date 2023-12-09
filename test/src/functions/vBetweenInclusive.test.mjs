'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import Validator        from '../../../src/index.mjs';

describe('vBetweenInclusive', () => {
    it('Should be invalid when no params are passed', () => {
        const evaluation = new Validator({a: 'between_inc:<meta.min>,<meta.max>'}).validate({a: 10});
        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'between_inc', params: [undefined, undefined]}],
            },
        });

        const evaluation2 = new Validator({a: 'between_inc:<meta.min>,<meta.max>'}).validate({a: 10, meta: {min: 5}});
        assert.deepEqual(evaluation2, {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'between_inc', params: [5, undefined]}],
            },
        });

        const evaluation3 = new Validator({a: 'between_inc:<meta.min>,<meta.max>'}).validate({a: 10, meta: {max: 15}});
        assert.deepEqual(evaluation3, {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'between_inc', params: [undefined, 15]}],
            },
        });
    });

    it('Should be invalid when params are passed but not all are numeric', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: 'between_inc:<min>,<max>'}).validate({a: 10, min: el, max: 20});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between_inc', params: [el, 20]}],
                },
            });
        }

        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: 'between_inc:<min>,<max>'}).validate({a: 10, min: 0, max: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between_inc', params: [0, el]}],
                },
            });
        }

        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: 'between_inc:<min>,<max>'}).validate({a: 10, min: el, max: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between_inc', params: [el, el]}],
                },
            });
        }
    });

    it('Should be invalid when incorrect params are passed as part of string literal', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: `between_inc:0,${el}`}).validate({a: 10});
            assert.deepEqual(evaluation, {is_valid: false, count: 1,errors: {a: [{msg: 'between_inc', params: ['0', `${el}`]}]}});
        }

        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: `between_inc:${el},0`}).validate({a: 10});
            assert.deepEqual(evaluation, {is_valid: false, count: 1,errors: {a: [{msg: 'between_inc', params: [`${el}`, '0']}]}});
        }

        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: `between_inc:${el},${el}`}).validate({a: 10});
            assert.deepEqual(evaluation, {is_valid: false, count: 1,errors: {a: [{msg: 'between_inc', params: [`${el}`, `${el}`]}]}});
        }

        const evaluation3 = new Validator({a: 'between_inc:0'}).validate({a: 10});
        assert.deepEqual(evaluation3, {is_valid: false, count: 1,errors: {a: [{msg: 'between_inc', params: ['0']}]}});

        const evaluation5 = new Validator({a: 'between_inc'}).validate({a: 10});
        assert.deepEqual(evaluation5, {is_valid: false, count: 1,errors: {a: [{msg: 'between_inc', params: []}]}});
    });

    it('Should return a correct error message when invalid', () => {
        const evaluation = new Validator({a: 'between_inc:5,15'}).validate({a: 25});
        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'between_inc', params: ['5', '15']}],
            },
        });
    });

    it('Should allow a string as an acceptable value', () => {
        const evaluation = new Validator({a: 'between_inc:4,10'}).validate({a: 'hello'});
        assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
    });

    it('Should allow an array as an acceptable value', () => {
        const evaluation = new Validator({a: 'between_inc:5,10'}).validate({a: ['foo', 'bar', 'bar', 'foo', 'hello', 'world']});
        assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
    });

    it('Should allow a numerical value as an acceptable value', () => {
        const evaluation = new Validator({a: 'between_inc:10,20'}).validate({a: 15});
        assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
    });

    it('Should disallow NaN values', () => {
        const evaluation = new Validator({a: 'between_inc:10,20'}).validate({a: Number.NaN});
        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'between_inc', params: ['10', '20']}],
            },
        });
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
            acc[key] = 'between_inc:2,300';
            return acc;
        }, {});

        const evaluation = new Validator(rules).validate(typechecks);

        assert.equal(evaluation.is_valid, false);
        assert.ok(evaluation.count, invalid_keys.length);

        valid_keys.forEach(key => assert.ok(!evaluation.errors.hasOwnProperty(key)));
        invalid_keys.forEach(key => assert.deepEqual(evaluation.errors[key], [{msg:'between_inc', params: ['2', '300']}]));
    });

    describe('String', () => {
        it('Should validate a string whose length is between the provided parameters as valid', () => {
            const evaluation = new Validator({a: 'between_inc:10,30'}).validate({a: 'The fox leaped over the fence'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should validate a string whose length is equal to the start parameter as valid', () => {
            const evaluation = new Validator({a: 'between_inc:11,15'}).validate({a: 'hello world'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should validate a string whose length is equal to the end parameter as valid', () => {
            const evaluation = new Validator({a: 'between_inc:1,11'}).validate({a: 'hello world'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should validate a string whose length is smaller than the start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between_inc:10,20'}).validate({a: 'Frantic'});
            assert.deepEqual(evaluation, {is_valid: false, count: 1, errors: {a: [{msg: 'between_inc', params: ['10', '20']}]}});
        });

        it('Should validate a string whose length is larger than the end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between_inc:2,5'}).validate({a: 'Frantic'});
            assert.deepEqual(evaluation, {is_valid: false, count: 1, errors: {a: [{msg: 'between_inc', params: ['2', '5']}]}});
        });
    });

    describe('Array', () => {
        it('Should validate an array whose length is between the provided parameters as valid', () => {
            const evaluation = new Validator({a: 'between_inc:2,6'}).validate({a: ['The', 'fox', 'leaped']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should validate an array whose length is equal to the start parameter as valid', () => {
            const evaluation = new Validator({a: 'between_inc:3,10'}).validate({a: ['The', 'Fox', 'leaped']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should validate an array whose length is equal to the end parameter as valid', () => {
            const evaluation = new Validator({a: 'between_inc:1,3'}).validate({a: ['The', 'Fox', 'leaped']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should validate an array whose length is smaller than the start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between_inc:10,20'}).validate({a: ['Strong']});
            assert.deepEqual(evaluation, {is_valid: false, count: 1, errors: {a: [{msg: 'between_inc', params: ['10', '20']}]}});
        });

        it('Should validate a string whose length is larger than the end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between_inc:2,5'}).validate({a: ['The', 'fox', 'leaped', 'over', 'the', 'fence']});
            assert.deepEqual(evaluation, {is_valid: false, count: 1, errors: {a: [{msg: 'between_inc', params: ['2', '5']}]}});
        });
    });

    describe('Number', () => {
        it('Should validate a number greater than the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'between_inc:1000,100000'}).validate({a: 10425});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should validate a number equal to the provided start parameter as valid', () => {
            const evaluation = new Validator({a: 'between_inc:42,100'}).validate({a: 42});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should validate a number equal to the provided end parameter as valid', () => {
            const evaluation = new Validator({a: 'between_inc:1,42'}).validate({a: 42});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should validate a number smaller than the provided start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between_inc:100,200'}).validate({a: 59});
            assert.deepEqual(evaluation, {is_valid: false, count: 1, errors: {a: [{msg: 'between_inc', params: ['100', '200']}]}});
        });

        it('Should validate a number larger than the provided end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between_inc:10,25'}).validate({a: 59});
            assert.deepEqual(evaluation, {is_valid: false, count: 1, errors: {a: [{msg: 'between_inc', params: ['10', '25']}]}});
        });

        it('Should validate negative number ranges that are above the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'between_inc:-500,-200'}).validate({a: -245});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should validate negative number ranges that are below the provided start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between_inc:-60,-50'}).validate({a: -45});
            assert.deepEqual(evaluation, {is_valid: false, count: 1, errors: {a: [{msg: 'between_inc', params: ['-60', '-50']}]}});
        });

        it('Should validate negative number ranges that are above the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'between_inc:-40,-20'}).validate({a: -45});
            assert.deepEqual(evaluation, {is_valid: false, count: 1, errors: {a: [{msg: 'between_inc', params: ['-40', '-20']}]}});
        });

        it('Should validate negative number ranges that are equal to the provided start parameter as valid', () => {
            const evaluation = new Validator({a: 'between_inc:-999,-100'}).validate({a: -999});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should validate negative number ranges that are equal to the provided end parameter as valid', () => {
            const evaluation = new Validator({a: 'between_inc:-10000,-999'}).validate({a: -999});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });
    });
});
