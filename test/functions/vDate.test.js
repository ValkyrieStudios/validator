'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vDate", () => {
    const subject = {
        a : 100,
        b : 200,
        c : 'hello',
        d : false,
        e : true,
        f : new RegExp(),
        g : new Date(),
        h : {},
        i : [],
        j : '',
        k : new String('Foo'),
        l : new Array(),
        n : Object.create(null),
    };

    it ('should validate a date correctly', () => {
        const validator = new Validator({ g : 'date' });
        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.g).to.deep.equal([]);
    });

    it ('should not validate other types as valid dates', () => {
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'date';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
            a: [{msg: 'date', params: []}],
            b: [{msg: 'date', params: []}],
            c: [{msg: 'date', params: []}],
            d: [{msg: 'date', params: []}],
            e: [{msg: 'date', params: []}],
            f: [{msg: 'date', params: []}],
            g: [],
            h: [{msg: 'date', params: []}],
            i: [{msg: 'date', params: []}],
            j: [{msg: 'date', params: []}],
            k: [{msg: 'date', params: []}],
            l: [{msg: 'date', params: []}],
            n: [{msg: 'date', params: []}],
        });
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['g'];
        const invalid_keys  = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k', 'l', 'n'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'date';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([{msg:'date', params: []}]));
    });

});
