'use strict';

import Validator from '../../src/index';

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

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.h).toEqual([]);
        expect(evaluation.errors.n).toEqual([]);
    });

    it ('should not validate other types as valid objects', () => {
        const validator = new Validator({
            a : 'object',
            b : 'object',
            c : 'object',
            d : 'object',
            e : 'object',
            f : 'object',
            g : 'object',
            h : 'object',
            i : 'object',
            j : 'object',
            k : 'object',
            l : 'object',
            n : 'object',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors).toEqual(jasmine.any(Object));
    });

    it ('should return a correct error message when invalid', () => {
        const validator = new Validator({
            a : 'object',
            b : 'object',
            c : 'object',
            d : 'object',
            e : 'object',
            f : 'object',
            g : 'object',
            h : 'object',
            i : 'object',
            j : 'object',
            k : 'object',
            l : 'object',
            n : 'object',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg:'object'}]);
        expect(evaluation.errors.b).toEqual([{msg:'object'}]);
        expect(evaluation.errors.c).toEqual([{msg:'object'}]);
        expect(evaluation.errors.d).toEqual([{msg:'object'}]);
        expect(evaluation.errors.e).toEqual([{msg:'object'}]);
        expect(evaluation.errors.f).toEqual([{msg:'object'}]);
        expect(evaluation.errors.g).toEqual([{msg:'object'}]);
        expect(evaluation.errors.h).toEqual([]);
        expect(evaluation.errors.i).toEqual([{msg:'object'}]);
        expect(evaluation.errors.j).toEqual([{msg:'object'}]);
        expect(evaluation.errors.k).toEqual([{msg:'object'}]);
        expect(evaluation.errors.l).toEqual([{msg:'object'}]);
        expect(evaluation.errors.n).toEqual([]);
    });

});
