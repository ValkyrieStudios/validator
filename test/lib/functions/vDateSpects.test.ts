import guid             from '@valkyriestudios/utils/hash/guid';
import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import CONSTANTS        from '../../constants';
import Validator        from '../../../lib';

describe('vDateSpects', () => {
    describe('vDateISO', () => {
        const v = new Validator({a: 'date_iso'});

        it('Should be invalid if not passed a string or passed a string that is empty after trimming', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                assert.ok(!v.check({a: el}));
            }
        });

        it('Should be invalid if passed a string with content that is not a valid date string', () => {
            for (const el of [
                'abc',
                'foobar',
                '-1000000000000000000000',
                '202a-1b-0c',
                guid(),
                '20221125',
                '20220318',
                'abcdefg',
                '4328492374ewque',
                '_343424823942',
                ' _343424823942',
                '   _343424823942',
                '343424823942_',
                '343424823942_ ',
                '343424823942_   ',
            ]) {
                assert.ok(!v.check({a: el}));
            }
        });

        it('Should be invalid if not passed a string that is in the ISO format', () => {
            for (const el of [
                '2024-04-06T12:30:45.123+14:01', // Invalid minute in timezone (+14:01)
                '2024-04-06T12:30:45.123Z+02:00', // Redundant timezone indicators
                '2024-04-06T12:30:60.123Z', // Invalid seconds (60 seconds)
                '2024-04-06T12:61:45.123Z', // Invalid minutes (61 minutes)
                '2024-04-06T24:30:45.123Z', // Invalid hour (24 hours)
                '2024-04-06T12:30:45.9999Z', // Too many milliseconds digits
                '2024-04-06T12:30Z', // Missing seconds
                '2024-04-06T12:30:45.Z', // Missing milliseconds
                '2024-04-06T12:30:45.12345Z', // Too many digits in milliseconds
                '2024-04-06T12:30:45.12Z', // Too few digits in milliseconds
                '2024-04-06T12:30:45.1234+02:00', // Too many digits in milliseconds with offset
                '2023-02-29T12:30:45.123+02:00', // Invalid due to non-leap year
            ]) {
                assert.ok(!v.check({a: el}));
            }
        });

        it('Should be valid if passed a string that is in the ISO format', () => {
            for (const el of [
                '2024-04-06T12:30:45.123Z',
                '1990-02-07T19:20:00.000Z',
                '2024-04-06T12:30:45.123+02:00', // Positive offset
                '2024-04-06T12:30:45.123-05:00', // Negative offset
                '2024-12-31T23:59:59.999Z', // Just before midnight UTC
                '2024-02-29T00:00:00.000Z', // Leap year at midnight
                '2024-04-06T12:30:00.000+00:00', // UTC with +00:00 offset
                '2024-04-06T12:30:00.000-00:00', // UTC with -00:00 offset
                '2024-04-06T12:30:45.123+14:00', // Maximum positive offset
                '2024-04-06T12:30:45.123-12:00', // Maximum negative offset
                '2024-04-06T12:30:00.000+09:30', // Non-standard offset (+09:30)
                '2024-04-06T12:00:00.000Z', // Noon UTC with milliseconds
                '2024-04-06T23:59:59.000+01:00', // Just before midnight with +01:00 offset
                '2024-04-06T00:00:00.000-01:00', // Midnight with -01:00 offset
                '2024-12-31T23:59:59.123+00:00', // End of the year with UTC
                '2024-04-06T12:30:45.123+01:00', // Standard positive offset
            ]) {
                assert.ok(v.check({a: el}));
            }
        });

        it('Should be invalid if passed a string that is in the ISO format but not valid date', () => {
            for (const el of [
                '2024-02-30T19:20:00.000Z', // Invalid date (Feb 30)
                '1990-02-07T24:00:00.000Z', // Invalid time (24:00:00)
                '2024-04-06T12:30:45.123+25:00', // Invalid timezone offset (+25:00)
                '2024-04-06T12:30:45.123-13:00', // Invalid timezone offset (-13:00)
                '2024-04-06T12:30:45.123+14:01', // Invalid minute in timezone (+14:01)
                '2024-04-06T12:30:45.123+14:60', // Invalid minute in timezone (+14:60)
                '2024-04-06T12:30:45.123+02:60', // Invalid minute in timezone (+02:60)
                '2024-04-06T12:30:45.123-25:00', // Invalid timezone offset (-25:00)
                '2024-04-06T12:30:45.123+15:00', // Invalid hour in timezone (+15:00)
                '2024-04-06T12:30:45.123+02:09', // Invalid minute in timezone (+02:09)
                '2023-02-29T12:30:45.123+02:00', // Invalid due to non-leap year
                '2023-04-31T09:45:30.000Z', // There is no 31st day in April
            ]) {
                assert.ok(!v.check({a: el}));
            }
        });
    });

    describe('vDateDay', () => {
        const v = new Validator({a: 'date_day'});

        it('Should be invalid if not passed a string or passed a string that is empty after trimming', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                assert.ok(!v.check({a: el}));
            }
        });

        it('Should be invalid if passed a string with content that is not a valid date string', () => {
            for (const el of [
                'abc',
                'foobar',
                '-1000000000000000000000',
                '202a-1b-0c',
                guid(),
                '20221125',
                '20220318',
                'abcdefg',
                '4328492374ewque',
                '_343424823942',
                ' _343424823942',
                '   _343424823942',
                '343424823942_',
                '343424823942_ ',
                '343424823942_   ',
            ]) {
                assert.ok(!v.check({a: el}));
            }
        });

        it('Should be invalid if not passed a string that is in the format of YYYY-MM-DD', () => {
            for (const el of [
                '2024-04', // Missing day
                '06/04/2024', // Slashes instead of dashes
                '12:34:56', // Time instead of date
                'abc', // Non-numeric input
                ' a2024-02-01 ', // Additional Tokens
                '2024-4-6', // No leading zeros
                '2024-4-06', // Mixed leading zeros
                '2024-W15-7', // Week-based date format in wrong spec
                '2024-00-00', // Completely invalid date
                '2024/04/06', // Slashes instead of dashes
                '20240406', // Missing delimiters
            ]) {
                assert.ok(!v.check({a: el}));
            }
        });

        it('Should be valid if passed a string that is in the format of YYYY-MM-DD', () => {
            for (const el of [
                '2024-04-06',
                '0001-01-01', // Earliest possible date
                '1999-12-31',
                '2024-02-29', // Leap year date
                '2999-12-31', // Far future date
            ]) {
                assert.ok(v.check({a: el}));
            }
        });

        it('Should be invalid if passed a string that is in the format of YYYY-MM-DD but not valid date', () => {
            for (const el of [
                '2024-00-01', // Invalid month 00
                '2024-13-01', // Invalid month 13
                '2024-02-30', // Invalid February 30th
                '2024-04-31', // Invalid April 31st
                '2024-06-31', // Invalid June 31st
                '2023-02-29', // Invalid leap year date (for non-leap years)
                '2024-00-00', // Completely invalid date
                '2024-01-00', // Day 00 should be invalid
                '2024-12-32', // Day 32 should be invalid
            ]) {
                assert.ok(!v.check({a: el}));
            }
        });
    });
});
