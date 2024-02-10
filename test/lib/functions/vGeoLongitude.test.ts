'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import Validator        from '../../../lib';

describe('vGeoLongitude', () => {
    it('Should be invalid if not passed a number', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            assert.deepEqual(
                new Validator({a: 'geo_longitude'}).validate({a: el}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: el === undefined ? 'not_found' : 'geo_longitude', params: []}],
                    },
                }
            );
        }
    });

    it('Should be invalid if passed a number below -180', () => {
        for (const el of [-180.000001, -200, -100000]) {
            assert.deepEqual(
                new Validator({a: 'geo_longitude'}).validate({a: el}),
                {is_valid: false, count: 1, errors: {a: [{msg: 'geo_longitude', params: []}]}}
            );
        }
    });

    it('Should be invalid if passed a number above 180', () => {
        for (const el of [180.000001, 200, 100000]) {
            assert.deepEqual(
                new Validator({a: 'geo_longitude'}).validate({a: el}),
                {is_valid: false, count: 1, errors: {a: [{msg: 'geo_longitude', params: []}]}}
            );
        }
    });

    it('Should be valid if passed a number between -180 and 180', () => {
        for (let i = -179; i < 179; i++) {
            assert.deepEqual(
                new Validator({a: 'geo_longitude'}).validate({a: i}),
                {is_valid: true, count: 0, errors: {}}
            );
        }

        for (const el of [-78.3232, 60.9437, 0, -165.4324, 1.342, 143.4324]) {
            assert.deepEqual(
                new Validator({a: 'geo_longitude'}).validate({a: el}),
                {is_valid: true, count: 0, errors: {}}
            );
        }
    });

    it('Should be valid if passed a number equal to -180', () => {
        assert.deepEqual(
            new Validator({a: 'geo_longitude'}).validate({a: -180}),
            {is_valid: true, count: 0, errors: {}}
        );
    });

    it('Should be valid if passed a number equal to 180', () => {
        assert.deepEqual(
            new Validator({a: 'geo_longitude'}).validate({a: 180}),
            {is_valid: true, count: 0, errors: {}}
        );
    });
});
