'use strict';

import Validator    from '../../src/index';

describe("[PRIMITIVE] vString", () => {
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
        const validator = new Validator({
            c : 'string',
            j : 'string',
            k : 'string',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.c).toEqual([]);
        expect(evaluation.errors.j).toEqual([]);
        expect(evaluation.errors.k).toEqual([]);
    });

    it ('should not validate other types as valid strings', () => {
        const validator = new Validator({
            a : 'string',
            b : 'string',
            c : 'string',
            d : 'string',
            e : 'string',
            f : 'string',
            g : 'string',
            h : 'string',
            i : 'string',
            j : 'string',
            k : 'string',
            l : 'string',
            n : 'string',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors).toEqual(jasmine.any(Object));
    });

    it ('should return a correct error message when invalid', () => {
        const validator = new Validator({
            a : 'string',
            b : 'string',
            c : 'string',
            d : 'string',
            e : 'string',
            f : 'string',
            g : 'string',
            h : 'string',
            i : 'string',
            j : 'string',
            k : 'string',
            l : 'string',
            n : 'string',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg:'string'}]);
        expect(evaluation.errors.b).toEqual([{msg:'string'}]);
        expect(evaluation.errors.c).toEqual([]);
        expect(evaluation.errors.d).toEqual([{msg:'string'}]);
        expect(evaluation.errors.e).toEqual([{msg:'string'}]);
        expect(evaluation.errors.f).toEqual([{msg:'string'}]);
        expect(evaluation.errors.g).toEqual([{msg:'string'}]);
        expect(evaluation.errors.h).toEqual([{msg:'string'}]);
        expect(evaluation.errors.i).toEqual([{msg:'string'}]);
        expect(evaluation.errors.j).toEqual([]);
        expect(evaluation.errors.k).toEqual([]);
        expect(evaluation.errors.l).toEqual([{msg:'string'}]);
        expect(evaluation.errors.n).toEqual([{msg:'string'}]);
    });

});
