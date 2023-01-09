'use strict';

import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vGeoLatitude", () => {

    const num_tests = [{a:1}, [0,1,2], true, new Date(), /1/g, false, 'hello', 'abc'];

    it ('Should be invalid if not passed a number', () => {
        for (const el of num_tests) {
            expect(new Validator({a: 'geo_latitude'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it ('Should be invalid if passed a number below -90', () => {
        for (const el of [-90.000001, -100, -100000]) {
            expect(new Validator({a: 'geo_latitude'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it ('Should be invalid if passed a number above 90', () => {
        for (const el of [90.000001, 100, 100000]) {
            expect(new Validator({a: 'geo_latitude'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it ('Should be valid if passed a number between -90 and 90', () => {
        for (let i = -89; i < 90; i++) {
            expect(new Validator({a: 'geo_latitude'}).validate({a: i}).is_valid).to.eql(true);
        }

        for (const el of [-78.3232, 60.9437, 0, 1.342]) {
            expect(new Validator({a: 'geo_latitude'}).validate({a: el}).is_valid).to.eql(true);
        }
    });

    it ('Should be valid if passed a number equal to -90', () => {
        expect(new Validator({a: 'geo_latitude'}).validate({a: -90}).is_valid).to.eql(true);
    });

    it ('Should be valid if passed a number equal to 90', () => {
        expect(new Validator({a: 'geo_latitude'}).validate({a: 90}).is_valid).to.eql(true);
    });

});
