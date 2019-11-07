'use strict';

import Validator from '../../src/index';

describe("vBoolean", () => {
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

    it ('should validate a boolean correctly', () => {
        const validator = new Validator({
            d : 'boolean',
            e : 'boolean',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.d).toEqual([]);
        expect(evaluation.errors.e).toEqual([]);
    });

    it ('should not validate other types as valid booleans', () => {
        const validator = new Validator({
            a : 'boolean',
            b : 'boolean',
            c : 'boolean',
            d : 'boolean',
            e : 'boolean',
            f : 'boolean',
            g : 'boolean',
            h : 'boolean',
            i : 'boolean',
            j : 'boolean',
            k : 'boolean',
            l : 'boolean',
            n : 'boolean',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors).toEqual(jasmine.any(Object));
    });

    it ('should return a correct error message when invalid', () => {
        const validator = new Validator({
            a : 'boolean',
            b : 'boolean',
            c : 'boolean',
            d : 'boolean',
            e : 'boolean',
            f : 'boolean',
            g : 'boolean',
            h : 'boolean',
            i : 'boolean',
            j : 'boolean',
            k : 'boolean',
            l : 'boolean',
            n : 'boolean',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg:'boolean'}]);
        expect(evaluation.errors.b).toEqual([{msg:'boolean'}]);
        expect(evaluation.errors.c).toEqual([{msg:'boolean'}]);
        expect(evaluation.errors.d).toEqual([]);
        expect(evaluation.errors.e).toEqual([]);
        expect(evaluation.errors.f).toEqual([{msg:'boolean'}]);
        expect(evaluation.errors.g).toEqual([{msg:'boolean'}]);
        expect(evaluation.errors.h).toEqual([{msg:'boolean'}]);
        expect(evaluation.errors.i).toEqual([{msg:'boolean'}]);
        expect(evaluation.errors.j).toEqual([{msg:'boolean'}]);
        expect(evaluation.errors.k).toEqual([{msg:'boolean'}]);
        expect(evaluation.errors.l).toEqual([{msg:'boolean'}]);
        expect(evaluation.errors.n).toEqual([{msg:'boolean'}]);
    });

});
