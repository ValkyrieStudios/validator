'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import * as TIMEZONES   from '@valkyriestudios/data-timezones/raw.json';
import CONSTANTS        from '../../constants';
import Validator        from '../../../lib';

describe('vTimeZone', () => {
    it('Should be invalid if not passed a string or passed a string that is empty after trimming', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            assert.deepEqual(new Validator({a: 'time_zone'}).validate({a: el}), {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'time_zone', params: []}],
                },
            });
        }
    });

    it('Should be invalid when passing a string that is not a time zone', () => {
        for (const el of [
            'foo',
            'bar',
            '  Europe/Brussels',
            'UTCBla',
            'Etc/GMT-39',
            'Mars/London',
        ]) assert.deepEqual(new Validator({a: 'time_zone'}).validate({a: el}), {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'time_zone', params: []}],
            },
        });
    });

    it('Should be valid when passing a zone name that is in the valkyrie data pack for timezones', () => {
        for (const el of TIMEZONES) {
            assert.ok(new Validator({a: 'time_zone'}).check({a: el.name}));
        }
    });

    it('Should be valid when passing a zone alias that is in the valkyrie data pack for timezones', () => {
        for (const el of TIMEZONES) {
            for (const val of el.aliases) {
                assert.ok(new Validator({a: 'time_zone'}).check({a: val}));
            }
        }
    });

    it('Should be valid when passing a string that is in the Intl.supportedValueOf spec', () => {
        //  @ts-ignore
        for (const el of Intl.supportedValuesOf('timeZone')) {
            assert.ok(new Validator({a: 'time_zone'}).check({a: el}));
        }
    });

    /**
     * For more info around the reason this test is required:
     * https://github.com/tc39/ecma402/issues/778
     */
    it('Should be valid when passing a string that is not in the Intl.supportedValueOf spec but which is a valid time zone', () => {
        for (const el of [
            'CET',
            'CST6CDT',
            'EET',
            'EST',
            'EST5EDT',
            'Etc/GMT+1',
            'Etc/GMT+10',
            'Etc/GMT+11',
            'Etc/GMT+12',
            'Etc/GMT+2',
            'Etc/GMT+3',
            'Etc/GMT+4',
            'Etc/GMT+5',
            'Etc/GMT+6',
            'Etc/GMT+7',
            'Etc/GMT+8',
            'Etc/GMT+9',
            'Etc/GMT-1',
            'Etc/GMT-10',
            'Etc/GMT-11',
            'Etc/GMT-12',
            'Etc/GMT-13',
            'Etc/GMT-14',
            'Etc/GMT-2',
            'Etc/GMT-3',
            'Etc/GMT-4',
            'Etc/GMT-5',
            'Etc/GMT-6',
            'Etc/GMT-7',
            'Etc/GMT-8',
            'Etc/GMT-9',
            'HST',
            'MET',
            'MST',
            'MST7MDT',
            'PST8PDT',
            'UTC',
            'WET',
        ]) assert.ok(new Validator({a: 'time_zone'}).check({a: el}));
    });
});
