'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vString", () => {
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

    it ('should validate a string correctly', () => {
        const keys = ['c', 'j', 'k'];
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'string';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.c).to.deep.equal([]);
        expect(evaluation.errors.j).to.deep.equal([]);
        expect(evaluation.errors.k).to.deep.equal([]);
    });

    it ('should not validate other types as valid strings', () => {
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'string';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
            a: [{msg: 'string', params: []}],
            b: [{msg: 'string', params: []}],
            c: [],
            d: [{msg: 'string', params: []}],
            e: [{msg: 'string', params: []}],
            f: [{msg: 'string', params: []}],
            g: [{msg: 'string', params: []}],
            h: [{msg: 'string', params: []}],
            i: [{msg: 'string', params: []}],
            j: [],
            k: [],
            l: [{msg: 'string', params: []}],
            n: [{msg: 'string', params: []}],
        });
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['c', 'j', 'k'];
        const invalid_keys  = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'l', 'n'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'string';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([{msg:'string', params: []}]));
    });

});
