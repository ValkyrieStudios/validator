import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import Validator        from '../../../lib';

describe('vNull', () => {
    it('Should be invalid if not passed null', () => {
        for (const el of [...CONSTANTS.NOT_BOOLEAN, true, false]) {
            if (el === null) continue;
            assert.deepEqual(
                new Validator({a: 'null'}).validate({a: el}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: el === undefined ? 'not_found' : 'null', params: []}],
                    },
                }
            );
        }
    });

    it('Should be valid if passed null', () => {
        assert.deepEqual(
            new Validator({a: 'null'}).validate({a: null}),
            {is_valid: true, count: 0, errors: {}}
        );
    });

    it('Should be valid if passed null when working in a conditional group', () => {
        assert.deepEqual(
            new Validator({a: ['true', 'null']}).validate({a: null}),
            {is_valid: true, count: 0, errors: {}}
        );

        assert.deepEqual(
            new Validator({a: ['true', 'null']}).validate({a: true}),
            {is_valid: true, count: 0, errors: {}}
        );
    });
});
