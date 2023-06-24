'use strict';

import Validator from '../../src/index';

const expect = require('chai').expect;

describe('vRequired', () => {
    it('should be valid if passed a correct value', () => {
        const subject = {
            a : 100,
            b : 200,
            c : 'hello',
            d : false,
            e : true,
            f : new RegExp(),
            g : new Date(),
            h : {},
            k : new String('Foo'),
        };

        const rules = Object.keys(subject).reduce((acc, key) => {
            acc[key] = 'required';
            return acc;
        }, {});

        const evaluation = new Validator(rules).validate(subject);
        expect(evaluation.is_valid).to.eql(true);

        Object.keys(subject).forEach(key => expect(evaluation.errors[key]).to.deep.equal([]));
    });

    it('should be invalid if not passed', () => {
        const evaluation = new Validator({a: 'required'}).validate({});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'required', params: []}]);
    });

    it('should be invalid if passed as undefined', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: undefined});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'required', params: []}]);
    });

    it('should be invalid if passed as an empty string', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: ''});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'required', params: []}]);
    });

    it('should be invalid if passed a string that only contains spaces', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: ''});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'required', params: []}]);
    });

    it('should be invalid if passed as an empty array', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: []});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'required', params: []}]);
    });

    it('should be invalid if passed a NaN', () => {
        const evaluation = new Validator({a: 'required'}).validate({a: Number.NaN});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'required', params: []}]);
    });
});
