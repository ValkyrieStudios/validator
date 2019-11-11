'use strict';

import Validator from '../../src/index';

describe("vEqualTo", () => {

    it ('should validate correctly', () => {
        const evaluation = (new Validator({
            a: 'equal_to:<meta.a_params>',
            b: 'equal_to:<meta.b_params>',
        })).validate({
            a: 'foo',
            b: 'Hello',
            meta: {
                a_params: 'foo',
                b_params: 'Hello',
            },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([]);
    });

    it ('should be invalid when no params are passed', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({ a: 'hello' });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'equal_to', params: [undefined] }]);
    });

    it ('should return a correct error message when invalid', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({ a: 'hello', meta: { params: 'foo' } });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{ msg: 'equal_to', params: ['foo'] }]);
    });

//  Primitive string

    it ('should validate a primitive string check as equal', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({
            a: 'Valkyrie Studios',
            meta: { params: 'Valkyrie Studios' },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('should validate a wrong primitive string check as unequal', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({
            a: 'mysecretpassword is so cool',
            meta: { params: 'mys3cretpassword is so cool' },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'equal_to', params: ['mys3cretpassword is so cool']}]);
    });

    it ('should take case sensitivity into account for primitive string checks', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({
            a: 'Hello my darling',
            meta: { params: 'hello my darling' },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'equal_to', params: ['hello my darling']}]);
    });

//  Primitive integer

    it ('should validate a correct primitive integer check as valid', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({
            a: 50,
            meta: { params: 50 },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('should validate a wrong primitive integer check as invalid', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({
            a: 4095,
            meta: { params: 4096 },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'equal_to', params: [4096]}]);
    });

//  Primitive float

    it ('should validate a correct primitive float check as valid', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({
            a: 3.14159265359,
            meta: { params: 3.14159265359 },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('should validate a wrong primitive float check as invalid', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({
            a: 3.14843092840923,
            meta: { params: Math.PI },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'equal_to', params: [Math.PI]}]);
    });

//  Boolean check

    it ('should validate a correct boolean check as valid', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>', b: 'equal_to:<meta.b_params>' })).validate({
            a: true,
            b: false,
            meta: { params: true, b_params: false },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([]);
    });

    it ('should validate an incorrect boolean check as invalid', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>', b: 'equal_to:<meta.b_params>' })).validate({
            a: true,
            b: false,
            meta: { params: false, b_params: true },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'equal_to', params: [false]}]);
        expect(evaluation.errors.b).toEqual([{msg: 'equal_to', params: [true]}]);
    });

//  Date check

    it ('should validate a correct date check as valid', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>', b: 'equal_to:<meta.b_params>' })).validate({
            a: new Date('1990-02-07'),
            b: new Date('2014-11-01'),
            meta: { params: new Date('1990-02-07'), b_params: new Date('2014-11-01') },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([]);
    });

    it ('should validate an incorrect date check as invalid', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({
            a: new Date('1995-02-07'),
            meta: { params: new Date('1990-02-07') },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'equal_to', params:[new Date('1990-02-07')]}]);
    });

//  Object check

    it ('should validate a correct object check as valid', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({
            a: { a: 10, b: 2 },
            meta: { params: {a: 10, b: 2} },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('should validate a wrong object check as invalid', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({
            a: { a: 10, b: 1},
            meta: { params: { a: 10, b: 2 } },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'equal_to', params: [{a: 10, b: 2}] }]);
    });

//  Array check

    it ('should validate a correct array check as valid', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({
            a: [1, 'hello', 2, 'world'],
            meta: { params: [1, 'hello', 2, 'world'] },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('should validate a wrong array check as invalid', () => {
        const evaluation = (new Validator({ a: 'equal_to:<meta.params>' })).validate({
            a: [2, 'hello', 2, 'world'],
            meta: { params: [1, 'hello', 2, 'world'] },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'equal_to', params: [[1, 'hello', 2, 'world']]}]);
    });

//  Mix

    it ('should validate a correct check with mixed params as valid', () => {
        const tests = {
            a: ['hello', 1],
            b: {a: 1, b: new Date('2019-10-05')},
            c: {a: 1, b: [1, 2, 3, {hello: 'world'}]},
            d: [1, {a: 2, b: {c: 3, d: [1, 2, 3]}}],
        };

        const rules = Object.keys(tests).reduce((acc, key) => {
            acc[key] = `equal_to:<meta.${key}>`;
            return acc;
        }, {});

        const evaluation = (new Validator(rules)).validate(Object.assign({}, tests, {meta: tests}));

        expect(evaluation.is_valid).toEqual(true);
        Object.keys(tests).forEach((key) => expect(evaluation.errors[key]).toEqual([]));
    });

    it ('should validate a wrong check with mixed params as invalid', () => {
        const tests = {
            a: ['hello', 1],
            b: {a: 1, b: new Date('2019-10-05')},
            c: {a: 1, b: [1, 2, 3, {hello: 'world'}]},
            d: [1, {a: 2, b: {c: 3, d: [1, 2, 3]}}],
        };

        const tests_against = {
            a: ['lo', 2],
            b: {a: 1, b: new Date('2019-10-06')},
            c: {a: 1, b: [1, 2, 3, {hello: 'wold'}]},
            d: [2, {a: 2, b: {c: 3, d: [1, 2, 3]}}, 3],
        };

        const rules = Object.keys(tests).reduce((acc, key) => {
            acc[key] = `equal_to:<meta.${key}>`;
            return acc;
        }, {});

        const evaluation = (new Validator(rules)).validate(Object.assign({}, tests, {meta: tests_against }));

        expect(evaluation.is_valid).toEqual(false);
        Object.keys(tests).forEach((key) => expect(evaluation.errors[key]).toEqual([{msg: 'equal_to', params: [tests_against[key]]}]));
    });

});
