'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import Validator        from '../../../src/index.mjs';

describe('vIsFalse', () => {
    it('Should be invalid if not passed a boolean', () => {
        for (const el of CONSTANTS.NOT_BOOLEAN) {
            assert.deepEqual(
                new Validator({a: 'is_false'}).validate({a: el}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: el === undefined ? 'not_found' : 'is_false', params: []}],
                    },
                }
            );
        }
    });

    it('Should be invalid if passed true', () => {
        assert.deepEqual(
            new Validator({a: 'is_false'}).validate({a: true}),
            {is_valid: false, count: 1, errors: {a: [{msg: 'is_false', params: []}]}}
        );
    });

    it('Should be valid if passed false', () => {
        assert.deepEqual(
            new Validator({a: 'is_false'}).validate({a: false}),
            {is_valid: true, count: 0, errors: {}}
        );
    });
});