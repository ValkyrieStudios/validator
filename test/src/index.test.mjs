'use strict';

/* eslint-disable max-lines */

import {describe, it}           from 'node:test';
import assert                   from 'node:assert/strict';
import Is                       from '@valkyriestudios/utils/src/is.mjs';
import guid                     from '@valkyriestudios/utils/src/hash/guid.mjs';
import CONSTANTS                from '../constants.mjs';
import Validator                from '../../src/index.mjs';
import vAlphaNumSpaces          from '../../src/functions/vAlphaNumSpaces.mjs';
import vAlphaNumSpacesMultiline from '../../src/functions/vAlphaNumSpacesMultiline.mjs';
import vBetween                 from '../../src/functions/vBetween.mjs';
import vBetweenInclusive        from '../../src/functions/vBetweenInclusive.mjs';
import vBoolean                 from '../../src/functions/vBoolean.mjs';
import vColorHex                from '../../src/functions/vColorHex.mjs';
import vContinent               from '../../src/functions/vContinent.mjs';
import vCountry                 from '../../src/functions/vCountry.mjs';
import vCountryAlpha3           from '../../src/functions/vCountryAlpha3.mjs';
import vDateString              from '../../src/functions/vDateString.mjs';
import vEmail                   from '../../src/functions/vEmail.mjs';
import vGeoLatitude             from '../../src/functions/vGeoLatitude.mjs';
import vGeoLongitude            from '../../src/functions/vGeoLongitude.mjs';
import vGreaterThan             from '../../src/functions/vGreaterThan.mjs';
import vGreaterThanOrEqual      from '../../src/functions/vGreaterThanOrEqual.mjs';
import vGuid                    from '../../src/functions/vGuid.mjs';
import vIn                      from '../../src/functions/vIn.mjs';
import vIsFalse                 from '../../src/functions/vIsFalse.mjs';
import vIsTrue                  from '../../src/functions/vIsTrue.mjs';
import vLessThan                from '../../src/functions/vLessThan.mjs';
import vLessThanOrEqual         from '../../src/functions/vLessThanOrEqual.mjs';
import vMax                     from '../../src/functions/vMax.mjs';
import vMin                     from '../../src/functions/vMin.mjs';
import vPhone                   from '../../src/functions/vPhone.mjs';
import vRequired                from '../../src/functions/vRequired.mjs';
import vSize                    from '../../src/functions/vSize.mjs';
import vSysMac                  from '../../src/functions/vSysMac.mjs';
import vSysIPv4                 from '../../src/functions/vSysIPv4.mjs';
import vSysIPv6                 from '../../src/functions/vSysIPv6.mjs';
import vSysIPv4_or_v6           from '../../src/functions/vSysIPv4_or_v6.mjs';
import vTimeZone                from '../../src/functions/vTimeZone.mjs';
import vUrl                     from '../../src/functions/vUrl.mjs';
import vUrlNoQuery              from '../../src/functions/vUrlNoQuery.mjs';
import vUrlImage                from '../../src/functions/vUrlImage.mjs';

