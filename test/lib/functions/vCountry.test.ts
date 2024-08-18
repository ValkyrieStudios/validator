import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as COUNTRIES   from '@valkyriestudios/data-countries/raw.json';
import CONSTANTS        from '../../constants';
import Validator        from '../../../lib';

describe('vCountry', () => {
    it('Should be invalid if not passed a string or when passed a string that is empty after trimming', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            const evaluation = new Validator({a: 'country'}).validate({a: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'country', params: []}],
                },
            });
        }
    });

    it('Should be invalid when passing a string that is not a country alpha2 code', () => {
        for (const el of [
            'foo',
            'bar',
            'BEL',
            'Belgium',
        ]) {
            const evaluation = new Validator({a: 'country'}).validate({a: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'country', params: []}],
                },
            });
        }
    });

    it('Should be valid when passing a string that is an alpha2 country code', async () => {
        for (const el of [...COUNTRIES.map(val => val.al2)]) {
            const evaluation = new Validator({a: 'country'}).validate({a: el});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        }
    });
});
