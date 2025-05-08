import {isIntGt, isIntBetween} from "@valkyriestudios/utils/number";
import {type CronSchedule} from "../types";

const RGX_DIGITS = /^\d+$/;

/**
 * Checks a cron subpart (eg part of a range) and returns it as a number if valid, otherwise returns null
 *
 * @param {string} part - Raw part
 * @param {number} min - Lower bound of the range for the part
 * @param {number} max - Upper bound of the range for the part
 */
function isSubpart (part:string, min:number, max:number) {
    if (!RGX_DIGITS.test(part)) return null;
    const normalized = parseFloat(part);
    return isIntBetween(normalized, min, max) ? normalized : null;
}

/**
 * Validates a part in a cron schedule string
 *
 * @param {string} part - Part to validate
 * @param {number} min - Lower bound for the part
 * @param {number} max - Upper bound for the part
 */
function isPart (part:string, min:number, max:number): boolean {
    if (part === '*') {
        /* Wildcard */
        return true;
    } else if (part.indexOf('/') > -1) {
        /* Step expression */
        const [base, stepStr] = part.split('/', 2);
        const step = parseFloat(stepStr);
        if (!isIntGt(step, 0) || !isIntBetween(step, min, max)) return false;

        /* Validate the base part */
        if (base === '*') return true;

        let start:number|null = min;
        let end:number|null = max;
        if (base.indexOf('-') > -1) {
            const chunks = base.split('-');
            if (chunks.length !== 2) return false;
            start = isSubpart(chunks[0], min, max);
            end = isSubpart(chunks[1], min, max);
        } else {
            start = isSubpart(base, min, max);
        }

        if (start === null || end === null) return false;
        if (start > end) return false;
        if (step > (end - start)) return false;
        return true;
    } else if (part.indexOf('-') > -1) {
        /* Range (eg: 10-30) */
        const chunks = part.split('-');
        if (chunks.length !== 2) return false;

        /* The start and end need to be valid cron parts */
        const start = isSubpart(chunks[0], min, max);
        const end = isSubpart(chunks[1], min, max);
        if (start === null || end === null) return false;

        return start < end;
    } else if (part.indexOf(',') > -1) {
        /* Csv list (Eg: 5,10,15) */
        const chunks = part.split(',');
        for (let i = 0; i < chunks.length; i++) {
            if (isSubpart(chunks[i], min, max) === null) return false;
        }
        return true;
    } else {
        return isSubpart(part, min, max) !== null;
    }
}

/**
 * Validate that a provided value is a valid cron schedule
 *
 * @param {unknown} val - Value to verify
 */
function vCron (val:unknown):val is CronSchedule {
    if (typeof val !== 'string') return false;

    const parts = val.split(' ', 6);
    return (
        parts.length === 5 &&
        /* Minute */
        isPart(parts[0], 0, 59) &&
        /* Hour */
        isPart(parts[1], 0, 23) &&
        /* Day of month */
        isPart(parts[2], 1, 31) &&
        /* Month */
        isPart(parts[3], 1, 12) &&
        /* Day of week */
        isPart(parts[4], 0, 6)
    );
}

export {vCron, vCron as default};
