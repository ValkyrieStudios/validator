'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vBoolean", () => {
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

    it ('should validate a boolean correctly', () => {
        const validator = new Validator({
            d : 'boolean',
            e : 'boolean',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.d).to.deep.equal([]);
        expect(evaluation.errors.e).to.deep.equal([]);
    });

    it ('should not validate other types as valid booleans', () => {
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'boolean';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
            a: [{msg: 'boolean', params: []}],
            b: [{msg: 'boolean', params: []}],
            c: [{msg: 'boolean', params: []}],
            d: [],
            e: [],
            f: [{msg: 'boolean', params: []}],
            g: [{msg: 'boolean', params: []}],
            h: [{msg: 'boolean', params: []}],
            i: [{msg: 'boolean', params: []}],
            j: [{msg: 'boolean', params: []}],
            k: [{msg: 'boolean', params: []}],
            l: [{msg: 'boolean', params: []}],
            n: [{msg: 'boolean', params: []}],
        });
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['d', 'e'];
        const invalid_keys  = ['a', 'b', 'c', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'boolean';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([{msg:'boolean', params: []}]));
    });

});
