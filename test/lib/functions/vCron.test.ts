import {describe, it} from 'node:test';
import * as assert from 'node:assert/strict';
import Validator from '../../../lib';
import CONSTANTS from '../../constants';

describe('vCron', () => {
    const v = new Validator({a: 'cron'});

    it('Should be invalid if passed a non/empty string', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            assert.ok(!v.check({a: el as string}));
        }
    });

    it('Should be valid if passed valid schedules', () => {
        for (const el of [
            '0 * * * *',
            '0 * * * 2',
            '0 * 2 * *',
            '0 7 * * 2',
            '0,10,20,30,40,50 * * * *',
            '50 0 * * *',
            '0 0 * * *',
            '* * * * *',
            '0 6 * * *',
            '0 3 * * *',
            '40 * * * *',
            '50 * * * *',
            '20 3,6,9,12,15,18,21,23 * * *',
            '0 7,12,17,22 * * *',
            '0 21 * * *',
            '0 1-5 * * *',
            '20-40 1-5 * * *',
            '20-40 1-5 1-3 9-10 0',
            '*/5 1-5 1-3 9-10 0',
        ]) assert.ok(v.check({a: el}));
    });

    it('Should be invalid if passed a wrong schedule', () => {
        for (const el of [
            'a b c d e',
            '| | | | |',
            '0 0 0 0',
            '. . . . .',
            '-1 0 0 0 0',
            '10 5 0 0 a',
            'a 5 0 10 1',
        ]) assert.ok(!v.check({a: el}));
    });

    describe('minute', () => {
        it('Should be valid if passed a wildcard', () => {
            assert.ok(v.check({a: '* 0 1 1 0'}));
        });

        it('Should be valid for valid single values', () => {
            for (let i = 0; i <= 59; i++) {
                assert.ok(v.check({a: `${i} 0 1 1 0`}));
            }
        });

        it('Should be valid when at lower bound', () => {
            assert.ok(v.check({a: '0 * * * *'}));
        });

        it('Should be valid for a valid comma-separated list', () => {
            assert.ok(v.check({a: '0,15,30,45 0 1 1 0'}));
        });

        it('Should be valid for a valid range', () => {
            assert.ok(v.check({a: '10-20 0 1 1 0'}));
        });

        it('Should be valid for a valid step expression with wildcard', () => {
            assert.ok(v.check({a: '*/5 0 1 1 0'}));
        });

        it('Should be valid for a valid step expression with range', () => {
            assert.ok(v.check({a: '10-50/10 0 1 1 0'}));
        });

        it('Should be valid for a valid stepper with both base and step as number', () => {
            assert.ok(v.check({a: '4/2 0 1 1 0'}));
        });

        it('Should be invalid for values that exceed the valid range', () => {
            assert.ok(!v.check({a: '60 0 1 1 0'}));
            assert.ok(!v.check({a: '61 0 1 1 0'}));
        });

        it('Should be invalid for negative values', () => {
            assert.ok(!v.check({a: '-1 0 1 1 0'}));
        });

        it('Should be invalid for invalid comma separated values', () => {
            assert.ok(!v.check({a: '0,x,2 1 1 1 1'}));
        });

        it('Should be invalid for an invalid step expression (step of zero)', () => {
            assert.ok(!v.check({a: '*/0 0 1 1 0'}));
            assert.ok(!v.check({a: '10-20/0 0 1 1 0'}));
        });

        it('Should be invalid for an invalid step expression (step outside of bounds)', () => {
            assert.ok(!v.check({a: '*/0 0 1 1 0'}));
            assert.ok(!v.check({a: '10-20/68 0 1 1 0'}));
        });

        it('Should be invalid for an invalid range (missing or invalid start)', () => {
            assert.ok(!v.check({a: '-10 0 1 1 0'}));
            assert.ok(!v.check({a: 'x-10 0 1 1 0'}));
        });

        it('Should be invalid for an invalid range (missing or invalid end)', () => {
            assert.ok(!v.check({a: '10- 0 1 1 0'}));
            assert.ok(!v.check({a: '10-x 0 1 1 0'}));
        });

        it('Should be invalid for an invalid range (more than 2 in range)', () => {
            assert.ok(!v.check({a: '10-20-30 0 1 1 0'}));
        });

        it('Should be invalid for an invalid range (start greater than end)', () => {
            assert.ok(!v.check({a: '50-10 0 1 1 0'}));
        });

        it('Should be invalid for an invalid range (out-of-bounds end)', () => {
            assert.ok(!v.check({a: '10-100 0 1 1 0'}));
        });

        it('Should be invalid for an invalid range (out-of-bounds start)', () => {
            assert.ok(!v.check({a: '90-100 0 1 1 0'}));
        });

        it('Should be invalid for an invalid range part with step', () => {
            assert.ok(!v.check({a: 'x-10/5 0 1 1 0'}));
            assert.ok(!v.check({a: '10-x/5 0 1 1 0'}));
        });

        it('Should be invalid for an invalid range with step (start greater than end)', () => {
            assert.ok(!v.check({a: '50-10/5 0 1 1 0'}));
        });

        it('Should be invalid for an invalid range with step (step greater than end-start)', () => {
            assert.ok(!v.check({a: '0-3/4 1 1 1 1'}));
        });

        it('Should be invalid for an invalid range with step (more than 2)', () => {
            assert.ok(!v.check({a: '1-3-5/2 1 1 1 1'}));
        });
    });

    describe('hour', () => {
        it('Should be valid if passed a wildcard', () => {
            assert.ok(v.check({a: '0 * 1 1 0'}));
        });

        it('Should be valid for valid single values', () => {
            for (let i = 0; i <= 23; i++) {
                assert.ok(v.check({a: `0 ${i} 1 1 0`}));
            }
        });

        it('Should be valid for a valid comma-separated list', () => {
            assert.ok(v.check({a: '0 0,1,2,3,12,13,14,20,21,22 1 1 0'}));
        });

        it('Should be valid for a valid range', () => {
            assert.ok(v.check({a: '0 6-9 1 1 0'}));
        });

        it('Should be valid for a valid step expression with wildcard', () => {
            assert.ok(v.check({a: '0 */5 1 1 0'}));
        });

        it('Should be valid for a valid step expression with range', () => {
            assert.ok(v.check({a: '0 12-20/2 1 1 0'}));
        });

        it('Should be valid for a valid range with step', () => {
            assert.ok(v.check({a: '0 6-18/3 1 1 0'}));
        });

        it('Should be valid for a valid stepper with both base and step as number', () => {
            assert.ok(v.check({a: '0 4/2 1 1 0'}));
        });

        it('Should be invalid for values that exceed the valid range', () => {
            assert.ok(!v.check({a: '0 24 1 1 0'}));
            assert.ok(!v.check({a: '0 32 0 1 0'}));
        });

        it('Should be invalid for negative values', () => {
            assert.ok(!v.check({a: '0 -1 1 1 0'}));
        });

        it('Should be invalid for invalid comma separated values', () => {
            assert.ok(!v.check({a: '0 1,x,2 1 1 1'}));
        });

        it('Should be invalid for an invalid step expression (step of zero)', () => {
            assert.ok(!v.check({a: '0 */0 1 1 0'}));
            assert.ok(!v.check({a: '0 10-20/0 1 1 0'}));
        });

        it('Should be invalid for an invalid step expression (step outside of bounds)', () => {
            assert.ok(!v.check({a: '0 */0 1 1 0'}));
            assert.ok(!v.check({a: '0 10-20/68 1 1 0'}));
        });

        it('Should be invalid for an invalid range (missing or invalid start)', () => {
            assert.ok(!v.check({a: '0 -10 1 1 0'}));
            assert.ok(!v.check({a: '0 x-10 1 1 0'}));
        });

        it('Should be invalid for an invalid range (missing or invalid end)', () => {
            assert.ok(!v.check({a: '0 10- 1 1 0'}));
            assert.ok(!v.check({a: '0 10-x 1 1 0'}));
        });

        it('Should be invalid for an invalid range (more than 2 in range)', () => {
            assert.ok(!v.check({a: '0 5-8-12 1 1 0'}));
        });

        it('Should be invalid for an invalid range (start greater than end)', () => {
            assert.ok(!v.check({a: '0 23-10 1 1 0'}));
        });

        it('Should be invalid for an invalid range (out-of-bounds end)', () => {
            assert.ok(!v.check({a: '0 10-30 1 1 0'}));
        });

        it('Should be invalid for an invalid range (out-of-bounds start)', () => {
            assert.ok(!v.check({a: '0 90-100 1 1 0'}));
        });

        it('Should be invalid for an invalid range part with step', () => {
            assert.ok(!v.check({a: '0 20-x/3 1 1 0'}));
            assert.ok(!v.check({a: '0 x-10/3 1 1 0'}));
        });

        it('Should be invalid for an invalid range with step (start greater than end)', () => {
            assert.ok(!v.check({a: '0 20-10/3 1 1 0'}));
        });

        it('Should be invalid for an invalid range with step (step greater than end-start)', () => {
            assert.ok(!v.check({a: '0 1-3/4 1 1 1'}));
        });

        it('Should be invalid for an invalid range with step (more than 2)', () => {
            assert.ok(!v.check({a: '1 1-3-5/2 1 1 1'}));
        });
    });

    describe('day_of_month', () => {
        it('Should be valid if passed a wildcard', () => {
            assert.ok(v.check({a: '0 1 * 1 0'}));
        });

        it('Should be valid for valid single values', () => {
            for (let i = 1; i <= 31; i++) {
                assert.ok(v.check({a: `0 1 ${i} 1 0`}));
            }
        });

        it('Should be valid for a valid comma-separated list', () => {
            assert.ok(v.check({a: '0 1 1,2,3,12,13,14,20,21,22 1 0'}));
        });

        it('Should be valid for a valid range', () => {
            assert.ok(v.check({a: '0 0 6-9 1 0'}));
        });

        it('Should be valid for a valid step expression with wildcard', () => {
            assert.ok(v.check({a: '0 1 */5 1 0'}));
        });

        it('Should be valid for a valid step expression with range', () => {
            assert.ok(v.check({a: '0 2 12-20/2 1 0'}));
        });

        it('Should be valid for a valid range with step', () => {
            assert.ok(v.check({a: '0 1 1-31/7 1 0'}));
        });

        it('Should be valid for a valid stepper with both base and step as number', () => {
            assert.ok(v.check({a: '0 0 4/2 1 0'}));
        });

        it('Should be invalid for values that exceed the valid range', () => {
            assert.ok(!v.check({a: '0 1 32 1 0'}));
            assert.ok(!v.check({a: '0 1 64 1 0'}));
        });

        it('Should be invalid for negative values', () => {
            assert.ok(!v.check({a: '0 1 -1 1 0'}));
        });

        it('Should be invalid for invalid comma separated values', () => {
            assert.ok(!v.check({a: '0 1 1,x,2 1 1'}));
        });

        it('Should be invalid for zero', () => {
            assert.ok(!v.check({a: '0 1 0 1 0'}));
        });

        it('Should be invalid for an invalid step expression (step of zero)', () => {
            assert.ok(!v.check({a: '0 1 */0 1 0'}));
            assert.ok(!v.check({a: '0 1 10-20/0 1 0'}));
        });

        it('Should be invalid for an invalid step expression (step outside of bounds)', () => {
            assert.ok(!v.check({a: '0 2 */0 1 0'}));
            assert.ok(!v.check({a: '0 2 10-20/68 1 0'}));
        });

        it('Should be invalid for an invalid range (missing or invalid start)', () => {
            assert.ok(!v.check({a: '0 1 -10 1 0'}));
            assert.ok(!v.check({a: '0 1 x-10 1 0'}));
        });

        it('Should be invalid for an invalid range (missing or invalid end)', () => {
            assert.ok(!v.check({a: '0 1 10- 1 0'}));
            assert.ok(!v.check({a: '0 1 10-x 1 0'}));
        });

        it('Should be invalid for an invalid range (more than 2 in range)', () => {
            assert.ok(!v.check({a: '0 1 5-8-12 1 0'}));
        });

        it('Should be invalid for an invalid range (start greater than end)', () => {
            assert.ok(!v.check({a: '0 2 23-10 1 0'}));
        });

        it('Should be invalid for an invalid range (out-of-bounds end)', () => {
            assert.ok(!v.check({a: '0 2 10-33 1 0'}));
        });

        it('Should be invalid for an invalid range (out-of-bounds start)', () => {
            assert.ok(!v.check({a: '0 2 90-100 1 0'}));
        });

        it('Should be invalid for an invalid range part with step', () => {
            assert.ok(!v.check({a: '0 1 x-1/7 1 0'}));
            assert.ok(!v.check({a: '0 1 20-x/7 1 0'}));
        });

        it('Should be invalid for an invalid range with step (start greater than end)', () => {
            assert.ok(!v.check({a: '0 1 31-1/7 1 0'}));
        });

        it('Should be invalid for an invalid range with step (step greater than end-start)', () => {
            assert.ok(!v.check({a: '0 1 1-3/4 1 1'}));
        });

        it('Should be invalid for an invalid range with step (more than 2)', () => {
            assert.ok(!v.check({a: '1 1 1-3-5/2 1 1'}));
        });
    });

    describe('month', () => {
        it('Should be valid if passed a wildcard', () => {
            assert.ok(v.check({a: '0 1 1 * 0'}));
        });

        it('Should be valid for valid single values', () => {
            for (let i = 1; i <= 12; i++) {
                assert.ok(v.check({a: `0 1 1 ${i} 0`}));
            }
        });

        it('Should be valid for a valid comma-separated list', () => {
            assert.ok(v.check({a: '0 1 1 1,2,3,9,10,11,12,8 0'}));
        });

        it('Should be valid for a valid range', () => {
            assert.ok(v.check({a: '0 0 1 6-9 0'}));
        });

        it('Should be valid for a valid step expression with wildcard', () => {
            assert.ok(v.check({a: '0 1 1 */5 0'}));
        });

        it('Should be valid for a valid step expression with range', () => {
            assert.ok(v.check({a: '0 2 1 6-9/1 0'}));
        });

        it('Should be valid for a valid range with step', () => {
            assert.ok(v.check({a: '0 1 1 3-11/2 0'}));
        });

        it('Should be valid for a valid stepper with both base and step as number', () => {
            assert.ok(v.check({a: '0 0 1 4/1 0'}));
        });

        it('Should be invalid for values that exceed the valid range', () => {
            assert.ok(!v.check({a: '0 1 1 13 0'}));
            assert.ok(!v.check({a: '0 1 1 20 0'}));
        });

        it('Should be invalid for negative values', () => {
            assert.ok(!v.check({a: '0 1 1 -1 0'}));
        });

        it('Should be invalid for invalid comma separated values', () => {
            assert.ok(!v.check({a: '0 1 1 1,x,2 1'}));
        });

        it('Should be invalid for zero', () => {
            assert.ok(!v.check({a: '0 1 1 0 0'}));
        });

        it('Should be invalid for an invalid step expression (step of zero)', () => {
            assert.ok(!v.check({a: '0 1 1 */0 0'}));
            assert.ok(!v.check({a: '0 1 1 6-12/0 0'}));
        });

        it('Should be invalid for an invalid step expression (step outside of bounds)', () => {
            assert.ok(!v.check({a: '0 2 1 */0 0'}));
            assert.ok(!v.check({a: '0 2 1 6-12/68 0'}));
        });

        it('Should be invalid for an invalid range (missing or invalid start)', () => {
            assert.ok(!v.check({a: '0 1 1 -10 0'}));
            assert.ok(!v.check({a: '0 1 1 x-10 0'}));
        });

        it('Should be invalid for an invalid range (missing or invalid end)', () => {
            assert.ok(!v.check({a: '0 1 1 10- 0'}));
            assert.ok(!v.check({a: '0 1 1 10-x 0'}));
        });

        it('Should be invalid for an invalid range (more than 2 in range)', () => {
            assert.ok(!v.check({a: '0 1 1 5-8-12 0'}));
        });

        it('Should be invalid for an invalid range (start greater than end)', () => {
            assert.ok(!v.check({a: '0 2 1 9-6 0'}));
        });

        it('Should be invalid for an invalid range (out-of-bounds end)', () => {
            assert.ok(!v.check({a: '0 2 1 6-33 0'}));
        });

        it('Should be invalid for an invalid range (out-of-bounds start)', () => {
            assert.ok(!v.check({a: '0 2 1 90-100 0'}));
        });

        it('Should be invalid for an invalid range part with step', () => {
            assert.ok(!v.check({a: '0 1 1 x-3/2 0'}));
            assert.ok(!v.check({a: '0 1 1 11-x/2 0'}));
        });

        it('Should be invalid for an invalid range with step (start greater than end)', () => {
            assert.ok(!v.check({a: '0 1 1 11-3/2 0'}));
        });

        it('Should be invalid for an invalid range with step (step greater than end-start)', () => {
            assert.ok(!v.check({a: '0 1 1 1-3/4 1'}));
        });

        it('Should be invalid for an invalid range with step (more than 2)', () => {
            assert.ok(!v.check({a: '1 1 1 1-3-5/2 1'}));
        });
    });

    describe('day_of_week', () => {
        it('Should be valid if passed a wildcard', () => {
            assert.ok(v.check({a: '0 1 1 1 *'}));
        });

        it('Should be valid for valid single values', () => {
            for (let i = 0; i <= 6; i++) {
                assert.ok(v.check({a: `0 1 1 1 ${i}`}));
            }
        });

        it('Should be valid for a valid comma-separated list', () => {
            assert.ok(v.check({a: '0 1 1 1 1,2,3,4,5'}));
        });

        it('Should be valid for a valid range', () => {
            assert.ok(v.check({a: '0 0 1 1 0-3'}));
        });

        it('Should be valid for a valid step expression with wildcard', () => {
            assert.ok(v.check({a: '0 1 1 1 */2'}));
        });

        it('Should be valid for a valid step expression with range', () => {
            assert.ok(v.check({a: '0 2 1 1 3-6/1'}));
        });

        it('Should be valid for a valid range with step', () => {
            assert.ok(v.check({a: '0 1 1 1 1-6/2'}));
        });

        it('Should be valid for a valid stepper with both base and step as number', () => {
            assert.ok(v.check({a: '0 0 1 1 4/1'}));
        });

        it('Should be invalid for values that exceed the valid range', () => {
            assert.ok(!v.check({a: '0 1 1 1 7'}));
            assert.ok(!v.check({a: '0 1 1 1 8'}));
            assert.ok(!v.check({a: '0 1 1 1 9'}));
        });

        it('Should be invalid for negative values', () => {
            assert.ok(!v.check({a: '0 1 1 1 -1'}));
        });

        it('Should be invalid for invalid comma separated values', () => {
            assert.ok(!v.check({a: '0 1 1 1 1,x,2'}));
        });

        it('Should be invalid for an invalid step expression (step of zero)', () => {
            assert.ok(!v.check({a: '0 1 1 1 */0'}));
            assert.ok(!v.check({a: '0 1 1 1 3-5/0'}));
        });

        it('Should be invalid for an invalid step expression (step outside of bounds)', () => {
            assert.ok(!v.check({a: '0 2 1 1 4-6/8'}));
        });

        it('Should be invalid for an invalid range (missing or invalid start)', () => {
            assert.ok(!v.check({a: '0 1 1 1 -10'}));
            assert.ok(!v.check({a: '0 1 1 1 x-10'}));
        });

        it('Should be invalid for an invalid range (missing or invalid end)', () => {
            assert.ok(!v.check({a: '0 1 1 1 10-'}));
            assert.ok(!v.check({a: '0 1 1 1 10-x'}));
        });

        it('Should be invalid for an invalid range (more than 2 in range)', () => {
            assert.ok(!v.check({a: '0 1 1 1 2-4-6'}));
        });


        it('Should be invalid for an invalid range (start greater than end)', () => {
            assert.ok(!v.check({a: '0 2 1 1 8-6'}));
        });

        it('Should be invalid for an invalid range (out-of-bounds end)', () => {
            assert.ok(!v.check({a: '0 2 1 1 6-33'}));
        });

        it('Should be invalid for an invalid range (out-of-bounds start)', () => {
            assert.ok(!v.check({a: '0 2 1 1 90-100'}));
        });

        it('Should be invalid for an invalid range part with step', () => {
            assert.ok(!v.check({a: '0 1 1 1 x-2/2'}));
            assert.ok(!v.check({a: '0 1 1 1 1-x/2'}));
        });

        it('Should be invalid for an invalid range with step (start greater than end)', () => {
            assert.ok(!v.check({a: '0 1 1 1 7-1/2'}));
        });

        it('Should be invalid for an invalid range with step (step greater than end-start)', () => {
            assert.ok(!v.check({a: '0 1 1 1 1-3/4'}));
        });

        it('Should be invalid for an invalid range with step (more than 2)', () => {
            assert.ok(!v.check({a: '1 1 1 1 1-3-5/2'}));
        });
    });
});
