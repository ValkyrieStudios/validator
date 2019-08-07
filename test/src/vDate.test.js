'use strict';

import Validator    from '../../src/index';

describe("[FN] vDate", () => {
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

    it ('should validate a date correctly', () => {
        const validator = new Validator({
            g : 'date',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.g).toEqual([]);
    });

    it ('should not validate other types as valid dates', () => {
        const validator = new Validator({
            a : 'date',
            b : 'date',
            c : 'date',
            d : 'date',
            e : 'date',
            f : 'date',
            g : 'date',
            h : 'date',
            i : 'date',
            j : 'date',
            k : 'date',
            l : 'date',
            n : 'date',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors).toEqual(jasmine.any(Object));
    });

    it ('should return a correct error message when invalid', () => {
        const validator = new Validator({
            a : 'date',
            b : 'date',
            c : 'date',
            d : 'date',
            e : 'date',
            f : 'date',
            g : 'date',
            h : 'date',
            i : 'date',
            j : 'date',
            k : 'date',
            l : 'date',
            n : 'date',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg:'date'}]);
        expect(evaluation.errors.b).toEqual([{msg:'date'}]);
        expect(evaluation.errors.c).toEqual([{msg:'date'}]);
        expect(evaluation.errors.d).toEqual([{msg:'date'}]);
        expect(evaluation.errors.e).toEqual([{msg:'date'}]);
        expect(evaluation.errors.f).toEqual([{msg:'date'}]);
        expect(evaluation.errors.g).toEqual([]);
        expect(evaluation.errors.h).toEqual([{msg:'date'}]);
        expect(evaluation.errors.i).toEqual([{msg:'date'}]);
        expect(evaluation.errors.j).toEqual([{msg:'date'}]);
        expect(evaluation.errors.k).toEqual([{msg:'date'}]);
        expect(evaluation.errors.l).toEqual([{msg:'date'}]);
        expect(evaluation.errors.n).toEqual([{msg:'date'}]);
    });

});
