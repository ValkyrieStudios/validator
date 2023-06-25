'use strict';

import countries from '@valkyriestudios/utils/data/countries.json';
import Validator from '../../src/index';

const expect = require('chai').expect;

describe('vCountry', () => {
    const str_tests = [{a:1}, [0,1,2], true, new Date(), /1/g, false, 123, 0.123];

    it('Should be invalid if not passed a string', () => {
        for (const el of str_tests) {
            expect(new Validator({a: 'country'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it('Should be invalid if passed an empty string (or empty after trimming)', () => {
        for (const el of ['', ' ', '   ']) {
            expect(new Validator({a: 'country'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it('Should be invalid when passing a string that is not a country alpha2 code', () => {
        for (const el of [
            'foo',
            'bar',
            'BEL',
            'Belgium',
        ]) {
            expect(new Validator({a: 'country'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it('Should be valid when passing a string that is an alpha2 country code', () => {
        for (const el of [...countries.map(val => val.al2)]) {
            expect(new Validator({a: 'country'}).validate({a: el}).is_valid).to.eql(true);
        }
    });
});
