'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import Validator        from '../../../src/index.mjs';

describe('vEmail', () => {
    describe('Valid', () => {
        it('Basic email as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain.com'});
            assert.ok(evaluation.is_valid);
        });

        it('Email that contains a dot in the address field as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'firstname.lastname@domain.com'});
            assert.ok(evaluation.is_valid);
        });

        it('Email containing a dot with subdomain as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@subdomain.domain.com'});
            assert.ok(evaluation.is_valid);
        });

        it('Plus sign in the username as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'firstname+lastname@domain.com'});
            assert.ok(evaluation.is_valid);
        });

        it('Ip address as a domain as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@123.123.123.123'});
            assert.ok(evaluation.is_valid);
        });

        it('Quotes around the email as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: '"email"@domain.com'});
            assert.ok(evaluation.is_valid);
        });

        it('Digits in the address field as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: '1234567890@domain.com'});
            assert.ok(evaluation.is_valid);
        });

        it('Dash in the domain as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain-one.com'});
            assert.ok(evaluation.is_valid);
        });

        it('Underscores in the address field as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: '_______@domain.com'});
            assert.ok(evaluation.is_valid);
        });

        it('Dot in the top level domain as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain.co.jp'});
            assert.ok(evaluation.is_valid);
        });

        it('Dash in the address field as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'firstname-lastname@domain.com'});
            assert.ok(evaluation.is_valid);
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
            assert.ok(evaluation.is_valid);
        });

        it('Domains with multiple suffixes as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'peter@test.co.uk'});
            assert.ok(evaluation.is_valid);
        });

        it('Specific email addresses as correct', () => {
            for (const el of [
                'peter-@4cooks.com',
                'c&lent@myoffices.com',
            ]) {
                const evaluation = new Validator({a: 'email'}).validate({a: el});
                assert.ok(evaluation.is_valid);
            }
        });

        it('Email with 6 character TLD as correct', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@cof.coffee'});
            assert.ok(evaluation.is_valid);
        });
    });

    describe('Invalid', () => {
        it('Other types and base strings', () => {
            for (const el of [...CONSTANTS.NOT_STRING_WITH_EMPTY, 'Foo', 'hello']) {
                const evaluation = new Validator({a1: 'email'}).validate({a1: el});
                assert.equal(evaluation.is_valid, false);
                assert.deepEqual(evaluation.errors.a1, [{msg: 'email', params: []}]);
            }
        });

        it('Garbage string', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: '#@%^%#$@#$@#.com'});
            assert.equal(evaluation.is_valid, false);
        });

        it('String with a missing @sign and domain', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'plainaddress'});
            assert.equal(evaluation.is_valid, false);
        });

        it('String with a missing username', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: '@domain.com'});
            assert.equal(evaluation.is_valid, false);
        });

        it('String with a username longer than 64 characters', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'thisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutit@domain.com'}); // eslint-disable-line max-len
            assert.equal(evaluation.is_valid, false);
        });

        it('String with a domain part longer than 253 characters', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'peter@thisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutitthisisawaytoolongusernamethatshouldfailvalidationifiamcorrectaboutit.com'}); // eslint-disable-line max-len
            assert.equal(evaluation.is_valid, false);
        });

        it('Wrong domain', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'peter@|thisshouldnotbevalid<|.com'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Encoded html within the email', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'Joe Smith <email@domain.com>'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Missing @ sign', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email.domain.com'});
            assert.equal(evaluation.is_valid, false);
        });

        it('String with two @ signs', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain@domain.com'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Leading dot in the address', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: '.email@domain.com'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Trailing dot in the address', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email.@domain.com'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Multiple dots in the address field', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email..email@domain.com'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Unicode characters in the address field', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'あいうえお@domain.com'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Unicode characters in the domain', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'joe@あいうえお.com'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Text following the email address', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain.com (Joe Smith)'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Missing top level domain', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Leading dash in front of the domain', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@-domain.com'});
            assert.equal(evaluation.is_valid, false);
        });

        it('Multiple dots in the domain', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain..com'});
            assert.equal(evaluation.is_valid, false);
        });

        it('1-letter domain suffix', () => {
            const evaluation = new Validator({a: 'email'}).validate({a: 'email@domain.a'});
            assert.equal(evaluation.is_valid, false);
        });
    });
});
