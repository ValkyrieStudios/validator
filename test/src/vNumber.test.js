'use strict';

import Validator    from '../../src/index';

describe("[PRIMITIVE] vNumber", () => {
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

    it ('should validate a number correctly', () => {
        const validator = new Validator({
            a : 'number',
            b : 'number',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([]);
    });

    it ('should not validate other types as valid numbers', () => {
        const validator = new Validator({
            a : 'number',
            b : 'number',
            c : 'number',
            d : 'number',
            e : 'number',
            f : 'number',
            g : 'number',
            h : 'number',
            i : 'number',
            j : 'number',
            k : 'number',
            l : 'number',
            n : 'number',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors).toEqual(jasmine.any(Object));
    });

    it ('should return a correct error message when invalid', () => {
        const validator = new Validator({
            a : 'number',
            b : 'number',
            c : 'number',
            d : 'number',
            e : 'number',
            f : 'number',
            g : 'number',
            h : 'number',
            i : 'number',
            j : 'number',
            k : 'number',
            l : 'number',
            n : 'number',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([]);
        expect(evaluation.errors.c).toEqual([{msg:'number'}]);
        expect(evaluation.errors.d).toEqual([{msg:'number'}]);
        expect(evaluation.errors.e).toEqual([{msg:'number'}]);
        expect(evaluation.errors.f).toEqual([{msg:'number'}]);
        expect(evaluation.errors.g).toEqual([{msg:'number'}]);
        expect(evaluation.errors.h).toEqual([{msg:'number'}]);
        expect(evaluation.errors.i).toEqual([{msg:'number'}]);
        expect(evaluation.errors.j).toEqual([{msg:'number'}]);
        expect(evaluation.errors.k).toEqual([{msg:'number'}]);
        expect(evaluation.errors.l).toEqual([{msg:'number'}]);
        expect(evaluation.errors.n).toEqual([{msg:'number'}]);
    });

});
