/* eslint-disable max-lines,max-statements,id-denylist */

import {describe, it}           from 'node:test';
import * as assert              from 'node:assert/strict';
import {isString, isNeString}   from '@valkyriestudios/utils/string';
import {isObject, isNeObject}   from '@valkyriestudios/utils/object';
import {isArray, isNeArray}     from '@valkyriestudios/utils/array';
import {isBoolean}              from '@valkyriestudios/utils/boolean';
import {isDate}                 from '@valkyriestudios/utils/date';
import {equal}                  from '@valkyriestudios/utils/equal';
import {isFn, isAsyncFn}        from '@valkyriestudios/utils/function';
import {isFormData}             from '@valkyriestudios/utils/formdata';
import {isNumber, isInteger}    from '@valkyriestudios/utils/number';
import guid                     from '@valkyriestudios/utils/hash/guid';
import CONSTANTS                from '../constants';
import Validator                from '../../lib';
import vAlphaNumSpaces          from '../../lib/functions/vAlphaNumSpaces';
import vAlphaNumSpacesMultiline from '../../lib/functions/vAlphaNumSpacesMultiline';
import vBase64                  from '../../lib/functions/vBase64';
import vBetween                 from '../../lib/functions/vBetween';
import vBetweenInclusive        from '../../lib/functions/vBetweenInclusive';
import vBlob                    from '../../lib/functions/vBlob';
import vColorHex                from '../../lib/functions/vColorHex';
import vContinent               from '../../lib/functions/vContinent';
import vCountry                 from '../../lib/functions/vCountry';
import vCountryAlpha3           from '../../lib/functions/vCountryAlpha3';
import vDateString              from '../../lib/functions/vDateString';
import {vDateISO, vDateDay}     from '../../lib/functions/vDateSpecs';
import vEmail                   from '../../lib/functions/vEmail';
import vFalse                   from '../../lib/functions/vFalse';
import vFile                    from '../../lib/functions/vFile';
import vGeoLatitude             from '../../lib/functions/vGeoLatitude';
import vGeoLongitude            from '../../lib/functions/vGeoLongitude';
import vGreaterThan             from '../../lib/functions/vGreaterThan';
import vGreaterThanOrEqual      from '../../lib/functions/vGreaterThanOrEqual';
import vGuid                    from '../../lib/functions/vGuid';
import vIn                      from '../../lib/functions/vIn';
import vLessThan                from '../../lib/functions/vLessThan';
import vLessThanOrEqual         from '../../lib/functions/vLessThanOrEqual';
import vNull                    from '../../lib/functions/vNull';
import vPhone                   from '../../lib/functions/vPhone';
import vRequired                from '../../lib/functions/vRequired';
import vSize                    from '../../lib/functions/vSize';
import vSysMac                  from '../../lib/functions/vSysMac';
import vSysIPv4                 from '../../lib/functions/vSysIPv4';
import vSysIPv6                 from '../../lib/functions/vSysIPv6';
import vSysIPv4_or_v6           from '../../lib/functions/vSysIPv4_or_v6';
import vSysPort                 from '../../lib/functions/vSysPort';
import vTimeZone                from '../../lib/functions/vTimeZone';
import vTrue                    from '../../lib/functions/vTrue';
import vUrl                     from '../../lib/functions/vUrl';
import vUrlNoQuery              from '../../lib/functions/vUrlNoQuery';
import {
    vISBN,
    vISBN10,
    vISBN13,
} from '../../lib/functions/vISBN';
import {vSSN}                   from '../../lib/functions/vSSN';
import {
    vEAN,
    vEAN8,
    vEAN13,
} from '../../lib/functions/vEAN';
import {vUlid}                  from '../../lib/functions/vUlid';
import {vUndefined}             from '../../lib/functions/vUndefined';
import {
    vUuid,
    vUuidV1,
    vUuidV2,
    vUuidV3,
    vUuidV4,
    vUuidV5,
} from '../../lib/functions/vUuid';
import {
    vUrlImage,
    vUrlVideo,
    vUrlMedia,
    vUrlAudio,
} from '../../lib/functions/vUrlExtensions';