describe('Validator - Core', () => {
    it('Should instantiate to a validator object', () => {
        const validator = new Validator({});

        //  It should have a validate function on its instance
        assert.equal(typeof validator.validate, 'function');

        //  It should have a extend function on the class
        assert.equal(typeof Validator.extend, 'function');

        //  It should not have a extend function on its instance
        assert.equal(Object.prototype.hasOwnProperty.call(validator, 'extend'), false);

        //  It should have a extendMulti function on the class
        assert.equal(typeof Validator.extendMulti, 'function');

        //  It should not have a extendMulti function on its instance
        assert.equal(Object.prototype.hasOwnProperty.call(validator, 'extendMulti'), false);
    });

    it('Should throw a type error when passed wrong configuration options', () => {
        assert.throws(
            () => new Validator(),
            new TypeError('Provide an object to define the rules of this validator')
        );

        assert.throws(
            () => new Validator(5),
            new TypeError('Provide an object to define the rules of this validator')
        );

        assert.throws(
            () => new Validator([{hello: 'world'}, 5, true]),
            new TypeError('Provide an object to define the rules of this validator')
        );

        assert.throws(
            () => new Validator('foo'),
            new TypeError('Provide an object to define the rules of this validator')
        );

        assert.throws(
            () => new Validator({foo: 'number', a: {b: 'string', params: []}}),
            new TypeError('The rule for a key needs to be a string value')
        );

        assert.throws(
            () => new Validator({foo: 5, a: {b: 'string', params: []}}),
            new TypeError('The rule for a key needs to be a string value')
        );

        assert.throws(
            () => new Validator({foo: 'number', a: 'in:<>'}),
            new TypeError('Parameterization misconfiguration, verify rule config for in:<>')
        );
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

    describe('@check FN - lexer: iterable', () => {
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
    });

    describe('@check FN - lexer: iterable:unique', () => {
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

        it('Should return invalid when array is not unique, doesnt match rules and should only insert uniqueness invalidity once', () => {
            const validator = new Validator({a: '[unique]integer'});
            assert.equal(validator.check({a: [1, 2, 'a', 2, 2, 2.2]}), false);
        });
    });

    describe('@check FN - lexer: iterable:max', () => {
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

    describe('@check FN - lexer: iterable:min', () => {
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

    describe('@check FN - lexer: iterable:max+min', () => {
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

    describe('@validate FN', () => {
        it('Should return a properly formatted evaluation object', () => {
            const evaluation = new Validator({a: 'number', b: 'number'}).validate({a: 20, b: false});

            //  Evaluate object
            assert(typeof evaluation, 'object');
            assert.deepEqual(Object.keys(evaluation), ['is_valid', 'count', 'errors']);

            //  Evaluate object structure: is_valid
            assert(typeof evaluation.is_valid, 'Boolean');

            //  Evaluate object structure: count
            assert(typeof evaluation.count, 'number');
            assert.ok(evaluation.count === 1);

            //  Evaluate object structure: errors
            assert(typeof evaluation.errors, 'object');
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
            const evaluation = validator.validate();
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should validate to false with \'NO_DATA\' if no data was passed and rules were set up', () => {
            const validator = new Validator({a: 'string_ne'});
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

    describe('@validate FN - lexer: iterable', () => {
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

    describe('@validate FN - lexer: iterable:unique', () => {
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

        it('Should return invalid when array is not unique, doesnt match rules and should only insert uniqueness invalidity once', () => {
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

    describe('@validate FN - lexer: iterable:max', () => {
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

    describe('@validate FN - lexer: iterable:min', () => {
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

    describe('@validate FN - lexer: iterable:max+min', () => {
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

    describe('@rules GET', () => {
        it('Should return the configured rules on the Validator as an object', () => {
            assert.equal(typeof Validator.rules, 'object');
        });

        it('Should return a correct kv-map of configured rules', () => {
            assert.deepEqual(Validator.rules, {
                alpha_num_spaces            : vAlphaNumSpaces,
                alpha_num_spaces_multiline  : vAlphaNumSpacesMultiline,
                array                       : Array.isArray,
                array_ne                    : Is.NeArray,
                between                     : vBetween,
                between_inc                 : vBetweenInclusive,
                boolean                     : vBoolean,
                color_hex                   : vColorHex,
                continent                   : vContinent,
                country                     : vCountry,
                country_alpha3              : vCountryAlpha3,
                date                        : Is.Date,
                date_string                 : vDateString,
                email                       : vEmail,
                equal_to                    : Is.Eq,
                geo_latitude                : vGeoLatitude,
                geo_longitude               : vGeoLongitude,
                greater_than                : vGreaterThan,
                greater_than_or_equal       : vGreaterThanOrEqual,
                guid                        : vGuid,
                in                          : vIn,
                integer                     : Number.isInteger,
                is_false                    : vIsFalse,
                is_true                     : vIsTrue,
                less_than                   : vLessThan,
                less_than_or_equal          : vLessThanOrEqual,
                max                         : vMax,
                min                         : vMin,
                number                      : Number.isFinite,
                object                      : Is.Object,
                object_ne                   : Is.NeObject,
                phone                       : vPhone,
                required                    : vRequired,
                size                        : vSize,
                string                      : Is.String,
                string_ne                   : Is.NeString,
                sys_mac                     : vSysMac,
                sys_ipv4                    : vSysIPv4,
                sys_ipv6                    : vSysIPv6,
                sys_ipv4_or_v6              : vSysIPv4_or_v6,
                time_zone                   : vTimeZone,
                url                         : vUrl,
                url_noquery                 : vUrlNoQuery,
                url_img                     : vUrlImage,
                gt                          : vGreaterThan,
                gte                         : vGreaterThanOrEqual,
                lt                          : vLessThan,
                lte                         : vLessThanOrEqual,
                eq                          : Is.Eq,
            });
        });

        it('Should return a immutable frozen version of the configured rules', () => {
            const rules = Validator.rules;
            assert.ok(Object.isFrozen(rules));
        });

        it('Should take into account extended rules', () => {
            const fn = () => true;
            Validator.extend('myfunction', fn);
            assert.equal(Validator.rules.myfunction, fn);
        });
    });

    describe('@extend FN', () => {
        it('Should throw if not provided anything', () => {
            assert.throws(
                () => Validator.extend(),
                new Error('Invalid extension: ensure name is a string only containing alphanumeric, dash or underscore characters')
            );
        });

        it('Should throw if not provided a string', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                assert.throws(
                    () => Validator.extend(el, () => true),
                    new Error('Invalid extension: ensure name is a string only containing alphanumeric, dash or underscore characters')
                );
            }
        });

        it('Should throw if not provided a valid string', () => {
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
                    () => Validator.extend(el, () => true),
                    new Error('Invalid extension: ensure name is a string only containing alphanumeric, dash or underscore characters')
                );
            }
        });

        it('Should throw if not provided a function', () => {
            for (const el of CONSTANTS.NOT_FUNCTION) {
                assert.throws(
                    () => Validator.extend('rule', el),
                    new Error('Invalid extension: rule, ensure a valid function is passed')
                );
            }
        });

        it('Should work', () => {
            Validator.extend('trick', (val, p1) => {
                if (p1 === 'treat') return val === 'trick';
                if (p1 === 'trick') return val === 'treat';
                return false;
            });

            const evaluation = new Validator({a: 'trick:<b>'}).validate({a: 'trick', b: 'treat'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should work with multiple parameters', () => {
            Validator.extend('sum', (val, p1, p2) => val === (p1 + p2));

            const evaluation = new Validator({a: 'sum:<b>,<c>'}).validate({a: 4, b: 1, c: 3});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should work across multiple instances', () => {
            Validator.extend('double', (val, p1) => val === (p1 * 2));

            //  Evaluation
            const evaluation = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            //  Second evaluation
            const evaluation2 = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
            assert.deepEqual(evaluation2, {is_valid: true, count: 0, errors: {}});
        });

        it('Should allow redefining the same validity function', () => {
            Validator.extend('ismyname', val => val === 'peter');

            //  Evaluation
            const evaluation = new Validator({name: 'ismyname'}).validate({name: 'peter'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            //  Redefine
            Validator.extend('ismyname', val => val === 'josh');

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
    });

    describe('@extendMulti FN', () => {
        it('Should throw if not provided anything', () => {
            assert.throws(
                () => Validator.extendMulti(),
                new Error('Provide an object to extendMulti')
            );
        });

        it('Should throw if not provided an object', () => {
            for (const el of CONSTANTS.NOT_OBJECT) {
                assert.throws(
                    () => Validator.extendMulti(el),
                    new Error('Provide an object to extendMulti')
                );
            }
        });

        it('Should not throw if provided an empty object', () => {
            assert.doesNotThrow(() => Validator.extendMulti({}));
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
                    () => Validator.extendMulti({[el]: val => val === true}),
                    new Error('Invalid extension: ensure names only contain alphanumeric, dash or underscore characters')
                );

                assert.ok(!Object.prototype.hasOwnProperty.call(Validator.rules, el));
            }
        });

        it('Should throw if provided an object where certain values do not have a function', () => {
            for (const el of CONSTANTS.NOT_FUNCTION) {
                const uid = guid();
                assert.throws(
                    () => Validator.extendMulti({[uid]: el}),
                    new Error('Invalid extension: ensure all values are functions')
                );

                assert.ok(!Object.prototype.hasOwnProperty.call(Validator.rules, uid));
            }
        });

        it('Should work', () => {
            Validator.extendMulti({
                trick: function (val, p1) {
                    return p1 === 'treat' ? val === 'trick' : p1 === 'trick' ? val === 'treat' : false;
                },
            });

            const evaluation = new Validator({a: 'trick:<b>'}).validate({a: 'trick', b: 'treat'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should work with multiple parameters', () => {
            Validator.extendMulti({
                sum: function (val, p1, p2) {
                    return val === (p1 + p2);
                },
            });

            const evaluation = new Validator({a: 'sum:<b>,<c>'}).validate({a: 4, b: 1, c: 3});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        });

        it('Should work across multiple instances', () => {
            Validator.extendMulti({
                double: function (val, p1) {
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
            Validator.extendMulti({
                ismyname: function (val) {
                    return val === 'peter';
                },
            });

            //  Evaluation
            const evaluation = new Validator({name: 'ismyname'}).validate({name: 'peter'});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});

            //  Redefine
            Validator.extendMulti({
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
            Validator.extendMulti({
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
    });

    describe('@extendRegex FN', () => {
        it('Should throw if not provided anything', () => {
            assert.throws(
                () => Validator.extendRegex(),
                new Error('Provide an object to extendRegex')
            );
        });

        it('Should throw if not provided an object', () => {
            for (const el of CONSTANTS.NOT_OBJECT) {
                assert.throws(
                    () => Validator.extendRegex(el),
                    new Error('Provide an object to extendRegex')
                );
            }
        });

        it('Should not throw if provided an empty object', () => {
            assert.doesNotThrow(() => Validator.extendRegex({}));
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
                const uid = guid();
                assert.throws(
                    () => Validator.extendRegex({[uid]: ['foo', 'bar'], [el]: ['foobar', 'barfoo']}),
                    new Error('Invalid regex extension: ensure names only contain alphanumeric, dash or underscore characters')
                );

                assert.ok(!Object.prototype.hasOwnProperty.call(Validator.rules, el));
                assert.ok(!Object.prototype.hasOwnProperty.call(Validator.rules, uid));
            }
        });

        it('Should throw if provided an object where certain values do not have a regex set', () => {
            for (const el of CONSTANTS.NOT_REGEXP) {
                const uid = guid();
                const uid2 = guid();
                assert.throws(
                    () => Validator.extendRegex({[uid]: /hello/g, [uid2]: el}),
                    new Error('Invalid regex extension: ensure all values are regexes')
                );
                assert.ok(!Object.prototype.hasOwnProperty.call(Validator.rules, uid));
                assert.ok(!Object.prototype.hasOwnProperty.call(Validator.rules, uid2));
            }
        });

        it('Should work', () => {
            Validator.extendRegex({
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
            Validator.extendRegex({
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
            Validator.extendRegex({contains_hello: /Hello/});

            assert.ok(Validator.rules.contains_hello instanceof Function);
            assert.ok(Validator.rules.contains_hello('Hello there'));
            assert.equal(Validator.rules.contains_hello('hello there'), false);
            assert.equal(Validator.rules.contains_hello('ola amigos'), false);
            assert.equal(Validator.rules.contains_hello('Ola amigos'), false);

            Validator.extendRegex({contains_hello: /((h|H)ello|(o|O)la)/});

            assert.ok(Validator.rules.contains_hello('Hello there'));
            assert.ok(Validator.rules.contains_hello('hello there'));
            assert.ok(Validator.rules.contains_hello('ola amigos'));
            assert.ok(Validator.rules.contains_hello('Ola amigos'));
        });

        it('Should allow working with not/sometimes flags', () => {
            Validator.extendRegex({contains_hello: /((h|H)ello|(o|O)la)/});

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

    describe('@extendEnum FN', () => {
        it('Should throw if not provided anything', () => {
            assert.throws(
                () => Validator.extendEnum(),
                new Error('Provide an object to extendEnum')
            );
        });

        it('Should throw if not provided an object', () => {
            for (const el of CONSTANTS.NOT_OBJECT) {
                assert.throws(
                    () => Validator.extendEnum(el),
                    new Error('Provide an object to extendEnum')
                );
            }
        });

        it('Should not throw if provided an empty object', () => {
            assert.doesNotThrow(() => Validator.extendEnum({}));
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
                const uid = guid();
                assert.throws(
                    () => Validator.extendEnum({[uid]: ['foo', 'bar'], [el]: ['foobar', 'barfoo']}),
                    new Error('Invalid enum: ensure names only contain alphanumeric, dash or underscore characters')
                );

                assert.ok(!Object.prototype.hasOwnProperty.call(Validator.rules, el));
                assert.ok(!Object.prototype.hasOwnProperty.call(Validator.rules, uid));
            }
        });

        it('Should throw if provided an object where certain values do not have an array with content', () => {
            for (const el of CONSTANTS.NOT_ARRAY_WITH_EMPTY) {
                const uid = guid();
                const uid2 = guid();
                assert.throws(
                    () => Validator.extendEnum({[uid]: ['foo', 'bar'], [uid2]: el}),
                    new Error('Invalid enum: ensure all values are arrays with content')
                );
                assert.ok(!Object.prototype.hasOwnProperty.call(Validator.rules, uid));
                assert.ok(!Object.prototype.hasOwnProperty.call(Validator.rules, uid2));
            }
        });

        it('Should work', () => {
            Validator.extendEnum({
                enum1: ['foo', 'bar', 'foobar'],
                ENUM_2: [1, 2, 3],
            });

            assert.ok(new Validator({a: 'enum1'}).check({a: 'foo'}));
            assert.ok(new Validator({a: 'ENUM_2', b: 'enum1'}).check({a: 2, b: 'foobar'}));
            assert.equal(new Validator({a: 'enum1'}).check({a: 'fuo'}), false);
            assert.equal(new Validator({a: 'ENUM_2', b: 'enum1'}).check({a: 42, b: 'foobar'}), false);
        });

        it('Extensions should also show up as functions in rules', () => {
            Validator.extendEnum({
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
            Validator.extendEnum({
                enum1: ['foo', 'bar', 'foobar'],
                ENUM_2: [1, 2, 3],
            });

            assert.ok(Validator.rules.enum1 instanceof Function);
            assert.ok(Validator.rules.enum1('foo'));
            assert.equal(Validator.rules.enum1('fooo'), false);

            assert.ok(Validator.rules.ENUM_2 instanceof Function);
            assert.ok(Validator.rules.ENUM_2(1));
            assert.equal(Validator.rules.ENUM_2(42), false);

            Validator.extendEnum({
                ENUM_2: [2, 3, 42],
            });

            assert.equal(Validator.rules.ENUM_2(1), false);
            assert.ok(Validator.rules.ENUM_2(42));
        });

        it('Should throw if provided an object where certain arrays contain more than just primitive strings or numbers', () => {
            assert.throws(
                () => Validator.extendEnum({enum_1: ['foo', false, 'bar']}),
                new Error('Invalid enum: ensure all values only contain primitive strings/numbers')
            );

            assert.throws(
                () => Validator.extendEnum({enum_1: ['foo', {a: 1}, 'bar']}),
                new Error('Invalid enum: ensure all values only contain primitive strings/numbers')
            );

            assert.throws(
                () => Validator.extendEnum({enum_1: ['foo', new Date(), 'bar']}),
                new Error('Invalid enum: ensure all values only contain primitive strings/numbers')
            );

            assert.throws(
                () => Validator.extendEnum({enum_1: ['foo', ['foo'], 'bar']}),
                new Error('Invalid enum: ensure all values only contain primitive strings/numbers')
            );
        });

        it('Should allow working with not/sometimes flags', () => {
            Validator.extendEnum({
                FRUITS: ['apple', 'pear', 'banana'],
                ANIMALS: ['dog', 'cat', 'parrot'],
                AGE_13_18: [13, 14, 15, 16, 17, 18],
                AGE_19_25: [19, 20, 21, 22, 23, 24, 25],
            });

            assert.ok(new Validator({age: 'AGE_13_18'}).check({age: 15}));
            assert.ok(new Validator({age: '!AGE_13_18'}).check({age: 19}));
            assert.ok(Validator.rules.AGE_13_18(15));
            assert.ok(new Validator({age: '?AGE_13_18', pet: 'ANIMALS', fave_fruit: 'FRUITS'}).check({pet: 'dog', fave_fruit: 'banana'}));
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
            Validator.extend('is_type', val => ['type1', 'type2', 'type4'].indexOf(val) >= 0);

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
    });
});
