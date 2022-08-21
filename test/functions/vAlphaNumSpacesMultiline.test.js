'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vAlphaNumSpacesMultiline", () => {

    const subject = {
        //  Full set
        a1  : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 \r\n',
        //  Purely alphabet
        b1  : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        b2  : 'abcdefghijklmnopqrstuvwxyz',
        b3  : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        b4  : 'helloworld',
        b5  : 'loremipsumdolorsitamet',
        //  Purely digits
        c1  : '0123456789',
        c2  : '9876543210',
        c3  : '48093320894432948239432',
        //  Random strings
        d1  : 'hello world',
        d2  : 'hi5',
        d3  : '8ask',
        d4  : 'Hello world 123456890 this is a t3st',
        d5  : 'Hello\nWorld\r\nthis is amazing right!',
        d6  : 'Hi\nthis\nis\rmultiline',
        //  Should fail
        e1  : 'yyyyyyyy.',
        e2  : '! dff',
        e3  : 'NoSpecialcharacters#',
        e4  : 'this, is a test',
        e5  : 'this: is a test',
        e6  : '[hi',
        e7  : 'hi]',
        e8  : '<oh my god',
        e9  : '>oh my god',
        e10 : '{hi',
        e11 : '}hi',
        e12 : '"hi',
        e13 : '"hi',
        e14 : 'this, is a test! with special characters.',
        e15 : '\'hi',
        e16 : '~`[]{}"\'.<>/!@#$%^&*()_+)=',
        e17 : '+hi',
        e18 : '=hi',
        e19 : '-hi',
        e20 : '~hi',
        e21 : '(hi',
        e22 : 'hi)',
        f1  : {},
        f2  : { a: 'hello !'},
        f3  : ['hello', 'world'],
        f4  : true,
        f5  : false,
        f6  : new Date(),
        f7  : /^[1-9]$/ig,
        f8  : 12345,
        f9  : Object.create(null),
        f10 : new RegExp(),
    };

    it ('should validate a alphanumeric multiline string correctly', () => {
        const keys = [
            'a1', 'b1', 'b2', 'b3', 'b4', 'b5', 'c1', 'c2', 'c3', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6',
        ];

        const validator = new Validator(keys.reduce((acc, val) => {
            acc[val] = 'alpha_num_spaces_multiline';
            return acc;
        }, {}))
        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(true);
        keys.forEach((val) => expect(evaluation.errors[val]).to.deep.equal([]));
    });

    it ('should not validate other types as valid alphanumeric multiline strings', () => {
        const keys = [
            'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10',
        ];

        const validator = new Validator(keys.reduce((acc, val) => {
            acc[val] = 'alpha_num_spaces_multiline';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);
        keys.forEach((val) => expect(evaluation.errors[val]).to.deep.equal([{msg: 'alpha_num_spaces_multiline', params: []}]));
    });

    it ('should not validate other non-alphanumeric strings as valid alphanumeric multiline strings', () => {
        const keys = [
            'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10', 'e11', 'e12', 'e13', 'e14',
            'e15', 'e16', 'e17', 'e18', 'e19', 'e20', 'e21', 'e22',
        ];

        const validator = new Validator(keys.reduce((acc, val) => {
            acc[val] = 'alpha_num_spaces_multiline';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).to.eql(false);
        keys.forEach((val) => expect(evaluation.errors[val]).to.deep.equal([{msg: 'alpha_num_spaces_multiline', params: []}]));
    });

});
