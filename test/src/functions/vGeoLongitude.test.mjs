'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import Validator        from '../../../src/index.mjs';

describe('vGeoLongitude', () => {
    it('Should be invalid if not passed a number', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(new Validator({a: 'geo_longitude'}).validate({a: el}).is_valid, false);
        }
    });

    it('Should be invalid if passed a number below -180', () => {
        for (const el of [-180.000001, -200, -100000]) {
            assert.equal(new Validator({a: 'geo_longitude'}).validate({a: el}).is_valid, false);
        }
    });

    it('Should be invalid if passed a number above 180', () => {
        for (const el of [180.000001, 200, 100000]) {
            assert.equal(new Validator({a: 'geo_longitude'}).validate({a: el}).is_valid, false);
        }
    });

    it('Should be valid if passed a number between -180 and 180', () => {
        for (let i = -179; i < 179; i++) {
            assert.ok(new Validator({a: 'geo_longitude'}).validate({a: i}).is_valid);
        }

        for (const el of [-78.3232, 60.9437, 0, -165.4324, 1.342, 143.4324]) {
            assert.ok(new Validator({a: 'geo_longitude'}).validate({a: el}).is_valid);
        }
    });

    it('Should be valid if passed a number equal to -180', () => {
        assert.ok(new Validator({a: 'geo_longitude'}).validate({a: -90}).is_valid);
    });

    it('Should be valid if passed a number equal to 180', () => {
        assert.ok(new Validator({a: 'geo_longitude'}).validate({a: 90}).is_valid);
    });
});
