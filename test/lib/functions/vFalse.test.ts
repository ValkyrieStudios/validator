'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import Validator        from '../../../lib';

describe('vFalse', () => {
    it('Should be invalid if not passed a boolean', () => {
        for (const el of CONSTANTS.NOT_BOOLEAN) {
            assert.deepEqual(
                new Validator({a: 'false'}).validate({a: el}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: el === undefined ? 'not_found' : 'false', params: []}],
                    },
                }
            );
        }
    });

    it('Should be invalid if passed true', () => {
        assert.deepEqual(
            new Validator({a: 'false'}).validate({a: true}),
            {is_valid: false, count: 1, errors: {a: [{msg: 'false', params: []}]}}
        );
    });

    it('Should be valid if passed false', () => {
        assert.deepEqual(
            new Validator({a: 'false'}).validate({a: false}),
            {is_valid: true, count: 0, errors: {}}
        );
    });
});
