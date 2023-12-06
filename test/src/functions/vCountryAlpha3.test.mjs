'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import COUNTRIES        from '@valkyriestudios/utils/data/countries.json' assert {type: 'json'};
import CONSTANTS        from '../../constants.mjs';
import Validator        from '../../../src/index.mjs';

describe('vCountryAlpha3', () => {
    it('Should be invalid if not passed a string or when passed a string that is empty after trimming', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            assert.equal(new Validator({a: 'country_alpha3'}).validate({a: el}).is_valid, false);
        }
    });

    it('Should be invalid when passing a string that is not a country alpha3 code', () => {
        for (const el of [
            'foo',
            'bar',
            'BE',
            'Belgium',
        ]) assert.equal(new Validator({a: 'country_alpha3'}).validate({a: el}).is_valid, false);
    });

    it('Should be valid when passing a string that is an alpha3 country code', () => {
        for (const el of [...COUNTRIES.map(val => val.al3)]) {
            assert.ok(new Validator({a: 'country_alpha3'}).validate({a: el}).is_valid);
        }
    });
});
