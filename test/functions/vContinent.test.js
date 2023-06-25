'use strict';

import continents   from '@valkyriestudios/utils/data/continents.json';
import Validator    from '../../src/index';

const expect = require('chai').expect;

describe('vContinent', () => {
    const str_tests = [{a:1}, [0,1,2], true, new Date(), /1/g, false, 123, 0.123];

    it('Should be invalid if not passed a string', () => {
        for (const el of str_tests) {
            expect(new Validator({a: 'continent'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it('Should be invalid if passed an empty string (or empty after trimming)', () => {
        for (const el of ['', ' ', '   ']) {
            expect(new Validator({a: 'continent'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it('Should be invalid when passing a string that is not a continent code', () => {
        for (const el of [
            'foo',
            'bar',
            'BE',
            'Antarctica',
        ]) {
            expect(new Validator({a: 'continent'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it('Should be valid when passing a string that is a continent code', () => {
        for (const el of [...continents.map(val => val.code)]) {
            expect(new Validator({a: 'continent'}).validate({a: el}).is_valid).to.eql(true);
        }
    });
});
