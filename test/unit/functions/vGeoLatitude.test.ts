import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import Validator from '../../../lib';

describe('vGeoLatitude', () => {
    it('Should be invalid if not passed a number', () => {
        for (const el of CONSTANTS.NOT_NUMERIC) {
            expect(new Validator({a: 'geo_latitude'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'geo_latitude', params: []}],
                },
            });
        }
    });

    it('Should be invalid if passed a number below -90', () => {
        for (const el of [-90.000001, -100, -100000]) {
            expect(new Validator({a: 'geo_latitude'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'geo_latitude', params: []}]},
            });
        }
    });

    it('Should be invalid if passed a number above 90', () => {
        for (const el of [90.000001, 100, 100000]) {
            expect(new Validator({a: 'geo_latitude'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'geo_latitude', params: []}]},
            });
        }
    });

    it('Should be valid if passed a number between -90 and 90', () => {
        for (let i = -89; i < 90; i++) {
            expect(new Validator({a: 'geo_latitude'}).validate({a: i})).toEqual({
                is_valid: true,
                count: 0,
                errors: {},
            });
        }

        for (const el of [-78.3232, 60.9437, 0, 1.342]) {
            expect(new Validator({a: 'geo_latitude'}).validate({a: el})).toEqual({
                is_valid: true,
                count: 0,
                errors: {},
            });
        }
    });

    it('Should be valid if passed a number equal to -90', () => {
        expect(new Validator({a: 'geo_latitude'}).validate({a: -90})).toEqual({
            is_valid: true,
            count: 0,
            errors: {},
        });
    });

    it('Should be valid if passed a number equal to 90', () => {
        expect(new Validator({a: 'geo_latitude'}).validate({a: 90})).toEqual({
            is_valid: true,
            count: 0,
            errors: {},
        });
    });
});
