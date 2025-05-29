import guid from '@valkyriestudios/utils/hash/guid';
import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import Validator from '../../../lib';

describe('vDateString', () => {
    it('Should be invalid if not passed a string or passed a string that is empty after trimming', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            expect(new Validator({a: 'date_string'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'date_string', params: []}],
                },
            });
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
        ]) expect(
            new Validator({a: 'date_string'}).validate({a: el})
        ).toEqual({
            is_valid: false,
            count: 1,
            errors: {a: [{msg: 'date_string', params: []}]},
        });

        for (const el of [
            ' ',
            '$',
            '|',
            '(',
            ')',
            '!',
            '\'',
            '"',
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
        ]) {
            expect(new Validator({a: 'date_string'}).validate({a: `43847234${el}234789`})).toEqual({
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'date_string', params: []}]},
            });
            expect(new Validator({a: 'date_string'}).validate({a: `${el}43847234234789`})).toEqual({
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'date_string', params: []}]},
            });
            expect(new Validator({a: 'date_string'}).validate({a: `43847234234789${el}`})).toEqual({
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'date_string', params: []}]},
            });
        }
    });

    it('Should be valid if passed a valid date string', () => {
        for (const el of [
            '04 Dec 1995 00:12:00 GMT',
            '2022-02-10',
            '2022-11-25T11:08:32+01:00',
            'Friday, November 25, 2022 11:09 AM',
            '2022/03/18 15:31:36',
        ]) expect(new Validator({a: 'date_string'}).validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
    });
});
