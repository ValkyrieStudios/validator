'use strict';

import Validator from '../../src/index';

const expect = require('chai').expect;

describe('vColorHex', () => {
    const invalids = [
        100,
        200,
        'hello',
        false,
        true,
        new RegExp(),
        new Date(),
        {},
        [],
        '',
        new String('Foo'),
        new Array(),
        Object.create(null),
    ];

    const invalid_hex = [
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
    ];

    const valids = [
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
    ];

    it('should validate a hex color string correctly', () => {
        const v = new Validator({a: 'color_hex'});

        for (const el of valids) {
            const evaluation = v.validate({a: el});
            expect(evaluation.is_valid).to.eql(true);
            expect(evaluation.errors.a).to.deep.equal([]);
        }
    });

    it('should not validate other types as valid hex colors', () => {
        const v = new Validator({a: 'color_hex'});

        for (const el of invalids) {
            const evaluation = v.validate({a: el});
            expect(evaluation.is_valid).to.eql(false);
            expect(evaluation.errors.a).to.deep.equal([{msg:'color_hex', params: []}]);
        }
    });

    it('should not validate improper strings as valid hex colors', () => {
        const v = new Validator({a: 'color_hex'});

        for (const el of invalid_hex) {
            const evaluation = v.validate({a: el});
            expect(evaluation.is_valid).to.eql(false);
            expect(evaluation.errors.a).to.deep.equal([{msg:'color_hex', params: []}]);
        }
    });
});
