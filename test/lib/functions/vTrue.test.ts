import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import Validator        from '../../../lib';

describe('vTrue', () => {
    it('Should be invalid if not passed a boolean', () => {
        for (const el of CONSTANTS.NOT_BOOLEAN) {
            assert.deepEqual(
                new Validator({a: 'true'}).validate({a: el}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: el === undefined ? 'not_found' : 'true', params: []}],
                    },
                }
            );
        }
    });

    it('Should be invalid if passed false', () => {
        assert.deepEqual(
            new Validator({a: 'true'}).validate({a: false}),
            {is_valid: false, count: 1, errors: {a: [{msg: 'true', params: []}]}}
        );
    });

    it('Should be valid if passed true', () => {
        assert.deepEqual(
            new Validator({a: 'true'}).validate({a: true}),
            {is_valid: true, count: 0, errors: {}}
        );
    });
});