describe('Validator - Core', () => {
    it('Should instantiate to a validator object', () => {
        const validator = new Validator({});

        //  It should have a check function on its instance
        assert.equal(typeof validator.check, 'function');

        //  It should have a checkForm function on its instance
        assert.equal(typeof validator.checkForm, 'function');

        //  It should have a validate function on its instance
        assert.equal(typeof validator.validate, 'function');

        //  It should have a extend function on the class
        assert.equal(typeof Validator.extend, 'function');

        //  It should not have a extend function on its instance
        assert.equal(Object.prototype.hasOwnProperty.call(validator, 'extend'), false);

        //  It should have a extend function on the class
        assert.equal(typeof Validator.extend, 'function');
    });

    it('Should throw a type error when passed wrong configuration options', () => {
        assert.throws(
            //  @ts-ignore
            () => new Validator(),
            new TypeError('Provide an object to define the rules of this validator')
        );

        assert.throws(
            //  @ts-ignore
            () => new Validator(5),
            new TypeError('Provide an object to define the rules of this validator')
        );

        assert.throws(
            //  @ts-ignore
            () => new Validator([{hello: 'world'}, 5, true]),
            new TypeError('Provide an object to define the rules of this validator')
        );

        assert.throws(
            //  @ts-ignore
            () => new Validator('foo'),
            new TypeError('Provide an object to define the rules of this validator')
        );

        assert.throws(
            //  @ts-ignore
            () => new Validator({foo: 'number', a: {b: 'string', params: []}}),
            new TypeError('Invalid rule value')
        );

        assert.throws(
            //  @ts-ignore
            () => new Validator({foo: 5, a: {b: 'string', params: []}}),
            new TypeError('Invalid rule value')
        );

        assert.throws(
            //  @ts-ignore
            () => new Validator({a: {b: ' '}}),
            new TypeError('Invalid rule value')
        );

        assert.throws(
            //  @ts-ignore
            () => new Validator({foo: ['string_ne', '', '   ', '?']}),
            new TypeError('Conditional group alternatives must be strings')
        );

        assert.throws(
            () => new Validator({foo: 'number', a: 'in:<>'}),
            new TypeError('Parameterization misconfiguration, verify rule config for in:<>')
        );
    });

    describe('@rules GET', () => {
        it('Should return the configured rules on the Validator as an object', () => {
            assert.equal(typeof Validator.rules, 'object');
        });

        it('Should return a correct kv-map of configured rules', () => {
            assert.deepEqual(Validator.rules, {
                alpha_num_spaces            : vAlphaNumSpaces,
                alpha_num_spaces_multiline  : vAlphaNumSpacesMultiline,
                array                       : isArray,
                array_ne                    : isNeArray,
                base64                      : vBase64,
                between                     : vBetween,
                between_inc                 : vBetweenInclusive,
                boolean                     : isBoolean,
                blob                        : vBlob,
                color_hex                   : vColorHex,
                continent                   : vContinent,
                country                     : vCountry,
                country_alpha3              : vCountryAlpha3,
                date                        : isDate,
                date_day                    : vDateDay,
                date_iso                    : vDateISO,
                date_string                 : vDateString,
                ean                         : vEAN,
                ean_8                       : vEAN8,
                ean_13                      : vEAN13,
                email                       : vEmail,
                equal_to                    : equal,
                false                       : vFalse,
                file                        : vFile,
                formdata                    : isFormData,
                function                    : isFn,
                async_function              : isAsyncFn,
                geo_latitude                : vGeoLatitude,
                geo_longitude               : vGeoLongitude,
                greater_than                : vGreaterThan,
                greater_than_or_equal       : vGreaterThanOrEqual,
                guid                        : vGuid,
                in                          : vIn,
                integer                     : isInteger,
                isbn                        : vISBN,
                isbn_10                     : vISBN10,
                isbn_13                     : vISBN13,
                less_than                   : vLessThan,
                less_than_or_equal          : vLessThanOrEqual,
                max                         : vLessThanOrEqual,
                min                         : vGreaterThanOrEqual,
                null                        : vNull,
                number                      : isNumber,
                object                      : isObject,
                object_ne                   : isNeObject,
                phone                       : vPhone,
                required                    : vRequired,
                size                        : vSize,
                ssn                         : vSSN,
                string                      : isString,
                string_ne                   : isNeString,
                sys_mac                     : vSysMac,
                sys_ipv4                    : vSysIPv4,
                sys_ipv6                    : vSysIPv6,
                sys_ipv4_or_v6              : vSysIPv4_or_v6,
                sys_port                    : vSysPort,
                time_zone                   : vTimeZone,
                true                        : vTrue,
                ulid                        : vUlid,
                url                         : vUrl,
                url_noquery                 : vUrlNoQuery,
                url_img                     : vUrlImage,
                url_vid                     : vUrlVideo,
                url_aud                     : vUrlAudio,
                url_med                     : vUrlMedia,
                uuid                        : vUuid,
                uuid_v1                     : vUuidV1,
                uuid_v2                     : vUuidV2,
                uuid_v3                     : vUuidV3,
                uuid_v4                     : vUuidV4,
                uuid_v5                     : vUuidV5,
                gt                          : vGreaterThan,
                gte                         : vGreaterThanOrEqual,
                lt                          : vLessThan,
                lte                         : vLessThanOrEqual,
                eq                          : equal,
                '?'                         : vUndefined,
            });
        });

        it('Should return a immutable frozen version of the configured rules', () => {
            const rules = Validator.rules;
            assert.ok(Object.isFrozen(rules));
        });

        it('Should take into account extended rules', () => {
            const fn = () => true;
            Validator.extend({myfunction: fn});
            assert.equal(Validator.rules.myfunction, fn);
        });
    });

    describe('@checkForm FN', () => {
        it('Should return false when passed a value that is not an instance of FormData', () => {
            for (const el of CONSTANTS.NOT_FORM_DATA) {
                assert.equal(new Validator({a: 'number', b: 'number'}).checkForm(el), false);
            }
        });

        it('Should call check and return false if that returns false', () => {
            const v = new Validator({a: 'number', b: 'number'});
            /* @ts-ignore */
            v.check = () => false;
            const form = new FormData();
            form.append('a', '50');
            form.append('b', '49');
            assert.equal(v.checkForm(form), false);
        });

        it('Should call check and return the parsed form data if that returns true', () => {
            const v = new Validator({a: 'number', b: 'number'});
            /* @ts-ignore */
            v.check = () => true;
            const form = new FormData();
            form.append('a', '50');
            form.append('b', '49');
            assert.deepEqual(v.checkForm(form), {
                a: 50,
                b: 49,
            });
        });
    });

    describe('@check FN', () => {
        it('Should return false when invalid', () => {
            assert.equal(new Validator({a: 'number', b: 'number'}).check({a: 20, b: false}), false);
        });

        it('Should return true when valid', () => {
            assert.ok(new Validator({a: 'number', b: 'number'}).check({a: 20, b: 42}));
        });

        it('Should validate to true if no data was passed and no rules were set up', () => {
            const validator = new Validator({});
            //  @ts-ignore
            assert.ok(validator.check());
        });

        it('Should validate to false if data was passed but rule does not exist', () => {
            const validator = new Validator({a: 'bla'});
            assert.equal(validator.check({a: 'hello'}), false);
        });

        it('Should validate to false if data was passed but deep retrieval isnt working for rule', () => {
            const validator = new Validator({a: {b: {c: 'string_ne'}}});
            assert.equal(validator.check({a: 'hello'}), false);
        });

        it('Should validate to false if a validator with an undefined rule was passed', () => {
            const validator = new Validator({a: {b: {c: 'string_no'}}});
            assert.equal(validator.check({a: {b: {c: 'hello'}}}), false);
        });
    });

    describe('@check FN - lexer: flag:sometimes (?)', () => {
        it('Should validate correctly if set and no value is passed', () => {
            assert.ok(new Validator({a: '?number'}).check({}));
        });

        it('Should not interfere with other validation rules', () => {
            assert.equal(new Validator({
                a: '?number',
                b: 'number|less_than:20',
            }).check({}), false);

            assert.equal(new Validator({
                a: '?number',
                b: 'number|less_than:20',
            }).check({a: 20, b: false}), false);

            assert.ok(new Validator({
                a: '?number',
                b: 'number|less_than:20',
            }).check({b: 15}));
        });
    });

    describe('@check FN - lexer: flag:parameter (<...>)', () => {
        it('Should allow link to passed parameter', () => {
            assert.ok(new Validator({a: 'equal_to:<foo>'}).check({a: 'hello', foo: 'hello'}));
        });

        it('Should fail if parameter is not passed', () => {
            assert.equal(new Validator({a: 'equal_to:<foo>'}).check({a: 'hello', foobar: 'hello'}), false);
        });

        it('Should allow multiple parameters inside the same ruleset', () => {
            assert.ok(new Validator({a: 'between:<min>,<max>'}).check({a: 5, min: 3, max: 7}));
        });

        it('Should allow multiple parameters inside the same config', () => {
            assert.ok(new Validator({a: 'in:<arr1>', b: 'in:<arr2>'}).check({a: 1, b: 2, arr1: [1, 3, 5], arr2: [2, 4, 6]}));
        });

        it('Should allow the same parameter on multiple rules inside the same config', () => {
            assert.ok(new Validator({a: 'in:<arr1>', b: 'in:<arr1>'}).check({a: 1, b: 2, arr1: [1, 2, 3]}));
        });
    });

    describe('@check FN - lexer: flag:not (!)', () => {
        it('Should validate correct if set and no value is passed', () => {
            assert.equal(new Validator({a: '!number'}).check({}), false);
        });

        it('Should validate correct if set and value is passed when using standard rule', () => {
            assert.ok(new Validator({a: '!number'}).check({a: 'hello'}));
            assert.equal(new Validator({a: '!number'}).check({a: 4}), false);
            assert.ok(new Validator({a: '!between:5,10'}).check({a: 4}));
            assert.equal(new Validator({a: '!between:5,10'}).check({a: 6}), false);
        });

        it('Should validate correct if set and value is passed when using parameter flag', () => {
            assert.equal(new Validator({a: '!equal_to:<foo>'}).check({a: 'hello', foo: 'hello'}), false);
        });

        it('Should validate correct if set and value is passed when using multiple validation rules', () => {
            assert.equal(new Validator({a: '!string|!equal_to:<foo>'}).check({a: 'foo', foo: 'hello'}), false);
            assert.equal(new Validator({a: '!string|!equal_to:<foo>'}).check({a: 'foo', foo: 'foo'}), false);
        });
    });

    describe('@check FN - lexer: iterable array', () => {
        it('Should throw if passed an invalid iterable config during rule creation', () => {
            assert.throws(
                () => new Validator({a: '[string'}),
                new TypeError('Iterable misconfiguration, verify rule config for [string')
            );

            assert.throws(
                () => new Validator({a: ']string'}),
                new TypeError('Iterable misconfiguration, verify rule config for ]string')
            );

            assert.throws(
                () => new Validator({a: '][string'}),
                new TypeError('Iterable misconfiguration, verify rule config for ][string')
            );
        });

        it('Should not throw if passed an iterable config during rule creation', () => {
            assert.doesNotThrow(() => new Validator({a: '[]string'}));
        });

        it('Should return invalid when passing a non-array to an iterable', () => {
            const validator = new Validator({a: '[]string'});
            assert.equal(validator.check({a: 'hello'}), false);
        });

        it('Should return valid when passing an empty array to an iterable', () => {
            const validator = new Validator({a: '[]string'});
            assert.ok(validator.check({a: []}));
        });

        it('Should allow validating an array of values', () => {
            const validator = new Validator({a: '[]string'});
            assert.ok(validator.check({a: ['hello', 'there']}));
            assert.equal(validator.check({a: ['hello', false]}), false);
            assert.equal(validator.check({a: ['hello', false, true]}), false);
        });

        it('Should allow validating an array of values with a \'?\' sometimes flag', () => {
            const validator = new Validator({a: '?[]string'});
            assert.ok(validator.check({a: ['hello', 'there']}));
            assert.ok(validator.check({}));
            assert.equal(validator.check({a: ['hello', false, 'foo', true]}), false);
        });

        it('Should allow validating an array of values with a \'?\' sometimes flag and parameter pass', () => {
            const validator = new Validator({a: '?[]string|in:<genders>'});
            assert.ok(validator.check({a: ['male', 'male', 'female', 'male', 'female'], genders: ['male', 'female', 'other']}));
            assert.ok(validator.check({genders: ['male', 'female', 'other']}));
            assert.equal(validator.check({a: ['dog'], genders: ['male', 'female', 'other']}), false);
        });

        it('Should allow validating an array of values with a \'?\' sometimes flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '?[unique]string|in:<genders>'});
            assert.equal(validator.check({a: ['male', 'male', 'female', 'male', 'female'], genders: ['male', 'female', 'other']}), false);
            assert.ok(validator.check({a: ['male', 'female'], genders: ['male', 'female', 'other']}));
        });

        it('Should allow validating an array of values with a \'!\' not flag and parameter pass', () => {
            const validator = new Validator({a: '[]string|!in:<genders>'});
            assert.ok(validator.check({a: ['bob', 'bob', 'john', 'bob', 'john'], genders: ['male', 'female', 'other']}));
            assert.equal(validator.check({a: ['male', 'female', 'female'], genders: ['male', 'female', 'other']}), false);
            assert.equal(validator.check({a: ['chicken', 'dog', 'female'], genders: ['male', 'female', 'other']}), false);
        });

        it('Should allow validating an array of values with a \'!\' not flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '[unique]string|!in:<genders>'});
            assert.ok(validator.check({a: ['bob', 'john'], genders: ['male', 'female', 'other']}));
            assert.equal(validator.check({a: ['male', 'female', 'female'], genders: ['male', 'female', 'other']}), false);
            assert.equal(validator.check({a: ['chicken', 'dog', 'female', 'dog'], genders: ['male', 'female', 'other']}), false);
        });

        it('Should return false if passed an array of values but a non-existing rule', () => {
            const validator = new Validator({a: '[unique]string_no'});
            assert.ok(!validator.check({a: ['bob', 'john']}));
        });
    });

    describe('@check FN - lexer: iterable array:unique', () => {
        it('Should return valid when array is unique', () => {
            const validator = new Validator({a: '[unique]string'});
            assert.ok(validator.check({a: ['a', 'b', 'c']}));
        });

        it('Should return invalid when array is not unique', () => {
            const validator = new Validator({a: '[unique]string'});
            assert.equal(validator.check({a: ['a', 'b', 'a']}), false);
        });

        it('Should return invalid when array is not unique when using numbers', () => {
            const validator = new Validator({a: '[unique]number'});
            assert.equal(validator.check({a: [1, 2, 2]}), false);
        });

        it('Should return invalid when array is not unique when using objects', () => {
            const validator = new Validator({a: '[unique]object'});
            assert.equal(validator.check({a: [{a: 1}, {b: 2}, {b: 2}]}), false);
        });

        it('Should return invalid when array is not unique and doesnt match rules', () => {
            const validator = new Validator({a: '[unique]integer'});
            assert.equal(validator.check({a: [1, 2, 'a', 2]}), false);
        });

        it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
            const validator = new Validator({a: '[unique]integer'});
            assert.equal(validator.check({a: [1, 2, 'a', 2, 2, 2.2]}), false);
        });
    });

    describe('@check FN - lexer: iterable array:max', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[max:5]string'});
            assert.ok(validator.check({a: ['hello', 'there']}));
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            assert.ok(validator.check({a: ['1', '2', '3', '4', '5']}));
        });

        it('Should return invalid when above boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            assert.equal(validator.check({a: ['1', '2', '3', '4', '5', '6']}), false);
        });

        it('Should only return iterable invalidity and not go into val evaluation when above boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            assert.equal(validator.check({a: ['1', '2', '3', '4', 5, '6']}), false);
        });

        it('Should return iterable invalidity and go into val evaluation when at or below boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            assert.equal(validator.check({a: ['1', false, false, '2', false]}), false);
            assert.equal(validator.check({a: [false, '1', '2', '3']}), false);
        });
    });

    describe('@check FN - lexer: iterable array:min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[min:5]string'});
            assert.ok(validator.check({a: ['hello', 'there', 'this', 'is', 'cool', 'right']}));
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '[min:5]string'});
            assert.ok(validator.check({a: ['hello', 'there', 'this', 'is', 'cool']}));
        });

        it('Should return invalid when below boundary', () => {
            const validator = new Validator({a: '[min:3]string'});
            assert.equal(validator.check({a: ['1', '2']}), false);
        });

        it('Should only return iterable invalidity and not go into val evaluation when below boundary', () => {
            const validator = new Validator({a: '[min:4]string'});
            assert.equal(validator.check({a: ['1', false]}), false);
        });

        it('Should return iterable invalidity and go into val evaluation when at or above boundary', () => {
            const validator = new Validator({a: '[min:4]string'});
            assert.equal(validator.check({a: ['1', false, false, '2']}), false);
            assert.equal(validator.check({a: ['1', false, '2', '3', false]}), false);
        });
    });

    describe('@check FN - lexer: iterable array:max+min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            assert.ok(validator.check({a: ['hello', 'there', 'cool']}));
        });

        it('Should return valid when at top boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            assert.ok(validator.check({a: ['1', '2', '3', '4', '5']}));
        });

        it('Should return invalid when above top boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            assert.equal(validator.check({a: ['1', '2', '3', '4', '5', '6']}), false);
        });

        it('Should return valid when at bottom boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            assert.ok(validator.check({a: ['1', '2']}));
        });

        it('Should return invalid when below bottom boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            assert.equal(validator.check({a: ['1']}), false);
        });
    });

    describe('@check FN - lexer: iterable object', () => {
        it('Should throw if passed an invalid iterable config during rule creation', () => {
            assert.throws(
                () => new Validator({a: '{string'}),
                new TypeError('Iterable misconfiguration, verify rule config for {string')
            );

            assert.throws(
                () => new Validator({a: '}string'}),
                new TypeError('Iterable misconfiguration, verify rule config for }string')
            );

            assert.throws(
                () => new Validator({a: '}{string'}),
                new TypeError('Iterable misconfiguration, verify rule config for }{string')
            );
        });

        it('Should not throw if passed an iterable config during rule creation', () => {
            assert.doesNotThrow(() => new Validator({a: '{}string'}));
        });

        it('Should return invalid when passing a non-object to an iterable', () => {
            const validator = new Validator({a: '{}string'});
            assert.equal(validator.check({a: 'hello'}), false);
        });

        it('Should return valid when passing an empty object to an iterable', () => {
            const validator = new Validator({a: '{}string'});
            assert.ok(validator.check({a: {}}));
        });

        it('Should allow validating an object', () => {
            const validator = new Validator({a: '{}string'});
            assert.ok(validator.check({a: {b: 'hello', c: 'there'}}));
            assert.equal(validator.check({a: {b: 'hello', c: false}}), false);
            assert.equal(validator.check({a: {b: 'hello', c: false, d: true}}), false);
        });

        it('Should allow validating an object with a \'?\' sometimes flag', () => {
            const validator = new Validator({a: '?{}string'});
            assert.ok(validator.check({a: {b: 'hello', c: 'there'}}));
            assert.ok(validator.check({}));
            assert.equal(validator.check({a: {b: 'hello', c: false, d: 'foo', e: true}}), false);
        });

        it('Should allow validating an object with a \'?\' sometimes flag and parameter pass', () => {
            const validator = new Validator({a: '?{}string|in:<genders>'});
            assert.ok(validator.check({a: {b: 'male', c: 'male', d: 'female', e: 'male'}, genders: ['male', 'female', 'other']}));
            assert.ok(validator.check({genders: ['male', 'female', 'other']}));
            assert.equal(validator.check({a: {b: 'dog'}, genders: ['male', 'female', 'other']}), false);
        });

        it('Should allow validating an object with a \'?\' sometimes flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '?{unique}string|in:<genders>'});
            assert.equal(validator.check({a: {b: 'male', c: 'male', d: 'female', e: 'male'}, genders: ['male', 'female', 'other']}), false);
            assert.ok(validator.check({a: {b: 'male', c: 'female'}, genders: ['male', 'female', 'other']}));
        });

        it('Should allow validating an object with a \'!\' not flag and parameter pass', () => {
            const validator = new Validator({a: '{}string|!in:<genders>'});
            assert.ok(validator.check({a: {b: 'bob', c: 'bob', d: 'john', e: 'bob', f: 'john'}, genders: ['male', 'female', 'other']}));
            assert.equal(validator.check({a: {b: 'male', c: 'female', d: 'female'}, genders: ['male', 'female', 'other']}), false);
            assert.equal(validator.check({a: {b: 'chicken', c: 'dog', d: 'female'}, genders: ['male', 'female', 'other']}), false);
        });

        it('Should allow validating an object with a \'!\' not flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '{unique}string|!in:<genders>'});
            assert.ok(validator.check({a: {b: 'bob', c: 'john'}, genders: ['male', 'female', 'other']}));
            assert.equal(validator.check({a: {b: 'male', c: 'female', d: 'female'}, genders: ['male', 'female', 'other']}), false);
            assert.equal(validator.check({a: {b: 'chicken', c: 'dog', d: 'female'}, genders: ['male', 'female', 'other']}), false);
        });
    });

    describe('@check FN - lexer: iterable object:unique', () => {
        it('Should return valid when array is unique', () => {
            const validator = new Validator({a: '{unique}string'});
            assert.ok(validator.check({a: {b: 'a', c: 'b', d: 'c'}}));
        });

        it('Should return invalid when array is not unique', () => {
            const validator = new Validator({a: '{unique}string'});
            assert.equal(validator.check({a: {b: 'a', c: 'b', d: 'a'}}), false);
        });

        it('Should return invalid when array is not unique when using numbers', () => {
            const validator = new Validator({a: '{unique}number'});
            assert.equal(validator.check({a: {b: 1, c: 2, d: 2}}), false);
        });

        it('Should return invalid when array is not unique when using objects', () => {
            const validator = new Validator({a: '{unique}object'});
            assert.equal(validator.check({a: {b: {a: 1}, c: {b: 2}, d: {b: 2}}}), false);
        });

        it('Should return invalid when array is not unique and doesnt match rules', () => {
            const validator = new Validator({a: '{unique}integer'});
            assert.equal(validator.check({a: {b: 1, c: 2, d: 'a', e: 2}}), false);
        });

        it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
            const validator = new Validator({a: '{unique}integer'});
            assert.equal(validator.check({a: {b: 1, c: 2, d: 'a', e: 2, f: 2, g: 2.2}}), false);
        });
    });

    describe('@check FN - lexer: iterable object:max', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '{max:5}string'});
            assert.ok(validator.check({a: {b: 'hello', c: 'there'}}));
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            assert.ok(validator.check({a: {b: '1', c: '2', d: '3', e: '4', f: '5'}}));
        });

        it('Should return invalid when above boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            assert.equal(validator.check({a: {b: '1', c: '2', d: '3', e: '4', f: '5', g: '6'}}), false);
        });

        it('Should only return iterable invalidity and not go into val evaluation when above boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            assert.equal(validator.check({a: {b: '1', c: '2', d: '3', e: '4', f: 5, g: '6'}}), false);
        });

        it('Should return iterable invalidity and go into val evaluation when at or below boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            assert.equal(validator.check({a: {b: '1', c: false, d: false, e: '2', f: false}}), false);
            assert.equal(validator.check({a: {b: false, c: '1', d: '2', e: '3'}}), false);
        });
    });

    describe('@check FN - lexer: iterable object:min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '{min:5}string'});
            assert.ok(validator.check({a: {b: 'hello', c: 'there', d: 'this', e: 'is', f: 'cool', g: 'right'}}));
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '{min:5}string'});
            assert.ok(validator.check({a: {b: 'hello', c: 'there', d: 'this', e: 'is', f: 'cool'}}));
        });

        it('Should return invalid when below boundary', () => {
            const validator = new Validator({a: '{min:3}string'});
            assert.equal(validator.check({a: {b: '1', c: '2'}}), false);
        });

        it('Should only return iterable invalidity and not go into val evaluation when below boundary', () => {
            const validator = new Validator({a: '{min:4}string'});
            assert.equal(validator.check({a: {b: '1', c: false}}), false);
        });

        it('Should return iterable invalidity and go into val evaluation when at or above boundary', () => {
            const validator = new Validator({a: '{min:4}string'});
            assert.equal(validator.check({a: {b: '1', c: false, d: false, e: '2'}}), false);
            assert.equal(validator.check({a: {b: '1', c: false, d: '2', e: '3', f: false}}), false);
        });
    });

    describe('@check FN - lexer: iterable object:max+min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            assert.ok(validator.check({a: {b: 'hello', c: 'there', d: 'cool'}}));
        });

        it('Should return valid when at top boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            assert.ok(validator.check({a: {b: '1', c: '2', d: '3', e: '4', f: '5'}}));
        });

        it('Should return invalid when above top boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            assert.equal(validator.check({a: {b: '1', c: '2', d: '3', e: '4', f: '5', g: '6'}}), false);
        });

        it('Should return valid when at bottom boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            assert.ok(validator.check({a: {b: '1', c: '2'}}));
        });

        it('Should return invalid when below bottom boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            assert.equal(validator.check({a: {b: '1'}}), false);
        });
    });

    describe('@check FN - lexer: groups', () => {
        it('Should return valid when one of both rules are valid', () => {
            const validator = new Validator({a: ['[max:5|min:2]string', 'false']});
            assert.ok(validator.check({a: ['hello', 'there', 'cool']}));
            assert.ok(validator.check({a: false}));
        });

        it('Should return valid when using rules with an underscore in them and one of them is valid', () => {
            assert.ok(new Validator({a: ['string_ne|min:1|max:128', 'false']}).check({a: 'hello'}));
            assert.ok(new Validator({a: ['string_ne|min:1|max:128', 'false']}).check({a: false}));
        });

        it('Should return valid when using rules with a dash in them and one of them is valid', () => {
            Validator.extend({'my-test-rule': val => val === true});
            assert.ok(new Validator({a: ['my-test-rule', 'false']}).check({a: true}));
        });

        it('Should return valid when all rules are valid', () => {
            const validator = new Validator({a: ['[max:5|min:2]string', '[max:5|min:3]string_ne']});
            assert.ok(validator.check({a: ['hello', 'there', 'cool']}));
        });

        it('Should return valid when no rules are valid but sometimes flag is set and its the only rule', () => {
            const validator = new Validator({a: ['?', 'guid', 'false']});
            assert.ok(validator.check({}));
        });

        it('Should return valid when no rules are valid but sometimes flag is set and multiple fields but those are valid too', () => {
            const validator = new Validator({a: ['?', 'guid', 'false'], b: 'integer|between:10,50'});
            assert.ok(validator.check({b: 42}));
        });

        it('Should return invalid when both rules are invalid and correctly set error messages as multi-dimensional array', () => {
            const validator = new Validator({a: ['guid', 'false']});
            assert.equal(validator.check({a: 'foobar'}), false);
        });

        it('Should return invalid and correctly set error messages as multi-dimensional array with multiple rules to a group', () => {
            const validator = new Validator({a: ['integer|between:20,42', 'false']});
            assert.equal(validator.check({a: 'foobar'}), false);
        });

        it('Should check correctly with parameterization', () => {
            const validator = new Validator({a: ['in:<nums>', '[unique|min:1|max:10]in:<meta.strings>']});
            assert.equal(validator.check({a: 'foobar', nums: [1, 2, 3], meta: {strings: ['male', 'female', 'other', 'undecided']}}), false);
            assert.ok(validator.check({a: 2, nums: [1, 2, 3], meta: {strings: ['male', 'female', 'other', 'undecided']}}));
            assert.ok(validator.check({a: ['other'], nums: [1, 2, 3], meta: {strings: ['male', 'female', 'other', 'undecided']}}));
        });
    });

    describe('@check:FormData', () => {
        describe('FN', () => {
            it('Should return false when invalid', () => {
                const form = new FormData();
                form.append('a', '20');
                form.append('b', 'false');
                assert.equal(new Validator({a: 'number', b: 'number'}).check(form), false);
            });

            it('Should return true when valid', () => {
                const form = new FormData();
                form.append('a', '20');
                form.append('b', '42');
                assert.ok(new Validator({a: 'number', b: 'number'}).check(form));
            });
        });

        describe('FN - lexer: flag:sometimes (?)', () => {
            it('Should validate correctly if set and no value is passed', () => {
                assert.ok(new Validator({a: '?number'}).check(new FormData()));
            });

            it('Should not interfere with other validation rules', () => {
                assert.equal(new Validator({
                    a: '?number',
                    b: 'number|less_than:20',
                }).check(new FormData()), false);

                const form = new FormData();
                form.append('a', '20');
                form.append('b', 'false');
                assert.equal(new Validator({
                    a: '?number',
                    b: 'number|less_than:20',
                }).check(form), false);

                const form2 = new FormData();
                form2.append('b', '15');
                assert.ok(new Validator({
                    a: '?number',
                    b: 'number|less_than:20',
                }).check(form2));
            });
        });

        describe('FN - lexer: flag:parameter (<...>)', () => {
            it('Should allow link to passed parameter', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foo', 'hello');
                assert.ok(new Validator({a: 'equal_to:<foo>'}).check(form));
            });

            it('Should fail if parameter is not passed', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foobar', 'hello');
                assert.equal(new Validator({a: 'equal_to:<foo>'}).check(form), false);
            });

            it('Should allow multiple parameters inside the same ruleset', () => {
                const form = new FormData();
                form.append('a', '5');
                form.append('min', '3');
                form.append('max', '7');
                assert.ok(new Validator({a: 'between:<min>,<max>'}).check(form));
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
                assert.ok(new Validator({a: 'in:<arr1>', b: 'in:<arr2>'}).check(form));
            });

            it('Should allow the same parameter on multiple rules inside the same config', () => {
                const form = new FormData();
                form.append('a', '1');
                form.append('b', '2');
                form.append('arr1', '1');
                form.append('arr1', '2');
                form.append('arr1', '3');
                assert.ok(new Validator({a: 'in:<arr1>', b: 'in:<arr1>'}).check(form));
            });
        });

        describe('FN - lexer: flag:not (!)', () => {
            it('Should validate correct if set and no value is passed', () => {
                assert.equal(new Validator({a: '!number'}).check(new FormData()), false);
            });

            it('Should validate correct if set and value is passed when using standard rule', () => {
                const form = new FormData();
                form.append('a', 'hello');
                assert.ok(new Validator({a: '!number'}).check(form));

                const form2 = new FormData();
                form2.append('a', '4');
                assert.equal(new Validator({a: '!number'}).check(form2), false);
                assert.ok(new Validator({a: '!between:5,10'}).check(form2));

                const form3 = new FormData();
                form3.append('a', '6');
                assert.equal(new Validator({a: '!between:5,10'}).check(form3), false);
            });

            it('Should validate correct if set and value is passed when using parameter flag', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foo', 'hello');
                assert.equal(new Validator({a: '!equal_to:<foo>'}).check(form), false);
            });

            it('Should validate correct if set and value is passed when using multiple validation rules', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foo', 'hello');
                assert.equal(new Validator({a: '!string|!equal_to:<foo>'}).check(form), false);

                const form2 = new FormData();
                form2.append('a', 'hello');
                form2.append('foo', 'foo');
                assert.equal(new Validator({a: '!string|!equal_to:<foo>'}).check(form2), false);
            });
        });

        describe('FN - lexer: iterable array', () => {
            it('Should return invalid when passing a non-array to an iterable', () => {
                const validator = new Validator({a: '[]string'});
                const form = new FormData();
                form.append('a', 'hello');
                assert.equal(validator.check(form), false);
            });

            it('Should allow validating an array of values', () => {
                const validator = new Validator({a: '[]string'});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                assert.ok(validator.check(form));

                const form2 = new FormData();
                form.append('a', 'hello');
                form.append('a', 'false');
                assert.equal(validator.check(form2), false);
            });

            it('Should allow validating an array of values with a \'?\' sometimes flag', () => {
                const validator = new Validator({a: '?[]string'});

                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                assert.ok(validator.check(form));
                assert.ok(validator.check(new FormData()));
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
                assert.ok(validator.check(form));

                const form2 = new FormData();
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                assert.ok(validator.check(form2));

                const form3 = new FormData();
                form3.append('a', 'dog');
                form3.append('a', 'male');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                assert.equal(validator.check(form3), false);
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
                assert.equal(validator.check(form), false);

                const form2 = new FormData();
                form.append('a', 'male');
                form.append('a', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                assert.ok(validator.check(form2));
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
                assert.ok(validator.check(form));

                const form2 = new FormData();
                form2.append('a', 'male');
                form2.append('a', 'male');
                form2.append('a', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                assert.equal(validator.check(form2), false);

                const form3 = new FormData();
                form3.append('a', 'chicken');
                form3.append('a', 'dog');
                form3.append('a', 'female');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                assert.equal(validator.check(form3), false);
            });

            it('Should allow validating an array of values with a \'!\' not flag, uniqueness and parameter pass', () => {
                const validator = new Validator({a: '[unique]string|!in:<genders>'});
                const form = new FormData();
                form.append('a', 'bob');
                form.append('a', 'john');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                assert.ok(validator.check(form));

                const form2 = new FormData();
                form2.append('a', 'male');
                form2.append('a', 'female');
                form2.append('a', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                assert.equal(validator.check(form2), false);

                const form3 = new FormData();
                form3.append('a', 'chicken');
                form3.append('a', 'dog');
                form3.append('a', 'chicken');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                assert.equal(validator.check(form3), false);
            });
        });

        describe('FN - lexer: iterable array:unique', () => {
            it('Should return valid when array is unique', () => {
                const validator = new Validator({a: '[unique]string'});
                const form = new FormData();
                form.append('a[0]', 'a');
                form.append('a[1]', 'b');
                form.append('a[2]', 'c');
                assert.ok(validator.check(form));
            });

            it('Should return invalid when array is not unique', () => {
                const validator = new Validator({a: '[unique]string'});
                const form = new FormData();
                form.append('a[0]', 'a');
                form.append('a[1]', 'b');
                form.append('a[2]', 'a');
                assert.equal(validator.check(form), false);
            });

            it('Should return invalid when array is not unique when using numbers', () => {
                const validator = new Validator({a: '[unique]number'});
                const form = new FormData();
                form.append('a[0]', '1');
                form.append('a[1]', '2');
                form.append('a[2]', '2');
                assert.equal(validator.check(form), false);
            });

            it('Should return invalid when array is not unique when using objects', () => {
                const validator = new Validator({a: '[unique]object'});
                const form = new FormData();
                form.append('a[0].a', '1');
                form.append('a[1].b', '2');
                form.append('a[2].b', '2');
                assert.equal(validator.check(form), false);
            });

            it('Should return invalid when array is not unique and doesnt match rules', () => {
                const validator = new Validator({a: '[unique]integer'});
                const form = new FormData();
                form.append('a[0]', '1');
                form.append('a[1]', '2');
                form.append('a[2]', 'a');
                form.append('a[3]', '2');
                assert.equal(validator.check(form), false);
            });

            it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
                const validator = new Validator({a: '[unique]integer'});
                const form = new FormData();
                form.append('a[0]', '1');
                form.append('a[1]', '2');
                form.append('a[2]', 'a');
                form.append('a[3]', '2');
                form.append('a[4]', '2.2');
                assert.equal(validator.check(form), false);
            });
        });

        describe('FN - lexer: iterable array:max+min', () => {
            it('Should return valid when within boundaries', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                form.append('a', 'cool');
                assert.ok(validator.check(form));
            });

            it('Should return valid when at top boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                form.append('a', 'a2');
                form.append('a', 'a3');
                form.append('a', 'a4');
                form.append('a', 'a5');
                assert.ok(validator.check(form));
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
                assert.equal(validator.check(form), false);
            });

            it('Should return valid when at bottom boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                form.append('a', 'a2');
                assert.ok(validator.check(form));
            });

            it('Should return invalid when below bottom boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                assert.equal(validator.check(form), false);
            });
        });

        describe('FN - lexer: iterable object', () => {
            it('Should return invalid when passing a non-object to an iterable', () => {
                const validator = new Validator({a: '{}string'});
                const form = new FormData();
                form.append('a', 'hello');
                assert.equal(validator.check(form), false);
            });

            it('Should allow validating an object', () => {
                const validator = new Validator({a: '{}string'});
                const form = new FormData();
                form.append('a.b', 'hello');
                form.append('a.c', 'there');
                assert.ok(validator.check(form));

                const form2 = new FormData();
                form2.append('a.b', 'hello');
                form2.append('a.c', 'false');
                assert.equal(validator.check(form2), false);
            });

            it('Should allow validating an object with a \'?\' sometimes flag', () => {
                const validator = new Validator({a: '?{}string'});
                const form = new FormData();
                form.append('a.b', 'hello');
                form.append('a.c', 'there');
                assert.ok(validator.check(form));
                assert.ok(validator.check(new FormData()));

                const form2 = new FormData();
                form2.append('a.b', 'hello');
                form2.append('a.c', 'false');
                assert.equal(validator.check(form2), false);
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
                assert.ok(validator.check(form));

                const form2 = new FormData();
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                assert.ok(validator.check(form2));

                const form3 = new FormData();
                form3.append('a.b', 'dog');
                form3.append('a.c', 'male');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                assert.equal(validator.check(form3), false);
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
                assert.equal(validator.check(form), false);

                const form2 = new FormData();
                form.append('a.b', 'male');
                form.append('a.c', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                assert.ok(validator.check(form2));
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
                assert.ok(validator.check(form));

                const form2 = new FormData();
                form2.append('a.b', 'male');
                form2.append('a.c', 'male');
                form2.append('a.d', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                assert.equal(validator.check(form2), false);

                const form3 = new FormData();
                form3.append('a.b', 'chicken');
                form3.append('a.c', 'dog');
                form3.append('a.d', 'female');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                assert.equal(validator.check(form3), false);
            });

            it('Should allow validating an object with a \'!\' not flag, uniqueness and parameter pass', () => {
                const validator = new Validator({a: '{unique}string|!in:<genders>'});
                const form = new FormData();
                form.append('a.b', 'bob');
                form.append('a.c', 'john');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                assert.ok(validator.check(form));

                const form2 = new FormData();
                form2.append('a.b', 'male');
                form2.append('a.c', 'female');
                form2.append('a.d', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                assert.equal(validator.check(form2), false);

                const form3 = new FormData();
                form3.append('a.b', 'chicken');
                form3.append('a.c', 'dog');
                form3.append('a.d', 'chicken');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                assert.equal(validator.check(form3), false);
            });
        });

        describe('FN - lexer: iterable object:unique', () => {
            it('Should return valid when array is unique', () => {
                const validator = new Validator({a: '{unique}string'});
                const form = new FormData();
                form.append('a.b', 'a');
                form.append('a.c', 'b');
                form.append('a.d', 'c');
                assert.ok(validator.check(form));
            });

            it('Should return invalid when array is not unique', () => {
                const validator = new Validator({a: '{unique}string'});
                const form = new FormData();
                form.append('a.b', 'a');
                form.append('a.c', 'b');
                form.append('a.d', 'a');
                assert.equal(validator.check(form), false);
            });

            it('Should return invalid when array is not unique when using numbers', () => {
                const validator = new Validator({a: '{unique}number'});
                const form = new FormData();
                form.append('a.b', '1');
                form.append('a.c', '2');
                form.append('a.d', '2');
                assert.equal(validator.check(form), false);
            });

            it('Should return invalid when array is not unique when using objects', () => {
                const validator = new Validator({a: '{unique}object'});
                const form = new FormData();
                form.append('a.b.a', '1');
                form.append('a.c.b', '2');
                form.append('a.d.a', '1');
                assert.equal(validator.check(form), false);
            });

            it('Should return invalid when array is not unique and doesnt match rules', () => {
                const validator = new Validator({a: '{unique}integer'});
                const form = new FormData();
                form.append('a.b', '1');
                form.append('a.c', '2');
                form.append('a.d', 'a');
                form.append('a.e', '2');
                assert.equal(validator.check(form), false);
            });

            it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
                const validator = new Validator({a: '{unique}integer'});
                const form = new FormData();
                form.append('a.b', '1');
                form.append('a.c', '2');
                form.append('a.d', 'a');
                form.append('a.e', '2');
                form.append('a.f', '2.2');
                assert.equal(validator.check(form), false);
            });
        });

        describe('FN - lexer: iterable object:max+min', () => {
            it('Should return valid when within boundaries', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'hello');
                form.append('a.c', 'there');
                form.append('a.d', 'cool');
                assert.ok(validator.check(form));
            });

            it('Should return valid when at top boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                form.append('a.c', 'a2');
                form.append('a.d', 'a3');
                form.append('a.e', 'a4');
                form.append('a.f', 'a5');
                assert.ok(validator.check(form));
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
                assert.equal(validator.check(form), false);
            });

            it('Should return valid when at bottom boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                form.append('a.c', 'a2');
                assert.ok(validator.check(form));
            });

            it('Should return invalid when below bottom boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                assert.equal(validator.check(form), false);
            });
        });

        describe('FN - lexer: groups', () => {
            it('Should return valid when one of both rules are valid', () => {
                const validator = new Validator({a: ['[max:5|min:2]string', 'false']});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                form.append('a', 'cool');
                assert.ok(validator.check(form));

                const form2 = new FormData();
                form2.append('a', 'false');
                assert.ok(validator.check(form2));
            });

            it('Should return valid when using rules with an underscore in them and one of them is valid', () => {
                const form = new FormData();
                form.append('a', 'hello');
                assert.ok(new Validator({a: ['string_ne|min:1|max:128', 'false']}).check(form));

                const form2 = new FormData();
                form2.append('a', 'false');
                assert.ok(new Validator({a: ['string_ne|min:1|max:128', 'false']}).check(form2));
            });

            it('Should return valid when using rules with a dash in them and one of them is valid', () => {
                Validator.extend({'my-test-rule': val => val === true});
                const form = new FormData();
                form.append('a', 'true');
                assert.ok(new Validator({a: ['my-test-rule', 'false']}).check(form));
            });

            it('Should return valid when all rules are valid', () => {
                const validator = new Validator({a: ['[max:5|min:2]string', '[max:5|min:3]string_ne']});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                form.append('a', 'cool');
                assert.ok(validator.check(form));
            });

            it('Should return valid when no rules are valid but sometimes flag is set and its the only rule', () => {
                const validator = new Validator({a: ['?', 'guid', 'false']});
                assert.ok(validator.check(new FormData()));
            });

            it('Should return valid when no rules are valid but sometimes flag is set and multiple fields but those are valid too', () => {
                const validator = new Validator({a: ['?', 'guid', 'false'], b: 'integer|between:10,50'});
                const form = new FormData();
                form.append('b', '42');
                assert.ok(validator.check(form));
            });

            it('Should return invalid when both rules are invalid and correctly set error messages as multi-dimensional array', () => {
                const validator = new Validator({a: ['guid', 'false']});
                const form = new FormData();
                form.append('a', 'foobar');
                assert.equal(validator.check(form), false);
            });

            it('Should return invalid and correctly set error messages as multi-dimensional array with multiple rules to a group', () => {
                const validator = new Validator({a: ['integer|between:20,42', 'false']});
                const form = new FormData();
                form.append('a', 'foobar');
                assert.equal(validator.check(form), false);
            });
        });
    });

    describe('@validate FN', () => {
        it('Should return a properly formatted evaluation object', () => {
            const evaluation = new Validator({a: 'number', b: 'number'}).validate({a: 20, b: false});

            //  Evaluate object
            assert.equal(typeof evaluation, 'object');
            assert.deepEqual(Object.keys(evaluation), ['is_valid', 'count', 'errors']);

            //  Evaluate object structure: is_valid
            assert.equal(typeof evaluation.is_valid, 'boolean');

            //  Evaluate object structure: count
            assert.equal(typeof evaluation.count, 'number');
            assert.ok(evaluation.count === 1);

            //  Evaluate object structure: errors
            assert.equal(typeof evaluation.errors, 'object');
            assert.deepEqual(evaluation.errors, {
                b: [{msg: 'number', params: []}],
            });
        });

        it('Should have errors where the object contains a msg and a params property', () => {
            const evaluation = new Validator({a: 'number'}).validate({a: 'hello'});
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'greater_than', params: ['150']},
                    ],
                },
            });
        });

        it('Should validate to true if no data was passed and no rules were set up', () => {
            const validator = new Validator({});
            //  @ts-ignore
            const evaluation = validator.validate();
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should validate to false with \'NO_DATA\' if no data was passed and rules were set up', () => {
            const validator = new Validator({a: 'string_ne'});
            //  @ts-ignore
            const evaluation = validator.validate();
            assert.deepEqual(evaluation, {is_valid: false, count: 1, errors: 'NO_DATA'});
        });

        it('Should validate to false if data was passed but rule does not exist', () => {
            const validator = new Validator({a: 'bla'});
            const evaluation = validator.validate({a: 'hello'});
            assert.deepEqual(evaluation, {is_valid: false, count: 1, errors: {a: [{msg: 'rule_not_found', params: ['bla']}]}});
        });

        it('Should validate to false if data was passed but deep retrieval isnt working for rule', () => {
            const validator = new Validator({a: {b: {c: 'string_ne'}}});
            assert.deepEqual(validator.validate({a: 'hello'}), {
                is_valid: false,
                count: 1,
                errors: {
                    'a.b.c': [{msg: 'not_found', params: []}],
                },
            });
        });
    });

    describe('@validate FN - lexer: flag:sometimes (?)', () => {
        it('Should validate correctly if set and no value is passed', () => {
            const evaluation = new Validator({a: '?number'}).validate({});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should not interfere with other validation rules', () => {
            const evaluation = new Validator({
                a: '?number',
                b: 'number|less_than:20',
            }).validate({});
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation2, {
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

    describe('@validate FN - lexer: flag:parameter (<...>)', () => {
        it('Should allow link to passed parameter', () => {
            const evaluation = new Validator({a: 'equal_to:<foo>'}).validate({a: 'hello', foo: 'hello'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should fail if parameter is not passed', () => {
            const evaluation = new Validator({a: 'equal_to:<foo>'}).validate({a: 'hello', foobar: 'hello'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'equal_to', params: [undefined]}],
                },
            });
        });

        it('Should allow multiple parameters inside the same ruleset', () => {
            const evaluation = new Validator({a: 'between:<min>,<max>'}).validate({a: 5, min: 3, max: 7});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should allow multiple parameters inside the same config', () => {
            const evaluation = new Validator({a: 'in:<arr1>', b: 'in:<arr2>'}).validate({a: 1, b: 2, arr1: [1, 3, 5], arr2: [2, 4, 6]});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should allow the same parameter on multiple rules inside the same config', () => {
            const evaluation = new Validator({a: 'in:<arr1>', b: 'in:<arr1>'}).validate({a: 1, b: 2, arr1: [1, 2, 3]});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });
    });

    describe('@validate FN - lexer: flag:not (!)', () => {
        it('Should validate correct if set and no value is passed', () => {
            const evaluation = new Validator({a: '!number'}).validate({});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'not_found', params: []}],
                },
            });
        });

        it('Should validate correct if set and value is passed when using standard rule', () => {
            const evaluation = new Validator({a: '!number'}).validate({a: 'hello'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            const evaluation2 = new Validator({a: '!number'}).validate({a: 4});
            assert.deepEqual(evaluation2, {
                is_valid:  false,
                count: 1,
                errors: {
                    a: [{msg: 'not_number', params: []}],
                },
            });

            const evaluation3 = new Validator({a: '!between:5,10'}).validate({a: 4});
            assert.deepEqual(evaluation3, {is_valid: true, count: 0, errors: {}});

            const evaluation4 = new Validator({a: '!between:5,10'}).validate({a: 6});
            assert.deepEqual(evaluation4, {
                is_valid:  false,
                count: 1,
                errors: {
                    a: [{msg: 'not_between', params: ['5', '10']}],
                },
            });
        });

        it('Should validate correct if set and value is passed when using parameter flag', () => {
            const evaluation = new Validator({a: '!equal_to:<foo>'}).validate({a: 'hello', foo: 'hello'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'not_equal_to', params: ['hello']}],
                },
            });
        });

        it('Should validate correct if set and value is passed when using multiple validation rules', () => {
            const evaluation = new Validator({a: '!string|!equal_to:<foo>'}).validate({a: 'foo', foo: 'hello'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'not_string', params: []}],
                },
            });

            const evaluation2 = new Validator({a: '!string|!equal_to:<foo>'}).validate({a: 'foo', foo: 'foo'});
            assert.deepEqual(evaluation2, {
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

    describe('@validate FN - lexer: iterable array', () => {
        it('Should throw if passed an invalid iterable config during rule creation', () => {
            assert.throws(
                () => new Validator({a: '[string'}),
                new TypeError('Iterable misconfiguration, verify rule config for [string')
            );

            assert.throws(
                () => new Validator({a: ']string'}),
                new TypeError('Iterable misconfiguration, verify rule config for ]string')
            );

            assert.throws(
                () => new Validator({a: '][string'}),
                new TypeError('Iterable misconfiguration, verify rule config for ][string')
            );
        });

        it('Should not throw if passed an iterable config during rule creation', () => {
            assert.doesNotThrow(() => new Validator({a: '[]string'}));
        });

        it('Should return invalid when passing a non-array to an iterable', () => {
            const validator = new Validator({a: '[]string'});
            const evaluation = validator.validate({a: 'hello'});
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should allow validating an array of values', () => {
            const validator = new Validator({a: '[]string'});
            let evaluation = validator.validate({a: ['hello', 'there']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({a: ['hello', false]});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'string', idx: 1, params: []},
                    ],
                },
            });

            evaluation = validator.validate({a: ['hello', false, true]});
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({a: ['hello', false, 'foo', true]});
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({genders: ['male', 'female', 'other']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({a: ['dog'], genders: ['male', 'female', 'other']});
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {msg: 'iterable_unique', params: []},
                    ],
                },
            });

            evaluation = validator.validate({a: ['male', 'female'], genders: ['male', 'female', 'other']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should allow validating an array of values with a \'!\' not flag and parameter pass', () => {
            const validator = new Validator({a: '[]string|!in:<genders>'});
            let evaluation = validator.validate({a: ['bob', 'bob', 'john', 'bob', 'john'], genders: ['male', 'female', 'other']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({a: ['male', 'female', 'female'], genders: ['male', 'female', 'other']});
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            evaluation = validator.validate({a: ['male', 'female', 'female'], genders: ['male', 'female', 'other']});
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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

    describe('@validate FN - lexer: iterable array:unique', () => {
        it('Should return valid when array is unique', () => {
            const validator = new Validator({a: '[unique]string'});
            const evaluation = validator.validate({a: ['a', 'b', 'c']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should return invalid when array is not unique', () => {
            const validator = new Validator({a: '[unique]string'});
            const evaluation = validator.validate({a: ['a', 'b', 'a']});
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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

    describe('@validate FN - lexer: iterable array:max', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[max:5]string'});
            const evaluation = validator.validate({a: ['hello', 'there']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', '5']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should return invalid when above boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', '5', '6']});
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation2, {
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

    describe('@validate FN - lexer: iterable array:min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[min:5]string'});
            const evaluation = validator.validate({a: ['hello', 'there', 'this', 'is', 'cool', 'right']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '[min:5]string'});
            const evaluation = validator.validate({a: ['hello', 'there', 'this', 'is', 'cool']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should return invalid when below boundary', () => {
            const validator = new Validator({a: '[min:3]string'});
            const evaluation = validator.validate({a: ['1', '2']});
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation2, {
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

    describe('@validate FN - lexer: iterable array:max+min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['hello', 'there', 'cool']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should return valid when at top boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', '5']});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should return invalid when above top boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', '5', '6']});
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should return invalid when below bottom boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1']});
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation2, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [
                        {idx: 0, msg: 'string', params: []},
                    ],
                },
            });

            const evaluation3 = validator.validate({a: ['1', 4]});
            assert.deepEqual(evaluation3, {
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

    describe('@validate FN - lexer: iterable object', () => {
        it('Should throw if passed an invalid iterable config during rule creation', () => {
            assert.throws(
                () => new Validator({a: '{string'}),
                new TypeError('Iterable misconfiguration, verify rule config for {string')
            );

            assert.throws(
                () => new Validator({a: '}string'}),
                new TypeError('Iterable misconfiguration, verify rule config for }string')
            );

            assert.throws(
                () => new Validator({a: '}{string'}),
                new TypeError('Iterable misconfiguration, verify rule config for }{string')
            );
        });

        it('Should not throw if passed an iterable config during rule creation', () => {
            assert.doesNotThrow(() => new Validator({a: '{}string'}));
        });

        it('Should return invalid when passing a non-object to an iterable', () => {
            const validator = new Validator({a: '{}string'});
            assert.equal(validator.validate({a: 'hello'}).is_valid, false);
        });

        it('Should return valid when passing an empty object to an iterable', () => {
            const validator = new Validator({a: '{}string'});
            assert.ok(validator.validate({a: {}}).is_valid);
        });

        it('Should allow validating an object', () => {
            const validator = new Validator({a: '{}string'});
            assert.ok(validator.validate({a: {b: 'hello', c: 'there'}}).is_valid);
            assert.equal(validator.validate({a: {b: 'hello', c: false}}).is_valid, false);
            assert.equal(validator.validate({a: {b: 'hello', c: false, d: true}}).is_valid, false);
        });

        it('Should allow validating an object with a \'?\' sometimes flag', () => {
            const validator = new Validator({a: '?{}string'});
            assert.ok(validator.validate({a: {b: 'hello', c: 'there'}}).is_valid);
            assert.ok(validator.validate({}).is_valid);
            assert.equal(validator.validate({a: {b: 'hello', c: false, d: 'foo', e: true}}).is_valid, false);
        });

        it('Should allow validating an object with a \'?\' sometimes flag and parameter pass', () => {
            const validator = new Validator({a: '?{}string|in:<genders>'});
            assert.ok(validator.validate({a: {b: 'male',  d: 'female', e: 'male'}, genders: ['male', 'female', 'other']}).is_valid);
            assert.ok(validator.validate({genders: ['male', 'female', 'other']}).is_valid);
            assert.equal(validator.validate({a: {b: 'dog'}, genders: ['male', 'female', 'other']}).is_valid, false);
        });

        it('Should allow validating an object with a \'?\' sometimes flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '?{unique}string|in:<genders>'});
            assert.equal(validator.validate({a: {b: 'male', c: 'male'}, genders: ['male', 'female', 'other']}).is_valid, false);
            assert.ok(validator.validate({a: {b: 'male', c: 'female'}, genders: ['male', 'female', 'other']}).is_valid);
        });

        it('Should allow validating an object with a \'!\' not flag and parameter pass', () => {
            const validator = new Validator({a: '{}string|!in:<genders>'});
            assert.ok(validator.validate({a: {b: 'bob', d: 'john', e: 'bob', f: 'john'}, genders: ['male', 'female', 'other']}).is_valid);
            assert.equal(validator.validate({a: {b: 'male', d: 'female'}, genders: ['male', 'female', 'other']}).is_valid, false);
            assert.equal(validator.validate({a: {b: 'chicken', d: 'female'}, genders: ['male', 'female', 'other']}).is_valid, false);
        });

        it('Should allow validating an object with a \'!\' not flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '{unique}string|!in:<genders>'});
            assert.ok(validator.validate({a: {b: 'bob', c: 'john'}, genders: ['male', 'female', 'other']}).is_valid);
            assert.equal(validator.validate({a: {b: 'male', c: 'female', d: 'female'}, genders: ['male', 'female', 'other']}).is_valid, false); // eslint-disable-line max-len
            assert.equal(validator.validate({a: {b: 'chicken', c: 'dog', d: 'female'}, genders: ['male', 'female', 'other']}).is_valid, false); // eslint-disable-line max-len
        });
    });

    describe('@validate FN - lexer: iterable object:unique', () => {
        it('Should return valid when array is unique', () => {
            const validator = new Validator({a: '{unique}string'});
            assert.ok(validator.validate({a: {b: 'a', c: 'b', d: 'c'}}).is_valid);
        });

        it('Should return invalid when array is not unique', () => {
            const validator = new Validator({a: '{unique}string'});
            assert.equal(validator.validate({a: {b: 'a', c: 'b', d: 'a'}}).is_valid, false);
        });

        it('Should return invalid when array is not unique when using numbers', () => {
            const validator = new Validator({a: '{unique}number'});
            assert.equal(validator.validate({a: {b: 1, c: 2, d: 2}}).is_valid, false);
        });

        it('Should return invalid when array is not unique when using objects', () => {
            const validator = new Validator({a: '{unique}object'});
            assert.equal(validator.validate({a: {b: {a: 1}, c: {b: 2}, d: {b: 2}}}).is_valid, false);
        });

        it('Should return invalid when array is not unique and doesnt match rules', () => {
            const validator = new Validator({a: '{unique}integer'});
            assert.equal(validator.validate({a: {b: 1, c: 2, d: 'a', e: 2}}).is_valid, false);
        });

        it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
            const validator = new Validator({a: '{unique}integer'});
            assert.equal(validator.validate({a: {b: 1, c: 2, d: 'a', e: 2, f: 2, g: 2.2}}).is_valid, false);
        });
    });

    describe('@validate FN - lexer: iterable object:max', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '{max:5}string'});
            assert.ok(validator.validate({a: {b: 'hello', c: 'there'}}).is_valid);
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            assert.ok(validator.validate({a: {b: '1', c: '2', d: '3', e: '4', f: '5'}}).is_valid);
        });

        it('Should return invalid when above boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            assert.equal(validator.validate({a: {b: '1', c: '2', d: '3', e: '4', f: '5', g: '6'}}).is_valid, false);
        });

        it('Should only return iterable invalidity and not go into val evaluation when above boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            assert.equal(validator.validate({a: {b: '1', c: '2', d: '3', e: '4', f: 5, g: '6'}}).is_valid, false);
        });

        it('Should return iterable invalidity and go into val evaluation when at or below boundary', () => {
            const validator = new Validator({a: '{max:5}string'});
            assert.equal(validator.validate({a: {b: '1', c: false, d: false, e: '2', f: false}}).is_valid, false);
            assert.equal(validator.validate({a: {b: false, c: '1', d: '2', e: '3'}}).is_valid, false);
        });
    });

    describe('@validate FN - lexer: iterable object:min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '{min:5}string'});
            assert.ok(validator.validate({a: {b: 'hello', c: 'there', d: 'this', e: 'is', f: 'cool', g: 'right'}}).is_valid);
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '{min:5}string'});
            assert.ok(validator.validate({a: {b: 'hello', c: 'there', d: 'this', e: 'is', f: 'cool'}}).is_valid);
        });

        it('Should return invalid when below boundary', () => {
            const validator = new Validator({a: '{min:3}string'});
            assert.equal(validator.validate({a: {b: '1', c: '2'}}).is_valid, false);
        });

        it('Should only return iterable invalidity and not go into val evaluation when below boundary', () => {
            const validator = new Validator({a: '{min:4}string'});
            assert.equal(validator.validate({a: {b: '1', c: false}}).is_valid, false);
        });

        it('Should return iterable invalidity and go into val evaluation when at or above boundary', () => {
            const validator = new Validator({a: '{min:4}string'});
            assert.equal(validator.validate({a: {b: '1', c: false, d: false, e: '2'}}).is_valid, false);
            assert.equal(validator.validate({a: {b: '1', c: false, d: '2', e: '3', f: false}}).is_valid, false);
        });
    });

    describe('@validate FN - lexer: iterable object:max+min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            assert.ok(validator.validate({a: {b: 'hello', c: 'there', d: 'cool'}}).is_valid);
        });

        it('Should return valid when at top boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            assert.ok(validator.validate({a: {b: '1', c: '2', d: '3', e: '4', f: '5'}}).is_valid);
        });

        it('Should return invalid when above top boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            assert.equal(validator.validate({a: {b: '1', c: '2', d: '3', e: '4', f: '5', g: '6'}}).is_valid, false);
        });

        it('Should return valid when at bottom boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            assert.ok(validator.validate({a: {b: '1', c: '2'}}).is_valid);
        });

        it('Should return invalid when below bottom boundary', () => {
            const validator = new Validator({a: '{max:5|min:2}string'});
            assert.equal(validator.validate({a: {b: '1'}}).is_valid, false);
        });
    });

    describe('@validate FN - lexer: groups', () => {
        it('Should return valid when one of both rules are valid', () => {
            const validator = new Validator({a: ['[max:5|min:2]string', 'false']});
            assert.deepEqual(
                validator.validate({a: ['hello', 'there', 'cool']}),
                {is_valid: true, count: 0, errors: {}}
            );
            assert.deepEqual(
                validator.validate({a: false}),
                {is_valid: true, count: 0, errors: {}}
            );
        });

        it('Should return valid when using rules with an underscore in them and one of them is valid', () => {
            assert.deepEqual(new Validator({
                a: ['string_ne|min:1|max:128', 'false'],
            }).validate({a: 'hello'}), {is_valid: true, count: 0, errors: {}});
        });

        it('Should return valid when using rules with a dash in them and one of them is valid', () => {
            Validator.extend({'my-test-rule': val => val === true});
            assert.deepEqual(new Validator({
                a: ['my-test-rule', 'false'],
            }).validate({a: true}), {is_valid: true, count: 0, errors: {}});
        });

        it('Should return valid when all rules are valid', () => {
            const validator = new Validator({a: ['[max:5|min:2]string', '[max:5|min:3]string_ne']});
            assert.deepEqual(
                validator.validate({a: ['hello', 'there', 'cool']}),
                {is_valid: true, count: 0, errors: {}}
            );
        });

        it('Should return valid when no rules are valid but sometimes flag is set and its the only rule', () => {
            const validator = new Validator({a: ['?', 'guid', 'false']});
            assert.deepEqual(
                validator.validate({}),
                {is_valid: true, count: 0, errors: {}}
            );
        });

        it('Should return valid when no rules are valid but sometimes flag is set and multiple fields but those are valid too', () => {
            const validator = new Validator({a: ['?', 'guid', 'false'], b: 'integer|between:10,50'});
            assert.deepEqual(
                validator.validate({b: 42}),
                {is_valid: true, count: 0, errors: {}}
            );
        });

        it('Should return invalid when both rules are invalid and correctly set error messages as multi-dimensional array', () => {
            const validator = new Validator({a: ['guid', 'false']});
            assert.deepEqual(
                validator.validate({a: 'foobar'}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [
                            [{msg: 'guid', params: []}],
                            [{msg: 'false', params: []}],
                        ],
                    },
                }
            );
        });

        it('Should return invalid and correctly set error messages as multi-dimensional array with multiple rules to a group', () => {
            const validator = new Validator({a: ['integer|between:20,42', 'false']});
            assert.deepEqual(
                validator.validate({a: 'foobar'}),
                {
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
                }
            );
        });

        it('Should validate correctly with parameterization', () => {
            const validator = new Validator({a: ['in:<nums>', '[unique|min:1|max:10]in:<meta.strings>']});
            assert.deepEqual(
                validator.validate({a: 'foobar', nums: [1, 2, 3], meta: {strings: ['male', 'female', 'other', 'undecided']}}),
                {
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
                }
            );
            assert.deepEqual(
                validator.validate({a: 2, nums: [1, 2, 3], meta: {strings: ['male', 'female', 'other', 'undecided']}}),
                {is_valid: true, count: 0, errors: {}}
            );

            assert.deepEqual(
                validator.validate({a: ['other'], nums: [1, 2, 3], meta: {strings: ['male', 'female', 'other', 'undecided']}}),
                {is_valid: true, count: 0, errors: {}}
            );
        });
    });


    describe('@check:FormData', () => {
        describe('FN', () => {
            it('Should return false when invalid', () => {
                const form = new FormData();
                form.append('a', '20');
                form.append('b', 'false');
                assert.equal(new Validator({a: 'number', b: 'number'}).validate(form).is_valid, false);
            });

            it('Should return true when valid', () => {
                const form = new FormData();
                form.append('a', '20');
                form.append('b', '42');
                assert.ok(new Validator({a: 'number', b: 'number'}).validate(form).is_valid);
            });
        });

        describe('FN - lexer: flag:sometimes (?)', () => {
            it('Should validate correctly if set and no value is passed', () => {
                assert.ok(new Validator({a: '?number'}).validate(new FormData()).is_valid);
            });

            it('Should not interfere with other validation rules', () => {
                assert.equal(new Validator({
                    a: '?number',
                    b: 'number|less_than:20',
                }).validate(new FormData()).is_valid, false);

                const form = new FormData();
                form.append('a', '20');
                form.append('b', 'false');
                assert.equal(new Validator({
                    a: '?number',
                    b: 'number|less_than:20',
                }).validate(form).is_valid, false);

                const form2 = new FormData();
                form2.append('b', '15');
                assert.ok(new Validator({
                    a: '?number',
                    b: 'number|less_than:20',
                }).validate(form2).is_valid);
            });
        });

        describe('FN - lexer: flag:parameter (<...>)', () => {
            it('Should allow link to passed parameter', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foo', 'hello');
                assert.ok(new Validator({a: 'equal_to:<foo>'}).validate(form).is_valid);
            });

            it('Should fail if parameter is not passed', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foobar', 'hello');
                assert.equal(new Validator({a: 'equal_to:<foo>'}).validate(form).is_valid, false);
            });

            it('Should allow multiple parameters inside the same ruleset', () => {
                const form = new FormData();
                form.append('a', '5');
                form.append('min', '3');
                form.append('max', '7');
                assert.ok(new Validator({a: 'between:<min>,<max>'}).validate(form).is_valid);
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
                assert.ok(new Validator({a: 'in:<arr1>', b: 'in:<arr2>'}).validate(form).is_valid);
            });

            it('Should allow the same parameter on multiple rules inside the same config', () => {
                const form = new FormData();
                form.append('a', '1');
                form.append('b', '2');
                form.append('arr1', '1');
                form.append('arr1', '2');
                form.append('arr1', '3');
                assert.ok(new Validator({a: 'in:<arr1>', b: 'in:<arr1>'}).validate(form).is_valid);
            });
        });

        describe('FN - lexer: flag:not (!)', () => {
            it('Should validate correct if set and no value is passed', () => {
                assert.equal(new Validator({a: '!number'}).validate(new FormData()).is_valid, false);
            });

            it('Should validate correct if set and value is passed when using standard rule', () => {
                const form = new FormData();
                form.append('a', 'hello');
                assert.ok(new Validator({a: '!number'}).validate(form).is_valid);

                const form2 = new FormData();
                form2.append('a', '4');
                assert.equal(new Validator({a: '!number'}).validate(form2).is_valid, false);
                assert.ok(new Validator({a: '!between:5,10'}).validate(form2).is_valid);

                const form3 = new FormData();
                form3.append('a', '6');
                assert.equal(new Validator({a: '!between:5,10'}).validate(form3).is_valid, false);
            });

            it('Should validate correct if set and value is passed when using parameter flag', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foo', 'hello');
                assert.equal(new Validator({a: '!equal_to:<foo>'}).validate(form).is_valid, false);
            });

            it('Should validate correct if set and value is passed when using multiple validation rules', () => {
                const form = new FormData();
                form.append('a', 'hello');
                form.append('foo', 'hello');
                assert.equal(new Validator({a: '!string|!equal_to:<foo>'}).validate(form).is_valid, false);

                const form2 = new FormData();
                form2.append('a', 'hello');
                form2.append('foo', 'foo');
                assert.equal(new Validator({a: '!string|!equal_to:<foo>'}).validate(form2).is_valid, false);
            });
        });

        describe('FN - lexer: iterable array', () => {
            it('Should return invalid when passing a non-array to an iterable', () => {
                const validator = new Validator({a: '[]string'});
                const form = new FormData();
                form.append('a', 'hello');
                assert.equal(validator.validate(form).is_valid, false);
            });

            it('Should allow validating an array of values', () => {
                const validator = new Validator({a: '[]string'});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                assert.ok(validator.validate(form).is_valid);

                const form2 = new FormData();
                form.append('a', 'hello');
                form.append('a', 'false');
                assert.equal(validator.validate(form2).is_valid, false);
            });

            it('Should allow validating an array of values with a \'?\' sometimes flag', () => {
                const validator = new Validator({a: '?[]string'});

                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                assert.ok(validator.validate(form).is_valid);
                assert.ok(validator.validate(new FormData()).is_valid);
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
                assert.ok(validator.validate(form).is_valid);

                const form2 = new FormData();
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                assert.ok(validator.validate(form2).is_valid);

                const form3 = new FormData();
                form3.append('a', 'dog');
                form3.append('a', 'male');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                assert.equal(validator.validate(form3).is_valid, false);
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
                assert.equal(validator.validate(form).is_valid, false);

                const form2 = new FormData();
                form.append('a', 'male');
                form.append('a', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                assert.ok(validator.validate(form2).is_valid);
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
                assert.ok(validator.validate(form).is_valid);

                const form2 = new FormData();
                form2.append('a', 'male');
                form2.append('a', 'male');
                form2.append('a', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                assert.equal(validator.validate(form2).is_valid, false);

                const form3 = new FormData();
                form3.append('a', 'chicken');
                form3.append('a', 'dog');
                form3.append('a', 'female');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                assert.equal(validator.validate(form3).is_valid, false);
            });

            it('Should allow validating an array of values with a \'!\' not flag, uniqueness and parameter pass', () => {
                const validator = new Validator({a: '[unique]string|!in:<genders>'});
                const form = new FormData();
                form.append('a', 'bob');
                form.append('a', 'john');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                assert.ok(validator.validate(form).is_valid);

                const form2 = new FormData();
                form2.append('a', 'male');
                form2.append('a', 'female');
                form2.append('a', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                assert.equal(validator.validate(form2).is_valid, false);

                const form3 = new FormData();
                form3.append('a', 'chicken');
                form3.append('a', 'dog');
                form3.append('a', 'chicken');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                assert.equal(validator.validate(form3).is_valid, false);
            });
        });

        describe('FN - lexer: iterable array:unique', () => {
            it('Should return valid when array is unique', () => {
                const validator = new Validator({a: '[unique]string'});
                const form = new FormData();
                form.append('a[0]', 'a');
                form.append('a[1]', 'b');
                form.append('a[2]', 'c');
                assert.ok(validator.validate(form).is_valid);
            });

            it('Should return invalid when array is not unique', () => {
                const validator = new Validator({a: '[unique]string'});
                const form = new FormData();
                form.append('a[0]', 'a');
                form.append('a[1]', 'b');
                form.append('a[2]', 'a');
                assert.equal(validator.validate(form).is_valid, false);
            });

            it('Should return invalid when array is not unique when using numbers', () => {
                const validator = new Validator({a: '[unique]number'});
                const form = new FormData();
                form.append('a[0]', '1');
                form.append('a[1]', '2');
                form.append('a[2]', '2');
                assert.equal(validator.validate(form).is_valid, false);
            });

            it('Should return invalid when array is not unique when using objects', () => {
                const validator = new Validator({a: '[unique]object'});
                const form = new FormData();
                form.append('a[0].a', '1');
                form.append('a[1].b', '2');
                form.append('a[2].b', '2');
                assert.equal(validator.validate(form).is_valid, false);
            });

            it('Should return invalid when array is not unique and doesnt match rules', () => {
                const validator = new Validator({a: '[unique]integer'});
                const form = new FormData();
                form.append('a[0]', '1');
                form.append('a[1]', '2');
                form.append('a[2]', 'a');
                form.append('a[3]', '2');
                assert.equal(validator.validate(form).is_valid, false);
            });

            it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
                const validator = new Validator({a: '[unique]integer'});
                const form = new FormData();
                form.append('a[0]', '1');
                form.append('a[1]', '2');
                form.append('a[2]', 'a');
                form.append('a[3]', '2');
                form.append('a[4]', '2.2');
                assert.equal(validator.validate(form).is_valid, false);
            });
        });

        describe('FN - lexer: iterable array:max+min', () => {
            it('Should return valid when within boundaries', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                form.append('a', 'cool');
                assert.ok(validator.validate(form).is_valid);
            });

            it('Should return valid when at top boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                form.append('a', 'a2');
                form.append('a', 'a3');
                form.append('a', 'a4');
                form.append('a', 'a5');
                assert.ok(validator.validate(form).is_valid);
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
                assert.equal(validator.validate(form).is_valid, false);
            });

            it('Should return valid when at bottom boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                form.append('a', 'a2');
                assert.ok(validator.validate(form).is_valid);
            });

            it('Should return invalid when below bottom boundary', () => {
                const validator = new Validator({a: '[max:5|min:2]string'});
                const form = new FormData();
                form.append('a', 'a1');
                assert.equal(validator.validate(form).is_valid, false);
            });
        });

        describe('FN - lexer: iterable object', () => {
            it('Should return invalid when passing a non-object to an iterable', () => {
                const validator = new Validator({a: '{}string'});
                const form = new FormData();
                form.append('a', 'hello');
                assert.equal(validator.validate(form).is_valid, false);
            });

            it('Should allow validating an object', () => {
                const validator = new Validator({a: '{}string'});
                const form = new FormData();
                form.append('a.b', 'hello');
                form.append('a.c', 'there');
                assert.ok(validator.validate(form).is_valid);

                const form2 = new FormData();
                form2.append('a.b', 'hello');
                form2.append('a.c', 'false');
                assert.equal(validator.validate(form2).is_valid, false);
            });

            it('Should allow validating an object with a \'?\' sometimes flag', () => {
                const validator = new Validator({a: '?{}string'});
                const form = new FormData();
                form.append('a.b', 'hello');
                form.append('a.c', 'there');
                assert.ok(validator.validate(form).is_valid);
                assert.ok(validator.validate(new FormData()).is_valid);

                const form2 = new FormData();
                form2.append('a.b', 'hello');
                form2.append('a.c', 'false');
                assert.equal(validator.validate(form2).is_valid, false);
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
                assert.ok(validator.validate(form).is_valid);

                const form2 = new FormData();
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                assert.ok(validator.validate(form2).is_valid);

                const form3 = new FormData();
                form3.append('a.b', 'dog');
                form3.append('a.c', 'male');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                assert.equal(validator.validate(form3).is_valid, false);
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
                assert.equal(validator.validate(form).is_valid, false);

                const form2 = new FormData();
                form.append('a.b', 'male');
                form.append('a.c', 'female');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                assert.ok(validator.validate(form2).is_valid);
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
                assert.ok(validator.validate(form).is_valid);

                const form2 = new FormData();
                form2.append('a.b', 'male');
                form2.append('a.c', 'male');
                form2.append('a.d', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                assert.equal(validator.validate(form2).is_valid, false);

                const form3 = new FormData();
                form3.append('a.b', 'chicken');
                form3.append('a.c', 'dog');
                form3.append('a.d', 'female');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                assert.equal(validator.validate(form3).is_valid, false);
            });

            it('Should allow validating an object with a \'!\' not flag, uniqueness and parameter pass', () => {
                const validator = new Validator({a: '{unique}string|!in:<genders>'});
                const form = new FormData();
                form.append('a.b', 'bob');
                form.append('a.c', 'john');
                form.append('genders', 'male');
                form.append('genders', 'female');
                form.append('genders', 'other');
                assert.ok(validator.validate(form).is_valid);

                const form2 = new FormData();
                form2.append('a.b', 'male');
                form2.append('a.c', 'female');
                form2.append('a.d', 'female');
                form2.append('genders', 'male');
                form2.append('genders', 'female');
                form2.append('genders', 'other');
                assert.equal(validator.validate(form2).is_valid, false);

                const form3 = new FormData();
                form3.append('a.b', 'chicken');
                form3.append('a.c', 'dog');
                form3.append('a.d', 'chicken');
                form3.append('genders', 'male');
                form3.append('genders', 'female');
                form3.append('genders', 'other');
                assert.equal(validator.validate(form3).is_valid, false);
            });
        });

        describe('FN - lexer: iterable object:unique', () => {
            it('Should return valid when array is unique', () => {
                const validator = new Validator({a: '{unique}string'});
                const form = new FormData();
                form.append('a.b', 'a');
                form.append('a.c', 'b');
                form.append('a.d', 'c');
                assert.ok(validator.validate(form).is_valid);
            });

            it('Should return invalid when array is not unique', () => {
                const validator = new Validator({a: '{unique}string'});
                const form = new FormData();
                form.append('a.b', 'a');
                form.append('a.c', 'b');
                form.append('a.d', 'a');
                assert.equal(validator.validate(form).is_valid, false);
            });

            it('Should return invalid when array is not unique when using numbers', () => {
                const validator = new Validator({a: '{unique}number'});
                const form = new FormData();
                form.append('a.b', '1');
                form.append('a.c', '2');
                form.append('a.d', '2');
                assert.equal(validator.validate(form).is_valid, false);
            });

            it('Should return invalid when array is not unique when using objects', () => {
                const validator = new Validator({a: '{unique}object'});
                const form = new FormData();
                form.append('a.b.a', '1');
                form.append('a.c.b', '2');
                form.append('a.d.a', '1');
                assert.equal(validator.validate(form).is_valid, false);
            });

            it('Should return invalid when array is not unique and doesnt match rules', () => {
                const validator = new Validator({a: '{unique}integer'});
                const form = new FormData();
                form.append('a.b', '1');
                form.append('a.c', '2');
                form.append('a.d', 'a');
                form.append('a.e', '2');
                assert.equal(validator.validate(form).is_valid, false);
            });

            it('Should return invalid when array is not unique, doesnt match rules and should only insert invalidity once', () => {
                const validator = new Validator({a: '{unique}integer'});
                const form = new FormData();
                form.append('a.b', '1');
                form.append('a.c', '2');
                form.append('a.d', 'a');
                form.append('a.e', '2');
                form.append('a.f', '2.2');
                assert.equal(validator.validate(form).is_valid, false);
            });
        });

        describe('FN - lexer: iterable object:max+min', () => {
            it('Should return valid when within boundaries', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'hello');
                form.append('a.c', 'there');
                form.append('a.d', 'cool');
                assert.ok(validator.validate(form).is_valid);
            });

            it('Should return valid when at top boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                form.append('a.c', 'a2');
                form.append('a.d', 'a3');
                form.append('a.e', 'a4');
                form.append('a.f', 'a5');
                assert.ok(validator.validate(form).is_valid);
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
                assert.equal(validator.validate(form).is_valid, false);
            });

            it('Should return valid when at bottom boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                form.append('a.c', 'a2');
                assert.ok(validator.validate(form).is_valid);
            });

            it('Should return invalid when below bottom boundary', () => {
                const validator = new Validator({a: '{max:5|min:2}string'});
                const form = new FormData();
                form.append('a.b', 'a1');
                assert.equal(validator.validate(form).is_valid, false);
            });
        });

        describe('FN - lexer: groups', () => {
            it('Should return valid when one of both rules are valid', () => {
                const validator = new Validator({a: ['[max:5|min:2]string', 'false']});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                form.append('a', 'cool');
                assert.ok(validator.validate(form).is_valid);

                const form2 = new FormData();
                form2.append('a', 'false');
                assert.ok(validator.validate(form2).is_valid);
            });

            it('Should return valid when using rules with an underscore in them and one of them is valid', () => {
                const form = new FormData();
                form.append('a', 'hello');
                assert.ok(new Validator({a: ['string_ne|min:1|max:128', 'false']}).validate(form).is_valid);

                const form2 = new FormData();
                form2.append('a', 'false');
                assert.ok(new Validator({a: ['string_ne|min:1|max:128', 'false']}).validate(form2).is_valid);
            });

            it('Should return valid when using rules with a dash in them and one of them is valid', () => {
                Validator.extend({
                    'my-test-rule': val => val === true,
                });
                const form = new FormData();
                form.append('a', 'true');
                assert.ok(new Validator({a: ['my-test-rule', 'false']}).validate(form).is_valid);
            });

            it('Should return valid when all rules are valid', () => {
                const validator = new Validator({a: ['[max:5|min:2]string', '[max:5|min:3]string_ne']});
                const form = new FormData();
                form.append('a', 'hello');
                form.append('a', 'there');
                form.append('a', 'cool');
                assert.ok(validator.validate(form).is_valid);
            });

            it('Should return valid when no rules are valid but sometimes flag is set and its the only rule', () => {
                const validator = new Validator({a: ['?', 'guid', 'false']});
                assert.ok(validator.validate(new FormData()).is_valid);
            });

            it('Should return valid when no rules are valid but sometimes flag is set and multiple fields but those are valid too', () => {
                const validator = new Validator({a: ['?', 'guid', 'false'], b: 'integer|between:10,50'});
                const form = new FormData();
                form.append('b', '42');
                assert.ok(validator.validate(form).is_valid);
            });

            it('Should return invalid when both rules are invalid and correctly set error messages as multi-dimensional array', () => {
                const validator = new Validator({a: ['guid', 'false']});
                const form = new FormData();
                form.append('a', 'foobar');
                assert.equal(validator.validate(form).is_valid, false);
            });

            it('Should return invalid and correctly set error messages as multi-dimensional array with multiple rules to a group', () => {
                const validator = new Validator({a: ['integer|between:20,42', 'false']});
                const form = new FormData();
                form.append('a', 'foobar');
                assert.equal(validator.validate(form).is_valid, false);
            });
        });
    });

    describe('@extend FN', () => {
        it('Should throw if not provided anything', () => {
            assert.throws(
                //  @ts-ignore
                () => Validator.extend(),
                new Error('Invalid extension')
            );
        });

        it('Should throw if not provided an object', () => {
            for (const el of CONSTANTS.NOT_OBJECT) {
                assert.throws(
                    () => Validator.extend(el),
                    new Error('Invalid extension')
                );
            }
        });

        it('Should not throw if provided an empty object', () => {
            assert.doesNotThrow(() => Validator.extend({}));
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
                assert.throws(
                    () => Validator.extend({[el]: val => val === true}),
                    new Error('Invalid extension')
                );

                assert.ok(!Object.prototype.hasOwnProperty.call(Validator.rules, el));
            }
        });

        it('Should throw if provided an object where values are not valid', () => {
            for (const el of CONSTANTS.NOT_FUNCTION) {
                if (el instanceof RegExp || isNeObject(el) || isNeArray(el)) continue;
                const uid = guid();
                assert.throws(
                    () => Validator.extend({[uid]: el}),
                    new Error('Invalid extension')
                );

                assert.ok(!Object.prototype.hasOwnProperty.call(Validator.rules, uid));
            }
        });

        it('Should work', () => {
            Validator.extend({
                trick: function (val, p1) {
                    return p1 === 'treat' ? val === 'trick' : p1 === 'trick' ? val === 'treat' : false;
                },
            });

            const evaluation = new Validator({a: 'trick:<b>'}).validate({a: 'trick', b: 'treat'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should work with multiple parameters', () => {
            Validator.extend({
                sum: function (val, p1, p2) {
                    return val === (p1 + p2);
                },
            });

            const evaluation = new Validator({a: 'sum:<b>,<c>'}).validate({a: 4, b: 1, c: 3});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should work across multiple instances', () => {
            Validator.extend({
                double: function (val:number, p1:number) {
                    return val === (p1 * 2);
                },
            });

            //  Evaluation
            const evaluation = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            //  Second evaluation
            const evaluation2 = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
            assert.deepEqual(evaluation2, {is_valid: true, count: 0, errors: {}});
        });

        it('Should allow redefining the same validity function', () => {
            Validator.extend({
                ismyname: function (val) {
                    return val === 'peter';
                },
            });

            //  Evaluation
            const evaluation = new Validator({name: 'ismyname'}).validate({name: 'peter'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            //  Redefine
            Validator.extend({
                ismyname: function (val) {
                    return val === 'josh';
                },
            });

            //  Second evaluation
            const evaluation2 = new Validator({name: 'ismyname'}).validate({name: 'peter'});
            assert.deepEqual(evaluation2, {
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
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            //  Second evaluation
            const evaluation2 = new Validator({name: 'ismyothername'}).validate({name: 'peter'});
            assert.deepEqual(evaluation2, {
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

                assert.ok(new Validator({a: 'contains_hello'}).check({a: 'When i say hello this should work'}));
                assert.ok(new Validator({
                    a: 'contains_hello_insensitive',
                    b: 'contains_hello',
                }).check({
                    a: 'When i say heLlo this should work',
                    b: 'When i say hello this should work',
                }));
                assert.equal(new Validator({a: 'contains_hello'}).check({a: 'This helo should not work'}), false);
                assert.equal(new Validator({a: 'contains_hello'}).check({a: 'This helLo should not work'}), false);
                assert.equal(new Validator({a: 'contains_hello_insensitive'}).check({a: 'This helo should not work'}), false);
            });

            it('Extensions should also show up as functions in rules', () => {
                Validator.extend({
                    contains_hello: /hello/,
                    contains_hello_insensitive: /hello/i,
                });

                assert.ok(Validator.rules.contains_hello instanceof Function);
                assert.ok(Validator.rules.contains_hello('When i say hello this should work'));
                assert.equal(Validator.rules.contains_hello('This helo should not work'), false);

                assert.ok(Validator.rules.contains_hello_insensitive instanceof Function);
                assert.ok(Validator.rules.contains_hello_insensitive('When i say heLlo this should work'));
                assert.equal(Validator.rules.contains_hello_insensitive('This helo should not work'), false);
            });

            it('Should allow redefining the same rules', () => {
                Validator.extend({
                    contains_hello: /Hello/,
                    contains_hollo: /((h|H)ollo|(o|O)la)/,
                });

                assert.ok(Validator.rules.contains_hello instanceof Function);
                assert.ok(Validator.rules.contains_hello('Hello there'));
                assert.equal(Validator.rules.contains_hello('hello there'), false);
                assert.equal(Validator.rules.contains_hello('ola amigos'), false);
                assert.equal(Validator.rules.contains_hello('Ola amigos'), false);

                Validator.extend({
                    contains_hello: /((h|H)ello|(o|O)la)/,
                    contains_hallo: /((h|H)allo|(o|O)la)/,
                });

                assert.ok(Validator.rules.contains_hello('Hello there'));
                assert.ok(Validator.rules.contains_hello('hello there'));
                assert.ok(Validator.rules.contains_hello('ola amigos'));
                assert.ok(Validator.rules.contains_hello('Ola amigos'));
            });

            it('Should allow working with not/sometimes flags', () => {
                Validator.extend({contains_hello: /((h|H)ello|(o|O)la)/});

                assert.ok(new Validator({a: 'contains_hello'}).check({a: 'Hello there'}));
                assert.ok(new Validator({a: 'contains_hello'}).check({a: 'hello there'}));
                assert.ok(new Validator({a: 'contains_hello'}).check({a: 'ola amigos'}));
                assert.ok(new Validator({a: 'contains_hello'}).check({a: 'Ola amigos'}));

                assert.equal(new Validator({a: '!contains_hello'}).check({a: 'Hello there'}), false);
                assert.equal(new Validator({a: '!contains_hello'}).check({a: 'hello there'}), false);
                assert.equal(new Validator({a: '!contains_hello'}).check({a: 'ola amigos'}), false);
                assert.equal(new Validator({a: '!contains_hello'}).check({a: 'Ola amigos'}), false);

                assert.ok(new Validator({a: '?contains_hello', b: 'integer'}).check({b: 42}));
            });
        });

        describe('enum', () => {
            it('Should work', () => {
                Validator.extend({
                    enum1: ['foo', 'bar', 'foobar'],
                    ENUM_2: [1, 2, 3],
                });

                assert.ok(new Validator({a: 'enum1'}).check({a: 'foo'}));
                assert.ok(new Validator({a: 'ENUM_2', b: 'enum1'}).check({a: 2, b: 'foobar'}));
                assert.equal(new Validator({a: 'enum1'}).check({a: 'fuo'}), false);
                assert.equal(new Validator({a: 'ENUM_2', b: 'enum1'}).check({a: 42, b: 'foobar'}), false);
            });

            it('Extensions should also show up as functions in rules', () => {
                Validator.extend({
                    enum1: ['foo', 'bar', 'foobar'],
                    ENUM_2: [1, 2, 3],
                });

                assert.ok(Validator.rules.enum1 instanceof Function);
                assert.ok(Validator.rules.enum1('foo'));
                assert.equal(Validator.rules.enum1('fooo'), false);

                assert.ok(Validator.rules.ENUM_2 instanceof Function);
                assert.ok(Validator.rules.ENUM_2(1));
                assert.equal(Validator.rules.ENUM_2(42), false);
            });

            it('Should allow redefining the same enum rule', () => {
                Validator.extend({
                    enum1: ['foo', 'bar', 'foobar'],
                    ENUM_2: [1, 2, 3],
                });

                assert.ok(Validator.rules.enum1 instanceof Function);
                assert.ok(Validator.rules.enum1('foo'));
                assert.equal(Validator.rules.enum1('fooo'), false);

                assert.ok(Validator.rules.ENUM_2 instanceof Function);
                assert.ok(Validator.rules.ENUM_2(1));
                assert.equal(Validator.rules.ENUM_2(42), false);

                Validator.extend({
                    ENUM_2: [2, 3, 42],
                });

                assert.equal(Validator.rules.ENUM_2(1), false);
                assert.ok(Validator.rules.ENUM_2(42));
            });

            it('Should throw if provided an object where certain arrays contain more than just primitive strings or numbers', () => {
                assert.throws(
                    //  @ts-ignore
                    () => Validator.extend({enum_1: ['foo', false, 'bar']}),
                    new Error('Invalid extension')
                );

                assert.throws(
                    //  @ts-ignore
                    () => Validator.extend({enum_1: ['foo', {a: 1}, 'bar']}),
                    new Error('Invalid extension')
                );

                assert.throws(
                    //  @ts-ignore
                    () => Validator.extend({enum_1: ['foo', new Date(), 'bar']}),
                    new Error('Invalid extension')
                );

                assert.throws(
                    //  @ts-ignore
                    () => Validator.extend({enum_1: ['foo', ['foo'], 'bar']}),
                    new Error('Invalid extension')
                );
            });

            it('Should allow working with not/sometimes flags', () => {
                Validator.extend({
                    FRUITS: ['apple', 'pear', 'banana'],
                    ANIMALS: ['dog', 'cat', 'parrot'],
                    AGE_13_18: [13, 14, 15, 16, 17, 18],
                    AGE_19_25: [19, 20, 21, 22, 23, 24, 25],
                });

                assert.ok(new Validator({age: 'AGE_13_18'}).check({age: 15}));
                assert.ok(new Validator({age: '!AGE_13_18'}).check({age: 19}));
                assert.ok(Validator.rules.AGE_13_18(15));
                assert.ok(new Validator({
                    age: '?AGE_13_18',
                    pet: 'ANIMALS',
                    fave_fruit: 'FRUITS',
                }).check({pet: 'dog', fave_fruit: 'banana'}));
            });
        });

        describe('schema', () => {
            it('Should not throw and register rules if provided an object if schema is valid', () => {
                const uid = guid();
                assert.doesNotThrow(
                    () => Validator.extend({
                        [uid]: {
                            first_name: 'string_ne|min:3',
                            last_name: 'string_ne|min:3',
                            email: 'email',
                        },
                    })
                );

                assert.ok(Object.prototype.hasOwnProperty.call(Validator.rules, uid));
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

                assert.ok(new Validator({a: `${uid}`}).check({a: {
                    first_name: 'Peter',
                    last_name: 'Vermeulen',
                    email: 'contact@valkyriestudios.be',
                }}));
                assert.ok(new Validator({a: `${uid}`}).check({a: {
                    first_name: 'Peter',
                    last_name: 'Vermeulen',
                    email: false,
                }}) === false);
                assert.ok(new Validator({a: `${uid2}`}).check({a: {
                    first_name: 'Peter',
                    last_name: 'Vermeulen',
                    email: 'contact@valkyriestudios.be',
                }}) === false);
                assert.ok(new Validator({a: `${uid2}`}).check({a: {
                    first_name: 'Peter',
                    last_name: 'Vermeulen',
                    email: 'contact@valkyriestudios.be',
                    phone: '+32 487 61 59 82',
                }}));
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

                assert.ok(Validator.rules[uid] instanceof Function);
                assert.ok(Validator.rules[uid]({first_name: 'Peter', last_name: 'Vermeulen', email: 'contact@valkyriestudios.be'}));
                assert.equal(Validator.rules[uid]('fooo'), false);

                assert.ok(Validator.rules[uid2] instanceof Function);
                assert.ok(Validator.rules[uid2]({
                    first_name: 'Peter',
                    last_name: 'Vermeulen',
                    email: 'contact@valkyriestudios.be',
                    phone: false,
                }) === false);
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

                assert.ok(Validator.rules[uid] instanceof Function);
                assert.ok(Validator.rules[uid]({first_name: 'Peter', last_name: 'Vermeulen', email: 'contact@valkyriestudios.be'}));
                assert.ok(Validator.rules[uid]({first_name: 'Peter', last_name: 'Vermeulen'}) === false);

                Validator.extend({
                    [uid]: {
                        first_name: 'string_ne|min:3',
                        last_name: 'string_ne|min:3',
                    },
                });

                assert.ok(Validator.rules[uid] instanceof Function);
                assert.ok(Validator.rules[uid]({first_name: 'Peter', last_name: 'Vermeulen', email: 'contact@valkyriestudios.be'}));
                assert.ok(Validator.rules[uid]({first_name: 'Peter', last_name: 'Vermeulen'}));
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

            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
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

            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
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

            assert.deepEqual(evaluation, {
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

            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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

            assert.ok(validator.check({
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
            }));

            assert.equal(validator.check({
                profile: {
                    uid: guid(),
                    user: {
                        type: 'type1',
                    },
                },
            }), false);

            assert.equal(validator.check({
                profile: {
                    uid: guid(),
                    user: false,
                },
            }), false);

            assert.equal(validator.check({
                profile: false,
            }), false);

            assert.deepEqual(validator.validate({
                profile: false,
            }), {
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

            assert.deepEqual(validator.validate({
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
            }), {
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

            assert.ok(validator.check({contact_email: 'contact@valkyriestudios.be'}));
        });

        it('Should be invalid if a nested objects\'s fields are not all optional and no nested object is passed', () => {
            const validator = new Validator({
                filters: {
                    ids: '?[unique]integer|greater_than:0',
                    types: '[unique|max:3]is_type',
                },
                contact_email: 'email',
            });

            assert.equal(validator.check({contact_email: 'contact@valkyriestudios.be'}), false);
        });
    });
});
