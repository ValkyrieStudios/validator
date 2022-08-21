'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vInteger", () => {
    const subject = {
        a : 100,
        b : 20.5,
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
        o : NaN,
        p : undefined,
        q : Number.NEGATIVE_INFINITY,
    };

    it ('should validate an integer correctly', () => {
        const validator = new Validator({ a : 'integer' });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it ('should not validate other types as valid integers', () => {
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'integer';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
            a: [],
            b: [{msg: 'integer', params: []}],
            c: [{msg: 'integer', params: []}],
            d: [{msg: 'integer', params: []}],
            e: [{msg: 'integer', params: []}],
            f: [{msg: 'integer', params: []}],
            g: [{msg: 'integer', params: []}],
            h: [{msg: 'integer', params: []}],
            i: [{msg: 'integer', params: []}],
            j: [{msg: 'integer', params: []}],
            k: [{msg: 'integer', params: []}],
            l: [{msg: 'integer', params: []}],
            n: [{msg: 'integer', params: []}],
            o: [{msg: 'integer', params: []}],
            p: [{msg: 'integer', params: []}],
            q: [{msg: 'integer', params: []}],
        });
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['a'];
        const invalid_keys  = ['b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n', 'o', 'p', 'q'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'integer';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([{msg:'integer', params: []}]));
    });
})
