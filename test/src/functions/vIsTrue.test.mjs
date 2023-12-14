'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import Validator        from '../../../src/index.mjs';

describe('vIsTrue', () => {
    it('Should be invalid if not passed a boolean', () => {
        for (const el of CONSTANTS.NOT_BOOLEAN) {
            assert.deepEqual(
                new Validator({a: 'is_true'}).validate({a: el}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: el === undefined ? 'not_found' : 'is_true', params: []}],
                    },
                }
            );
        }
    });

    it('Should be invalid if passed false', () => {
        assert.deepEqual(
            new Validator({a: 'is_true'}).validate({a: false}),
            {is_valid: false, count: 1, errors: {a: [{msg: 'is_true', params: []}]}}
        );
    });

    it('Should be valid if passed true', () => {
        assert.deepEqual(
            new Validator({a: 'is_true'}).validate({a: true}),
            {is_valid: true, count: 0, errors: {}}
        );
    });
});
