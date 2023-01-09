'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vBetweenInclusive", () => {

    it ('should be invalid when no params are passed', () => {
        const evaluation = (new Validator({ a: 'between_inc:<meta.min>,<meta.max>' })).validate({ a: 10 });
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'between_inc', params: [undefined, undefined] }]);

        const evaluation2 = (new Validator({ a: 'between_inc:<meta.min>,<meta.max>' })).validate({ a: 10, min: 5 });
        expect(evaluation2.is_valid).to.eql(false);
        expect(evaluation2.errors.a).to.deep.equal([{msg: 'between_inc', params: [undefined, undefined] }]);

        const evaluation3 = (new Validator({ a: 'between_inc:<meta.min>,<meta.max>' })).validate({ a: 10, max: 15 });
        expect(evaluation3.is_valid).to.eql(false);
        expect(evaluation3.errors.a).to.deep.equal([{msg: 'between_inc', params: [undefined, undefined] }]);
    });

    it ('should be invalid when incorrect params are passed', () => {
        const evaluation = (new Validator({ a: 'between_inc:0,hi' })).validate({ a: 10 });
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'between_inc', params: ['0', 'hi'] }]);

        const evaluation2 = (new Validator({ a: 'between_inc:hi,hi' })).validate({ a: 10 });
        expect(evaluation2.is_valid).to.eql(false);
        expect(evaluation2.errors.a).to.deep.equal([{msg: 'between_inc', params: ['hi', 'hi'] }]);

        const evaluation3 = (new Validator({ a: 'between_inc:0' })).validate({ a: 10 });
        expect(evaluation3.is_valid).to.eql(false);
        expect(evaluation3.errors.a).to.deep.equal([{msg: 'between_inc', params: ['0'] }]);

        const evaluation4 = (new Validator({ a: 'between_inc:hi,0' })).validate({ a: 10 });
        expect(evaluation4.is_valid).to.eql(false);
        expect(evaluation4.errors.a).to.deep.equal([{msg: 'between_inc', params: ['hi', '0'] }]);

        const evaluation5 = (new Validator({ a: 'between_inc' })).validate({ a: 10 });
        expect(evaluation5.is_valid).to.eql(false);
        expect(evaluation5.errors.a).to.deep.equal([{msg: 'between_inc', params: [] }]);
    })

    it ('should return a correct error message when invalid', () => {
        const evaluation = (new Validator({ a: 'between_inc:5,15' })).validate({ a: 25 });
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'between_inc', params: ['5', '15']}]);
    });

    it ('should allow a string as an acceptable value', () => {
        const evaluation = (new Validator({ a: 'between_inc:4,10' })).validate({ a: 'hello' });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should allow an array as an acceptable value', () => {
        const evaluation = (new Validator({ a: 'between_inc:5,10' })).validate({ a: ['foo', 'bar', 'bar', 'foo', 'hello', 'world'] });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should allow a numerical value as an acceptable value', () => {
        const evaluation = (new Validator({ a: 'between_inc:10,20' })).validate({ a: 15 });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should disallow NaN values', () => {
        const evaluation = (new Validator({ a: 'between_inc:10,20' })).validate({ a: Number.NaN });
        expect(evaluation.is_valid).to.eql(false);
    });

    it ('should only allow numerical values as parameter in the rule', () => {
        const evaluation = (new Validator({ a: 'between_inc:foo,bar' })).validate({ a: 5 });
        expect(evaluation.is_valid).to.eql(false);
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
            i : ['hey', 'hi', 'hello'],
            j : 'abc',
            k : new String('Foo'),
            l : new Array(3),
            m : Object.create(null),
        };

        const valid_keys    = ['a', 'b', 'c', 'j', 'k', 'i', 'l'];
        const invalid_keys  = ['d', 'e', 'f', 'g', 'h', 'm'];
        const rules         = [...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'between_inc:2,300';
            return acc;
        }, {});

        const evaluation = (new Validator(rules)).validate(typechecks);

        expect(evaluation.is_valid).to.eql(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([{msg:'between_inc', params: ['2', '300']}]));
    });

