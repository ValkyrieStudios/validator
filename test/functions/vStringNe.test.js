'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vStringNe", () => {
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
        const keys = ['c', 'k'];
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'string_ne';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors).to.deep.equal({c: [], k: []});
    });

    it ('should not validate other types as valid strings', () => {
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'string_ne';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
            a: [{msg: 'string_ne', params: []}],
            b: [{msg: 'string_ne', params: []}],
            c: [],
            d: [{msg: 'string_ne', params: []}],
            e: [{msg: 'string_ne', params: []}],
            f: [{msg: 'string_ne', params: []}],
            g: [{msg: 'string_ne', params: []}],
            h: [{msg: 'string_ne', params: []}],
            i: [{msg: 'string_ne', params: []}],
            j: [{msg: 'string_ne', params: []}],
            k: [],
            l: [{msg: 'string_ne', params: []}],
            n: [{msg: 'string_ne', params: []}],
        });
    });

    it ('should not validate a string representing an empty string as valid', () => {
        let v = new Validator({a: 'string_ne'});

        for (let el of ['', ' ', '    ']) {
            expect(v.validate({a: el})).to.deep.equal({
                is_valid: false,
                errors: {
                    a: [{msg: 'string_ne', params: []}],
                },
            });
        }
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['c', 'k'];
        const invalid_keys  = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'l', 'n'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'string_ne';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).to.deep.equal([{msg:'string_ne', params: []}]));
    });

});
