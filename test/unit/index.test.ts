/* eslint-disable max-lines,max-statements,id-denylist */

import {describe, it, expect} from 'vitest';
import {isString, isNeString} from '@valkyriestudios/utils/string';
import {isObject, isNeObject} from '@valkyriestudios/utils/object';
import {isArray, isNeArray} from '@valkyriestudios/utils/array';
import {isBoolean} from '@valkyriestudios/utils/boolean';
import {isDate} from '@valkyriestudios/utils/date';
import {equal} from '@valkyriestudios/utils/equal';
import {isFn, isAsyncFn} from '@valkyriestudios/utils/function';
import {isFormData} from '@valkyriestudios/utils/formdata';
import {isNumber, isInteger} from '@valkyriestudios/utils/number';
import guid from '@valkyriestudios/utils/hash/guid';
import CONSTANTS from '../constants';
import Validator from '../../lib';
import * as VR from '../../lib/functions';

describe('Validator - Core', () => {
    it('Should instantiate to a validator object', () => {
        const validator = new Validator({firstName: 'string_ne'});

        //  It should have a check function on its instance
        expect(typeof validator.check).toBe('function');

        //  It should have a checkForm function on its instance
        expect(typeof validator.checkForm).toBe('function');

        //  It should have a validate function on its instance
        expect(typeof validator.validate).toBe('function');

        //  It should have a extend function on the class
        expect(typeof Validator.extend).toBe('function');

        //  It should not have a extend function on its instance
        expect(Object.prototype.hasOwnProperty.call(validator, 'extend')).toBe(false);

        //  It should have a extend function on the class
        expect(typeof Validator.extend).toBe('function');
    });

    it('Should throw a type error when passed wrong configuration options', () => {
        expect(
            //  @ts-ignore
            () => new Validator()
        ).toThrowError(/Validator@ctor: Schema needs to be an object or array of objects/);

        expect(
            //  @ts-ignore
            () => new Validator(5)
        ).toThrowError(/Validator@ctor: Schema needs to be an object or array of objects/);

        expect(
            //  @ts-ignore
            () => new Validator([{hello: 'world'}, 5, true])
        ).toThrowError(/Invalid rule value/);

        expect(
            //  @ts-ignore
            () => new Validator('foo')
        ).toThrowError(/Validator@ctor: Schema needs to be an object or array of objects/);

        expect(
            //  @ts-ignore
            () => new Validator({foo: 5, a: {b: 'string', params: []}})
        ).toThrowError(/Invalid rule value/);

        expect(
            //  @ts-ignore
            () => new Validator({a: {b: ''}})
        ).toThrowError(/Invalid rule value/);

        expect(
            //  @ts-ignore
            () => new Validator({foo: ['string_ne', '', '   ', '?']})
        ).toThrowError(/Invalid Conditional group alternative/);

        expect(
            () => new Validator({foo: 'number', a: 'in:<>'})
        ).toThrowError(/Parameterization misconfiguration/);
    });

    describe('rules GET', () => {
        it('Should return the configured rules on the Validator as an object', () => {
            expect(typeof Validator.rules).toBe('object');
        });

        it('Should return a correct kv-map of configured rules', () => {
            expect(Validator.rules).toEqual({
                alpha_num_spaces            : VR.vAlphaNumSpaces,
                alpha_num_spaces_multiline  : VR.vAlphaNumSpacesMultiline,
                array                       : isArray,
                array_ne                    : isNeArray,
                base64                      : VR.vBase64,
                between                     : VR.vBetween,
                between_inc                 : VR.vBetweenInclusive,
                boolean                     : isBoolean,
                blob                        : VR.vBlob,
                color_hex                   : VR.vColorHex,
                continent                   : VR.vContinent,
                country                     : VR.vCountry,
                country_alpha3              : VR.vCountryAlpha3,
                cron                        : VR.vCron,
                date                        : isDate,
                date_day                    : VR.vDateDay,
                date_iso                    : VR.vDateISO,
                date_string                 : VR.vDateString,
                ean                         : VR.vEAN,
                ean_8                       : VR.vEAN8,
                ean_13                      : VR.vEAN13,
                email                       : VR.vEmail,
                equal_to                    : equal,
                false                       : VR.vFalse,
                file                        : VR.vFile,
                formdata                    : isFormData,
                function                    : isFn,
                async_function              : isAsyncFn,
                geo_latitude                : VR.vGeoLatitude,
                geo_longitude               : VR.vGeoLongitude,
                greater_than                : VR.vGreaterThan,
                greater_than_or_equal       : VR.vGreaterThanOrEqual,
                guid                        : VR.vGuid,
                in                          : VR.vIn,
                integer                     : isInteger,
                isbn                        : VR.vISBN,
                isbn_10                     : VR.vISBN10,
                isbn_13                     : VR.vISBN13,
                less_than                   : VR.vLessThan,
                less_than_or_equal          : VR.vLessThanOrEqual,
                literal                     : VR.vLiteral,
                max                         : VR.vLessThanOrEqual,
                min                         : VR.vGreaterThanOrEqual,
                null                        : VR.vNull,
                number                      : isNumber,
                object                      : isObject,
                object_ne                   : isNeObject,
                phone                       : VR.vPhone,
                size                        : VR.vSize,
                ssn                         : VR.vSSN,
                string                      : isString,
                string_ne                   : isNeString,
                sys_mac                     : VR.vSysMac,
                sys_ipv4                    : VR.vSysIPv4,
                sys_ipv6                    : VR.vSysIPv6,
                sys_ipv4_or_v6              : VR.vSysIPv4_or_v6,
                sys_port                    : VR.vSysPort,
                time_zone                   : VR.vTimeZone,
                true                        : VR.vTrue,
                ulid                        : VR.vUlid,
                url                         : VR.vUrl,
                url_noquery                 : VR.vUrlNoQuery,
                url_img                     : VR.vUrlImage,
                url_vid                     : VR.vUrlVideo,
                url_aud                     : VR.vUrlAudio,
                url_med                     : VR.vUrlMedia,
                uuid                        : VR.vUuid,
                uuid_v1                     : VR.vUuidV1,
                uuid_v2                     : VR.vUuidV2,
                uuid_v3                     : VR.vUuidV3,
                uuid_v4                     : VR.vUuidV4,
                uuid_v5                     : VR.vUuidV5,
                gt                          : VR.vGreaterThan,
                gte                         : VR.vGreaterThanOrEqual,
                lt                          : VR.vLessThan,
                lte                         : VR.vLessThanOrEqual,
                eq                          : equal,
                '?'                         : VR.vUndefined,
            });
        });

        it('Should return a immutable frozen version of the configured rules', () => {
            const rules = Validator.rules;
            expect(Object.isFrozen(rules)).toBe(true);
        });

        it('Should take into account extended rules', () => {
            const fn = () => true;
            Validator.extend({myfunction: fn});
            expect(Validator.rules.myfunction).toEqual(fn);
        });
    });

    describe('schema GET', () => {
        it('Should return the raw schema passed to the validator on construction', () => {
            const v = new Validator({foo: 'number'});
            expect(v.schema).toEqual({foo: 'number'});
        });

        it('Should return the raw schema passed to the validator on construction using Validator.create', () => {
            const v = Validator.create({foo: 'number'});
            expect(v.schema).toEqual({foo: 'number'});
        });

        it('Should not be editable', () => {
            const v = new Validator({foo: 'number'});
            const out = v.schema;
            expect(v.schema).toEqual({foo: 'number'});
            expect(out).toEqual({foo: 'number'});
            /* @ts-ignore */
            out.bla = 'hia';
            expect(v.schema).toEqual({foo: 'number'});
        });
    });

    describe('checkForm FN', () => {
        it('Should return false when passed a value that is not an instance of FormData', () => {
            for (const el of CONSTANTS.NOT_FORM_DATA) {
                expect(new Validator({a: 'number', b: 'number'}).checkForm(el)).toBe(false);
            }
        });

        it('Should call check and return false if that returns false', () => {
            const v = new Validator({a: 'number', b: 'number'});
            /* @ts-ignore */
            v.check = () => false;
            const form = new FormData();
            form.append('a', '50');
            form.append('b', '49');
            expect(v.checkForm(form)).toBe(false);
        });

        it('Should call check and return the parsed form data if that returns true', () => {
            const v = new Validator({a: 'number', b: 'number'});
            /* @ts-ignore */
            v.check = () => true;
            const form = new FormData();
            form.append('a', '50');
            form.append('b', '49');
            expect(v.checkForm(form)).toEqual({
                a: 50,
                b: 49,
            });
        });
    });

    describe('check FN', () => {
        it('Should return false when invalid', () => {
            expect(new Validator({a: 'number', b: 'number'}).check({a: 20, b: false})).toBe(false);
        });

        it('Should return true when valid', () => {
            expect(new Validator({a: 'number', b: 'number'}).check({a: 20, b: 42})).toBe(true);
        });

        it('Should validate to false if data was passed but rule does not exist', () => {
            const validator = new Validator({a: 'bla'});
            expect(validator.check({a: 'hello'})).toBe(false);
        });

        it('Should validate to false if data was passed but deep retrieval isnt working for rule', () => {
            const validator = new Validator({a: {b: {c: 'string_ne'}}});
            expect(validator.check({a: 'hello'})).toBe(false);
        });

        it('Should validate to false if a validator with an undefined rule was passed', () => {
            const validator = new Validator({a: {b: {c: 'string_no'}}});
            expect(validator.check({a: {b: {c: 'hello'}}})).toBe(false);
        });
    });

    describe('check FN - lexer: flag:sometimes (?)', () => {
        it('Should validate correctly if set and no value is passed', () => {
            expect(new Validator({a: '?number'}).check({})).toBe(true);
        });

        it('Should not interfere with other validation rules', () => {
            expect(new Validator({
                a: '?number',
                b: 'number|less_than:20',
            }).check({})).toBe(false);

            expect(new Validator({
                a: '?number',
                b: 'number|less_than:20',
            }).check({a: 20, b: false})).toBe(false);

            expect(new Validator({
                a: '?number',
                b: 'number|less_than:20',
            }).check({b: 15})).toBe(true);
        });
    });

    describe('check FN - lexer: flag:parameter (<...>)', () => {
        it('Should allow link to passed parameter', () => {
            expect(new Validator({a: 'equal_to:<foo>'}).check({a: 'hello', foo: 'hello'})).toBe(true);
        });

        it('Should fail if parameter is not passed', () => {
            expect(new Validator({a: 'equal_to:<foo>'}).check({a: 'hello', foobar: 'hello'})).toBe(false);
        });

        it('Should allow multiple parameters inside the same ruleset', () => {
            expect(new Validator({a: 'between:<min>,<max>'}).check({a: 5, min: 3, max: 7})).toBe(true);
        });

        it('Should allow multiple parameters inside the same config', () => {
            expect(new Validator({a: 'in:<arr1>', b: 'in:<arr2>'}).check({a: 1, b: 2, arr1: [1, 3, 5], arr2: [2, 4, 6]})).toBe(true);
        });

        it('Should allow the same parameter on multiple rules inside the same config', () => {
            expect(new Validator({a: 'in:<arr1>', b: 'in:<arr1>'}).check({a: 1, b: 2, arr1: [1, 2, 3]})).toBe(true);
        });
    });

    describe('check FN - lexer: flag:not (!)', () => {
        it('Should validate correct if set and no value is passed', () => {
            expect(new Validator({a: '!number'}).check({})).toBe(false);
        });

        it('Should validate correct if set and value is passed when using standard rule', () => {
            expect(new Validator({a: '!number'}).check({a: 'hello'})).toBe(true);
            expect(new Validator({a: '!number'}).check({a: 4})).toBe(false);
            expect(new Validator({a: '!between:5,10'}).check({a: 4})).toBe(true);
            expect(new Validator({a: '!between:5,10'}).check({a: 6})).toBe(false);
        });

        it('Should validate correct if set and value is passed when using parameter flag', () => {
            expect(new Validator({a: '!equal_to:<foo>'}).check({a: 'hello', foo: 'hello'})).toBe(false);
        });

        it('Should validate correct if set and value is passed when using multiple validation rules', () => {
            expect(new Validator({a: '!string|!equal_to:<foo>'}).check({a: 'foo', foo: 'hello'})).toBe(false);
            expect(new Validator({a: '!string|!equal_to:<foo>'}).check({a: 'foo', foo: 'foo'})).toBe(false);
        });
    });

    describe('check FN - lexer: iterable array', () => {
        it('Should not throw if passed an iterable config during rule creation', () => {
            expect(() => new Validator({a: '[]string'})).not.toThrow();
        });

        it('Should return invalid when passing a non-array to an iterable', () => {
            const validator = new Validator({a: '[]string'});
            expect(validator.check({a: 'hello'})).toBe(false);
        });

        it('Should return valid when passing an empty array to an iterable', () => {
            const validator = new Validator({a: '[]string'});
            expect(validator.check({a: []})).toBe(true);
        });

        it('Should allow validating an array of values', () => {
            const validator = new Validator({a: '[]string'});
            expect(validator.check({a: ['hello', 'there']})).toBe(true);
            expect(validator.check({a: ['hello', false]})).toBe(false);
            expect(validator.check({a: ['hello', false, true]})).toBe(false);
        });

        it('Should allow validating an array of values with a \'?\' sometimes flag', () => {
            const validator = new Validator({a: '?[]string'});
            expect(validator.check({a: ['hello', 'there']})).toBe(true);
            expect(validator.check({})).toBe(true);
            expect(validator.check({a: ['hello', false, 'foo', true]})).toBe(false);
        });

        it('Should allow validating an array of values with a \'?\' sometimes flag and parameter pass', () => {
            const validator = new Validator({a: '?[]string|in:<genders>'});
            expect(validator.check({a: ['male', 'male', 'female', 'male', 'female'], genders: ['male', 'female', 'other']})).toBe(true);
            expect(validator.check({genders: ['male', 'female', 'other']})).toBe(true);
            expect(validator.check({a: ['dog'], genders: ['male', 'female', 'other']})).toBe(false);
        });

        it('Should allow validating an array of values with a \'?\' sometimes flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '?[unique]string|in:<genders>'});
            expect(validator.check({a: ['male', 'male', 'female', 'male', 'female'], genders: ['male', 'female', 'other']})).toBe(false);
            expect(validator.check({a: ['male', 'female'], genders: ['male', 'female', 'other']})).toBe(true);
        });

        it('Should allow validating an array of values with a \'!\' not flag and parameter pass', () => {
            const validator = new Validator({a: '[]string|!in:<genders>'});
            expect(validator.check({a: ['bob', 'bob', 'john', 'bob', 'john'], genders: ['male', 'female', 'other']})).toBe(true);
            expect(validator.check({a: ['male', 'female', 'female'], genders: ['male', 'female', 'other']})).toBe(false);
            expect(validator.check({a: ['chicken', 'dog', 'female'], genders: ['male', 'female', 'other']})).toBe(false);
        });

        it('Should allow validating an array of values with a \'!\' not flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '[unique]string|!in:<genders>'});
            expect(validator.check({a: ['bob', 'john'], genders: ['male', 'female', 'other']})).toBe(true);
            expect(validator.check({a: ['male', 'female', 'female'], genders: ['male', 'female', 'other']})).toBe(false);
            expect(validator.check({a: ['chicken', 'dog', 'female', 'dog'], genders: ['male', 'female', 'other']})).toBe(false);
        });

        it('Should return false if passed an array of values but a non-existing rule', () => {
            const validator = new Validator({a: '[unique]string_no'});
            expect(validator.check({a: ['bob', 'john']})).toBe(false);
        });
    });

    describe('check FN - lexer: iterable array:unique', () => {
        it('Should return valid when array is unique', () => {
            const validator = new Validator({a: '[unique]string'});
            expect(validator.check({a: ['a', 'b', 'c']})).toBe(true);
        });

        it('Should return invalid when array is not unique', () => {
            const validator = new Validator({a: '[unique]string'});
            expect(validator.check({a: ['a', 'b', 'a']})).toBe(false);
        });

        it('Should return invalid when array is not unique when using numbers', () => {
            const validator = new Validator({a: '[unique]number'});
            expect(validator.check({a: [1, 2, 2]})).toBe(false);
        });

        it('Should return invalid when array is not unique when using objects', () => {
            const validator = new Validator({a: '[unique]object'});
            expect(validator.check({a: [{a: 1}, {b: 2}, {b: 2}]})).toBe(false);
        });

        it('Should return invalid when array is not unique and doesnt match rules', () => {
            const validator = new Validator({a: '[unique]integer'});
            expect(validator.check({a: [1, 2, 'a', 2]})).toBe(false);
        });

        it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
            const validator = new Validator({a: '[unique]integer'});
            expect(validator.check({a: [1, 2, 'a', 2, 2, 2.2]})).toBe(false);
        });
    });

    describe('check FN - lexer: iterable array:max', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[max:5]string'});
            expect(validator.check({a: ['hello', 'there']})).toBe(true);
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            expect(validator.check({a: ['1', '2', '3', '4', '5']})).toBe(true);
        });

        it('Should return invalid when above boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            expect(validator.check({a: ['1', '2', '3', '4', '5', '6']})).toBe(false);
        });

        it('Should only return iterable invalidity and not go into val evaluation when above boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            expect(validator.check({a: ['1', '2', '3', '4', 5, '6']})).toBe(false);
        });

        it('Should return iterable invalidity and go into val evaluation when at or below boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            expect(validator.check({a: ['1', false, false, '2', false]})).toBe(false);
            expect(validator.check({a: [false, '1', '2', '3']})).toBe(false);
        });
    });

    describe('check FN - lexer: iterable array:min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[min:5]string'});
            expect(validator.check({a: ['hello', 'there', 'this', 'is', 'cool', 'right']})).toBe(true);
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '[min:5]string'});
            expect(validator.check({a: ['hello', 'there', 'this', 'is', 'cool']})).toBe(true);
        });

        it('Should return invalid when below boundary', () => {
            const validator = new Validator({a: '[min:3]string'});
            expect(validator.check({a: ['1', '2']})).toBe(false);
        });

        it('Should only return iterable invalidity and not go into val evaluation when below boundary', () => {
            const validator = new Validator({a: '[min:4]string'});
            expect(validator.check({a: ['1', false]})).toBe(false);
        });

        it('Should return iterable invalidity and go into val evaluation when at or above boundary', () => {
            const validator = new Validator({a: '[min:4]string'});
            expect(validator.check({a: ['1', false, false, '2']})).toBe(false);
            expect(validator.check({a: ['1', false, '2', '3', false]})).toBe(false);
        });
    });

    describe('check FN - lexer: iterable array:max+min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            expect(validator.check({a: ['hello', 'there', 'cool']})).toBe(true);
        });

        it('Should return valid when at top boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            expect(validator.check({a: ['1', '2', '3', '4', '5']})).toBe(true);
        });

        it('Should return invalid when above top boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            expect(validator.check({a: ['1', '2', '3', '4', '5', '6']})).toBe(false);
        });

        it('Should return valid when at bottom boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            expect(validator.check({a: ['1', '2']})).toBe(true);
        });

        it('Should return invalid when below bottom boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            expect(validator.check({a: ['1']})).toBe(false);
        });
    });

    describe('check FN - lexer: iterable object', () => {
        it('Should not throw if passed an iterable config during rule creation', () => {
            expect(() => new Validator({a: '{}string'})).not.toThrow();
        });

        it('Should return invalid when passing a non-object to an iterable', () => {
            const validator = new Validator({a: '{}string'});
            expect(validator.check({a: 'hello'})).toBe(false);
        });

        it('Should return valid when passing an empty object to an iterable', () => {
            const validator = new Validator({a: '{}string'});
            expect(validator.check({a: {}})).toBe(true);
        });

        it('Should allow validating an object', () => {
            const validator = new Validator({a: '{}string'});
            expect(validator.check({a: {b: 'hello', c: 'there'}})).toBe(true);
            expect(validator.check({a: {b: 'hello', c: false}})).toBe(false);
            expect(validator.check({a: {b: 'hello', c: false, d: true}})).toBe(false);
        });

        it('Should allow validating an object with a \'?\' sometimes flag', () => {
            const validator = new Validator({a: '?{}string'});
            expect(validator.check({a: {b: 'hello', c: 'there'}})).toBe(true);
            expect(validator.check({})).toBe(true);
            expect(validator.check({a: {b: 'hello', c: false, d: 'foo', e: true}})).toBe(false);
        });

        it('Should allow validating an object with a \'?\' sometimes flag and parameter pass', () => {
            const validator = new Validator({a: '?{}string|in:<genders>'});
            expect(validator.check({a: {b: 'male', c: 'male', d: 'female', e: 'male'}, genders: ['male', 'female', 'other']})).toBe(true);
            expect(validator.check({genders: ['male', 'female', 'other']})).toBe(true);
            expect(validator.check({a: {b: 'dog'}, genders: ['male', 'female', 'other']})).toBe(false);
        });

        it('Should allow validating an object with a \'?\' sometimes flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '?{unique}string|in:<genders>'});
            expect(validator.check({a: {b: 'male', c: 'male', d: 'female', e: 'male'}, genders: ['male', 'female', 'other']})).toBe(false);
            expect(validator.check({a: {b: 'male', c: 'female'}, genders: ['male', 'female', 'other']})).toBe(true);
        });

        it('Should allow validating an object with a \'!\' not flag and parameter pass', () => {
            const validator = new Validator({a: '{}string|!in:<genders>'});
            // eslint-disable-next-line max-len
            expect(validator.check({a: {b: 'bob', c: 'bob', d: 'john', e: 'bob', f: 'john'}, genders: ['male', 'female', 'other']})).toBe(true);
            expect(validator.check({a: {b: 'male', c: 'female', d: 'female'}, genders: ['male', 'female', 'other']})).toBe(false);
            expect(validator.check({a: {b: 'chicken', c: 'dog', d: 'female'}, genders: ['male', 'female', 'other']})).toBe(false);
        });

        it('Should allow validating an object with a \'!\' not flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '{unique}string|!in:<genders>'});
            expect(validator.check({a: {b: 'bob', c: 'john'}, genders: ['male', 'female', 'other']})).toBe(true);
            expect(validator.check({a: {b: 'male', c: 'female', d: 'female'}, genders: ['male', 'female', 'other']})).toBe(false);
            expect(validator.check({a: {b: 'chicken', c: 'dog', d: 'female'}, genders: ['male', 'female', 'other']})).toBe(false);
        });
    });

    describe('check FN - lexer: iterable object:unique', () => {
        it('Should return valid when array is unique', () => {
            const validator = new Validator({a: '{unique}string'});
            expect(validator.check({a: {b: 'a', c: 'b', d: 'c'}})).toBe(true);
        });

        it('Should return invalid when array is not unique', () => {
            const validator = new Validator({a: '{unique}string'});
            expect(validator.check({a: {b: 'a', c: 'b', d: 'a'}})).toBe(false);
        });

        it('Should return invalid when array is not unique when using numbers', () => {
            const validator = new Validator({a: '{unique}number'});
            expect(validator.check({a: {b: 1, c: 2, d: 2}})).toBe(false);
        });

        it('Should return invalid when array is not unique when using objects', () => {
            const validator = new Validator({a: '{unique}object'});
            expect(validator.check({a: {b: {a: 1}, c: {b: 2}, d: {b: 2}}})).toBe(false);
        });

        it('Should return invalid when array is not unique and doesnt match rules', () => {
            const validator = new Validator({a: '{unique}integer'});
            expect(validator.check({a: {b: 1, c: 2, d: 'a', e: 2}})).toBe(false);
        });

        it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
            const validator = new Validator({a: '{unique}integer'});
            expect(validator.check({a: {b: 1, c: 2, d: 'a', e: 2, f: 2, g: 2.2}})).toBe(false);
        });
    });

    describe('check FN - lexer: iterable object:max', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '{max:5}string'});
            expect(validator.check({a: {b: 'hello', c: 'there'}})).toBe(true);
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            expect(validator.check({a: {b: '1', c: '2', d: '3', e: '4', f: '5'}})).toBe(true);
        });

        it('Should return invalid when above boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            expect(validator.check({a: {b: '1', c: '2', d: '3', e: '4', f: '5', g: '6'}})).toBe(false);
        });

        it('Should only return iterable invalidity and not go into val evaluation when above boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            expect(validator.check({a: {b: '1', c: '2', d: '3', e: '4', f: 5, g: '6'}})).toBe(false);
        });

        it('Should return iterable invalidity and go into val evaluation when at or below boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            expect(validator.check({a: {b: '1', c: false, d: false, e: '2', f: false}})).toBe(false);
            expect(validator.check({a: {b: false, c: '1', d: '2', e: '3'}})).toBe(false);
        });
    });

    describe('check FN - lexer: iterable object:min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '{min:5}string'});
            expect(validator.check({a: {b: 'hello', c: 'there', d: 'this', e: 'is', f: 'cool', g: 'right'}})).toBe(true);
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '{min:5}string'});
            expect(validator.check({a: {b: 'hello', c: 'there', d: 'this', e: 'is', f: 'cool'}})).toBe(true);
        });

        it('Should return invalid when below boundary', () => {
            const validator = new Validator({a: '{min:3}string'});
            expect(validator.check({a: {b: '1', c: '2'}})).toBe(false);
        });

        it('Should only return iterable invalidity and not go into val evaluation when below boundary', () => {
            const validator = new Validator({a: '{min:4}string'});
            expect(validator.check({a: {b: '1', c: false}})).toBe(false);
        });

        it('Should return iterable invalidity and go into val evaluation when at or above boundary', () => {
            const validator = new Validator({a: '{min:4}string'});
            expect(validator.check({a: {b: '1', c: false, d: false, e: '2'}})).toBe(false);
            expect(validator.check({a: {b: '1', c: false, d: '2', e: '3', f: false}})).toBe(false);
        });
    });

    describe('check FN - lexer: iterable object:max+min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            expect(validator.check({a: {b: 'hello', c: 'there', d: 'cool'}})).toBe(true);
        });

        it('Should return valid when at top boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            expect(validator.check({a: {b: '1', c: '2', d: '3', e: '4', f: '5'}})).toBe(true);
        });

        it('Should return invalid when above top boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            expect(validator.check({a: {b: '1', c: '2', d: '3', e: '4', f: '5', g: '6'}})).toBe(false);
        });

        it('Should return valid when at bottom boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            expect(validator.check({a: {b: '1', c: '2'}})).toBe(true);
        });

        it('Should return invalid when below bottom boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            expect(validator.check({a: {b: '1'}})).toBe(false);
        });
    });

    describe('check FN - lexer: groups', () => {
        it('Should throw when passed a fully empty branch', () => {
            expect(() => new Validator({a: []})).toThrow();
        });

        it('Should return valid when one of both rules are valid', () => {
            const validator = new Validator({a: ['[max:5|min:2]string', 'false']});
            expect(validator.check({a: ['hello', 'there', 'cool']})).toBe(true);
            expect(validator.check({a: false})).toBe(true);
        });

        it('Should return valid when using rules with an underscore in them and one of them is valid', () => {
            expect(new Validator({a: ['string_ne|min:1|max:128', 'false']}).check({a: 'hello'})).toBe(true);
            expect(new Validator({a: ['string_ne|min:1|max:128', 'false']}).check({a: false})).toBe(true);
        });

        it('Should return valid when using rules with a dash in them and one of them is valid', () => {
            Validator.extend({'my-test-rule': val => val === true});
            expect(new Validator({a: ['my-test-rule', 'false']}).check({a: true})).toBe(true);
        });

        it('Should return valid when all rules are valid', () => {
            const validator = new Validator({a: ['[max:5|min:2]string', '[max:5|min:3]string_ne']});
            expect(validator.check({a: ['hello', 'there', 'cool']})).toBe(true);
        });

        it('Should return valid when no rules are valid but sometimes flag is set and its the only rule', () => {
            const validator = new Validator({a: ['?', 'guid', 'false']});
            expect(validator.check({})).toBe(true);
        });

        it('Should return valid when no rules are valid but sometimes flag is set and multiple fields but those are valid too', () => {
            const validator = new Validator({a: ['?', 'guid', 'false'], b: 'integer|between:10,50'});
            expect(validator.check({b: 42})).toBe(true);
        });

        it('Should return invalid when both rules are invalid and correctly set error messages as multi-dimensional array', () => {
            const validator = new Validator({a: ['guid', 'false']});
            expect(validator.check({a: 'foobar'})).toBe(false);
        });

        it('Should return invalid and correctly set error messages as multi-dimensional array with multiple rules to a group', () => {
            const validator = new Validator({a: ['integer|between:20,42', 'false']});
            expect(validator.check({a: 'foobar'})).toBe(false);
        });

        it('Should check correctly with parameterization', () => {
            const validator = new Validator({a: ['in:<nums>', '[unique|min:1|max:10]in:<meta.strings>']});
            expect(validator.check({a: 'foobar', nums: [1, 2, 3], meta: {strings: ['male', 'female', 'other', 'undecided']}})).toBe(false);
            expect(validator.check({a: 2, nums: [1, 2, 3], meta: {strings: ['male', 'female', 'other', 'undecided']}})).toBe(true);
            expect(validator.check({a: ['other'], nums: [1, 2, 3], meta: {strings: ['male', 'female', 'other', 'undecided']}})).toBe(true);
        });

        it('Should work with nested schemas', () => {
            const v = new Validator({
                a: ['?', {first_name: '?string_ne', last_name: 'string_ne'}, 'string_ne'],
                b: '?string_ne',
            });

            expect(v.check({b: 'hello'})).toBe(true);
            expect(v.check({})).toBe(true);
            expect(v.check({a: {first_name: 'Peter', last_name: 'V'}})).toBe(true);
            expect(v.check({a: {first_name: 'Peter'}})).toBe(false); // Last name is missing
            expect(v.check({a: {last_name: 'V'}})).toBe(true); // Good: First name is optional
            expect(v.check({a: 'Hello World'})).toBe(true);
        });

        it('Should work with nested schemas deep inside of an object', () => {
            const v = new Validator({
                user: ['?', {
                    details: ['?', {
                        security: ['?', {types: '?[unique|min:1|max:10]in:<securityTypes>'}],
                    }],
                }],
            });

            expect(v.check({})).toBe(true);
            expect(v.check({user: 'hello'})).toBe(false);
            expect(v.check({user: {}})).toBe(true);
            expect(v.check({user: {details: 'hello'}})).toBe(false);
            expect(v.check({user: {details: {}}})).toBe(true);
            expect(v.check({user: {details: {security: 'hello'}}})).toBe(false);
            expect(v.check({user: {details: {security: {}}}})).toBe(true);
            expect(v.check({user: {details: {security: {types: 'hello'}}}})).toBe(false);
            expect(v.check({user: {details: {security: {types: []}}}, securityTypes: ['credentials', 'otp', 'sso']})).toBe(false);
            expect(v.check({user: {details: {security: {types: ['otp']}}}, securityTypes: ['credentials', 'otp', 'sso']})).toBe(true);
            // eslint-disable-next-line max-len
            expect(v.check({user: {details: {security: {types: ['otp', 'sso']}}}, securityTypes: ['credentials', 'otp', 'sso']})).toBe(true);
            // eslint-disable-next-line max-len
            expect(v.check({user: {details: {security: {types: ['otp', 'credentials', 'sso', 'sso']}}}, securityTypes: ['credentials', 'otp', 'sso']})).toBe(false);
        });
    });

    describe('@check:FormData', () => {
        describe('FN', () => {
            it('Should return false when invalid', () => {
                const form = new FormData();
                form.append('a', '20');
                form.append('b', 'false');
                expect(new Validator({a: 'number', b: 'number'}).check(form)).toBe(false);
            });

            it('Should return true when valid', () => {
                const form = new FormData();
                form.append('a', '20');
                form.append('b', '42');
                expect(new Validator({a: 'number', b: 'number'}).check(form)).toBe(true);
            });
        });

        describe('FN - lexer: flag:sometimes (?)', () => {
            it('Should validate correctly if set and no value is passed', () => {
                expect(new Validator({a: '?number'}).check(new FormData())).toBe(true);
            });

            it('Should not interfere with other validation rules', () => {
                expect(new Validator({
                    a: '?number',
                    b: 'number|less_than:20',
                }).check(new FormData())).toBe(false);

                const form = new FormData();
                form.append('a', '20');
                form.append('b', 'false');
                expect(new Validator({
                    a: '?number',
                    b: 'number|less_than:20',
                }).check(form)).toBe(false);

                const form2 = new FormData();
                form2.append('b', '15');
                expect(new Validator({
                    a: '?number',
                    b: 'number|less_than:20',
                }).check(form2)).toBe(true);
            });
        });

        describe('FN - lexer: flag:parameter (<...>)', () => {
            it('Should allow link to passed parameter', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foo', 'hello');
                expect(new Validator({a: 'equal_to:<foo>'}).check(form)).toBe(true);
            });

            it('Should fail if parameter is not passed', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foobar', 'hello');
                expect(new Validator({a: 'equal_to:<foo>'}).check(form)).toBe(false);
            });

            it('Should allow multiple parameters inside the same ruleset', () => {
                const form = new FormData();
                form.append('a', '5');
                form.append('min', '3');
                form.append('max', '7');
                expect(new Validator({a: 'between:<min>,<max>'}).check(form)).toBe(true);
            });

            it('Should allow multiple parameters inside the same config', () => {
                const form = new FormData();
                form.append('a', '3');
                form.append('b', '2');
                form.append('arr1', '1');
                form.append('arr1', '3');
                form.append('arr1', '5');
                form.append('arr2', '2');
                form.append('arr2', '4');
                form.append('arr2', '6');
                expect(new Validator({a: 'in:<arr1>', b: 'in:<arr2>'}).check(form)).toBe(true);
            });

            it('Should allow the same parameter on multiple rules inside the same config', () => {
                const form = new FormData();
                form.append('a', '1');
                form.append('b', '2');
                form.append('arr1', '1');
                form.append('arr1', '2');
                form.append('arr1', '3');
                expect(new Validator({a: 'in:<arr1>', b: 'in:<arr1>'}).check(form)).toBe(true);
            });
        });

        describe('FN - lexer: flag:not (!)', () => {
            it('Should validate correct if set and no value is passed', () => {
                expect(new Validator({a: '!number'}).check(new FormData())).toBe(false);
            });

            it('Should validate correct if set and value is passed when using standard rule', () => {
                const form = new FormData();
                form.append('a', 'hello');
                expect(new Validator({a: '!number'}).check(form)).toBe(true);

                const form2 = new FormData();
                form2.append('a', '4');
                expect(new Validator({a: '!number'}).check(form2)).toBe(false);
                expect(new Validator({a: '!between:5,10'}).check(form2)).toBe(true);

                const form3 = new FormData();
                form3.append('a', '6');
                expect(new Validator({a: '!between:5,10'}).check(form3)).toBe(false);
            });

            it('Should validate correct if set and value is passed when using parameter flag', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foo', 'hello');
                expect(new Validator({a: '!equal_to:<foo>'}).check(form)).toBe(false);
            });

            it('Should validate correct if set and value is passed when using multiple validation rules', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foo', 'hello');
                expect(new Validator({a: '!string|!equal_to:<foo>'}).check(form)).toBe(false);

                const form2 = new FormData();
                form2.append('a', 'hello');
                form2.append('foo', 'foo');
                expect(new Validator({a: '!string|!equal_to:<foo>'}).check(form2)).toBe(false);
            });
        });

        describe('FN - lexer: iterable array', () => {
            it('Should throw when passed an invalid group', () => {
                expect(
                    () => new Validator({a: '[string'})
                ).toThrowError(/Iterable misconfiguration/);
            });

            it('Should return invalid when passing a non-array to an iterable', () => {
                const validator = new Validator({a: '[]string'});
                const form = new FormData();
                form.append('a', 'hello');
                expect(validator.check(form)).toBe(false);
            });

            it('Should allow validating an array of values', () => {
                const validator = new Validator({a: '[]string'});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                expect(validator.check(form)).toBe(true);

                const form2 = new FormData();
                form.append('a', 'hello');
                form.append('a', 'false');
                expect(validator.check(form2)).toBe(false);
            });

            it('Should allow validating an array of values with a \'?\' sometimes flag', () => {
                const validator = new Validator({a: '?[]string'});

                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                expect(validator.check(form)).toBe(true);
                expect(validator.check(new FormData())).toBe(true);
            });

            it('Should allow validating an array of values with a \'?\' sometimes flag and parameter pass', () => {
                const validator = new Validator({a: '?[]string|in:<genders>'});
                const form = new FormData();
                form.append('a', 'male');
                form.append('a', 'male');
                form.append('a', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.check(form)).toBe(true);

                const form2 = new FormData();
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                expect(validator.check(form2)).toBe(true);

                const form3 = new FormData();
                form3.append('a', 'dog');
                form3.append('a', 'male');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                expect(validator.check(form3)).toBe(false);
            });

            it('Should allow validating an array of values with a \'?\' sometimes flag, uniqueness and parameter pass', () => {
                const validator = new Validator({a: '?[unique]string|in:<genders>'});
                const form = new FormData();
                form.append('a', 'male');
                form.append('a', 'male');
                form.append('a', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.check(form)).toBe(false);

                const form2 = new FormData();
                form.append('a', 'male');
                form.append('a', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.check(form2)).toBe(true);
            });

            it('Should allow validating an array of values with a \'!\' not flag and parameter pass', () => {
                const validator = new Validator({a: '[]string|!in:<genders>'});

                const form = new FormData();
                form.append('a', 'bob');
                form.append('a', 'john');
                form.append('a', 'bob');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.check(form)).toBe(true);

                const form2 = new FormData();
                form2.append('a', 'male');
                form2.append('a', 'male');
                form2.append('a', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                expect(validator.check(form2)).toBe(false);

                const form3 = new FormData();
                form3.append('a', 'chicken');
                form3.append('a', 'dog');
                form3.append('a', 'female');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                expect(validator.check(form3)).toBe(false);
            });

            it('Should allow validating an array of values with a \'!\' not flag, uniqueness and parameter pass', () => {
                const validator = new Validator({a: '[unique]string|!in:<genders>'});
                const form = new FormData();
                form.append('a', 'bob');
                form.append('a', 'john');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.check(form)).toBe(true);

                const form2 = new FormData();
                form2.append('a', 'male');
                form2.append('a', 'female');
                form2.append('a', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                expect(validator.check(form2)).toBe(false);

                const form3 = new FormData();
                form3.append('a', 'chicken');
                form3.append('a', 'dog');
                form3.append('a', 'chicken');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                expect(validator.check(form3)).toBe(false);
            });
        });

        describe('FN - lexer: iterable array:unique', () => {
            it('Should return valid when array is unique', () => {
                const validator = new Validator({a: '[unique]string'});
                const form = new FormData();
                form.append('a[0]', 'a');
                form.append('a[1]', 'b');
                form.append('a[2]', 'c');
                expect(validator.check(form)).toBe(true);
            });

            it('Should return invalid when array is not unique', () => {
                const validator = new Validator({a: '[unique]string'});
                const form = new FormData();
                form.append('a[0]', 'a');
                form.append('a[1]', 'b');
                form.append('a[2]', 'a');
                expect(validator.check(form)).toBe(false);
            });

            it('Should return invalid when array is not unique when using numbers', () => {
                const validator = new Validator({a: '[unique]number'});
                const form = new FormData();
                form.append('a[0]', '1');
                form.append('a[1]', '2');
                form.append('a[2]', '2');
                expect(validator.check(form)).toBe(false);
            });

            it('Should return invalid when array is not unique when using objects', () => {
                const validator = new Validator({a: '[unique]object'});
                const form = new FormData();
                form.append('a[0].a', '1');
                form.append('a[1].b', '2');
                form.append('a[2].b', '2');
                expect(validator.check(form)).toBe(false);
            });

            it('Should return invalid when array is not unique and doesnt match rules', () => {
                const validator = new Validator({a: '[unique]integer'});
                const form = new FormData();
                form.append('a[0]', '1');
                form.append('a[1]', '2');
                form.append('a[2]', 'a');
                form.append('a[3]', '2');
                expect(validator.check(form)).toBe(false);
            });

            it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
                const validator = new Validator({a: '[unique]integer'});
                const form = new FormData();
                form.append('a[0]', '1');
                form.append('a[1]', '2');
                form.append('a[2]', 'a');
                form.append('a[3]', '2');
                form.append('a[4]', '2.2');
                expect(validator.check(form)).toBe(false);
            });
        });

        describe('FN - lexer: iterable array:max+min', () => {
            it('Should return valid when within boundaries', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                form.append('a', 'cool');
                expect(validator.check(form)).toBe(true);
            });

            it('Should return valid when at top boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                form.append('a', 'a2');
                form.append('a', 'a3');
                form.append('a', 'a4');
                form.append('a', 'a5');
                expect(validator.check(form)).toBe(true);
            });

            it('Should return invalid when above top boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                form.append('a', 'a2');
                form.append('a', 'a3');
                form.append('a', 'a4');
                form.append('a', 'a5');
                form.append('a', 'a6');
                expect(validator.check(form)).toBe(false);
            });

            it('Should return valid when at bottom boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                form.append('a', 'a2');
                expect(validator.check(form)).toBe(true);
            });

            it('Should return invalid when below bottom boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                expect(validator.check(form)).toBe(false);
            });
        });

        describe('FN - lexer: iterable object', () => {
            it('Should throw when passed an invalid group', () => {
                expect(
                    () => new Validator({a: '{string'})
                ).toThrowError(/Iterable misconfiguration/);
            });

            it('Should return invalid when passing a non-object to an iterable', () => {
                const validator = new Validator({a: '{}string'});
                const form = new FormData();
                form.append('a', 'hello');
                expect(validator.check(form)).toBe(false);
            });

            it('Should allow validating an object', () => {
                const validator = new Validator({a: '{}string'});
                const form = new FormData();
                form.append('a.b', 'hello');
                form.append('a.c', 'there');
                expect(validator.check(form)).toBe(true);

                const form2 = new FormData();
                form2.append('a.b', 'hello');
                form2.append('a.c', 'false');
                expect(validator.check(form2)).toBe(false);
            });

            it('Should allow validating an object with a \'?\' sometimes flag', () => {
                const validator = new Validator({a: '?{}string'});
                const form = new FormData();
                form.append('a.b', 'hello');
                form.append('a.c', 'there');
                expect(validator.check(form)).toBe(true);
                expect(validator.check(new FormData())).toBe(true);

                const form2 = new FormData();
                form2.append('a.b', 'hello');
                form2.append('a.c', 'false');
                expect(validator.check(form2)).toBe(false);
            });

            it('Should allow validating an object with a \'?\' sometimes flag and parameter pass', () => {
                const validator = new Validator({a: '?{}string|in:<genders>'});
                const form = new FormData();
                form.append('a.b', 'male');
                form.append('a.c', 'male');
                form.append('a.d', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.check(form)).toBe(true);

                const form2 = new FormData();
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                expect(validator.check(form2)).toBe(true);

                const form3 = new FormData();
                form3.append('a.b', 'dog');
                form3.append('a.c', 'male');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                expect(validator.check(form3)).toBe(false);
            });

            it('Should allow validating an object with a \'?\' sometimes flag, uniqueness and parameter pass', () => {
                const validator = new Validator({a: '?{unique}string|in:<genders>'});
                const form = new FormData();
                form.append('a.b', 'male');
                form.append('a.c', 'male');
                form.append('a.d', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.check(form)).toBe(false);

                const form2 = new FormData();
                form.append('a.b', 'male');
                form.append('a.c', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.check(form2)).toBe(true);
            });

            it('Should allow validating an object with a \'!\' not flag and parameter pass', () => {
                const validator = new Validator({a: '{}string|!in:<genders>'});
                const form = new FormData();
                form.append('a.b', 'bob');
                form.append('a.c', 'john');
                form.append('a.d', 'bob');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.check(form)).toBe(true);

                const form2 = new FormData();
                form2.append('a.b', 'male');
                form2.append('a.c', 'male');
                form2.append('a.d', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                expect(validator.check(form2)).toBe(false);

                const form3 = new FormData();
                form3.append('a.b', 'chicken');
                form3.append('a.c', 'dog');
                form3.append('a.d', 'female');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                expect(validator.check(form3)).toBe(false);
            });

            it('Should allow validating an object with a \'!\' not flag, uniqueness and parameter pass', () => {
                const validator = new Validator({a: '{unique}string|!in:<genders>'});
                const form = new FormData();
                form.append('a.b', 'bob');
                form.append('a.c', 'john');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.check(form)).toBe(true);

                const form2 = new FormData();
                form2.append('a.b', 'male');
                form2.append('a.c', 'female');
                form2.append('a.d', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                expect(validator.check(form2)).toBe(false);

                const form3 = new FormData();
                form3.append('a.b', 'chicken');
                form3.append('a.c', 'dog');
                form3.append('a.d', 'chicken');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                expect(validator.check(form3)).toBe(false);
            });
        });

        describe('FN - lexer: iterable object:unique', () => {
            it('Should return valid when array is unique', () => {
                const validator = new Validator({a: '{unique}string'});
                const form = new FormData();
                form.append('a.b', 'a');
                form.append('a.c', 'b');
                form.append('a.d', 'c');
                expect(validator.check(form)).toBe(true);
            });

            it('Should return invalid when array is not unique', () => {
                const validator = new Validator({a: '{unique}string'});
                const form = new FormData();
                form.append('a.b', 'a');
                form.append('a.c', 'b');
                form.append('a.d', 'a');
                expect(validator.check(form)).toBe(false);
            });

            it('Should return invalid when array is not unique when using numbers', () => {
                const validator = new Validator({a: '{unique}number'});
                const form = new FormData();
                form.append('a.b', '1');
                form.append('a.c', '2');
                form.append('a.d', '2');
                expect(validator.check(form)).toBe(false);
            });

            it('Should return invalid when array is not unique when using objects', () => {
                const validator = new Validator({a: '{unique}object'});
                const form = new FormData();
                form.append('a.b.a', '1');
                form.append('a.c.b', '2');
                form.append('a.d.a', '1');
                expect(validator.check(form)).toBe(false);
            });

            it('Should return invalid when array is not unique and doesnt match rules', () => {
                const validator = new Validator({a: '{unique}integer'});
                const form = new FormData();
                form.append('a.b', '1');
                form.append('a.c', '2');
                form.append('a.d', 'a');
                form.append('a.e', '2');
                expect(validator.check(form)).toBe(false);
            });

            it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
                const validator = new Validator({a: '{unique}integer'});
                const form = new FormData();
                form.append('a.b', '1');
                form.append('a.c', '2');
                form.append('a.d', 'a');
                form.append('a.e', '2');
                form.append('a.f', '2.2');
                expect(validator.check(form)).toBe(false);
            });
        });

        describe('FN - lexer: iterable object:max+min', () => {
            it('Should return valid when within boundaries', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'hello');
                form.append('a.c', 'there');
                form.append('a.d', 'cool');
                expect(validator.check(form)).toBe(true);
            });

            it('Should return valid when at top boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                form.append('a.c', 'a2');
                form.append('a.d', 'a3');
                form.append('a.e', 'a4');
                form.append('a.f', 'a5');
                expect(validator.check(form)).toBe(true);
            });

            it('Should return invalid when above top boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                form.append('a.c', 'a2');
                form.append('a.d', 'a3');
                form.append('a.e', 'a4');
                form.append('a.f', 'a5');
                form.append('a.g', 'a6');
                expect(validator.check(form)).toBe(false);
            });

            it('Should return valid when at bottom boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                form.append('a.c', 'a2');
                expect(validator.check(form)).toBe(true);
            });

            it('Should return invalid when below bottom boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                expect(validator.check(form)).toBe(false);
            });
        });

        describe('FN - lexer: groups', () => {
            it('Should return valid when one of both rules are valid', () => {
                const validator = new Validator({a: ['[max:5|min:2]string', 'false']});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                form.append('a', 'cool');
                expect(validator.check(form)).toBe(true);

                const form2 = new FormData();
                form2.append('a', 'false');
                expect(validator.check(form2)).toBe(true);
            });

            it('Should return valid when using rules with an underscore in them and one of them is valid', () => {
                const form = new FormData();
                form.append('a', 'hello');
                expect(new Validator({a: ['string_ne|min:1|max:128', 'false']}).check(form)).toBe(true);

                const form2 = new FormData();
                form2.append('a', 'false');
                expect(new Validator({a: ['string_ne|min:1|max:128', 'false']}).check(form2)).toBe(true);
            });

            it('Should return valid when using rules with a dash in them and one of them is valid', () => {
                Validator.extend({'my-test-rule': val => val === true});
                const form = new FormData();
                form.append('a', 'true');
                expect(new Validator({a: ['my-test-rule', 'false']}).check(form)).toBe(true);
            });

            it('Should return valid when all rules are valid', () => {
                const validator = new Validator({a: ['[max:5|min:2]string', '[max:5|min:3]string_ne']});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                form.append('a', 'cool');
                expect(validator.check(form)).toBe(true);
            });

            it('Should return valid when no rules are valid but sometimes flag is set and its the only rule', () => {
                const validator = new Validator({a: ['?', 'guid', 'false']});
                expect(validator.check(new FormData())).toBe(true);
            });

            it('Should return valid when no rules are valid but sometimes flag is set and multiple fields but those are valid too', () => {
                const validator = new Validator({a: ['?', 'guid', 'false'], b: 'integer|between:10,50'});
                const form = new FormData();
                form.append('b', '42');
                expect(validator.check(form)).toBe(true);
            });

            it('Should return invalid when both rules are invalid and correctly set error messages as multi-dimensional array', () => {
                const validator = new Validator({a: ['guid', 'false']});
                const form = new FormData();
                form.append('a', 'foobar');
                expect(validator.check(form)).toBe(false);
            });

            it('Should return invalid and correctly set error messages as multi-dimensional array with multiple rules to a group', () => {
                const validator = new Validator({a: ['integer|between:20,42', 'false']});
                const form = new FormData();
                form.append('a', 'foobar');
                expect(validator.check(form)).toBe(false);
            });
        });
    });

    describe('validate FN', () => {
        it('Should return a properly formatted evaluation object', () => {
            const evaluation = new Validator({a: 'number', b: 'number'}).validate({a: 20, b: false});

            //  Evaluate object
            expect(typeof evaluation).toBe('object');
            expect(Object.keys(evaluation)).toEqual(['is_valid', 'count', 'errors']);

            //  Evaluate object structure: is_valid
            expect(typeof evaluation.is_valid).toBe('boolean');

            //  Evaluate object structure: count
            expect(evaluation.count).toBe(1);

            //  Evaluate object structure: errors
            expect(evaluation.errors).toEqual({
                b: [{msg: 'number', params: []}],
            });
        });

        it('Should have errors where the object contains a msg and a params property', () => {
            const evaluation = new Validator({a: 'number'}).validate({a: 'hello'});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'number', params: []},
                    ],
                },
            });
        });

        it('Should have errors where the params object contains the passed param if passed', () => {
            const evaluation = new Validator({a: 'greater_than:150'}).validate({a: 100});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'greater_than', params: ['150']},
                    ],
                },
            });
        });

        it('Should validate to false with \'NO_DATA\' if no data was passed and rules were set up', () => {
            const validator = new Validator({a: 'string_ne'});
            //  @ts-ignore
            const evaluation = validator.validate();
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: 'NO_DATA'});
        });

        it('Should validate to false if data was passed but rule does not exist', () => {
            const validator = new Validator({a: 'bla'});
            const evaluation = validator.validate({a: 'hello'});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'rule_not_found', params: ['bla']}]}});
        });

        it('Should validate to false if data was passed but deep retrieval isnt working for rule', () => {
            const validator = new Validator({a: {b: {c: 'string_ne'}}});
            expect(validator.validate({a: 'hello'})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    'a.b.c': [{msg: 'not_found', params: []}],
                },
            });
        });
    });

    describe('validate FN - lexer: flag:sometimes (?)', () => {
        it('Should validate correctly if set and no value is passed', () => {
            const evaluation = new Validator({a: '?number'}).validate({});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should not interfere with other validation rules', () => {
            const evaluation = new Validator({
                a: '?number',
                b: 'number|less_than:20',
            }).validate({});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    b: [{msg: 'not_found', params: []}],
                },
            });

            const evaluation2 = new Validator({
                a: '?number',
                b: 'number|less_than:20',
            }).validate({a: 20, b: false});
            expect(evaluation2).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    b: [
                        {msg: 'number', params: []},
                        {msg: 'less_than', params: ['20']},
                    ],
                },
            });
        });
    });

    describe('validate FN - lexer: flag:parameter (<...>)', () => {
        it('Should allow link to passed parameter', () => {
            const evaluation = new Validator({a: 'equal_to:<foo>'}).validate({a: 'hello', foo: 'hello'});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should fail if parameter is not passed', () => {
            const evaluation = new Validator({a: 'equal_to:<foo>'}).validate({a: 'hello', foobar: 'hello'});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'equal_to', params: [undefined]}],
                },
            });
        });

        it('Should allow multiple parameters inside the same ruleset', () => {
            const evaluation = new Validator({a: 'between:<min>,<max>'}).validate({a: 5, min: 3, max: 7});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should allow multiple parameters inside the same config', () => {
            const evaluation = new Validator({a: 'in:<arr1>', b: 'in:<arr2>'}).validate({a: 1, b: 2, arr1: [1, 3, 5], arr2: [2, 4, 6]});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should allow the same parameter on multiple rules inside the same config', () => {
            const evaluation = new Validator({a: 'in:<arr1>', b: 'in:<arr1>'}).validate({a: 1, b: 2, arr1: [1, 2, 3]});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('validate FN - lexer: flag:not (!)', () => {
        it('Should validate correct if set and no value is passed', () => {
            const evaluation = new Validator({a: '!number'}).validate({});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'not_found', params: []}],
                },
            });
        });

        it('Should validate correct if set and value is passed when using standard rule', () => {
            const evaluation = new Validator({a: '!number'}).validate({a: 'hello'});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});

            const evaluation2 = new Validator({a: '!number'}).validate({a: 4});
            expect(evaluation2).toEqual({
                is_valid:  false,
                count: 1,
                errors: {
                    a: [{msg: 'not_number', params: []}],
                },
            });

            const evaluation3 = new Validator({a: '!between:5,10'}).validate({a: 4});
            expect(evaluation3).toEqual({is_valid: true, count: 0, errors: {}});

            const evaluation4 = new Validator({a: '!between:5,10'}).validate({a: 6});
            expect(evaluation4).toEqual({
                is_valid:  false,
                count: 1,
                errors: {
                    a: [{msg: 'not_between', params: ['5', '10']}],
                },
            });
        });

        it('Should validate correct if set and value is passed when using parameter flag', () => {
            const evaluation = new Validator({a: '!equal_to:<foo>'}).validate({a: 'hello', foo: 'hello'});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'not_equal_to', params: ['hello']}],
                },
            });
        });

        it('Should validate correct if set and value is passed when using multiple validation rules', () => {
            const evaluation = new Validator({a: '!string|!equal_to:<foo>'}).validate({a: 'foo', foo: 'hello'});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'not_string', params: []}],
                },
            });

            const evaluation2 = new Validator({a: '!string|!equal_to:<foo>'}).validate({a: 'foo', foo: 'foo'});
            expect(evaluation2).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'not_string', params: []},
                        {msg: 'not_equal_to', params: ['foo']},
                    ],
                },
            });
        });
    });

    describe('validate FN - lexer: iterable array', () => {
        it('Should not throw if passed an iterable config during rule creation', () => {
            expect(() => new Validator({a: '[]string'})).not.toThrow();
        });

        it('Should return invalid when passing a non-array to an iterable', () => {
            const validator = new Validator({a: '[]string'});
            const evaluation = validator.validate({a: 'hello'});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable', params: []},
                    ],
                },
            });
        });

        it('Should return valid when passing an empty array to an iterable', () => {
            const validator = new Validator({a: '[]string'});
            const evaluation = validator.validate({a: []});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should allow validating an array of values', () => {
            const validator = new Validator({a: '[]string'});
            let evaluation = validator.validate({a: ['hello', 'there']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({a: ['hello', false]});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'string', idx: 1, params: []},
                    ],
                },
            });

            evaluation = validator.validate({a: ['hello', false, true]});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'string', idx: 1, params: []},
                        {msg: 'string', idx: 2, params: []},
                    ],
                },
            });
        });

        it('Should allow validating an array of values with a \'?\' sometimes flag', () => {
            const validator = new Validator({a: '?[]string'});
            let evaluation = validator.validate({a: ['hello', 'there']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({a: ['hello', false, 'foo', true]});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'string', idx: 1, params: []},
                        {msg: 'string', idx: 3, params: []},
                    ],
                },
            });
        });

        it('Should allow validating an array of values with a \'?\' sometimes flag and parameter pass', () => {
            const validator = new Validator({a: '?[]string|in:<genders>'});
            let evaluation = validator.validate({a: ['male', 'male', 'female', 'male', 'female'], genders: ['male', 'female', 'other']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({genders: ['male', 'female', 'other']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({a: ['dog'], genders: ['male', 'female', 'other']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'in', idx: 0, params: [['male', 'female', 'other']]},
                    ],
                },
            });
        });

        it('Should allow validating an array of values with a \'?\' sometimes flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '?[unique]string|in:<genders>'});
            let evaluation = validator.validate({a: ['male', 'male', 'female', 'male', 'female'], genders: ['male', 'female', 'other']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_unique', params: []},
                    ],
                },
            });

            evaluation = validator.validate({a: ['male', 'female'], genders: ['male', 'female', 'other']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should allow validating an array of values with a \'!\' not flag and parameter pass', () => {
            const validator = new Validator({a: '[]string|!in:<genders>'});
            let evaluation = validator.validate({a: ['bob', 'bob', 'john', 'bob', 'john'], genders: ['male', 'female', 'other']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({a: ['male', 'female', 'female'], genders: ['male', 'female', 'other']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {idx: 0, msg: 'not_in', params: [['male', 'female', 'other']]},
                        {idx: 1, msg: 'not_in', params: [['male', 'female', 'other']]},
                        {idx: 2, msg: 'not_in', params: [['male', 'female', 'other']]},
                    ],
                },
            });

            evaluation = validator.validate({a: ['chicken', 'dog', 'female'], genders: ['male', 'female', 'other']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {idx: 2, msg: 'not_in', params: [['male', 'female', 'other']]},
                    ],
                },
            });
        });

        it('Should allow validating an array of values with a \'!\' not flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '[unique]string|!in:<genders>'});
            let evaluation = validator.validate({a: ['bob', 'john'], genders: ['male', 'female', 'other']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({a: ['male', 'female', 'female'], genders: ['male', 'female', 'other']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_unique', params: []},
                        {idx: 0, msg: 'not_in', params: [['male', 'female', 'other']]},
                        {idx: 1, msg: 'not_in', params: [['male', 'female', 'other']]},
                        {idx: 2, msg: 'not_in', params: [['male', 'female', 'other']]},
                    ],
                },
            });

            evaluation = validator.validate({a: ['chicken', 'dog', 'female', 'dog'], genders: ['male', 'female', 'other']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_unique', params: []},
                        {idx: 2, msg: 'not_in', params: [['male', 'female', 'other']]},
                    ],
                },
            });
        });
    });

    describe('validate FN - lexer: iterable array:unique', () => {
        it('Should return valid when array is unique', () => {
            const validator = new Validator({a: '[unique]string'});
            const evaluation = validator.validate({a: ['a', 'b', 'c']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return invalid when array is not unique', () => {
            const validator = new Validator({a: '[unique]string'});
            const evaluation = validator.validate({a: ['a', 'b', 'a']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_unique', params: []},
                    ],
                },
            });
        });

        it('Should return invalid when array is not unique when using numbers', () => {
            const validator = new Validator({a: '[unique]number'});
            const evaluation = validator.validate({a: [1, 2, 2]});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_unique', params: []},
                    ],
                },
            });
        });

        it('Should return invalid when array is not unique when using objects', () => {
            const validator = new Validator({a: '[unique]object'});
            const evaluation = validator.validate({a: [{a: 1}, {b: 2}, {b: 2}]});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_unique', params: []},
                    ],
                },
            });
        });

        it('Should return invalid when array is not unique and doesnt match rules', () => {
            const validator = new Validator({a: '[unique]integer'});
            const evaluation = validator.validate({a: [1, 2, 'a', 2]});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_unique', params: []},
                        {idx: 2, msg: 'integer', params: []},
                    ],
                },
            });
        });

        it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
            const validator = new Validator({a: '[unique]integer'});
            const evaluation = validator.validate({a: [1, 2, 'a', 2, 2, 2.2]});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_unique', params: []},
                        {idx: 2, msg: 'integer', params: []},
                        {idx: 5, msg: 'integer', params: []},
                    ],
                },
            });
        });
    });

    describe('validate FN - lexer: iterable array:max', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[max:5]string'});
            const evaluation = validator.validate({a: ['hello', 'there']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', '5']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return invalid when above boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', '5', '6']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_max', params: [5]},
                    ],
                },
            });
        });

        it('Should only return iterable invalidity and not go into val evaluation when above boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', 5, '6']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_max', params: [5]},
                    ],
                },
            });
        });

        it('Should return iterable invalidity and go into val evaluation when at or below boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            const evaluation = validator.validate({a: ['1', false, false, '2', false]});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {idx: 1, msg: 'string', params: []},
                        {idx: 2, msg: 'string', params: []},
                        {idx: 4, msg: 'string', params: []},
                    ],
                },
            });

            const evaluation2 = validator.validate({a: [false, '1', '2', '3']});
            expect(evaluation2).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {idx: 0, msg: 'string', params: []},
                    ],
                },
            });
        });
    });

    describe('validate FN - lexer: iterable array:min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[min:5]string'});
            const evaluation = validator.validate({a: ['hello', 'there', 'this', 'is', 'cool', 'right']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '[min:5]string'});
            const evaluation = validator.validate({a: ['hello', 'there', 'this', 'is', 'cool']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return invalid when below boundary', () => {
            const validator = new Validator({a: '[min:3]string'});
            const evaluation = validator.validate({a: ['1', '2']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_min', params: [3]},
                    ],
                },
            });
        });

        it('Should only return iterable invalidity and not go into val evaluation when below boundary', () => {
            const validator = new Validator({a: '[min:4]string'});
            const evaluation = validator.validate({a: ['1', false]});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_min', params: [4]},
                    ],
                },
            });
        });

        it('Should return iterable invalidity and go into val evaluation when at or above boundary', () => {
            const validator = new Validator({a: '[min:4]string'});
            const evaluation = validator.validate({a: ['1', false, false, '2']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {idx: 1, msg: 'string', params: []},
                        {idx: 2, msg: 'string', params: []},
                    ],
                },
            });

            const evaluation2 = validator.validate({a: ['1', false, '2', '3', false]});
            expect(evaluation2).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {idx: 1, msg: 'string', params: []},
                        {idx: 4, msg: 'string', params: []},
                    ],
                },
            });
        });
    });

    describe('validate FN - lexer: iterable array:max+min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['hello', 'there', 'cool']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return valid when at top boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', '5']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return invalid when above top boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', '5', '6']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_max', params: [5]},
                    ],
                },
            });
        });

        it('Should return valid when at bottom boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1', '2']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return invalid when below bottom boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_min', params: [2]},
                    ],
                },
            });
        });

        it('Should only return iterable invalidity and not go into val evaluation when above boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', 5, '6']});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_max', params: [5]},
                    ],
                },
            });
        });

        it('Should only return iterable invalidity and not go into val evaluation when below boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: [5]});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_min', params: [2]},
                    ],
                },
            });
        });

        it('Should return iterable invalidity and go into val evaluation when at or below boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1', false, false, '2', false]});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {idx: 1, msg: 'string', params: []},
                        {idx: 2, msg: 'string', params: []},
                        {idx: 4, msg: 'string', params: []},
                    ],
                },
            });

            const evaluation2 = validator.validate({a: [false, '1', '2', '3']});
            expect(evaluation2).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {idx: 0, msg: 'string', params: []},
                    ],
                },
            });

            const evaluation3 = validator.validate({a: ['1', 4]});
            expect(evaluation3).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {idx: 1, msg: 'string', params: []},
                    ],
                },
            });
        });
    });

    describe('validate FN - lexer: iterable object', () => {
        it('Should not throw if passed an iterable config during rule creation', () => {
            expect(() => new Validator({a: '{}string'})).not.toThrow();
        });

        it('Should return invalid when passing a non-object to an iterable', () => {
            const validator = new Validator({a: '{}string'});
            expect(validator.validate({a: 'hello'}).is_valid).toBe(false);
        });

        it('Should return valid when passing an empty object to an iterable', () => {
            const validator = new Validator({a: '{}string'});
            expect(validator.validate({a: {}}).is_valid).toBe(true);
        });

        it('Should allow validating an object', () => {
            const validator = new Validator({a: '{}string'});
            expect(validator.validate({a: {b: 'hello', c: 'there'}}).is_valid).toBe(true);
            expect(validator.validate({a: {b: 'hello', c: false}}).is_valid).toBe(false);
            expect(validator.validate({a: {b: 'hello', c: false, d: true}}).is_valid).toBe(false);
        });

        it('Should allow validating an object with a \'?\' sometimes flag', () => {
            const validator = new Validator({a: '?{}string'});
            expect(validator.validate({a: {b: 'hello', c: 'there'}}).is_valid).toBe(true);
            expect(validator.validate({}).is_valid).toBe(true);
            expect(validator.validate({a: {b: 'hello', c: false, d: 'foo', e: true}}).is_valid).toBe(false);
        });

        it('Should allow validating an object with a \'?\' sometimes flag and parameter pass', () => {
            const validator = new Validator({a: '?{}string|in:<genders>'});
            expect(validator.validate({a: {b: 'male',  d: 'female', e: 'male'}, genders: ['male', 'female', 'other']}).is_valid).toBe(true);
            expect(validator.validate({genders: ['male', 'female', 'other']}).is_valid).toBe(true);
            expect(validator.validate({a: {b: 'dog'}, genders: ['male', 'female', 'other']}).is_valid).toBe(false);
        });

        it('Should allow validating an object with a \'?\' sometimes flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '?{unique}string|in:<genders>'});
            expect(validator.validate({a: {b: 'male', c: 'male'}, genders: ['male', 'female', 'other']}).is_valid).toBe(false);
            expect(validator.validate({a: {b: 'male', c: 'female'}, genders: ['male', 'female', 'other']}).is_valid).toBe(true);
        });

        it('Should allow validating an object with a \'!\' not flag and parameter pass', () => {
            const validator = new Validator({a: '{}string|!in:<genders>'});
            // eslint-disable-next-line max-len
            expect(validator.validate({a: {b: 'bob', d: 'john', e: 'bob', f: 'john'}, genders: ['male', 'female', 'other']}).is_valid).toBe(true);
            expect(validator.validate({a: {b: 'male', d: 'female'}, genders: ['male', 'female', 'other']}).is_valid).toBe(false);
            expect(validator.validate({a: {b: 'chicken', d: 'female'}, genders: ['male', 'female', 'other']}).is_valid).toBe(false);
        });

        it('Should allow validating an object with a \'!\' not flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '{unique}string|!in:<genders>'});
            expect(validator.validate({a: {b: 'bob', c: 'john'}, genders: ['male', 'female', 'other']}).is_valid).toBe(true);
            // eslint-disable-next-line max-len
            expect(validator.validate({a: {b: 'male', c: 'female', d: 'female'}, genders: ['male', 'female', 'other']}).is_valid).toBe(false);
            // eslint-disable-next-line max-len
            expect(validator.validate({a: {b: 'chicken', c: 'dog', d: 'female'}, genders: ['male', 'female', 'other']}).is_valid).toBe(false);
        });
    });

    describe('validate FN - lexer: iterable object:unique', () => {
        it('Should return valid when array is unique', () => {
            const validator = new Validator({a: '{unique}string'});
            expect(validator.validate({a: {b: 'a', c: 'b', d: 'c'}}).is_valid).toBe(true);
        });

        it('Should return invalid when array is not unique', () => {
            const validator = new Validator({a: '{unique}string'});
            expect(validator.validate({a: {b: 'a', c: 'b', d: 'a'}}).is_valid).toBe(false);
        });

        it('Should return invalid when array is not unique when using numbers', () => {
            const validator = new Validator({a: '{unique}number'});
            expect(validator.validate({a: {b: 1, c: 2, d: 2}}).is_valid).toBe(false);
        });

        it('Should return invalid when array is not unique when using objects', () => {
            const validator = new Validator({a: '{unique}object'});
            expect(validator.validate({a: {b: {a: 1}, c: {b: 2}, d: {b: 2}}}).is_valid).toBe(false);
        });

        it('Should return invalid when array is not unique and doesnt match rules', () => {
            const validator = new Validator({a: '{unique}integer'});
            expect(validator.validate({a: {b: 1, c: 2, d: 'a', e: 2}}).is_valid).toBe(false);
        });

        it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
            const validator = new Validator({a: '{unique}integer'});
            expect(validator.validate({a: {b: 1, c: 2, d: 'a', e: 2, f: 2, g: 2.2}}).is_valid).toBe(false);
        });
    });

    describe('validate FN - lexer: iterable object:max', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '{max:5}string'});
            expect(validator.validate({a: {b: 'hello', c: 'there'}}).is_valid).toBe(true);
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            expect(validator.validate({a: {b: '1', c: '2', d: '3', e: '4', f: '5'}}).is_valid).toBe(true);
        });

        it('Should return invalid when above boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            expect(validator.validate({a: {b: '1', c: '2', d: '3', e: '4', f: '5', g: '6'}}).is_valid).toBe(false);
        });

        it('Should only return iterable invalidity and not go into val evaluation when above boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            expect(validator.validate({a: {b: '1', c: '2', d: '3', e: '4', f: 5, g: '6'}}).is_valid).toBe(false);
        });

        it('Should return iterable invalidity and go into val evaluation when at or below boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            expect(validator.validate({a: {b: '1', c: false, d: false, e: '2', f: false}}).is_valid).toBe(false);
            expect(validator.validate({a: {b: false, c: '1', d: '2', e: '3'}}).is_valid).toBe(false);
        });
    });

    describe('validate FN - lexer: iterable object:min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '{min:5}string'});
            expect(validator.validate({a: {b: 'hello', c: 'there', d: 'this', e: 'is', f: 'cool', g: 'right'}}).is_valid).toBe(true);
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '{min:5}string'});
            expect(validator.validate({a: {b: 'hello', c: 'there', d: 'this', e: 'is', f: 'cool'}}).is_valid).toBe(true);
        });

        it('Should return invalid when below boundary', () => {
            const validator = new Validator({a: '{min:3}string'});
            expect(validator.validate({a: {b: '1', c: '2'}}).is_valid).toBe(false);
        });

        it('Should only return iterable invalidity and not go into val evaluation when below boundary', () => {
            const validator = new Validator({a: '{min:4}string'});
            expect(validator.validate({a: {b: '1', c: false}}).is_valid).toBe(false);
        });

        it('Should return iterable invalidity and go into val evaluation when at or above boundary', () => {
            const validator = new Validator({a: '{min:4}string'});
            expect(validator.validate({a: {b: '1', c: false, d: false, e: '2'}}).is_valid).toBe(false);
            expect(validator.validate({a: {b: '1', c: false, d: '2', e: '3', f: false}}).is_valid).toBe(false);
        });
    });

    describe('validate FN - lexer: iterable object:max+min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            expect(validator.validate({a: {b: 'hello', c: 'there', d: 'cool'}}).is_valid).toBe(true);
        });

        it('Should return valid when at top boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            expect(validator.validate({a: {b: '1', c: '2', d: '3', e: '4', f: '5'}}).is_valid).toBe(true);
        });

        it('Should return invalid when above top boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            expect(validator.validate({a: {b: '1', c: '2', d: '3', e: '4', f: '5', g: '6'}}).is_valid).toBe(false);
        });

        it('Should return valid when at bottom boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            expect(validator.validate({a: {b: '1', c: '2'}}).is_valid).toBe(true);
        });

        it('Should return invalid when below bottom boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            expect(validator.validate({a: {b: '1'}}).is_valid).toBe(false);
        });
    });

    describe('validate FN - lexer: groups', () => {
        it('Should return valid when one of both rules are valid', () => {
            const validator = new Validator({a: ['[max:5|min:2]string', 'false']});
            expect(validator.validate({a: ['hello', 'there', 'cool']})).toEqual({is_valid: true, count: 0, errors: {}});
            expect(validator.validate({a: false})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return valid when using rules with an underscore in them and one of them is valid', () => {
            expect(new Validator({
                a: ['string_ne|min:1|max:128', 'false'],
            }).validate({a: 'hello'})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return valid when using rules with a dash in them and one of them is valid', () => {
            Validator.extend({'my-test-rule': val => val === true});
            expect(new Validator({
                a: ['my-test-rule', 'false'],
            }).validate({a: true})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return valid when all rules are valid', () => {
            const validator = new Validator({a: ['[max:5|min:2]string', '[max:5|min:3]string_ne']});
            expect(validator.validate({a: ['hello', 'there', 'cool']})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return valid when no rules are valid but sometimes flag is set and its the only rule', () => {
            const validator = new Validator({a: ['?', 'guid', 'false']});
            expect(validator.validate({})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return valid when no rules are valid but sometimes flag is set and multiple fields but those are valid too', () => {
            const validator = new Validator({a: ['?', 'guid', 'false'], b: 'integer|between:10,50'});
            expect(validator.validate({b: 42})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should return invalid when both rules are invalid and correctly set error messages as multi-dimensional array', () => {
            const validator = new Validator({a: ['guid', 'false']});
            expect(validator.validate({a: 'foobar'})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        [{msg: 'guid', params: []}],
                        [{msg: 'false', params: []}],
                    ],
                },
            });
        });

        it('Should return invalid and correctly set error messages as multi-dimensional array with multiple rules to a group', () => {
            const validator = new Validator({a: ['integer|between:20,42', 'false']});
            expect(validator.validate({a: 'foobar'})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        [
                            {msg: 'integer', params: []},
                            {msg: 'between', params: ['20', '42']},
                        ],
                        [
                            {msg: 'false', params: []},
                        ],
                    ],
                },
            });
        });

        it('Should validate correctly with parameterization', () => {
            const validator = new Validator({a: ['in:<nums>', '[unique|min:1|max:10]in:<meta.strings>']});
            expect(
                validator.validate({a: 'foobar', nums: [1, 2, 3], meta: {strings: ['male', 'female', 'other', 'undecided']}})
            ).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        [
                            {msg: 'in', params: [[1,2,3]]},
                        ],
                        [
                            {msg: 'iterable', params: []},
                        ],
                    ],
                },
            });
            expect(
                validator.validate({a: 2, nums: [1, 2, 3], meta: {strings: ['male', 'female', 'other', 'undecided']}})
            ).toEqual({is_valid: true, count: 0, errors: {}});

            expect(
                validator.validate({a: ['other'], nums: [1, 2, 3], meta: {strings: ['male', 'female', 'other', 'undecided']}})
            ).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should work with nested schemas', () => {
            const v = new Validator({
                a: ['?', {first_name: '?string_ne', last_name: 'string_ne'}, 'string_ne'],
                b: '?string_ne',
            });

            expect(v.validate({b: 'hello'})).toEqual({is_valid: true, count: 0, errors: {}});
            expect(v.validate({})).toEqual({is_valid: true, count: 0, errors: {}});
            expect(v.validate({a: {first_name: 'Peter', last_name: 'V'}})).toEqual({is_valid: true, count: 0, errors: {}});
            expect(v.validate({a: {first_name: 'Peter'}})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    'a.last_name': [
                        {msg: 'not_found', params: []},
                    ],
                },
            });
            expect(v.validate({a: {last_name: 'V'}})).toEqual({is_valid: true, count: 0, errors: {}});
            expect(v.validate({a: 'Hello World'})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should work with nested schemas deep inside of an object', () => {
            const v = new Validator({
                user: ['?', {
                    details: ['?', {
                        security: ['?', {types: '?[unique|min:1|max:10]in:<securityTypes>'}],
                    }],
                }],
            });

            expect(v.validate({})).toEqual({is_valid: true, count: 0, errors: {}});
            expect(v.validate({user: 'hello'})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    user: [
                        {msg: 'not_object', params: []},
                    ],
                },
            });
            expect(v.validate({user: {}})).toEqual({
                is_valid: true,
                count: 0,
                errors: {},
            });
            expect(v.validate({
                user: {
                    details: 'hello',
                },
            })).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    'user.details': [
                        {msg: 'not_object', params: []},
                    ],
                },
            });
            expect(v.validate({
                user: {
                    details: {},
                },
            })).toEqual({
                is_valid: true,
                count: 0,
                errors: {},
            });
            expect(v.validate({
                user: {
                    details: {
                        security: 'hello',
                    },
                },
            })).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    'user.details.security': [
                        {msg: 'not_object', params: []},
                    ],
                },
            });
            expect(v.validate({
                user: {
                    details: {
                        security: {},
                    },
                },
            })).toEqual({
                is_valid: true,
                count: 0,
                errors: {},
            });
            expect(v.validate({
                user: {
                    details: {
                        security: {
                            types: 'hello',
                        },
                    },
                },
            })).toEqual({
                count: 1,
                errors: {
                    'user.details.security.types': [
                        {msg: 'iterable', params: []},
                    ],
                },
                is_valid: false,
            });
            expect(v.validate({
                user: {
                    details: {
                        security: {
                            types: [],
                        },
                    },
                },
                securityTypes: ['credentials', 'otp', 'sso'],
            })).toEqual({
                count: 1,
                errors: {
                    'user.details.security.types': [
                        {msg: 'iterable_min', params: [1]},
                    ],
                },
                is_valid: false,
            });
            expect(v.validate({
                user: {
                    details: {
                        security: {
                            types: ['otp'],
                        },
                    },
                },
                securityTypes: ['credentials', 'otp', 'sso'],
            })).toEqual({
                is_valid: true,
                errors: {},
                count: 0,
            });
            expect(v.validate({
                user: {
                    details: {
                        security: {
                            types: ['otp', 'sso'],
                        },
                    },
                },
                securityTypes: ['credentials', 'otp', 'sso'],
            })).toEqual({
                is_valid: true,
                errors: {},
                count: 0,
            });
            expect(v.validate({
                user: {
                    details: {
                        security: {
                            types: ['otp', 'credentials', 'sso', 'sso'],
                        },
                    },
                },
                securityTypes: ['credentials', 'otp', 'sso'],
            })).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    'user.details.security.types': [
                        {msg: 'iterable_unique', params: []},
                    ],
                },
            });
        });

        it('Should work with nested schemas deep inside of an object as well as other behaviors', () => {
            const v = new Validator({
                user: ['?', {
                    details: ['?', {
                        security: ['?', {types: '?[unique|min:1|max:10]in:<securityTypes>'}],
                    }],
                }],
                settings: ['?', {
                    isActive: 'boolean',
                    isEnabled: 'boolean',
                }],
                email: 'email',
                phone: 'phone',
            });

            expect(v.validate({
                user: {},
                settings: {},
                email: 'contact@valkyriestudios.be',
            })).toEqual({
                count: 3,
                is_valid: false,
                errors: {
                    'settings.isActive': [
                        {msg: 'not_found', params: []},
                    ],
                    'settings.isEnabled': [
                        {msg: 'not_found', params: []},
                    ],
                    phone: [
                        {msg: 'not_found', params: []},
                    ],
                },
            });

            expect(v.validate({
                user: {},
                settings: {isEnabled: true},
                email: 'contact@valkyriestudios.be',
            })).toEqual({
                count: 2,
                is_valid: false,
                errors: {
                    'settings.isActive': [
                        {msg: 'not_found', params: []},
                    ],
                    phone: [
                        {msg: 'not_found', params: []},
                    ],
                },
            });

            expect(v.validate({
                user: {
                    details: {
                        security: {},
                    },
                },
                settings: {isEnabled: true},
                email: 'contact@valkyriestudios.be',
            })).toEqual({
                count: 2,
                is_valid: false,
                errors: {
                    'settings.isActive': [
                        {msg: 'not_found', params: []},
                    ],
                    phone: [
                        {msg: 'not_found', params: []},
                    ],
                },
            });

            expect(v.validate({
                user: {
                    details: {
                        security: {
                            types: ['sso', 'creds', 'sos'],
                        },
                    },
                },
                settings: {isEnabled: true},
                email: 'contact@valkyriestudios.be',
                securityTypes: ['oss', 'creds'],
            })).toEqual({
                count: 3,
                is_valid: false,
                errors: {
                    'user.details.security.types': [
                        {
                            idx: 0,
                            msg: 'in',
                            params: [['oss', 'creds']],
                        },
                        {
                            idx: 2,
                            msg: 'in',
                            params: [['oss', 'creds']],
                        },
                    ],
                    'settings.isActive': [
                        {msg: 'not_found', params: []},
                    ],
                    phone: [
                        {msg: 'not_found', params: []},
                    ],
                },
            });

            expect(v.validate({
                user: {
                    details: {
                        security: {
                            types: ['sso', 'creds', 'sos'],
                        },
                    },
                },
                settings: {isEnabled: true, isActive: 'hello'},
                email: 'contact@valkyriestudios.be',
                securityTypes: ['oss', 'creds'],
            })).toEqual({
                count: 3,
                is_valid: false,
                errors: {
                    'user.details.security.types': [
                        {
                            idx: 0,
                            msg: 'in',
                            params: [['oss', 'creds']],
                        },
                        {
                            idx: 2,
                            msg: 'in',
                            params: [['oss', 'creds']],
                        },
                    ],
                    'settings.isActive': [
                        {msg: 'boolean', params: []},
                    ],
                    phone: [
                        {msg: 'not_found', params: []},
                    ],
                },
            });

            expect(v.validate({
                user: {
                    details: {
                        security: {
                            types: ['sso', 'creds', 'sos'],
                        },
                    },
                },
                settings: {isEnabled: true, isActive: false},
                email: 'contact@valkyriestudios.be',
                phone: 'yello',
                securityTypes: ['oss', 'creds'],
            })).toEqual({
                count: 2,
                is_valid: false,
                errors: {
                    'user.details.security.types': [
                        {
                            idx: 0,
                            msg: 'in',
                            params: [['oss', 'creds']],
                        },
                        {
                            idx: 2,
                            msg: 'in',
                            params: [['oss', 'creds']],
                        },
                    ],
                    phone: [
                        {msg: 'phone', params: []},
                    ],
                },
            });

            expect(v.validate({
                user: {
                    details: {
                        security: {
                            types: ['sso', 'creds', 'sos'],
                        },
                    },
                },
                settings: {isEnabled: true, isActive: false},
                email: 'contact@valkyriestudios.be',
                phone: '0123456789',
                securityTypes: ['oss', 'creds'],
            })).toEqual({
                count: 1,
                is_valid: false,
                errors: {
                    'user.details.security.types': [
                        {
                            idx: 0,
                            msg: 'in',
                            params: [['oss', 'creds']],
                        },
                        {
                            idx: 2,
                            msg: 'in',
                            params: [['oss', 'creds']],
                        },
                    ],
                },
            });

            expect(v.validate({
                user: {
                    details: {
                        security: {
                            types: ['sso', 'creds', 'sos'],
                        },
                    },
                },
                settings: {isEnabled: true, isActive: false},
                email: 'contact@valkyriestudios.be',
                phone: '0123456789',
                securityTypes: ['sso', 'creds'],
            })).toEqual({
                count: 1,
                is_valid: false,
                errors: {
                    'user.details.security.types': [
                        {
                            idx: 2,
                            msg: 'in',
                            params: [['sso', 'creds']],
                        },
                    ],
                },
            });

            expect(v.validate({
                user: {
                    details: {
                        security: {
                            types: ['sso'],
                        },
                    },
                },
                settings: {isEnabled: true, isActive: false},
                email: 'contact@valkyriestudios.be',
                phone: '0123456789',
                securityTypes: ['sso', 'creds'],
            })).toEqual({
                count: 0,
                is_valid: true,
                errors: {},
            });
        });
    });

    describe('@check:FormData', () => {
        describe('FN', () => {
            it('Should return false when invalid', () => {
                const form = new FormData();
                form.append('a', '20');
                form.append('b', 'false');
                expect(new Validator({a: 'number', b: 'number'}).validate(form).is_valid).toBe(false);
            });

            it('Should return true when valid', () => {
                const form = new FormData();
                form.append('a', '20');
                form.append('b', '42');
                expect(new Validator({a: 'number', b: 'number'}).validate(form).is_valid).toBe(true);
            });
        });

        describe('FN - lexer: flag:sometimes (?)', () => {
            it('Should validate correctly if set and no value is passed', () => {
                expect(new Validator({a: '?number'}).validate(new FormData()).is_valid).toBe(true);
            });

            it('Should not interfere with other validation rules', () => {
                expect(new Validator({
                    a: '?number',
                    b: 'number|less_than:20',
                }).validate(new FormData()).is_valid).toBe(false);

                const form = new FormData();
                form.append('a', '20');
                form.append('b', 'false');
                expect(new Validator({
                    a: '?number',
                    b: 'number|less_than:20',
                }).validate(form).is_valid).toBe(false);

                const form2 = new FormData();
                form2.append('b', '15');
                expect(new Validator({
                    a: '?number',
                    b: 'number|less_than:20',
                }).validate(form2).is_valid).toBe(true);
            });
        });

        describe('FN - lexer: flag:parameter (<...>)', () => {
            it('Should allow link to passed parameter', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foo', 'hello');
                expect(new Validator({a: 'equal_to:<foo>'}).validate(form).is_valid).toBe(true);
            });

            it('Should fail if parameter is not passed', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foobar', 'hello');
                expect(new Validator({a: 'equal_to:<foo>'}).validate(form).is_valid).toBe(false);
            });

            it('Should allow multiple parameters inside the same ruleset', () => {
                const form = new FormData();
                form.append('a', '5');
                form.append('min', '3');
                form.append('max', '7');
                expect(new Validator({a: 'between:<min>,<max>'}).validate(form).is_valid).toBe(true);
            });

            it('Should allow multiple parameters inside the same config', () => {
                const form = new FormData();
                form.append('a', '3');
                form.append('b', '2');
                form.append('arr1', '1');
                form.append('arr1', '3');
                form.append('arr1', '5');
                form.append('arr2', '2');
                form.append('arr2', '4');
                form.append('arr2', '6');
                expect(new Validator({a: 'in:<arr1>', b: 'in:<arr2>'}).validate(form).is_valid).toBe(true);
            });

            it('Should allow the same parameter on multiple rules inside the same config', () => {
                const form = new FormData();
                form.append('a', '1');
                form.append('b', '2');
                form.append('arr1', '1');
                form.append('arr1', '2');
                form.append('arr1', '3');
                expect(new Validator({a: 'in:<arr1>', b: 'in:<arr1>'}).validate(form).is_valid).toBe(true);
            });
        });

        describe('FN - lexer: flag:not (!)', () => {
            it('Should validate correct if set and no value is passed', () => {
                expect(new Validator({a: '!number'}).validate(new FormData()).is_valid).toBe(false);
            });

            it('Should validate correct if set and value is passed when using standard rule', () => {
                const form = new FormData();
                form.append('a', 'hello');
                expect(new Validator({a: '!number'}).validate(form).is_valid).toBe(true);

                const form2 = new FormData();
                form2.append('a', '4');
                expect(new Validator({a: '!number'}).validate(form2).is_valid).toBe(false);
                expect(new Validator({a: '!between:5,10'}).validate(form2).is_valid).toBe(true);

                const form3 = new FormData();
                form3.append('a', '6');
                expect(new Validator({a: '!between:5,10'}).validate(form3).is_valid).toBe(false);
            });

            it('Should validate correct if set and value is passed when using parameter flag', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foo', 'hello');
                expect(new Validator({a: '!equal_to:<foo>'}).validate(form).is_valid).toBe(false);
            });

            it('Should validate correct if set and value is passed when using multiple validation rules', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foo', 'hello');
                expect(new Validator({a: '!string|!equal_to:<foo>'}).validate(form).is_valid).toBe(false);

                const form2 = new FormData();
                form2.append('a', 'hello');
                form2.append('foo', 'foo');
                expect(new Validator({a: '!string|!equal_to:<foo>'}).validate(form2).is_valid).toBe(false);
            });
        });

        describe('FN - lexer: iterable array', () => {
            it('Should return invalid when passing a non-array to an iterable', () => {
                const validator = new Validator({a: '[]string'});
                const form = new FormData();
                form.append('a', 'hello');
                expect(validator.validate(form).is_valid).toBe(false);
            });

            it('Should allow validating an array of values', () => {
                const validator = new Validator({a: '[]string'});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                expect(validator.validate(form).is_valid).toBe(true);

                const form2 = new FormData();
                form.append('a', 'hello');
                form.append('a', 'false');
                expect(validator.validate(form2).is_valid).toBe(false);
            });

            it('Should allow validating an array of values with a \'?\' sometimes flag', () => {
                const validator = new Validator({a: '?[]string'});

                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                expect(validator.validate(form).is_valid).toBe(true);
                expect(validator.validate(new FormData()).is_valid).toBe(true);
            });

            it('Should allow validating an array of values with a \'?\' sometimes flag and parameter pass', () => {
                const validator = new Validator({a: '?[]string|in:<genders>'});
                const form = new FormData();
                form.append('a', 'male');
                form.append('a', 'male');
                form.append('a', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.validate(form).is_valid).toBe(true);

                const form2 = new FormData();
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                expect(validator.validate(form2).is_valid).toBe(true);

                const form3 = new FormData();
                form3.append('a', 'dog');
                form3.append('a', 'male');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                expect(validator.validate(form3).is_valid).toBe(false);
            });

            it('Should allow validating an array of values with a \'?\' sometimes flag, uniqueness and parameter pass', () => {
                const validator = new Validator({a: '?[unique]string|in:<genders>'});
                const form = new FormData();
                form.append('a', 'male');
                form.append('a', 'male');
                form.append('a', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.validate(form).is_valid).toBe(false);

                const form2 = new FormData();
                form.append('a', 'male');
                form.append('a', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.validate(form2).is_valid).toBe(true);
            });

            it('Should allow validating an array of values with a \'!\' not flag and parameter pass', () => {
                const validator = new Validator({a: '[]string|!in:<genders>'});

                const form = new FormData();
                form.append('a', 'bob');
                form.append('a', 'john');
                form.append('a', 'bob');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.validate(form).is_valid).toBe(true);

                const form2 = new FormData();
                form2.append('a', 'male');
                form2.append('a', 'male');
                form2.append('a', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                expect(validator.validate(form2).is_valid).toBe(false);

                const form3 = new FormData();
                form3.append('a', 'chicken');
                form3.append('a', 'dog');
                form3.append('a', 'female');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                expect(validator.validate(form3).is_valid).toBe(false);
            });

            it('Should allow validating an array of values with a \'!\' not flag, uniqueness and parameter pass', () => {
                const validator = new Validator({a: '[unique]string|!in:<genders>'});
                const form = new FormData();
                form.append('a', 'bob');
                form.append('a', 'john');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.validate(form).is_valid).toBe(true);

                const form2 = new FormData();
                form2.append('a', 'male');
                form2.append('a', 'female');
                form2.append('a', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                expect(validator.validate(form2).is_valid).toBe(false);

                const form3 = new FormData();
                form3.append('a', 'chicken');
                form3.append('a', 'dog');
                form3.append('a', 'chicken');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                expect(validator.validate(form3).is_valid).toBe(false);
            });
        });

        describe('FN - lexer: iterable array:unique', () => {
            it('Should return valid when array is unique', () => {
                const validator = new Validator({a: '[unique]string'});
                const form = new FormData();
                form.append('a[0]', 'a');
                form.append('a[1]', 'b');
                form.append('a[2]', 'c');
                expect(validator.validate(form).is_valid).toBe(true);
            });

            it('Should return invalid when array is not unique', () => {
                const validator = new Validator({a: '[unique]string'});
                const form = new FormData();
                form.append('a[0]', 'a');
                form.append('a[1]', 'b');
                form.append('a[2]', 'a');
                expect(validator.validate(form).is_valid).toBe(false);
            });

            it('Should return invalid when array is not unique when using numbers', () => {
                const validator = new Validator({a: '[unique]number'});
                const form = new FormData();
                form.append('a[0]', '1');
                form.append('a[1]', '2');
                form.append('a[2]', '2');
                expect(validator.validate(form).is_valid).toBe(false);
            });

            it('Should return invalid when array is not unique when using objects', () => {
                const validator = new Validator({a: '[unique]object'});
                const form = new FormData();
                form.append('a[0].a', '1');
                form.append('a[1].b', '2');
                form.append('a[2].b', '2');
                expect(validator.validate(form).is_valid).toBe(false);
            });

            it('Should return invalid when array is not unique and doesnt match rules', () => {
                const validator = new Validator({a: '[unique]integer'});
                const form = new FormData();
                form.append('a[0]', '1');
                form.append('a[1]', '2');
                form.append('a[2]', 'a');
                form.append('a[3]', '2');
                expect(validator.validate(form).is_valid).toBe(false);
            });

            it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
                const validator = new Validator({a: '[unique]integer'});
                const form = new FormData();
                form.append('a[0]', '1');
                form.append('a[1]', '2');
                form.append('a[2]', 'a');
                form.append('a[3]', '2');
                form.append('a[4]', '2.2');
                expect(validator.validate(form).is_valid).toBe(false);
            });
        });

        describe('FN - lexer: iterable array:max+min', () => {
            it('Should return valid when within boundaries', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                form.append('a', 'cool');
                expect(validator.validate(form).is_valid).toBe(true);
            });

            it('Should return valid when at top boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                form.append('a', 'a2');
                form.append('a', 'a3');
                form.append('a', 'a4');
                form.append('a', 'a5');
                expect(validator.validate(form).is_valid).toBe(true);
            });

            it('Should return invalid when above top boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                form.append('a', 'a2');
                form.append('a', 'a3');
                form.append('a', 'a4');
                form.append('a', 'a5');
                form.append('a', 'a6');
                expect(validator.validate(form).is_valid).toBe(false);
            });

            it('Should return valid when at bottom boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                form.append('a', 'a2');
                expect(validator.validate(form).is_valid).toBe(true);
            });

            it('Should return invalid when below bottom boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                expect(validator.validate(form).is_valid).toBe(false);
            });
        });

        describe('FN - lexer: iterable object', () => {
            it('Should return invalid when passing a non-object to an iterable', () => {
                const validator = new Validator({a: '{}string'});
                const form = new FormData();
                form.append('a', 'hello');
                expect(validator.validate(form).is_valid).toBe(false);
            });

            it('Should allow validating an object', () => {
                const validator = new Validator({a: '{}string'});
                const form = new FormData();
                form.append('a.b', 'hello');
                form.append('a.c', 'there');
                expect(validator.validate(form).is_valid).toBe(true);

                const form2 = new FormData();
                form2.append('a.b', 'hello');
                form2.append('a.c', 'false');
                expect(validator.validate(form2).is_valid).toBe(false);
            });

            it('Should allow validating an object with a \'?\' sometimes flag', () => {
                const validator = new Validator({a: '?{}string'});
                const form = new FormData();
                form.append('a.b', 'hello');
                form.append('a.c', 'there');
                expect(validator.validate(form).is_valid).toBe(true);
                expect(validator.validate(new FormData()).is_valid).toBe(true);

                const form2 = new FormData();
                form2.append('a.b', 'hello');
                form2.append('a.c', 'false');
                expect(validator.validate(form2).is_valid).toBe(false);
            });

            it('Should allow validating an object with a \'?\' sometimes flag and parameter pass', () => {
                const validator = new Validator({a: '?{}string|in:<genders>'});
                const form = new FormData();
                form.append('a.b', 'male');
                form.append('a.c', 'male');
                form.append('a.d', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.validate(form).is_valid).toBe(true);

                const form2 = new FormData();
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                expect(validator.validate(form2).is_valid).toBe(true);

                const form3 = new FormData();
                form3.append('a.b', 'dog');
                form3.append('a.c', 'male');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                expect(validator.validate(form3).is_valid).toBe(false);
            });

            it('Should allow validating an object with a \'?\' sometimes flag, uniqueness and parameter pass', () => {
                const validator = new Validator({a: '?{unique}string|in:<genders>'});
                const form = new FormData();
                form.append('a.b', 'male');
                form.append('a.c', 'male');
                form.append('a.d', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.validate(form).is_valid).toBe(false);

                const form2 = new FormData();
                form.append('a.b', 'male');
                form.append('a.c', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.validate(form2).is_valid).toBe(true);
            });

            it('Should allow validating an object with a \'!\' not flag and parameter pass', () => {
                const validator = new Validator({a: '{}string|!in:<genders>'});
                const form = new FormData();
                form.append('a.b', 'bob');
                form.append('a.c', 'john');
                form.append('a.d', 'bob');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.validate(form).is_valid).toBe(true);

                const form2 = new FormData();
                form2.append('a.b', 'male');
                form2.append('a.c', 'male');
                form2.append('a.d', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                expect(validator.validate(form2).is_valid).toBe(false);

                const form3 = new FormData();
                form3.append('a.b', 'chicken');
                form3.append('a.c', 'dog');
                form3.append('a.d', 'female');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                expect(validator.validate(form3).is_valid).toBe(false);
            });

            it('Should allow validating an object with a \'!\' not flag, uniqueness and parameter pass', () => {
                const validator = new Validator({a: '{unique}string|!in:<genders>'});
                const form = new FormData();
                form.append('a.b', 'bob');
                form.append('a.c', 'john');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                expect(validator.validate(form).is_valid).toBe(true);

                const form2 = new FormData();
                form2.append('a.b', 'male');
                form2.append('a.c', 'female');
                form2.append('a.d', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                expect(validator.validate(form2).is_valid).toBe(false);

                const form3 = new FormData();
                form3.append('a.b', 'chicken');
                form3.append('a.c', 'dog');
                form3.append('a.d', 'chicken');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                expect(validator.validate(form3).is_valid).toBe(false);
            });
        });

        describe('FN - lexer: iterable object:unique', () => {
            it('Should return valid when array is unique', () => {
                const validator = new Validator({a: '{unique}string'});
                const form = new FormData();
                form.append('a.b', 'a');
                form.append('a.c', 'b');
                form.append('a.d', 'c');
                expect(validator.validate(form).is_valid).toBe(true);
            });

            it('Should return invalid when array is not unique', () => {
                const validator = new Validator({a: '{unique}string'});
                const form = new FormData();
                form.append('a.b', 'a');
                form.append('a.c', 'b');
                form.append('a.d', 'a');
                expect(validator.validate(form).is_valid).toBe(false);
            });

            it('Should return invalid when array is not unique when using numbers', () => {
                const validator = new Validator({a: '{unique}number'});
                const form = new FormData();
                form.append('a.b', '1');
                form.append('a.c', '2');
                form.append('a.d', '2');
                expect(validator.validate(form).is_valid).toBe(false);
            });

            it('Should return invalid when array is not unique when using objects', () => {
                const validator = new Validator({a: '{unique}object'});
                const form = new FormData();
                form.append('a.b.a', '1');
                form.append('a.c.b', '2');
                form.append('a.d.a', '1');
                expect(validator.validate(form).is_valid).toBe(false);
            });

            it('Should return invalid when array is not unique and doesnt match rules', () => {
                const validator = new Validator({a: '{unique}integer'});
                const form = new FormData();
                form.append('a.b', '1');
                form.append('a.c', '2');
                form.append('a.d', 'a');
                form.append('a.e', '2');
                expect(validator.validate(form).is_valid).toBe(false);
            });

            it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
                const validator = new Validator({a: '{unique}integer'});
                const form = new FormData();
                form.append('a.b', '1');
                form.append('a.c', '2');
                form.append('a.d', 'a');
                form.append('a.e', '2');
                form.append('a.f', '2.2');
                expect(validator.validate(form).is_valid).toBe(false);
            });
        });

        describe('FN - lexer: iterable object:max+min', () => {
            it('Should return valid when within boundaries', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'hello');
                form.append('a.c', 'there');
                form.append('a.d', 'cool');
                expect(validator.validate(form).is_valid).toBe(true);
            });

            it('Should return valid when at top boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                form.append('a.c', 'a2');
                form.append('a.d', 'a3');
                form.append('a.e', 'a4');
                form.append('a.f', 'a5');
                expect(validator.validate(form).is_valid).toBe(true);
            });

            it('Should return invalid when above top boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                form.append('a.c', 'a2');
                form.append('a.d', 'a3');
                form.append('a.e', 'a4');
                form.append('a.f', 'a5');
                form.append('a.g', 'a6');
                expect(validator.validate(form).is_valid).toBe(false);
            });

            it('Should return valid when at bottom boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                form.append('a.c', 'a2');
                expect(validator.validate(form).is_valid).toBe(true);
            });

            it('Should return invalid when below bottom boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                expect(validator.validate(form).is_valid).toBe(false);
            });
        });

        describe('FN - lexer: groups', () => {
            it('Should return valid when one of both rules are valid', () => {
                const validator = new Validator({a: ['[max:5|min:2]string', 'false']});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                form.append('a', 'cool');
                expect(validator.validate(form).is_valid).toBe(true);

                const form2 = new FormData();
                form2.append('a', 'false');
                expect(validator.validate(form2).is_valid).toBe(true);
            });

            it('Should return valid when using rules with an underscore in them and one of them is valid', () => {
                const form = new FormData();
                form.append('a', 'hello');
                expect(new Validator({a: ['string_ne|min:1|max:128', 'false']}).validate(form).is_valid).toBe(true);

                const form2 = new FormData();
                form2.append('a', 'false');
                expect(new Validator({a: ['string_ne|min:1|max:128', 'false']}).validate(form2).is_valid).toBe(true);
            });

            it('Should return valid when using rules with a dash in them and one of them is valid', () => {
                Validator.extend({
                    'my-test-rule': val => val === true,
                });
                const form = new FormData();
                form.append('a', 'true');
                expect(new Validator({a: ['my-test-rule', 'false']}).validate(form).is_valid).toBe(true);
            });

            it('Should return valid when all rules are valid', () => {
                const validator = new Validator({a: ['[max:5|min:2]string', '[max:5|min:3]string_ne']});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                form.append('a', 'cool');
                expect(validator.validate(form).is_valid).toBe(true);
            });

            it('Should return valid when no rules are valid but sometimes flag is set and its the only rule', () => {
                const validator = new Validator({a: ['?', 'guid', 'false']});
                expect(validator.validate(new FormData()).is_valid).toBe(true);
            });

            it('Should return valid when no rules are valid but sometimes flag is set and multiple fields but those are valid too', () => {
                const validator = new Validator({a: ['?', 'guid', 'false'], b: 'integer|between:10,50'});
                const form = new FormData();
                form.append('b', '42');
                expect(validator.validate(form).is_valid).toBe(true);
            });

            it('Should return invalid when both rules are invalid and correctly set error messages as multi-dimensional array', () => {
                const validator = new Validator({a: ['guid', 'false']});
                const form = new FormData();
                form.append('a', 'foobar');
                expect(validator.validate(form).is_valid).toBe(false);
            });

            it('Should return invalid and correctly set error messages as multi-dimensional array with multiple rules to a group', () => {
                const validator = new Validator({a: ['integer|between:20,42', 'false']});
                const form = new FormData();
                form.append('a', 'foobar');
                expect(validator.validate(form).is_valid).toBe(false);
            });
        });
    });

    describe('extend FN', () => {
        it('Should throw if not provided anything', () => {
            expect(
                //  @ts-ignore
                () => Validator.extend()
            ).toThrowError(/Invalid extension/);
        });

        it('Should throw if not provided an object', () => {
            for (const el of CONSTANTS.NOT_OBJECT) {
                expect(() => Validator.extend(el)).toThrowError(/Invalid extension/);
            }
        });

        it('Should not throw if provided an empty object', () => {
            expect(() => Validator.extend({})).not.toThrow();
        });

        it('Should throw if provided an object where certain values do not have a valid name', () => {
            for (const el of [
                ' foo ',
                'foo.a.b',
                'foo(a)',
                'foo)b',
                'foo[a]',
                'foo a',
                'foo_}',
            ]) {
                expect(() => Validator.extend({[el]: val => val === true})).toThrowError(/Invalid extension/);
                expect(Object.prototype.hasOwnProperty.call(Validator.rules, el)).toBe(false);
            }
        });

        it('Should throw if provided an object where values are not valid', () => {
            for (const el of CONSTANTS.NOT_FUNCTION) {
                if (el instanceof RegExp || isNeObject(el) || isNeArray(el)) continue;
                const uid = guid();
                expect(() => Validator.extend({[uid]: el})).toThrowError(/Invalid extension/);
                expect(Object.prototype.hasOwnProperty.call(Validator.rules, uid)).toBe(false);
            }
        });

        it('Should work', () => {
            Validator.extend({
                trick: function (val, p1) {
                    return p1 === 'treat' ? val === 'trick' : p1 === 'trick' ? val === 'treat' : false;
                },
            });

            const evaluation = new Validator({a: 'trick:<b>'}).validate({a: 'trick', b: 'treat'});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should work with multiple parameters', () => {
            Validator.extend({
                sum: function (val, p1, p2) {
                    return val === (p1 + p2);
                },
            });

            const evaluation = new Validator({a: 'sum:<b>,<c>'}).validate({a: 4, b: 1, c: 3});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should work across multiple instances', () => {
            Validator.extend({
                double: function (val:number, p1:number) {
                    return val === (p1 * 2);
                },
            });

            //  Evaluation
            const evaluation = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});

            //  Second evaluation
            const evaluation2 = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
            expect(evaluation2).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should allow redefining the same validity function', () => {
            Validator.extend({
                ismyname: function (val) {
                    return val === 'peter';
                },
            });

            //  Evaluation
            const evaluation = new Validator({name: 'ismyname'}).validate({name: 'peter'});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});

            //  Redefine
            Validator.extend({
                ismyname: function (val) {
                    return val === 'josh';
                },
            });

            //  Second evaluation
            const evaluation2 = new Validator({name: 'ismyname'}).validate({name: 'peter'});
            expect(evaluation2).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    name: [{msg: 'ismyname', params: []}],
                },
            });
        });

        it('Should allow defining multiple rules at the same time', () => {
            Validator.extend({
                ismyname: function (val) {
                    return val === 'peter';
                },
                ismyothername: function (val) {
                    return val === 'josh';
                },
            });

            //  Evaluation
            const evaluation = new Validator({name: 'ismyname'}).validate({name: 'peter'});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});

            //  Second evaluation
            const evaluation2 = new Validator({name: 'ismyothername'}).validate({name: 'peter'});
            expect(evaluation2).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    name: [{msg: 'ismyothername', params: []}],
                },
            });
        });

        describe('regex', () => {
            it('Should work', () => {
                Validator.extend({
                    contains_hello: /hello/,
                    contains_hello_insensitive: new RegExp('hello', 'i'),
                });

                expect(new Validator({a: 'contains_hello'}).check({a: 'When i say hello this should work'})).toBe(true);
                expect(new Validator({
                    a: 'contains_hello_insensitive',
                    b: 'contains_hello',
                }).check({
                    a: 'When i say heLlo this should work',
                    b: 'When i say hello this should work',
                })).toBe(true);
                expect(new Validator({a: 'contains_hello'}).check({a: 'This helo should not work'})).toBe(false);
                expect(new Validator({a: 'contains_hello'}).check({a: 'This helLo should not work'})).toBe(false);
                expect(new Validator({a: 'contains_hello_insensitive'}).check({a: 'This helo should not work'})).toBe(false);
            });

            it('Extensions should also show up as functions in rules', () => {
                Validator.extend({
                    contains_hello: /hello/,
                    contains_hello_insensitive: /hello/i,
                });

                expect(Validator.rules.contains_hello instanceof Function).toBe(true);
                expect(Validator.rules.contains_hello('When i say hello this should work')).toBe(true);
                expect(Validator.rules.contains_hello('This helo should not work')).toBe(false);

                expect(Validator.rules.contains_hello_insensitive instanceof Function).toBe(true);
                expect(Validator.rules.contains_hello_insensitive('When i say heLlo this should work')).toBe(true);
                expect(Validator.rules.contains_hello_insensitive('This helo should not work')).toBe(false);
            });

            it('Should allow redefining the same rules', () => {
                Validator.extend({
                    contains_hello: /Hello/,
                    contains_hollo: /((h|H)ollo|(o|O)la)/,
                });

                expect(Validator.rules.contains_hello instanceof Function).toBe(true);
                expect(Validator.rules.contains_hello('Hello there')).toBe(true);
                expect(Validator.rules.contains_hello('hello there')).toBe(false);
                expect(Validator.rules.contains_hello('ola amigos')).toBe(false);
                expect(Validator.rules.contains_hello('Ola amigos')).toBe(false);

                Validator.extend({
                    contains_hello: /((h|H)ello|(o|O)la)/,
                    contains_hallo: /((h|H)allo|(o|O)la)/,
                });

                expect(Validator.rules.contains_hello('Hello there')).toBe(true);
                expect(Validator.rules.contains_hello('hello there')).toBe(true);
                expect(Validator.rules.contains_hello('ola amigos')).toBe(true);
                expect(Validator.rules.contains_hello('Ola amigos')).toBe(true);
            });

            it('Should allow working with not/sometimes flags', () => {
                Validator.extend({contains_hello: /((h|H)ello|(o|O)la)/});

                expect(new Validator({a: 'contains_hello'}).check({a: 'Hello there'})).toBe(true);
                expect(new Validator({a: 'contains_hello'}).check({a: 'hello there'})).toBe(true);
                expect(new Validator({a: 'contains_hello'}).check({a: 'ola amigos'})).toBe(true);
                expect(new Validator({a: 'contains_hello'}).check({a: 'Ola amigos'})).toBe(true);

                expect(new Validator({a: '!contains_hello'}).check({a: 'Hello there'})).toBe(false);
                expect(new Validator({a: '!contains_hello'}).check({a: 'hello there'})).toBe(false);
                expect(new Validator({a: '!contains_hello'}).check({a: 'ola amigos'})).toBe(false);
                expect(new Validator({a: '!contains_hello'}).check({a: 'Ola amigos'})).toBe(false);

                expect(new Validator({a: '?contains_hello', b: 'integer'}).check({b: 42})).toBe(true);
            });
        });

        describe('enum', () => {
            it('Should work', () => {
                Validator.extend({
                    enum1: ['foo', 'bar', 'foobar'],
                    ENUM_2: [1, 2, 3],
                });

                expect(new Validator({a: 'enum1'}).check({a: 'foo'})).toBe(true);
                expect(new Validator({a: 'ENUM_2', b: 'enum1'}).check({a: 2, b: 'foobar'})).toBe(true);
                expect(new Validator({a: 'enum1'}).check({a: 'fuo'})).toBe(false);
                expect(new Validator({a: 'ENUM_2', b: 'enum1'}).check({a: 42, b: 'foobar'})).toBe(false);
            });

            it('Extensions should also show up as functions in rules', () => {
                Validator.extend({
                    enum1: ['foo', 'bar', 'foobar'],
                    ENUM_2: [1, 2, 3],
                });

                expect(Validator.rules.enum1 instanceof Function).toBe(true);
                expect(Validator.rules.enum1('foo')).toBe(true);
                expect(Validator.rules.enum1('fooo')).toBe(false);

                expect(Validator.rules.ENUM_2 instanceof Function).toBe(true);
                expect(Validator.rules.ENUM_2(1)).toBe(true);
                expect(Validator.rules.ENUM_2(42)).toBe(false);
            });

            it('Should allow redefining the same enum rule', () => {
                Validator.extend({
                    enum1: ['foo', 'bar', 'foobar'],
                    ENUM_2: [1, 2, 3],
                });

                expect(Validator.rules.enum1 instanceof Function).toBe(true);
                expect(Validator.rules.enum1('foo')).toBe(true);
                expect(Validator.rules.enum1('fooo')).toBe(false);

                expect(Validator.rules.ENUM_2 instanceof Function).toBe(true);
                expect(Validator.rules.ENUM_2(1)).toBe(true);
                expect(Validator.rules.ENUM_2(42)).toBe(false);

                Validator.extend({
                    ENUM_2: [2, 3, 42],
                });

                expect(Validator.rules.ENUM_2(1)).toBe(false);
                expect(Validator.rules.ENUM_2(42)).toBe(true);
            });

            it('Should throw if provided an object where certain arrays contain more than just primitive strings or numbers', () => {
                expect(
                    //  @ts-ignore
                    () => Validator.extend({enum_1: ['foo', false, 'bar']})
                ).toThrowError(/Invalid extension/);

                expect(
                    //  @ts-ignore
                    () => Validator.extend({enum_1: ['foo', {a: 1}, 'bar']})
                ).toThrowError(/Invalid extension/);

                expect(
                    //  @ts-ignore
                    () => Validator.extend({enum_1: ['foo', new Date(), 'bar']})
                ).toThrowError(/Invalid extension/);

                expect(
                    //  @ts-ignore
                    () => Validator.extend({enum_1: ['foo', ['foo'], 'bar']})
                ).toThrowError(/Invalid extension/);
            });

            it('Should allow working with not/sometimes flags', () => {
                Validator.extend({
                    FRUITS: ['apple', 'pear', 'banana'],
                    ANIMALS: ['dog', 'cat', 'parrot'],
                    AGE_13_18: [13, 14, 15, 16, 17, 18],
                    AGE_19_25: [19, 20, 21, 22, 23, 24, 25],
                });

                expect(new Validator({age: 'AGE_13_18'}).check({age: 15})).toBe(true);
                expect(new Validator({age: '!AGE_13_18'}).check({age: 19})).toBe(true);
                expect(Validator.rules.AGE_13_18(15)).toBe(true);
                expect(new Validator({
                    age: '?AGE_13_18',
                    pet: 'ANIMALS',
                    fave_fruit: 'FRUITS',
                }).check({pet: 'dog', fave_fruit: 'banana'})).toBe(true);
            });
        });

        describe('schema', () => {
            it('Should not throw and register rules if provided an object if schema is valid', () => {
                const uid = guid();
                expect(() => Validator.extend({
                    [uid]: {
                        first_name: 'string_ne|min:3',
                        last_name: 'string_ne|min:3',
                        email: 'email',
                    },
                })).not.toThrow();
                expect(Object.prototype.hasOwnProperty.call(Validator.rules, uid)).toBe(true);
            });

            it('Should work', () => {
                const uid = guid();
                const uid2 = guid();
                Validator.extend({
                    [uid]: {
                        first_name: 'string_ne|min:3',
                        last_name: 'string_ne|min:3',
                        email: 'email',
                    },
                    [uid2]: {
                        first_name: 'string_ne|min:3',
                        last_name: 'string_ne|min:3',
                        email: 'email',
                        phone: 'phone',
                    },
                });

                expect(new Validator({a: `${uid}`}).check({a: {
                    first_name: 'Peter',
                    last_name: 'Vermeulen',
                    email: 'contact@valkyriestudios.be',
                }})).toBe(true);
                expect(new Validator({a: `${uid}`}).check({a: {
                    first_name: 'Peter',
                    last_name: 'Vermeulen',
                    email: false,
                }})).toBe(false);
                expect(new Validator({a: `${uid2}`}).check({a: {
                    first_name: 'Peter',
                    last_name: 'Vermeulen',
                    email: 'contact@valkyriestudios.be',
                }})).toBe(false);
                expect(new Validator({a: `${uid2}`}).check({a: {
                    first_name: 'Peter',
                    last_name: 'Vermeulen',
                    email: 'contact@valkyriestudios.be',
                    phone: '+32 487 61 59 82',
                }})).toBe(true);
            });

            it('Extensions should also show up as functions in rules', () => {
                const uid = guid();
                const uid2 = guid();
                Validator.extend({
                    [uid]: {
                        first_name: 'string_ne|min:3',
                        last_name: 'string_ne|min:3',
                        email: 'email',
                    },
                    [uid2]: {
                        first_name: 'string_ne|min:3',
                        last_name: 'string_ne|min:3',
                        email: 'email',
                        phone: 'phone',
                    },
                });

                expect(Validator.rules[uid] instanceof Function).toBe(true);
                expect(Validator.rules[uid]({first_name: 'Peter', last_name: 'Vermeulen', email: 'contact@valkyriestudios.be'})).toBe(true);
                expect(Validator.rules[uid]('fooo')).toBe(false);

                expect(Validator.rules[uid2] instanceof Function).toBe(true);
                expect(Validator.rules[uid2]({
                    first_name: 'Peter',
                    last_name: 'Vermeulen',
                    email: 'contact@valkyriestudios.be',
                    phone: false,
                })).toBe(false);
            });

            it('Should allow redefining the same rule', () => {
                const uid = guid();
                Validator.extend({
                    [uid]: {
                        first_name: 'string_ne|min:3',
                        last_name: 'string_ne|min:3',
                        email: 'email',
                    },
                });

                expect(Validator.rules[uid] instanceof Function).toBe(true);
                expect(Validator.rules[uid]({first_name: 'Peter', last_name: 'Vermeulen', email: 'contact@valkyriestudios.be'})).toBe(true);
                expect(Validator.rules[uid]({first_name: 'Peter', last_name: 'Vermeulen'})).toBe(false);

                Validator.extend({
                    [uid]: {
                        first_name: 'string_ne|min:3',
                        last_name: 'string_ne|min:3',
                    },
                });

                expect(Validator.rules[uid] instanceof Function).toBe(true);
                expect(Validator.rules[uid]({first_name: 'Peter', last_name: 'Vermeulen', email: 'contact@valkyriestudios.be'})).toBe(true);
                expect(Validator.rules[uid]({first_name: 'Peter', last_name: 'Vermeulen'})).toBe(true);
            });

            it('Should throw if providing a schema with invalid rule constructs', () => {
                expect(
                    () => Validator.extend({user: {uids: '[string', first_name: 'string_ne'}})
                ).toThrowError(/Invalid extension/);
            });
        });
    });

    describe('Complex validation scenarions', () => {
        it('Should be able to validate complex objects [1]', () => {
            const evaluation = new Validator({
                password: 'string|min:8',
                password_confirmation: 'equal_to:<password>',
            }).validate({
                password: 'thisIsMy1Little!Secret',
                password_confirmation: 'thisIsMy1Little!Secret',
            });

            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be able to validate complex objects [2]', () => {
            const evaluation = new Validator({
                first_name: 'string|alpha_num_spaces|min:2',
                last_name: 'string|alpha_num_spaces|min:2',
                age: '?integer|between:1,150',
                gender: 'in:<meta.gender_options>',
            }).validate({
                first_name: 'Peter',
                last_name: 'Vermeulen',
                gender: 'm',
                meta: {
                    gender_options: ['m','f','o'],
                },
            });

            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be able to validate complex objects [3]', () => {
            const evaluation = new Validator({
                first_name: 'string|alpha_num_spaces|min:2',
                last_name: 'string|alpha_num_spaces|min:2',
                age: '?integer|between:1,150',
                gender: 'in:<meta.gender_options>',
            }).validate({
                first_name: 'Peter',
                last_name: 'Vermeulen',
                gender: 'X',
                age: {},
                meta: {
                    gender_options: ['m','f','o'],
                },
            });

            expect(evaluation).toEqual({
                is_valid: false,
                count: 2,
                errors: {
                    age: [
                        {msg: 'integer', params: []},
                        {msg: 'between', params: ['1', '150']},
                    ],
                    gender: [{msg: 'in', params: [['m', 'f', 'o']]}],
                },
            });
        });

        it('Should be able to validate complex multidimensional objects [4]', () => {
            const evaluation = new Validator({
                address: {
                    street: 'string|alpha_num_spaces',
                    nr: 'integer',
                    zip: 'integer|between:1000,9999',
                },
                contact: {
                    email: 'string|email',
                },
            }).validate({
                address: {
                    street: 'First avenue',
                    nr: 50,
                    zip: 1500,
                },
                contact: {
                    email: 'contact.valkyriestudios.be',
                },
            });

            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    'contact.email': [{msg: 'email', params: []}],
                },
            });
        });

        it('Should be able to validate complex multidimensional objects [5]', () => {
            Validator.extend({
                is_type: val => ['type1', 'type2', 'type4'].indexOf(val) >= 0,
            });

            const validator = new Validator({
                filters: {
                    ids: '[unique]integer|greater_than:0',
                    types: '[unique|max:3]is_type',
                },
                contact: {
                    email: 'string|email',
                },
            });

            let evaluation = validator.validate({
                filters: {
                    ids: [2, 3, 4, 1.5],
                    types: ['type1', 'type2', 'type2', 'type3'],
                },
                contact: {
                    email: 'contact.valkyriestudios.be',
                },
            });
            expect(evaluation).toEqual({
                is_valid: false,
                count: 3,
                errors: {
                    'filters.ids': [{idx: 3, msg: 'integer', params: []}],
                    'filters.types': [{msg: 'iterable_max', params: [3]}],
                    'contact.email': [{msg: 'email', params: []}],
                },
            });

            evaluation = validator.validate({
                filters: {
                    ids: [2, 3, 4, 1.5, 4],
                    types: ['type1', 'type2', 'type3'],
                },
                contact: {
                    email: 'contact@valkyriestudios.be',
                },
            });
            expect(evaluation).toEqual({
                is_valid: false,
                count: 2,
                errors: {
                    'filters.ids': [
                        {msg: 'iterable_unique', params: []},
                        {idx: 3, msg: 'integer', params: []},
                    ],
                    'filters.types': [
                        {idx: 2, msg: 'is_type', params: []},
                    ],
                },
            });
        });

        it('Should be able to validate complex multidimensional objects [6]', () => {
            Validator.extend({
                is_type: ['type1', 'type2', 'type4'],
            });

            const validator = new Validator({
                filters: {
                    ids: '[unique]integer|greater_than:0',
                    types: '[unique|max:3]is_type',
                },
                contact: {
                    email: ['email', 'false'],
                },
            });

            let evaluation = validator.validate({
                filters: {
                    ids: [2, 3, 4, 1.5],
                    types: ['type1', 'type2', 'type2', 'type3'],
                },
                contact: {
                    email: false,
                },
            });
            expect(evaluation).toEqual({
                is_valid: false,
                count: 2,
                errors: {
                    'filters.ids': [{idx: 3, msg: 'integer', params: []}],
                    'filters.types': [{msg: 'iterable_max', params: [3]}],
                },
            });

            evaluation = validator.validate({
                filters: {
                    ids: [2, 3, 4, 1.5, 4],
                    types: ['type1', 'type2', 'type3'],
                },
                contact: {
                    email: 'foobar',
                },
            });
            expect(evaluation).toEqual({
                is_valid: false,
                count: 3,
                errors: {
                    'filters.ids': [
                        {msg: 'iterable_unique', params: []},
                        {idx: 3, msg: 'integer', params: []},
                    ],
                    'filters.types': [
                        {idx: 2, msg: 'is_type', params: []},
                    ],
                    'contact.email': [
                        [{msg: 'email', params: []}],
                        [{msg: 'false', params: []}],
                    ],
                },
            });
        });

        it('Should be able to validate complex multidimensional objects [7]', () => {
            Validator.extend({
                is_type: ['type1', 'type2', 'type4'],
            });

            const validator = new Validator({
                profile: {
                    uid: 'guid',
                    user: {
                        type: 'is_type',
                        details: {
                            first_name: 'string_ne|min:2',
                            last_name: 'string_ne|min:2',
                            email: 'email',
                        },
                    },
                },
            });

            expect(validator.check({
                profile: {
                    uid: guid(),
                    user: {
                        type: 'type1',
                        details: {
                            first_name: 'Peter',
                            last_name: 'Vermeulen',
                            email: 'contact@valkyriestudios.be',
                        },
                    },
                },
            })).toBe(true);

            expect(validator.check({
                profile: {
                    uid: guid(),
                    user: {
                        type: 'type1',
                    },
                },
            })).toBe(false);

            expect(validator.check({
                profile: {
                    uid: guid(),
                    user: false,
                },
            })).toBe(false);

            expect(validator.check({
                profile: false,
            })).toBe(false);

            expect(validator.validate({
                profile: false,
            })).toEqual({
                is_valid: false,
                count: 5,
                errors: {
                    'profile.uid': [
                        {msg: 'not_found', params: []},
                    ],
                    'profile.user.type': [
                        {msg: 'not_found', params: []},
                    ],
                    'profile.user.details.email': [
                        {msg: 'not_found', params: []},
                    ],
                    'profile.user.details.first_name': [
                        {msg: 'not_found', params: []},
                    ],
                    'profile.user.details.last_name': [
                        {msg: 'not_found', params: []},
                    ],
                },
            });

            expect(validator.validate({
                profile: {
                    uid: guid(),
                    user: {
                        type: 'type1',
                        details: {
                            first_name: false,
                            last_name: 'Vermeulen',
                            email: 'contact@valkyriestudios.be',
                        },
                    },
                },
            })).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    'profile.user.details.first_name': [
                        {msg: 'string_ne', params: []},
                        {msg: 'min', params: ['2']},
                    ],
                },
            });
        });

        it('Should be valid if a nested objects\'s fields are all optional and no nested object is passed', () => {
            const validator = new Validator({
                filters: {
                    ids: '?[unique]integer|greater_than:0',
                    types: '?[unique|max:3]is_type',
                },
                contact_email: 'email',
            });

            expect(validator.check({contact_email: 'contact@valkyriestudios.be'})).toBe(true);
        });

        it('Should be invalid if a nested objects\'s fields are not all optional and no nested object is passed', () => {
            const validator = new Validator({
                filters: {
                    ids: '?[unique]integer|greater_than:0',
                    types: '[unique|max:3]is_type',
                },
                contact_email: 'email',
            });

            expect(validator.check({contact_email: 'contact@valkyriestudios.be'})).toBe(false);
        });
    });

    describe('Multi-Validation scenarios', () => {
        describe('rawSchema', () => {
            describe('@check', () => {
                it('Should return true if one of them passes', () => {
                    const v = Validator.create([
                        {type: 'literal:send', target: ['email', 'phone'], message: 'string_ne'},
                        {type: 'literal:received', target: ['email', 'phone'], message: 'string_ne'},
                    ]);
                    expect(v.check({type: 'send', target: 'contact@valkyriestudios.be', message: 'Let\'s do business'})).toBe(true);
                    expect(v.check({type: 'received', target: 'contact@valkyriestudios.be', message: 'Yes let\'s'})).toBe(true);
                });

                it('Should return true if all of them pass', () => {
                    const v = Validator.create([
                        {target: ['email', 'phone'], message: 'string_ne'},
                        {target: ['email', 'phone'], message: 'string_ne', isValid: '?boolean'},
                    ]);
                    expect(v.check({target: 'contact@valkyriestudios.be', message: 'Let\'s do business'})).toBe(true);
                    expect(v.check({target: 'contact@valkyriestudios.be', message: 'Yes let\'s', isValid: true})).toBe(true);
                    expect(v.check({target: 'contact@valkyriestudios.be', message: 'Yes let\'s', isValid: false})).toBe(true);
                });

                it('Should return false if none of them pass', () => {
                    const v = Validator.create([
                        {type: 'literal:send', target: ['email', 'phone'], message: 'string_ne'},
                        {type: 'literal:received', target: ['email', 'phone'], message: 'string_ne'},
                    ]);
                    expect(v.check({type: 'activate', target: 'contact@valkyriestudios.be', message: 'Let\'s do business'})).toBe(false);
                    expect(v.check({type: 'send', target: 'blabla', message: 'Yes let\'s'})).toBe(false);
                });
            });

            describe('@validate', () => {
                it('Should return is valid if one of them passes', () => {
                    const v = Validator.create([
                        {type: 'literal:send', target: ['email', 'phone'], message: 'string_ne'},
                        {type: 'literal:received', target: ['email', 'phone'], message: 'string_ne'},
                    ]);
                    expect(
                        v.validate({type: 'send', target: 'contact@valkyriestudios.be', message: 'Let\'s do business'})
                    ).toEqual({is_valid: true, count: 0, errors: {}});
                    expect(
                        v.validate({type: 'received', target: 'contact@valkyriestudios.be', message: 'Yes let\'s'})
                    ).toEqual({is_valid: true, count: 0, errors: {}});
                });

                it('Should return is valid if all of them pass', () => {
                    const v = Validator.create([
                        {target: ['email', 'phone'], message: 'string_ne'},
                        {target: ['email', 'phone'], message: 'string_ne', isValid: '?boolean'},
                    ]);
                    expect(
                        v.validate({target: 'contact@valkyriestudios.be', message: 'Let\'s do business'})
                    ).toEqual({is_valid: true, count: 0, errors: {}});
                    expect(
                        v.validate({target: 'contact@valkyriestudios.be', message: 'Yes let\'s', isValid: true})
                    ).toEqual({is_valid: true, count: 0, errors: {}});
                    expect(
                        v.validate({target: 'contact@valkyriestudios.be', message: 'Yes let\'s', isValid: false})
                    ).toEqual({is_valid: true, count: 0, errors: {}});
                });

                it('Should return first error result if none of them pass', () => {
                    const v = Validator.create([
                        {type: 'literal:send', target: ['email', 'phone'], message: 'string_ne'},
                        {type: 'literal:received', target: ['email', 'phone'], message: 'string_ne'},
                    ]);
                    expect(
                        v.validate({type: 'activate', target: 'contact@valkyriestudios.be', message: 'Let\'s do business'})
                    ).toEqual({
                        is_valid: false,
                        count: 1,
                        errors: {
                            type: [
                                {msg: 'literal', params: ['send']},
                            ],
                        },
                    });
                    expect(
                        v.validate({type: 'send', target: 'blabla', message: 'Yes let\'s'})
                    ).toEqual({
                        is_valid: false,
                        count: 1,
                        errors: {
                            target: [
                                [{msg: 'email', params: []}],
                                [{msg: 'phone', params: []}],
                            ],
                        },
                    });
                });
            });
        });

        describe('validator', () => {
            const vSend = Validator.create({type: 'literal:send', target: ['email', 'phone'], message: 'string_ne'});
            const vReceived = Validator.create({type: 'literal:received', target: ['email', 'phone'], message: 'string_ne'});
            const vTarget = Validator.create({target: ['email', 'phone'], message: 'string_ne'});
            const vtargetWithActive = Validator.create({target: ['email', 'phone'], message: 'string_ne', isValid: '?boolean'});

            describe('@check', () => {
                it('Should return true if one of them passes', () => {
                    const v = Validator.create([vSend, vReceived]);
                    expect(v.check({type: 'send', target: 'contact@valkyriestudios.be', message: 'Let\'s do business'})).toBe(true);
                    expect(v.check({type: 'received', target: 'contact@valkyriestudios.be', message: 'Yes let\'s'})).toBe(true);
                });

                it('Should return true if all of them pass', () => {
                    const v = Validator.create([vTarget, vtargetWithActive]);
                    expect(v.check({target: 'contact@valkyriestudios.be', message: 'Let\'s do business'})).toBe(true);
                    expect(v.check({target: 'contact@valkyriestudios.be', message: 'Yes let\'s', isValid: true})).toBe(true);
                    expect(v.check({target: 'contact@valkyriestudios.be', message: 'Yes let\'s', isValid: false})).toBe(true);
                });

                it('Should return false if none of them pass', () => {
                    const v = Validator.create([vSend, vReceived]);
                    expect(v.check({type: 'activate', target: 'contact@valkyriestudios.be', message: 'Let\'s do business'})).toBe(false);
                    expect(v.check({type: 'send', target: 'blabla', message: 'Yes let\'s'})).toBe(false);
                });
            });

            describe('@validate', () => {
                it('Should return is valid if one of them passes', () => {
                    const v = Validator.create([vSend, vReceived]);
                    expect(
                        v.validate({type: 'send', target: 'contact@valkyriestudios.be', message: 'Let\'s do business'})
                    ).toEqual({is_valid: true, count: 0, errors: {}});
                    expect(
                        v.validate({type: 'received', target: 'contact@valkyriestudios.be', message: 'Yes let\'s'})
                    ).toEqual({is_valid: true, count: 0, errors: {}});
                });

                it('Should return is valid if all of them pass', () => {
                    const v = Validator.create([vTarget, vtargetWithActive]);
                    expect(
                        v.validate({target: 'contact@valkyriestudios.be', message: 'Let\'s do business'})
                    ).toEqual({is_valid: true, count: 0, errors: {}});
                    expect(
                        v.validate({target: 'contact@valkyriestudios.be', message: 'Yes let\'s', isValid: true})
                    ).toEqual({is_valid: true, count: 0, errors: {}});
                    expect(
                        v.validate({target: 'contact@valkyriestudios.be', message: 'Yes let\'s', isValid: false})
                    ).toEqual({is_valid: true, count: 0, errors: {}});
                });

                it('Should return first error result if none of them pass', () => {
                    const v = Validator.create([vSend, vReceived]);
                    expect(
                        v.validate({type: 'activate', target: 'contact@valkyriestudios.be', message: 'Let\'s do business'})
                    ).toEqual({
                        is_valid: false,
                        count: 1,
                        errors: {
                            type: [
                                {msg: 'literal', params: ['send']},
                            ],
                        },
                    });
                    expect(
                        v.validate({type: 'send', target: 'blabla', message: 'Yes let\'s'})
                    ).toEqual({
                        is_valid: false,
                        count: 1,
                        errors: {
                            target: [
                                [{msg: 'email', params: []}],
                                [{msg: 'phone', params: []}],
                            ],
                        },
                    });
                });
            });
        });
    });
});
