'use strict';

import Validator from '../../src/index';

describe("vString", () => {
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
        const keys = ['c', 'j', 'k'];
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'string';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.c).toEqual([]);
        expect(evaluation.errors.j).toEqual([]);
        expect(evaluation.errors.k).toEqual([]);
    });

    it ('should not validate other types as valid strings', () => {
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'string';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors).toEqual(jasmine.any(Object));
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['c', 'j', 'k'];
        const invalid_keys  = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'l', 'n'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'string';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).toEqual([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).toEqual([{msg:'string', params: []}]));
    });

});
