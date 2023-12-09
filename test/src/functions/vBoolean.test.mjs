'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import Validator        from '../../../src/index.mjs';

describe('vBoolean', () => {
    it('Should validate a boolean correctly', () => {
        for (const el of CONSTANTS.IS_BOOLEAN) {
            const validator = new Validator({a1: 'boolean'});
            const evaluation = validator.validate({a1: el});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        }
    });

    it('Should not validate other types as valid booleans', () => {
        for (const el of CONSTANTS.NOT_BOOLEAN) {
            const validator = new Validator({a1: 'boolean'});
            const evaluation = validator.validate({a1: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a1: [{msg: el === undefined ? 'not_found' : 'boolean', params: []}],
                },
            });
        }
    });
});
