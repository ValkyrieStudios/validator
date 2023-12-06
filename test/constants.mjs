'use strict';

/* eslint-disable max-len,no-new-wrappers,no-array-constructor,no-new-object */

function testFunction () {}
const testArrowFunction = () => {};

const IS_NUMERIC    = [1, 0.000001, 8e10, Math.PI, Number(1.12345), Number(Number.EPSILON)];
const IS_INTEGER    = [-1, 100, -50, 99999, 20];
const IS_BOOLEAN    = [true, false, Boolean(true), Boolean(false), Boolean('foo'), new Boolean(false)];
const IS_STRING     = ['foo', new String('bar')];
const IS_REGEXP     = [/abcdefg/i, new RegExp('\\w+')];
const IS_DATE       = [new Date()];
const IS_ARRAY      = [[0, 1, 2], new Array(1, 2, 3), new Array(5)];
const IS_OBJECT     = [{bar:'foo'}, new Object(), Object.create(null), Object.create([])];
const IS_FUNCTION   = [testFunction, testArrowFunction];
const IS_NULLABLE   = [NaN, undefined, null];

const NOT_ARRAY = [
    ...IS_NUMERIC,
    ...IS_INTEGER,
    ...IS_BOOLEAN,
    ...IS_STRING,
    ...IS_REGEXP,
    ...IS_DATE,
    ...IS_OBJECT,
    ...IS_FUNCTION,
    ...IS_NULLABLE,
];
const NOT_NUMERIC = [
    ...IS_BOOLEAN,
    ...IS_STRING,
    ...IS_REGEXP,
    ...IS_DATE,
    ...IS_ARRAY,
    ...IS_OBJECT,
    ...IS_FUNCTION,
    ...IS_NULLABLE,
    new Number(1.12345),
    new Number(Number.EPSILON),
];
const NOT_STRING = [
    ...IS_NUMERIC,
    ...IS_INTEGER,
    ...IS_BOOLEAN,
    ...IS_REGEXP,
    ...IS_DATE,
    ...IS_ARRAY,
    ...IS_OBJECT,
    ...IS_FUNCTION,
    ...IS_NULLABLE,
];
const NOT_OBJECT = [
    ...IS_NUMERIC,
    ...IS_INTEGER,
    ...IS_BOOLEAN,
    ...IS_STRING,
    ...IS_REGEXP,
    ...IS_DATE,
    ...IS_ARRAY,
    ...IS_FUNCTION,
    ...IS_NULLABLE,
];
const NOT_DATE = [
    ...IS_NUMERIC,
    ...IS_INTEGER,
    ...IS_BOOLEAN,
    ...IS_STRING,
    ...IS_REGEXP,
    ...IS_ARRAY,
    ...IS_OBJECT,
    ...IS_FUNCTION,
    ...IS_NULLABLE,
];
const NOT_FUNCTION = [
    ...IS_NUMERIC,
    ...IS_INTEGER,
    ...IS_BOOLEAN,
    ...IS_STRING,
    ...IS_REGEXP,
    ...IS_DATE,
    ...IS_ARRAY,
    ...IS_OBJECT,
    ...IS_NULLABLE,
];
const NOT_BOOLEAN = [
    ...IS_NUMERIC,
    ...IS_INTEGER,
    ...IS_STRING,
    ...IS_REGEXP,
    ...IS_DATE,
    ...IS_ARRAY,
    ...IS_OBJECT,
    ...IS_FUNCTION,
    ...IS_NULLABLE,
];
const NOT_REGEXP = [
    ...IS_NUMERIC,
    ...IS_INTEGER,
    ...IS_BOOLEAN,
    ...IS_STRING,
    ...IS_DATE,
    ...IS_ARRAY,
    ...IS_OBJECT,
    ...IS_FUNCTION,
    ...IS_NULLABLE,
];

const NOT_DATE_STRING = [
    ...NOT_STRING,
    '',
    ' ',
    '   ',
    'abc',
    'foobar',
    '-1000000000000000000000',
    '202a-1b-0c',
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
    '2019-20-20T05:10:00+00:00',
];

const CONSTANTS = {
    NOT_ARRAY,
    NOT_ARRAY_WITH_EMPTY: [...NOT_ARRAY, []],
    NOT_BOOLEAN,
    NOT_DATE,
    NOT_DATE_STRING,
    NOT_FUNCTION,
    NOT_INTEGER: [...NOT_NUMERIC, -5.2, 4.6, -150.3, Math.PI, new Number(1.12345), new Number(Number.EPSILON)],
    NOT_NUMERIC,
    NOT_OBJECT,
    NOT_OBJECT_WITH_EMPTY: [...NOT_OBJECT, {}],
    NOT_REGEXP,
    NOT_STRING,
    NOT_STRING_WITH_EMPTY: [...NOT_STRING, '', ' ', '  '],
    IS_NUMERIC,
    IS_INTEGER,
    IS_BOOLEAN,
    IS_STRING,
    IS_REGEXP,
    IS_DATE,
    IS_ARRAY,
    IS_OBJECT,
    IS_FUNCTION,
    IS_NULLABLE,
};

export default CONSTANTS;

//  Get Time
export function getTime () {
    const hr_time = process.hrtime();
    return ((hr_time[0] * 1000) + hr_time[1])/1000000;
}
