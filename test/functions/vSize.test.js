'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vSize", () => {

    it ('should be invalid when no params are passed', () => {
        const evaluation = (new Validator({ a: 'size:<meta.params>' })).validate({ a: 'hello' });

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'size', params: [undefined] }]);
    });

    it ('should return a correct error message when invalid', () => {
        const evaluation = (new Validator({ a: 'size:10' })).validate({ a: 'this is a string' });
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'size', params: ['10']}]);
    });

    it ('should allow a string as an acceptable value', () => {
        const evaluation = (new Validator({ a: 'size:16' })).validate({ a: 'this is a string' });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should allow an array as an acceptable value', () => {
        const evaluation = (new Validator({ a: 'size:5' })).validate({ a: ['foo', 'bar', 'hello', 'world', 'sweet'] });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should only allow numerical values as parameter in the rule', () => {
        const evaluation = (new Validator({ a: 'size:foo' })).validate({ a: 'bar' });
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
            i : [1,2,3,4,5],
            j : '',
            k : new String('world'),
            l : new Array(5),
            m : Object.create(null),
        };

        const valid_keys    = ['c', 'k', 'i', 'l'];
        const invalid_keys  = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'j', 'm'];
        const rules         = [...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'size:5';
            return acc;
        }, {});

        const evaluation = (new Validator(rules)).validate(typechecks);

        expect(evaluation.is_valid).to.eql(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([{msg:'size', params: ['5']}]));
    });

//  String

    it ('should validate a string whose length is smaller than the provided parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'size:10' })).validate({ a: 'hello' });
        expect(evaluation.is_valid).to.eql(false);
    });

    it ('should validate a string whose length is equal to the provided parameter as valid', () => {
        const evaluation = (new Validator({ a: 'size:11' })).validate({ a: 'hello world' });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should validate a string whose length is larger than the provided parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'size:8' })).validate({ a: 'hello world' });
        expect(evaluation.is_valid).to.eql(false);
    });

//  Array

    it ('should validate an array whose length is smaller than the provided parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'size:10' })).validate({ a: ['foo', 'bar'] });
        expect(evaluation.is_valid).to.eql(false);
    });

    it ('should validate an array whose length is equal to the provided parameter as valid', () => {
        const evaluation = (new Validator({ a: 'size:5' })).validate({ a: ['apple', 'pear', 'orange', 'melon', 'grape'] });
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should validate an array whose length is larger than the provided parameter as invalid', () => {
        const evaluation = (new Validator({ a: 'size:4' })).validate({ a: ['apple', 'pear', 'orange', 'melon', 'grape'] });
        expect(evaluation.is_valid).to.eql(false);
    });

});
