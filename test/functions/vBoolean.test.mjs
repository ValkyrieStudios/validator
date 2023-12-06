'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../constants.mjs';
import Validator        from '../../src/index.mjs';

describe('vBoolean', () => {
    it('Should validate a boolean correctly', () => {
        for (const el of CONSTANTS.IS_BOOLEAN) {
            const validator = new Validator({a1: 'boolean'});
            const evaluation = validator.validate({a1: el});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a1, []);
        }
    });

    it('Should not validate other types as valid booleans', () => {
        for (const el of CONSTANTS.NOT_BOOLEAN) {
            const validator = new Validator({a1: 'boolean'});
            const evaluation = validator.validate({a1: el});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a1, [{msg: 'boolean', parans: []}]);
        }
    });
});
