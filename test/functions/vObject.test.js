'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vObject", () => {
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

    it ('should validate an object correctly', () => {
        const validator = new Validator({
            h : 'object',
            n : 'object',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.h).to.deep.equal([]);
        expect(evaluation.errors.n).to.deep.equal([]);
    });

    it ('should not validate other types as valid objects', () => {
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'object';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
            a: [{msg: 'object', params: []}],
            b: [{msg: 'object', params: []}],
            c: [{msg: 'object', params: []}],
            d: [{msg: 'object', params: []}],
            e: [{msg: 'object', params: []}],
            f: [{msg: 'object', params: []}],
            g: [{msg: 'object', params: []}],
            h: [],
            i: [{msg: 'object', params: []}],
            j: [{msg: 'object', params: []}],
            k: [{msg: 'object', params: []}],
            l: [{msg: 'object', params: []}],
            n: [],
        })
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['h', 'n'];
        const invalid_keys  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'object';
            return acc;
        }, {}));


        const evaluation = validator.validate(subject);

        valid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([{msg:'object', params: []}]));
    });

});
