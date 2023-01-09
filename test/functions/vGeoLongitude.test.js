'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vGeoLongitude", () => {

    const num_tests = [{a:1}, [0,1,2], true, new Date(), /1/g, false, 'hello', 'abc'];

    it ('Should be invalid if not passed a number', () => {
        for (const el of num_tests) {
            expect(new Validator({a: 'geo_longitude'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it ('Should be invalid if passed a number below -180', () => {
        for (const el of [-180.000001, -200, -100000]) {
            expect(new Validator({a: 'geo_longitude'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it ('Should be invalid if passed a number above 180', () => {
        for (const el of [180.000001, 200, 100000]) {
            expect(new Validator({a: 'geo_longitude'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it ('Should be valid if passed a number between -180 and 180', () => {
        for (let i = -179; i < 179; i++) {
            expect(new Validator({a: 'geo_longitude'}).validate({a: i}).is_valid).to.eql(true);
        }

        for (const el of [-78.3232, 60.9437, 0, -165.4324, 1.342, 143.4324]) {
            expect(new Validator({a: 'geo_longitude'}).validate({a: el}).is_valid).to.eql(true);
        }
    });

    it ('Should be valid if passed a number equal to -180', () => {
        expect(new Validator({a: 'geo_longitude'}).validate({a: -90}).is_valid).to.eql(true);
    });

    it ('Should be valid if passed a number equal to 180', () => {
        expect(new Validator({a: 'geo_longitude'}).validate({a: 90}).is_valid).to.eql(true);
    });

});
