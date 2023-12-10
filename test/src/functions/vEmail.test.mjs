'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import Validator        from '../../../src/index.mjs';

describe('vEmail', () => {
    describe('Valid', () => {
        it('Basic email as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain.com'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Email that contains a dot in the address field as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'firstname.lastname@domain.com'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Email containing a dot with subdomain as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@subdomain.domain.com'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Plus sign in the username as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'firstname+lastname@domain.com'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Ip address as a domain as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@123.123.123.123'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Quotes around the email as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: '"email"@domain.com'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Digits in the address field as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: '1234567890@domain.com'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Dash in the domain as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain-one.com'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Underscores in the address field as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: '_______@domain.com'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Dot in the top level domain as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain.co.jp'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Dash in the address field as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'firstname-lastname@domain.com'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('2, 3, 4 and 5 character domain suffix as correct', () => {
            const evaluation = new Validator({
                a: 'email',
                b: 'email',
                c: 'email',
                d: 'email',
            }).validate({
                a: 'peter@domain.be',
                b: 'peter@domain.com',
                c: 'peter@domain.gent',
                d: 'peter@domain.world',
            });
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Domains with multiple suffixes as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'peter@test.co.uk'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Specific email addresses as correct', () => {
            for (const el of [
                'peter-@4cooks.com',
                'c&lent@myoffices.com',
                'email@cof.coffee',
            ]) {
                const evaluation = new Validator({a: 'email'}).validate({a: el});
                assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
            }
        });

        it('Email with between 2 and 63 character TLD as correct', () => {
            let c = 'c';
            for (let i = 0; i < 62; i++) {
                c = `${c}c`;
                const evaluation = new Validator({a: 'email'}).validate({a: `email@cof.${c}`});
                assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});    
            }
        });
    });

    describe('Invalid', () => {
        it('Other types and base strings', () => {
            for (const el of [...CONSTANTS.NOT_STRING_WITH_EMPTY, 'Foo', 'hello']) {
                const evaluation = new Validator({a: 'email'}).validate({a: el});
                assert.deepEqual(evaluation, {
                    is_valid: false,
                    count: 1,
                    errors: {a: [{msg: el === undefined ? 'not_found' : 'email', params: []}]},
                });
            }
        });

        it('Garbage string', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: '#@%^%#$@#$@#.com'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('String with a missing @sign and domain', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'plainaddress'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('String with a missing username', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: '@domain.com'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('String with a username longer than 64 characters', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'thisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutit@domain.com'}); // eslint-disable-line max-len
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('String with a domain part longer than 253 characters', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'peter@thisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutit.com'}); // eslint-disable-line max-len
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('Wrong domain', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'peter@|thisshouldnotbevalid<|.com'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('Encoded html within the email', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'Joe Smith <email@domain.com>'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('Missing @ sign', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email.domain.com'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('String with two @ signs', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain@domain.com'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('Leading dot in the address', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: '.email@domain.com'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('Trailing dot in the address', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email.@domain.com'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('Multiple dots in the address field', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email..email@domain.com'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('Unicode characters in the address field', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'あいうえお@domain.com'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('Unicode characters in the domain', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'joe@あいうえお.com'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('Text following the email address', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain.com (Joe Smith)'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('Missing top level domain', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('Leading dash in front of the domain', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@-domain.com'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('Multiple dots in the domain', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain..com'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });

        it('1-letter domain suffix', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain.a'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'email', params: []}]},
            });
        });
    });
});
