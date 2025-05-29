import {describe, it, expect} from 'vitest';
import Validator from '../../../lib';
import CONSTANTS from '../../constants';

describe('vCron', () => {
    const v = new Validator({a: 'cron'});

    it('Should be invalid if passed a non/empty string', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            expect(v.check({a: el as string})).toBe(false);
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
        ]) expect(v.check({a: el})).toBe(true);
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
        ]) expect(v.check({a: el})).toBe(false);
    });

    describe('minute', () => {
        it('Should be valid if passed a wildcard', () => {
            expect(v.check({a: '* 0 1 1 0'})).toBe(true);
        });

        it('Should be valid for valid single values', () => {
            for (let i = 0; i <= 59; i++) {
                expect(v.check({a: `${i} 0 1 1 0`})).toBe(true);
            }
        });

        it('Should be valid when at lower bound', () => {
            expect(v.check({a: '0 * * * *'})).toBe(true);
        });

        it('Should be valid for a valid comma-separated list', () => {
            expect(v.check({a: '0,15,30,45 0 1 1 0'})).toBe(true);
        });

        it('Should be valid for a valid range', () => {
            expect(v.check({a: '10-20 0 1 1 0'})).toBe(true);
        });

        it('Should be valid for a valid step expression with wildcard', () => {
            expect(v.check({a: '*/5 0 1 1 0'})).toBe(true);
        });

        it('Should be valid for a valid step expression with range', () => {
            expect(v.check({a: '10-50/10 0 1 1 0'})).toBe(true);
        });

        it('Should be valid for a valid stepper with both base and step as number', () => {
            expect(v.check({a: '4/2 0 1 1 0'})).toBe(true);
        });

        it('Should be invalid for values that exceed the valid range', () => {
            expect(v.check({a: '60 0 1 1 0'})).toBe(false);
            expect(v.check({a: '61 0 1 1 0'})).toBe(false);
        });

        it('Should be invalid for negative values', () => {
            expect(v.check({a: '-1 0 1 1 0'})).toBe(false);
        });

        it('Should be invalid for invalid comma separated values', () => {
            expect(v.check({a: '0,x,2 1 1 1 1'})).toBe(false);
        });

        it('Should be invalid for an invalid step expression (step of zero)', () => {
            expect(v.check({a: '*/0 0 1 1 0'})).toBe(false);
            expect(v.check({a: '10-20/0 0 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid step expression (step outside of bounds)', () => {
            expect(v.check({a: '*/0 0 1 1 0'})).toBe(false);
            expect(v.check({a: '10-20/68 0 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (missing or invalid start)', () => {
            expect(v.check({a: '-10 0 1 1 0'})).toBe(false);
            expect(v.check({a: 'x-10 0 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (missing or invalid end)', () => {
            expect(v.check({a: '10- 0 1 1 0'})).toBe(false);
            expect(v.check({a: '10-x 0 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (more than 2 in range)', () => {
            expect(v.check({a: '10-20-30 0 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (start greater than end)', () => {
            expect(v.check({a: '50-10 0 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (out-of-bounds end)', () => {
            expect(v.check({a: '10-100 0 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (out-of-bounds start)', () => {
            expect(v.check({a: '90-100 0 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range part with step', () => {
            expect(v.check({a: 'x-10/5 0 1 1 0'})).toBe(false);
            expect(v.check({a: '10-x/5 0 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (start greater than end)', () => {
            expect(v.check({a: '50-10/5 0 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (step greater than end-start)', () => {
            expect(v.check({a: '0-3/4 1 1 1 1'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (more than 2)', () => {
            expect(v.check({a: '1-3-5/2 1 1 1 1'})).toBe(false);
        });
    });

    describe('hour', () => {
        it('Should be valid if passed a wildcard', () => {
            expect(v.check({a: '0 * 1 1 0'})).toBe(true);
        });

        it('Should be valid for valid single values', () => {
            for (let i = 0; i <= 23; i++) {
                expect(v.check({a: `0 ${i} 1 1 0`})).toBe(true);
            }
        });

        it('Should be valid for a valid comma-separated list', () => {
            expect(v.check({a: '0 0,1,2,3,12,13,14,20,21,22 1 1 0'})).toBe(true);
        });

        it('Should be valid for a valid range', () => {
            expect(v.check({a: '0 6-9 1 1 0'})).toBe(true);
        });

        it('Should be valid for a valid step expression with wildcard', () => {
            expect(v.check({a: '0 */5 1 1 0'})).toBe(true);
        });

        it('Should be valid for a valid step expression with range', () => {
            expect(v.check({a: '0 12-20/2 1 1 0'})).toBe(true);
        });

        it('Should be valid for a valid range with step', () => {
            expect(v.check({a: '0 6-18/3 1 1 0'})).toBe(true);
        });

        it('Should be valid for a valid stepper with both base and step as number', () => {
            expect(v.check({a: '0 4/2 1 1 0'})).toBe(true);
        });

        it('Should be invalid for values that exceed the valid range', () => {
            expect(v.check({a: '0 24 1 1 0'})).toBe(false);
            expect(v.check({a: '0 32 0 1 0'})).toBe(false);
        });

        it('Should be invalid for negative values', () => {
            expect(v.check({a: '0 -1 1 1 0'})).toBe(false);
        });

        it('Should be invalid for invalid comma separated values', () => {
            expect(v.check({a: '0 1,x,2 1 1 1'})).toBe(false);
        });

        it('Should be invalid for an invalid step expression (step of zero)', () => {
            expect(v.check({a: '0 */0 1 1 0'})).toBe(false);
            expect(v.check({a: '0 10-20/0 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid step expression (step outside of bounds)', () => {
            expect(v.check({a: '0 */0 1 1 0'})).toBe(false);
            expect(v.check({a: '0 10-20/68 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (missing or invalid start)', () => {
            expect(v.check({a: '0 -10 1 1 0'})).toBe(false);
            expect(v.check({a: '0 x-10 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (missing or invalid end)', () => {
            expect(v.check({a: '0 10- 1 1 0'})).toBe(false);
            expect(v.check({a: '0 10-x 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (more than 2 in range)', () => {
            expect(v.check({a: '0 5-8-12 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (start greater than end)', () => {
            expect(v.check({a: '0 23-10 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (out-of-bounds end)', () => {
            expect(v.check({a: '0 10-30 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (out-of-bounds start)', () => {
            expect(v.check({a: '0 90-100 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range part with step', () => {
            expect(v.check({a: '0 20-x/3 1 1 0'})).toBe(false);
            expect(v.check({a: '0 x-10/3 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (start greater than end)', () => {
            expect(v.check({a: '0 20-10/3 1 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (step greater than end-start)', () => {
            expect(v.check({a: '0 1-3/4 1 1 1'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (more than 2)', () => {
            expect(v.check({a: '1 1-3-5/2 1 1 1'})).toBe(false);
        });
    });

    describe('day_of_month', () => {
        it('Should be valid if passed a wildcard', () => {
            expect(v.check({a: '0 1 * 1 0'})).toBe(true);
        });

        it('Should be valid for valid single values', () => {
            for (let i = 1; i <= 31; i++) {
                expect(v.check({a: `0 1 ${i} 1 0`})).toBe(true);
            }
        });

        it('Should be valid for a valid comma-separated list', () => {
            expect(v.check({a: '0 1 1,2,3,12,13,14,20,21,22 1 0'})).toBe(true);
        });

        it('Should be valid for a valid range', () => {
            expect(v.check({a: '0 0 6-9 1 0'})).toBe(true);
        });

        it('Should be valid for a valid step expression with wildcard', () => {
            expect(v.check({a: '0 1 */5 1 0'})).toBe(true);
        });

        it('Should be valid for a valid step expression with range', () => {
            expect(v.check({a: '0 2 12-20/2 1 0'})).toBe(true);
        });

        it('Should be valid for a valid range with step', () => {
            expect(v.check({a: '0 1 1-31/7 1 0'})).toBe(true);
        });

        it('Should be valid for a valid stepper with both base and step as number', () => {
            expect(v.check({a: '0 0 4/2 1 0'})).toBe(true);
        });

        it('Should be invalid for values that exceed the valid range', () => {
            expect(v.check({a: '0 1 32 1 0'})).toBe(false);
            expect(v.check({a: '0 1 64 1 0'})).toBe(false);
        });

        it('Should be invalid for negative values', () => {
            expect(v.check({a: '0 1 -1 1 0'})).toBe(false);
        });

        it('Should be invalid for invalid comma separated values', () => {
            expect(v.check({a: '0 1 1,x,2 1 1'})).toBe(false);
        });

        it('Should be invalid for zero', () => {
            expect(v.check({a: '0 1 0 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid step expression (step of zero)', () => {
            expect(v.check({a: '0 1 */0 1 0'})).toBe(false);
            expect(v.check({a: '0 1 10-20/0 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid step expression (step outside of bounds)', () => {
            expect(v.check({a: '0 2 */0 1 0'})).toBe(false);
            expect(v.check({a: '0 2 10-20/68 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (missing or invalid start)', () => {
            expect(v.check({a: '0 1 -10 1 0'})).toBe(false);
            expect(v.check({a: '0 1 x-10 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (missing or invalid end)', () => {
            expect(v.check({a: '0 1 10- 1 0'})).toBe(false);
            expect(v.check({a: '0 1 10-x 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (more than 2 in range)', () => {
            expect(v.check({a: '0 1 5-8-12 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (start greater than end)', () => {
            expect(v.check({a: '0 2 23-10 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (out-of-bounds end)', () => {
            expect(v.check({a: '0 2 10-33 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (out-of-bounds start)', () => {
            expect(v.check({a: '0 2 90-100 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range part with step', () => {
            expect(v.check({a: '0 1 x-1/7 1 0'})).toBe(false);
            expect(v.check({a: '0 1 20-x/7 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (start greater than end)', () => {
            expect(v.check({a: '0 1 31-1/7 1 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (step greater than end-start)', () => {
            expect(v.check({a: '0 1 1-3/4 1 1'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (more than 2)', () => {
            expect(v.check({a: '1 1 1-3-5/2 1 1'})).toBe(false);
        });
    });

    describe('month', () => {
        it('Should be valid if passed a wildcard', () => {
            expect(v.check({a: '0 1 1 * 0'})).toBe(true);
        });

        it('Should be valid for valid single values', () => {
            for (let i = 1; i <= 12; i++) {
                expect(v.check({a: `0 1 1 ${i} 0`})).toBe(true);
            }
        });

        it('Should be valid for a valid comma-separated list', () => {
            expect(v.check({a: '0 1 1 1,2,3,9,10,11,12,8 0'})).toBe(true);
        });

        it('Should be valid for a valid range', () => {
            expect(v.check({a: '0 0 1 6-9 0'})).toBe(true);
        });

        it('Should be valid for a valid step expression with wildcard', () => {
            expect(v.check({a: '0 1 1 */5 0'})).toBe(true);
        });

        it('Should be valid for a valid step expression with range', () => {
            expect(v.check({a: '0 2 1 6-9/1 0'})).toBe(true);
        });

        it('Should be valid for a valid range with step', () => {
            expect(v.check({a: '0 1 1 3-11/2 0'})).toBe(true);
        });

        it('Should be valid for a valid stepper with both base and step as number', () => {
            expect(v.check({a: '0 0 1 4/1 0'})).toBe(true);
        });

        it('Should be invalid for values that exceed the valid range', () => {
            expect(v.check({a: '0 1 1 13 0'})).toBe(false);
            expect(v.check({a: '0 1 1 20 0'})).toBe(false);
        });

        it('Should be invalid for negative values', () => {
            expect(v.check({a: '0 1 1 -1 0'})).toBe(false);
        });

        it('Should be invalid for invalid comma separated values', () => {
            expect(v.check({a: '0 1 1 1,x,2 1'})).toBe(false);
        });

        it('Should be invalid for zero', () => {
            expect(v.check({a: '0 1 1 0 0'})).toBe(false);
        });

        it('Should be invalid for an invalid step expression (step of zero)', () => {
            expect(v.check({a: '0 1 1 */0 0'})).toBe(false);
            expect(v.check({a: '0 1 1 6-12/0 0'})).toBe(false);
        });

        it('Should be invalid for an invalid step expression (step outside of bounds)', () => {
            expect(v.check({a: '0 2 1 */0 0'})).toBe(false);
            expect(v.check({a: '0 2 1 6-12/68 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (missing or invalid start)', () => {
            expect(v.check({a: '0 1 1 -10 0'})).toBe(false);
            expect(v.check({a: '0 1 1 x-10 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (missing or invalid end)', () => {
            expect(v.check({a: '0 1 1 10- 0'})).toBe(false);
            expect(v.check({a: '0 1 1 10-x 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (more than 2 in range)', () => {
            expect(v.check({a: '0 1 1 5-8-12 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (start greater than end)', () => {
            expect(v.check({a: '0 2 1 9-6 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (out-of-bounds end)', () => {
            expect(v.check({a: '0 2 1 6-33 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range (out-of-bounds start)', () => {
            expect(v.check({a: '0 2 1 90-100 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range part with step', () => {
            expect(v.check({a: '0 1 1 x-3/2 0'})).toBe(false);
            expect(v.check({a: '0 1 1 11-x/2 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (start greater than end)', () => {
            expect(v.check({a: '0 1 1 11-3/2 0'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (step greater than end-start)', () => {
            expect(v.check({a: '0 1 1 1-3/4 1'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (more than 2)', () => {
            expect(v.check({a: '1 1 1 1-3-5/2 1'})).toBe(false);
        });
    });

    describe('day_of_week', () => {
        it('Should be valid if passed a wildcard', () => {
            expect(v.check({a: '0 1 1 1 *'})).toBe(true);
        });

        it('Should be valid for valid single values', () => {
            for (let i = 0; i <= 6; i++) {
                expect(v.check({a: `0 1 1 1 ${i}`})).toBe(true);
            }
        });

        it('Should be valid for a valid comma-separated list', () => {
            expect(v.check({a: '0 1 1 1 1,2,3,4,5'})).toBe(true);
        });

        it('Should be valid for a valid range', () => {
            expect(v.check({a: '0 0 1 1 0-3'})).toBe(true);
        });

        it('Should be valid for a valid step expression with wildcard', () => {
            expect(v.check({a: '0 1 1 1 */2'})).toBe(true);
        });

        it('Should be valid for a valid step expression with range', () => {
            expect(v.check({a: '0 2 1 1 3-6/1'})).toBe(true);
        });

        it('Should be valid for a valid range with step', () => {
            expect(v.check({a: '0 1 1 1 1-6/2'})).toBe(true);
        });

        it('Should be valid for a valid stepper with both base and step as number', () => {
            expect(v.check({a: '0 0 1 1 4/1'})).toBe(true);
        });

        it('Should be invalid for values that exceed the valid range', () => {
            expect(v.check({a: '0 1 1 1 7'})).toBe(false);
            expect(v.check({a: '0 1 1 1 8'})).toBe(false);
            expect(v.check({a: '0 1 1 1 9'})).toBe(false);
        });

        it('Should be invalid for negative values', () => {
            expect(v.check({a: '0 1 1 1 -1'})).toBe(false);
        });

        it('Should be invalid for invalid comma separated values', () => {
            expect(v.check({a: '0 1 1 1 1,x,2'})).toBe(false);
        });

        it('Should be invalid for an invalid step expression (step of zero)', () => {
            expect(v.check({a: '0 1 1 1 */0'})).toBe(false);
            expect(v.check({a: '0 1 1 1 3-5/0'})).toBe(false);
        });

        it('Should be invalid for an invalid step expression (step outside of bounds)', () => {
            expect(v.check({a: '0 2 1 1 4-6/8'})).toBe(false);
        });

        it('Should be invalid for an invalid range (missing or invalid start)', () => {
            expect(v.check({a: '0 1 1 1 -10'})).toBe(false);
            expect(v.check({a: '0 1 1 1 x-10'})).toBe(false);
        });

        it('Should be invalid for an invalid range (missing or invalid end)', () => {
            expect(v.check({a: '0 1 1 1 10-'})).toBe(false);
            expect(v.check({a: '0 1 1 1 10-x'})).toBe(false);
        });

        it('Should be invalid for an invalid range (more than 2 in range)', () => {
            expect(v.check({a: '0 1 1 1 2-4-6'})).toBe(false);
        });


        it('Should be invalid for an invalid range (start greater than end)', () => {
            expect(v.check({a: '0 2 1 1 8-6'})).toBe(false);
        });

        it('Should be invalid for an invalid range (out-of-bounds end)', () => {
            expect(v.check({a: '0 2 1 1 6-33'})).toBe(false);
        });

        it('Should be invalid for an invalid range (out-of-bounds start)', () => {
            expect(v.check({a: '0 2 1 1 90-100'})).toBe(false);
        });

        it('Should be invalid for an invalid range part with step', () => {
            expect(v.check({a: '0 1 1 1 x-2/2'})).toBe(false);
            expect(v.check({a: '0 1 1 1 1-x/2'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (start greater than end)', () => {
            expect(v.check({a: '0 1 1 1 7-1/2'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (step greater than end-start)', () => {
            expect(v.check({a: '0 1 1 1 1-3/4'})).toBe(false);
        });

        it('Should be invalid for an invalid range with step (more than 2)', () => {
            expect(v.check({a: '1 1 1 1 1-3-5/2'})).toBe(false);
        });
    });
});
