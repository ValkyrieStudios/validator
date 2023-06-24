'use strict';

import guid from '@valkyriestudios/utils/hash/guid';
import Validator from '../../src/index';

const expect = require('chai').expect;

describe('vDateString', () => {
    const str_tests = [{a:1}, [0,1,2], true, new Date(), /1/g, false, 123, 0.123];
    const non_alphanum_dash_underscore_tests = [
        ' ',
        '$',
        '|',
        '(',
        ')',
        '!',
        '\'',
        '\"',
        '@',
        '#',
        '%',
        '^',
        '&',
        '*',
        '+',
        '=',
        '}',
        '{',
        ']',
        '[',
        '\\',
        '\n',
        '\r',
        '/',
        '<',
        '>',
        '.',
        '?',
        ';',
        ':',
        '`',
    ];

    it('Should be invalid if not passed a string', () => {
        for (const el of str_tests) {
            expect(new Validator({a: 'date_string'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it('Should be invalid if passed a empty string (or empty after trimming)', () => {
        for (const el of ['', ' ', '    ']) {
            expect(new Validator({a: 'date_string'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it('Should be invalid if passed a string with content that is not a valid date string', () => {
        for (const el of [
            'abc',
            'foobar',
            '-1000000000000000000000',
            '202a-1b-0c',
            guid(),
            '20221125',
            '20220318',
            'abcdefg',
            '4328492374ewque',
            '_343424823942',
            ' _343424823942',
            '   _343424823942',
            '343424823942_',
            '343424823942_ ',
            '343424823942_   ',
        ]) {
            expect(new Validator({a: 'date_string'}).validate({a: el}).is_valid).to.eql(false);
        }

        for (const el of non_alphanum_dash_underscore_tests) {
            expect(new Validator({a: 'date_string'}).validate({a: `43847234${el}234789`}).is_valid).to.eql(false);
            expect(new Validator({a: 'date_string'}).validate({a: `${el}43847234234789`}).is_valid).to.eql(false);
            expect(new Validator({a: 'date_string'}).validate({a: `43847234234789${el}`}).is_valid).to.eql(false);
        }
    });

    it('Should be valid if passed a valid date string', () => {
        for (const el of [
            '04 Dec 1995 00:12:00 GMT',
            '2022-02-10',
            '2022-11-25T11:08:32+01:00',
            'Friday, November 25, 2022 11:09 AM',
            '2022/03/18 15:31:36',
        ]) expect(new Validator({a: 'date_string'}).validate({a: el}).is_valid).to.eql(true);
    });
});
