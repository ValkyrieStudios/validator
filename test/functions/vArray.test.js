'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vArray", () => {
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

    it ('should validate an array correctly', () => {
        const validator = new Validator({
            i : 'array',
            l : 'array',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.i).to.deep.equal([]);
        expect(evaluation.errors.l).to.deep.equal([]);
    });

    it ('should not validate other types as valid arrays', () => {
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'array';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
            a: [{msg: 'array', params: []}],
            b: [{msg: 'array', params: []}],
            c: [{msg: 'array', params: []}],
            d: [{msg: 'array', params: []}],
            e: [{msg: 'array', params: []}],
            f: [{msg: 'array', params: []}],
            g: [{msg: 'array', params: []}],
            h: [{msg: 'array', params: []}],
            i: [],
            j: [{msg: 'array', params: []}],
            k: [{msg: 'array', params: []}],
            l: [],
            n: [{msg: 'array', params: []}],
        });
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['i', 'l'];
        const invalid_keys  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'n'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'array';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([{msg:'array', params: []}]));
    });

});
