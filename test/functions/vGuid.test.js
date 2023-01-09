'use strict';

import guid from '@valkyriestudios/utils/hash/guid';
import Validator from '../../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("vGuid", () => {

    const str_tests = [{a:1}, [0,1,2], true, new Date(), /1/g, false, 123, 0.123];

    it ('Should be valid when passed a guid (10.000 runs)', () => {
        let v = new Validator({a: 'guid'});

        for (let i = 0; i < 10000; i++) {
            expect(v.validate({a: guid()}).is_valid).to.eql(true);
        }
    });

    it ('Should be invalid when passed a non-string value', () => {
        for (let el of str_tests) {
            expect(new Validator({a: 'guid'}).validate({a: el}).is_valid).to.eql(false);
        }
    });

    it ('Should be invalid when passed a string value below 36 characters', () => {
        let uid = guid();
        for (let i = 1; i < 36; i++) {
            expect(new Validator({a: 'guid'}).validate({a: uid.substr(0, i)}).is_valid).to.eql(false);
        }
    });

    it ('Should be invalid when passed a string value above 36', () => {
        let uid = guid();
        for (let i = 1; i <= 48; i++) {
            uid = `${uid}a`;
            expect(new Validator({a: 'guid'}).validate({a: uid}).is_valid).to.eql(false);
        }
    });

    it ('Should be invalid when passed a string that is not a valid guid but has the same length as a guid', () => {
        expect(new Validator({a: 'guid'}).validate({a: 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'}).is_valid).to.eql(false);
    });

});
