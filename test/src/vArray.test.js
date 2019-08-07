'use strict';

import vString      from '../../src/functions/vString';
import Validator    from '../../src/index';

describe("[FN] vArray", () => {
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

    it ('should validate an array correctly', () => {
        const validator = new Validator({
            i : 'array',
            l : 'array',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.i).toEqual([]);
        expect(evaluation.errors.l).toEqual([]);
    });

    it ('should not validate other types as valid arrays', () => {
        const validator = new Validator({
            a : 'array',
            b : 'array',
            c : 'array',
            d : 'array',
            e : 'array',
            f : 'array',
            g : 'array',
            h : 'array',
            i : 'array',
            j : 'array',
            k : 'array',
            l : 'array',
            n : 'array',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors).toEqual(jasmine.any(Object));
    });

    it ('should return a correct error message when invalid', () => {
        const validator = new Validator({
            a : 'array',
            b : 'array',
            c : 'array',
            d : 'array',
            e : 'array',
            f : 'array',
            g : 'array',
            h : 'array',
            i : 'array',
            j : 'array',
            k : 'array',
            l : 'array',
            n : 'array',
        });

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg:'array'}]);
        expect(evaluation.errors.b).toEqual([{msg:'array'}]);
        expect(evaluation.errors.c).toEqual([{msg:'array'}]);
        expect(evaluation.errors.d).toEqual([{msg:'array'}]);
        expect(evaluation.errors.e).toEqual([{msg:'array'}]);
        expect(evaluation.errors.f).toEqual([{msg:'array'}]);
        expect(evaluation.errors.g).toEqual([{msg:'array'}]);
        expect(evaluation.errors.h).toEqual([{msg:'array'}]);
        expect(evaluation.errors.i).toEqual([]);
        expect(evaluation.errors.j).toEqual([{msg:'array'}]);
        expect(evaluation.errors.k).toEqual([{msg:'array'}]);
        expect(evaluation.errors.l).toEqual([]);
        expect(evaluation.errors.n).toEqual([{msg:'array'}]);
    });

});
