import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import Validator        from '../../../lib';

describe('vSysPort', () => {
    it('should be invalid if not passed an integer value', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            assert.deepEqual(
                new Validator({a: 'sys_port'}).validate({a: el}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: el === undefined ? 'not_found' : 'sys_port', params: []}],
                    },
                }
            );
        }
    });

    it('Should be invalid when passed a port number below 0', () => {
        for (const el of [-10, -999, -80, -1, -1999999]) {
            assert.deepEqual(
                new Validator({a: 'sys_port'}).validate({a: el}),
                {is_valid: false, count: 1, errors: {a: [{msg: 'sys_port', params: []}]}}
            );
        }
    });

    it('Should be invalid when passed a port number above 65535', () => {
        for (const el of [655356, 9999999, 70000, 1000000, 4897237]) {
            assert.deepEqual(
                new Validator({a: 'sys_port'}).validate({a: el}),
                {is_valid: false, count: 1, errors: {a: [{msg: 'sys_port', params: []}]}}
            );
        }
    });

    it('Should be invalid when passed 0 as port number', () => {
        assert.deepEqual(
            new Validator({a: 'sys_port'}).validate({a: 0}),
            {is_valid: false, count: 1, errors: {a: [{msg: 'sys_port', params: []}]}}
        );
    });

    it('Should be valid when passed a port number between 1 and 65535 (inclusive)', () => {
        const v = new Validator({a: 'sys_port'});
        for (let i = 1; i <= 65535; i++) {
            assert.deepEqual(v.validate({a: i}), {is_valid: true, count: 0, errors: {}});
        }
    });
});
