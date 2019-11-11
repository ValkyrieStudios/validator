'use strict';

import Validator from '../../src/index';

describe("vArray", () => {
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
        const keys = Object.keys(subject);
        const validator = new Validator([...keys].reduce((acc, key) => {
            acc[key] = 'array';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors).toEqual(jasmine.any(Object));
    });

    it ('should return a correct error message when invalid', () => {
        const valid_keys    = ['i', 'l'];
        const invalid_keys  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'n'];

        const validator = new Validator([...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'array';
            return acc;
        }, {}));

        const evaluation = validator.validate(subject);

        expect(evaluation.is_valid).toEqual(false);

        valid_keys.forEach(key => expect(evaluation.errors[key]).toEqual([]));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).toEqual([{msg:'array', params: []}]));
    });

});
