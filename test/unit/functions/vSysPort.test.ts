import {describe, it, expect} from 'vitest';
import CONSTANTS from '../../constants';
import Validator from '../../../lib';

describe('vSysPort', () => {
    it('should be invalid if not passed an integer value', () => {
        for (const el of CONSTANTS.NOT_INTEGER) {
            expect(new Validator({a: 'sys_port'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'sys_port', params: []}],
                },
            });
        }
    });

    it('Should be invalid when passed a port number below 0', () => {
        for (const el of [-10, -999, -80, -1, -1999999]) {
            expect(new Validator({a: 'sys_port'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'sys_port', params: []}]},
            });
        }
    });

    it('Should be invalid when passed a port number above 65535', () => {
        for (const el of [655356, 9999999, 70000, 1000000, 4897237]) {
            expect(new Validator({a: 'sys_port'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'sys_port', params: []}]},
            });
        }
    });

    it('Should be invalid when passed 0 as port number', () => {
        expect(new Validator({a: 'sys_port'}).validate({a: 0})).toEqual({
            is_valid: false,
            count: 1,
            errors: {a: [{msg: 'sys_port', params: []}]},
        });
    });

    it('Should be valid when passed a port number between 1 and 65535 (inclusive)', () => {
        const v = new Validator({a: 'sys_port'});
        for (let i = 1; i <= 65535; i++) {
            expect(v.validate({a: i})).toEqual({is_valid: true, count: 0, errors: {}});
        }
    });
});
