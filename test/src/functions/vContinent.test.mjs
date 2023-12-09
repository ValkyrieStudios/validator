'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONTINENTS       from '@valkyriestudios/data-continents/raw.json' assert {type: 'json'};
import CONSTANTS        from '../../constants.mjs';
import Validator        from '../../../src/index.mjs';

describe('vContinent', () => {
    it('Should be invalid if not passed a string or when passed a string that is empty after trimming', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            const evaluation = new Validator({a: 'continent'}).validate({a: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'continent', params: []}],
                },
            });
        }
    });

    it('Should be invalid when passing a string that is not a continent code', () => {
        for (const el of [
            'foo',
            'bar',
            'BE',
            'Antarctica',
        ]) {
            const evaluation = new Validator({a: 'continent'}).validate({a: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'continent', params: []}],
                },
            });
        }
    });

    it('Should be valid when passing a string that is a continent code', () => {
        for (const el of [...CONTINENTS.map(val => val.code)]) {
            const evaluation = new Validator({a: 'continent'}).validate({a: el});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        }
    });
});
