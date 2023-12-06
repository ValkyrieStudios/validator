'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../constants.mjs';
import Validator        from '../../src/index.mjs';

describe('vGeoLatitude', () => {
    it('Should be invalid if not passed a number', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.equal(new Validator({a: 'geo_latitude'}).validate({a: el}).is_valid, false);
        }
    });

    it('Should be invalid if passed a number below -90', () => {
        for (const el of [-90.000001, -100, -100000]) {
            assert.equal(new Validator({a: 'geo_latitude'}).validate({a: el}).is_valid, false);
        }
    });

    it('Should be invalid if passed a number above 90', () => {
        for (const el of [90.000001, 100, 100000]) {
            assert.equal(new Validator({a: 'geo_latitude'}).validate({a: el}).is_valid, false);
        }
    });

    it('Should be valid if passed a number between -90 and 90', () => {
        for (let i = -89; i < 90; i++) {
            assert.ok(new Validator({a: 'geo_latitude'}).validate({a: i}).is_valid);
        }

        for (const el of [-78.3232, 60.9437, 0, 1.342]) {
            assert.ok(new Validator({a: 'geo_latitude'}).validate({a: el}).is_valid);
        }
    });

    it('Should be valid if passed a number equal to -90', () => {
        assert.ok(new Validator({a: 'geo_latitude'}).validate({a: -90}).is_valid);
    });

    it('Should be valid if passed a number equal to 90', () => {
        assert.ok(new Validator({a: 'geo_latitude'}).validate({a: 90}).is_valid);
    });
});
