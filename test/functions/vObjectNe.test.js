'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vObjectNe", () => {
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
        o : {hi: 'there'},
    };

    it ('should validate an object correctly', () => {
        const validator = new Validator({
            o : 'object_ne',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors).to.deep.equal({o: []});
    });

    it ('should not validate other types as valid objects', () => {
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'object_ne';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
            a: [{msg: 'object_ne', params: []}],
            b: [{msg: 'object_ne', params: []}],
            c: [{msg: 'object_ne', params: []}],
            d: [{msg: 'object_ne', params: []}],
            e: [{msg: 'object_ne', params: []}],
            f: [{msg: 'object_ne', params: []}],
            g: [{msg: 'object_ne', params: []}],
            h: [{msg: 'object_ne', params: []}],
            i: [{msg: 'object_ne', params: []}],
            j: [{msg: 'object_ne', params: []}],
            k: [{msg: 'object_ne', params: []}],
            l: [{msg: 'object_ne', params: []}],
            n: [{msg: 'object_ne', params: []}],
            o: [],
        })
    });

    it ('should not validate an empty object as valid', () => {
        expect(new Validator({a: 'object_ne'}).validate({a: {}})).to.deep.equal({
            is_valid: false,
            errors: {
                a: [{msg: 'object_ne', params: []}],
            },
        });
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['o'];
        const invalid_keys  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'object_ne';
            return acc;
        }, {}));


        const evaluation = validator.validate(subject);

        valid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([{msg:'object_ne', params: []}]));
    });

});
