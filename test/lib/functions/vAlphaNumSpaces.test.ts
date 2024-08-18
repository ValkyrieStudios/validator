import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import Validator        from '../../../lib';

describe('vAlphaNumSpaces', () => {
    it('Should validate a alphanumeric string correctly', () => {
        for (const el of [
            //  Full set
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ',
            //  Purely alphabet
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            'abcdefghijklmnopqrstuvwxyz',
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            'helloworld',
            'loremipsumdolorsitamet',
            //  Purely digits
            '0123456789',
            '9876543210',
            '48093320894432948239432',
            //  Random strings
            'hello world',
            'hi5',
            '8ask',
            'Hello world 123456890 this is a t3st',
        ]) {
            const evaluation = new Validator({a1: 'alpha_num_spaces'}).validate({a1: el});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        }
    });

    it('Should not validate non-string as valid', () => {
        for (const el of CONSTANTS.NOT_STRING) {
            const evaluation = new Validator({a1: 'alpha_num_spaces'}).validate({a1: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a1: [{msg: el === undefined ? 'not_found' : 'alpha_num_spaces', params: []}],
                },
            });
        }
    });

    it('Should not validate other non-alphanumeric strings as valid alphanumeric strings', () => {
        for (const el of [
            'yyyyyyyy.',
            '! dff',
            'NoSpecialcharacters#',
            'this, is a test',
            'this: is a test',
            '[hi',
            'hi]',
            '<oh my god',
            '>oh my god',
            '{hi',
            '}hi',
            '"hi',
            '"hi',
            'this, is a test! with special characters.',
            '\'hi',
            '~`[]{}"\'.<>/!@#$%^&*()_+)=',
            '+hi',
            '=hi',
            '-hi',
            '~hi',
            '(hi',
            'hi)',
            'Hi\nthis\nis\rmultiline',
        ]) {
            const evaluation = new Validator({a1: 'alpha_num_spaces'}).validate({a1: el});
            assert.deepEqual(evaluation, {is_valid: false, count: 1, errors: {a1: [{msg: 'alpha_num_spaces', params: []}]}});
        }
    });
});
