'use strict';

import Validator from '../../src/index';

describe("vIn", () => {

    it ('should validate correctly', () => {
        const evaluation = (new Validator({
            a: 'in:<meta.a_params>',
            b: 'in:<meta.b_params>',
        })).validate({
            a: 'foo',
            b: 'Hello',
            meta: {
                a_params: ['foo', 'bar'],
                b_params: 'Hello',
            },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([]);
    });

    it ('should return a correct error message when invalid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>' })).validate({ a: 'hello', meta: { params: ['foo', 'bar']} });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{ msg: 'in', params: [['foo', 'bar']] }]);
    });

//  Primitive string

    it ('should validate a correct primitive string check as valid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>', b: 'in:<meta.params>' })).validate({
            a: 'el',
            b: 'lo',
            meta: { params: 'Hello' },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([]);
    });

    it ('should validate a wrong primitive string check as invalid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>', b: 'in:<meta.params>' })).validate({
            a: 'ol',
            b: 'le',
            meta: { params: 'Hello' },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'in', params: ['Hello']}]);
        expect(evaluation.errors.b).toEqual([{msg: 'in', params: ['Hello']}]);
    });

    it ('should take case sensitivity into account for primitive string checks', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>', b: 'in:<meta.params>' })).validate({
            a: 'H',
            b: 'h',
            meta: { params: 'Hello' },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([{msg: 'in', params: ['Hello']}]);
    });

//  Primitive integer

    it ('should validate a correct primitive integer check as valid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>', b: 'in:<meta.params>' })).validate({
            a: 50,
            b: 250,
            meta: { params: [50, 60, 70, 80, 90, 100, 250] },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([]);
    });

    it ('should validate a wrong primitive integer check as invalid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>', b: 'in:<meta.params>', c: 'in:<meta.params>'})).validate({
            a: 50.2,
            b: 247,
            c: 250,
            meta: { params: [50, 60, 70, 80, 90, 100, 250] },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'in', params: [[50,60,70,80,90,100,250]]}]);
        expect(evaluation.errors.b).toEqual([{msg: 'in', params: [[50,60,70,80,90,100,250]]}]);
        expect(evaluation.errors.c).toEqual([]);
    });

//  Boolean check

    it ('should validate a correct boolean check as valid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>', b: 'in:<meta.params>' })).validate({
            a: true,
            b: false,
            meta: { params: [true, false, false] },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([]);
    });

    it ('should validate an incorrect boolean check as invalid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.a_params>', b: 'in:<meta.b_params>' })).validate({
            a: false,
            b: true,
            meta: { a_params: [true, true, true], b_params: [false, false, false]},
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'in', params: [[true, true, true]]}]);
        expect(evaluation.errors.b).toEqual([{msg: 'in', params: [[false, false, false]]}]);
    });

//  Date check

    it ('should validate a correct date check as valid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>' })).validate({
            a: new Date('1990-02-07'),
            meta: { params: [new Date('1990-02-07'), new Date('2019-02-07')] },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('should validate an incorrect date check as invalid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>' })).validate({
            a: new Date('1995-02-07'),
            meta: { params: [new Date('1990-02-07'), new Date('2019-02-07')] },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'in', params:[[new Date('1990-02-07'), new Date('2019-02-07')]]}]);
    });

//  Object check

    it ('should validate a correct object check as valid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>' })).validate({
            a: {a:10, b:2},
            meta: { params: [{a: 10, b: 2}, {c: 3, d:4 }] },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('should validate a wrong object check as invalid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>' })).validate({
            a: {a:10, b:1},
            meta: { params: [{a: 10, b: 2}, {c: 3, d:4 }] },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'in', params: [[{a: 10, b: 2}, {c: 3, d:4 }]]}]);
    });

//  Array check

    it ('should validate a correct array check as valid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>' })).validate({
            a: [1, 'hello', 2, 'world'],
            meta: { params: [[1, 'hello', 2, 'world'], ['foo'], ['bar']] },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('should validate a wrong array check as invalid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>' })).validate({
            a: [2, 'hello', 2, 'world'],
            meta: { params: [[1, 'hello', 2, 'world'], ['foo'], ['bar']] },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'in', params: [[[1, 'hello', 2, 'world'], ['foo'], ['bar']]]}]);
    });

//  Mix

    it ('should validate a correct check with mixed params as valid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>', b: 'in:<meta.params>'})).validate({
            a: 'Foo',
            b: true,
            meta: { params: [new Date('2019-02-17'), 'Foo', 1, 2, 3, 'Bar', true, {a: 1}] },
        });

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([]);
    });

    it ('should validate a wrong check with mixed params as invalid', () => {
        const evaluation = (new Validator({ a: 'in:<meta.params>', b: 'in:<meta.params>'})).validate({
            a: 'Foo',
            b: {b: 2},
            meta: { params: [new Date('2019-02-17'), 'Foo', 1, 2, 3, 'Bar', true, {a: 1}] },
        });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([{msg: 'in', params: [[new Date('2019-02-17'), 'Foo', 1, 2, 3, 'Bar', true, {a: 1}]]}]);
    });

});
