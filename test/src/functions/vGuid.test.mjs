'use strict';

import guid             from '@valkyriestudios/utils/src/hash/guid.mjs';
import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import Validator        from '../../../src/index.mjs';

describe('vGuid', () => {
    it('Should be valid when passed a guid (10.000 runs)', () => {
        const v = new Validator({a: 'guid'});

        for (let i = 0; i < 10000; i++) {
            assert.ok(v.validate({a: guid()}).is_valid);
        }
    });

    it('Should be invalid when passed a non-string or empty after trimming string value', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            assert.equal(new Validator({a: 'guid'}).validate({a: el}).is_valid, false);
        }
    });

    it('Should be invalid when passed a string value below 36 characters', () => {
        const uid = guid();
        for (let i = 1; i < 36; i++) {
            assert.equal(new Validator({a: 'guid'}).validate({a: uid.substr(0, i)}).is_valid, false);
        }
    });

    it('Should be invalid when passed a string value above 36', () => {
        let uid = guid();
        for (let i = 1; i <= 48; i++) {
            uid = `${uid}a`;
            assert.equal(new Validator({a: 'guid'}).validate({a: uid}).is_valid, false);
        }
    });

    it('Should be invalid when passed a string that is not a valid guid but has the same length as a guid', () => {
        assert.equal(new Validator({a: 'guid'}).validate({a: 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'}).is_valid, false);
    });
});
