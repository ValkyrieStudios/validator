'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vArrayNe", () => {
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
        o : ['Hello'],
    };

    it ('should validate an array correctly', () => {
        const validator = new Validator({
            o : 'array_ne',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors).to.deep.equal({o: []});
    });

    it ('should not validate other types as valid arrays', () => {
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'array_ne';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
            a: [{msg: 'array_ne', params: []}],
            b: [{msg: 'array_ne', params: []}],
            c: [{msg: 'array_ne', params: []}],
            d: [{msg: 'array_ne', params: []}],
            e: [{msg: 'array_ne', params: []}],
            f: [{msg: 'array_ne', params: []}],
            g: [{msg: 'array_ne', params: []}],
            h: [{msg: 'array_ne', params: []}],
            i: [{msg: 'array_ne', params: []}],
            j: [{msg: 'array_ne', params: []}],
            k: [{msg: 'array_ne', params: []}],
            l: [{msg: 'array_ne', params: []}],
            n: [{msg: 'array_ne', params: []}],
            o: [],
        });
    });

    it ('should validate an empty array as invalid', () => {
        expect(new Validator({a: 'array_ne'}).validate({a: []})).to.deep.equal({
            is_valid: false,
            errors: {
                a: [{msg: 'array_ne', params: []}],
            },
        });
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['o'];
        const invalid_keys  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'array_ne';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([{msg:'array_ne', params: []}]));
    });

});
