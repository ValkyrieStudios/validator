'use strict';

import Validator from '../../src/index';

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
    };

    it ('should validate an integer correctly', () => {
        const validator = new Validator({
            a : 'integer',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('should not validate other types as valid integers', () => {
        const validator = new Validator({
            a : 'integer',
            b : 'integer',
            c : 'integer',
            d : 'integer',
            e : 'integer',
            f : 'integer',
            g : 'integer',
            h : 'integer',
            i : 'integer',
            j : 'integer',
            k : 'integer',
            l : 'integer',
            n : 'integer',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors).toEqual(jasmine.any(Object));
    });

    it ('should return a correct error message when invalid', () => {
        const validator = new Validator({
            a : 'integer',
            b : 'integer',
            c : 'integer',
            d : 'integer',
            e : 'integer',
            f : 'integer',
            g : 'integer',
            h : 'integer',
            i : 'integer',
            j : 'integer',
            k : 'integer',
            l : 'integer',
            n : 'integer',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([{msg:'integer'}]);
        expect(evaluation.errors.c).toEqual([{msg:'integer'}]);
        expect(evaluation.errors.d).toEqual([{msg:'integer'}]);
        expect(evaluation.errors.e).toEqual([{msg:'integer'}]);
        expect(evaluation.errors.f).toEqual([{msg:'integer'}]);
        expect(evaluation.errors.g).toEqual([{msg:'integer'}]);
        expect(evaluation.errors.h).toEqual([{msg:'integer'}]);
        expect(evaluation.errors.i).toEqual([{msg:'integer'}]);
        expect(evaluation.errors.j).toEqual([{msg:'integer'}]);
        expect(evaluation.errors.k).toEqual([{msg:'integer'}]);
        expect(evaluation.errors.l).toEqual([{msg:'integer'}]);
        expect(evaluation.errors.n).toEqual([{msg:'integer'}]);
    });
})
