'use strict';

import Validator from '../../src/index';

describe("vEmail", () => {
    const typechecks = {
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
        m : Object.create(null),
    };

    it ('should not validate other types and base strings as valid emails', () => {
        const rules = Object.keys(typechecks).reduce((acc, key) => {
            acc[key] = 'email';
            return acc;
        }, {});

        const evaluation = (new Validator(rules)).validate(typechecks);

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors).toEqual(jasmine.any(Object));
    });

    it ('should return a correct error message when invalid', () => {
        const keys = Object.keys(typechecks);
        const rules = Object.keys(typechecks).reduce((acc, key) => {
            acc[key] = 'email';
            return acc;
        }, {});

        const evaluation = (new Validator(rules)).validate(typechecks);

        expect(evaluation.is_valid).toEqual(false);

        keys.forEach((key) => expect(evaluation.errors[key]).toEqual([{msg:'email', params: []}]));
    });

//  Valid email tests

    it ('should validate a basic email as correct', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email@domain.com' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate an email that contains a dot in the address field as correct', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'firstname.lastname@domain.com' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate an email containing a dot with subdomain as correct', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email@subdomain.domain.com' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate a plus sign in the username as correct', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'firstname+lastname@domain.com' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate an ip address as a domain as correct', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email@123.123.123.123' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate quotes around the email as correct', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: '"email"@domain.com' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate digits in the address field as correct', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: '1234567890@domain.com' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate a dash in the domain as correct', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email@domain-one.com' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate underscores in the address field as correct', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: '_______@domain.com' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate a dot in the top level domain as correct', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email@domain.co.jp' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate a dash in the address field as correct', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'firstname-lastname@domain.com' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate a 2, 3, 4 and 5 character domain suffix as correct', () => {
        const evaluation = (new Validator({
            a: 'email',
            b: 'email',
            c: 'email',
            d: 'email',
        })).validate({
            a: 'peter@domain.be',
            b: 'peter@domain.com',
            c: 'peter@domain.gent',
            d: 'peter@domain.world'
        });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate domains with multiple suffixes as correct', () => {
        const evaluation = (new Validator({a: 'email'})).validate({a: 'peter@test.co.uk'});
        expect(evaluation.is_valid).toEqual(true);
    });

//  Invalid email tests

    it ('should validate a string with a missing @sign and domain as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'plainaddress' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a garbage string as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: '#@%^%#$@#$@#.com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a string with a missing username as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: '@domain.com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a string with a username longer than 64 characters as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'thisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutit@domain.com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a string with a domain part longer than 253 characters as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'peter@thisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutit.com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a wrong domain as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'peter@|thisshouldnotbevalid<|.com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate encoded html within the email as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'Joe Smith <email@domain.com>' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a missing @ sign as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email.domain.com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a string with two @ signs as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email@domain@domain.com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a leading dot in the address as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: '.email@domain.com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a trailing dot in the address as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email.@domain.com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate multiple dots in the address field as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email..email@domain.com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate umlaut characters in the address field as valid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'janköping@bastardburgers.se' });
        expect(evaluation.is_valid).toEqual(true);
    });

    it ('should validate unicode characters in the address field as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'あいうえお@domain.com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate unicode characters in the domain as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'joe@あいうえお.com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate text following the email address as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email@domain.com (Joe Smith)' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a missing top level domain as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email@domain' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a leading dash in front of the domain as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email@-domain.com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate multiple dots in the domain as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email@domain..com' });
        expect(evaluation.is_valid).toEqual(false);
    });

    it ('should validate a 1-letter domain suffix as invalid', () => {
        const evaluation = (new Validator({ a: 'email' })).validate({ a: 'email@domain.a' });
        expect(evaluation.is_valid).toEqual(false);
    });
});
