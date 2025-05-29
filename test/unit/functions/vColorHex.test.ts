import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import Validator from '../../../lib';

describe('vColorHex', () => {
    it('Should validate a hex color string correctly', () => {
        const v = new Validator({a: 'color_hex'});

        for (const el of [
            '#000',
            '#000000',
            '#ABC123',
            '#ABC456',
            '#DEF789',
            '#123456',
            '#F00',
            '#0F0',
            '#00F',
            '#FF00FF',
            '#FBCDEF',
            '#E9E9E9',
            '#FFF',
            '#FFFFFF',
        ]) {
            const evaluation = v.validate({a: el});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        }
    });

    it('Should not validate a non-string or an empty string after trimming as valid', () => {
        const v = new Validator({a: 'color_hex'});

        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            const evaluation = v.validate({a: el});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'color_hex', params: []}],
                },
            });
        }
    });

    it('Should not validate improper strings as valid', () => {
        const v = new Validator({a: 'color_hex'});

        for (const el of [
            'ABC',
            'ABCDE',
            'FFFFFF',
            '0G0',
            'FOO',
            '0G00G0',
            '0Z0',
            '0Z0Z0Z',
            '#0Z0',
            '#FFG',
            '#FFJJFF',
            'Foo',
            'Hello world',
            'Bar',
            'blue',
            'red',
            'black',
        ]) {
            const evaluation = v.validate({a: el});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'color_hex', params: []}],
                },
            });
        }
    });
});
