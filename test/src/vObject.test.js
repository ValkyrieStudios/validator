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
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'object';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors).toEqual(jasmine.any(Object));
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['h', 'n'];
        const invalid_keys  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k', 'l'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'object';
            return acc;
        }, {}));


        const evaluation = validator.validate(subject);

        valid_keys.forEach(key => expect(evaluation.errors[key]).toEqual([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).toEqual([{msg:'object', params: []}]));
    });

});
