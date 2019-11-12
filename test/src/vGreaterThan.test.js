'use strict';

import Validator from '../../src/index';

describe("vGreaterThan", () => {

    it ('should be invalid when no params are passed', () => {
        const evaluation = (new Validator({ a: 'greater_than:<meta.params>' })).validate({ a: 10 });

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'greater_than', params: [undefined] }]);
    });

    it ('should return a correct error message when invalid', () => {
        const evaluation = (new Validator({ a: 'greater_than:10' })).validate({ a: 5 });
        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg: 'greater_than', params: ['10']}]);
    });

    it ('should allow a string as an acceptable value', () => {
        const evaluation = (new Validator({ a: 'greater_than:4' })).validate({ a: 'hello' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should allow an array as an acceptable value', () => {
        const evaluation = (new Validator({ a: 'greater_than:5' })).validate({ a: ['foo', 'bar', 'bar', 'foo', 'hello', 'world'] });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should allow a numerical value as an acceptable value', () => {
        const evaluation = (new Validator({ a: 'greater_than:10' })).validate({ a: 15 });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should disallow NaN values', () => {
        const evaluation = (new Validator({ a: 'greater_than:10' })).validate({ a: Number.NaN });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should only allow numerical values as parameter in the rule', () => {
        const evaluation = (new Validator({ a: 'greater_than:foo' })).validate({ a: 5 });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should not allow other types as values', () => {
        const typechecks = {
            a : 100,
            b : 200,
            c : 'hello',
            d : false,
            e : true,
            f : new RegExp(),
            g : new Date(),
            h : {},
            i : ['this', 'rocks', 'sweet'],
            j : 'abc',
            k : new String('Foo'),
            l : new Array(3),
            m : Object.create(null),
        };

        const valid_keys    = ['a', 'b', 'c', 'j', 'k', 'i', 'l'];
        const invalid_keys  = ['d', 'e', 'f', 'g', 'h', 'm'];
        const rules         = [...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'greater_than:2';
            return acc;
        }, {});

        const evaluation = (new Validator(rules)).validate(typechecks);

        expect(evaluation.is_valid).toEqual(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).toEqual([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).toEqual([{msg:'greater_than', params: ['2']}]));
    });

//  String

    it ('should validate a string whose length is greater than the provided parameter as valid', () => {
        const evaluation = (new Validator({ a: 'greater_than:10' })).validate({ a: 'The fox leaped over the fence' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate a string whose length is equal to the provided parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'greater_than:11' })).validate({ a: 'hello world' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a string whose length is smaller than the provided parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'greater_than:8' })).validate({ a: 'Frantic' });
        expect(evaluation.is_valid).toEqual(false);
    });

//  Array

    it ('should validate an array whose length is greater than the provided parameter as valid', () => {
        const evaluation = (new Validator({ a: 'greater_than:3' })).validate({ a: [1,2,3,4] });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate an array whose length is equal to the provided parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'greater_than:3' })).validate({ a: ['hello', 'this', 'is'] });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate an array whose length is smaller than the provided parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'greater_than:3' })).validate({ a: ['hello', 'this'] });
        expect(evaluation.is_valid).toEqual(false);
    });

//  Number

    it ('should validate a number greater than the provided parameter as valid', () => {
        const evaluation = (new Validator({ a: 'greater_than:1000' })).validate({ a: 10425 });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate a number equal to the provided parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'greater_than:42' })).validate({ a: 42 });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a number smaller than the provided parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'greater_than:502' })).validate({ a: 59});
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate negative number ranges that are above the provided parameter as valid', () => {
        const evaluation = (new Validator({ a: 'greater_than:-500' })).validate({ a: -245 });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate negative number ranges that are below the provided parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'greater_than:-20' })).validate({ a: -45 });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate negative number ranges that are equal to the provided parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'greater_than:-999' })).validate({ a: -999 });
        expect(evaluation.is_valid).toEqual(false);
    });

});
