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
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'boolean';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors).toEqual(jasmine.any(Object));
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['d', 'e'];
        const invalid_keys  = ['a', 'b', 'c', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'boolean';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).toEqual([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).toEqual([{msg:'boolean', params: []}]));
    });

});
