'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vNumber", () => {
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

    it ('should validate a number correctly', () => {
        const validator = new Validator({
            a : 'number',
            b : 'number',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
        expect(evaluation.errors.b).to.deep.equal([]);
    });

    it ('should not validate other types as valid numbers', () => {
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'number';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
            a: [],
            b: [],
            c: [{msg: 'number', params: []}],
            d: [{msg: 'number', params: []}],
            e: [{msg: 'number', params: []}],
            f: [{msg: 'number', params: []}],
            g: [{msg: 'number', params: []}],
            h: [{msg: 'number', params: []}],
            i: [{msg: 'number', params: []}],
            j: [{msg: 'number', params: []}],
            k: [{msg: 'number', params: []}],
            l: [{msg: 'number', params: []}],
            n: [{msg: 'number', params: []}],
        });
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['a', 'b'];
        const invalid_keys  = ['c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'number';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([{msg:'number', params: []}]));
    });

});