//  String

    it ('should validate a string whose length is between the provided parameters as valid', () => {
        const evaluation = (new Validator({ a: 'between_inc:10,30' })).validate({ a: 'The fox leaped over the fence' });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should validate a string whose length is equal to the start parameter as valid', () => {
        const evaluation = (new Validator({ a: 'between_inc:11,15' })).validate({ a: 'hello world' });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should validate a string whose length is equal to the end parameter as valid', () => {
        const evaluation = (new Validator({ a: 'between_inc:1,11' })).validate({ a: 'hello world' });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should validate a string whose length is smaller than the start parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'between_inc:10,20' })).validate({ a: 'Frantic' });
        expect(evaluation.is_valid).to.eql(false);
    });

    it ('should validate a string whose length is larger than the end parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'between_inc:2,5' })).validate({ a: 'Frantic' });
        expect(evaluation.is_valid).to.eql(false);
    });

//  Array

    it ('should validate an array whose length is between the provided parameters as valid', () => {
        const evaluation = (new Validator({ a: 'between_inc:2,6' })).validate({ a: ['The', 'fox', 'leaped'] });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should validate an array whose length is equal to the start parameter as valid', () => {
        const evaluation = (new Validator({ a: 'between_inc:3,10' })).validate({ a: ['The', 'Fox', 'leaped'] });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should validate an array whose length is equal to the end parameter as valid', () => {
        const evaluation = (new Validator({ a: 'between_inc:1,3' })).validate({ a: ['The', 'Fox', 'leaped'] });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should validate an array whose length is smaller than the start parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'between_inc:10,20' })).validate({ a: ['Strong'] });
        expect(evaluation.is_valid).to.eql(false);
    });

    it ('should validate a string whose length is larger than the end parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'between_inc:2,5' })).validate({ a: ['The', 'fox', 'leaped', 'over', 'the', 'fence'] });
        expect(evaluation.is_valid).to.eql(false);
    });

//  Number

    it ('should validate a number greater than the provided parameter as valid', () => {
        const evaluation = (new Validator({ a: 'between_inc:1000,100000' })).validate({ a: 10425 });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should validate a number equal to the provided start parameter as valid', () => {
        const evaluation = (new Validator({ a: 'between_inc:42,100' })).validate({ a: 42 });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should validate a number equal to the provided end parameter as valid', () => {
        const evaluation = (new Validator({ a: 'between_inc:1,42' })).validate({ a: 42 });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should validate a number smaller than the provided start parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'between_inc:100,200' })).validate({ a: 59});
        expect(evaluation.is_valid).to.eql(false);
    });

    it ('should validate a number larger than the provided end parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'between_inc:10,25' })).validate({ a: 59});
        expect(evaluation.is_valid).to.eql(false);
    });

    it ('should validate negative number ranges that are above the provided parameter as valid', () => {
        const evaluation = (new Validator({ a: 'between_inc:-500,-200' })).validate({ a: -245 });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should validate negative number ranges that are below the provided start parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'between_inc:-60,-50' })).validate({ a: -45 });
        expect(evaluation.is_valid).to.eql(false);
    });

    it ('should validate negative number ranges that are above the provided parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'between_inc:-40,-20' })).validate({ a: -45 });
        expect(evaluation.is_valid).to.eql(false);
    });

    it ('should validate negative number ranges that are equal to the provided start parameter as valid', () => {
        const evaluation = (new Validator({ a: 'between_inc:-999,-100' })).validate({ a: -999 });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should validate negative number ranges that are equal to the provided end parameter as valid', () => {
        const evaluation = (new Validator({ a: 'between_inc:-10000,-999' })).validate({ a: -999 });
        expect(evaluation.is_valid).to.eql(true);
    });

});
