'use strict';

import {describe, it}           from 'node:test';
import assert                   from 'node:assert/strict';
import Is                       from '@valkyriestudios/utils/is.js';
import CONSTANTS                from '../constants.mjs';
import Validator                from '../src/index.mjs';
import vAlphaNumSpaces          from '../src/functions/vAlphaNumSpaces.mjs';
import vAlphaNumSpacesMultiline from '../src/functions/vAlphaNumSpacesMultiline.mjs';
import vBetween                 from '../src/functions/vBetween.mjs';
import vBetweenInclusive        from '../src/functions/vBetweenInclusive.mjs';
import vBoolean                 from '../src/functions/vBoolean.mjs';
import vColorHex                from '../src/functions/vColorHex.mjs';
import vContinent               from '../src/functions/vContinent.mjs';
import vCountry                 from '../src/functions/vCountry.mjs';
import vCountryAlpha3           from '../src/functions/vCountryAlpha3.mjs';
import vDateString              from '../src/functions/vDateString.mjs';
import vEmail                   from '../src/functions/vEmail.mjs';
import vGeoLatitude             from '../src/functions/vGeoLatitude.mjs';
import vGeoLongitude            from '../src/functions/vGeoLongitude.mjs';
import vGreaterThan             from '../src/functions/vGreaterThan.mjs';
import vGreaterThanOrEqual      from '../src/functions/vGreaterThanOrEqual.mjs';
import vGuid                    from '../src/functions/vGuid.mjs';
import vIn                      from '../src/functions/vIn.mjs';
import vLessThan                from '../src/functions/vLessThan.mjs';
import vLessThanOrEqual         from '../src/functions/vLessThanOrEqual.mjs';
import vMax                     from '../src/functions/vMax.mjs';
import vMin                     from '../src/functions/vMin.mjs';
import vPhone                   from '../src/functions/vPhone.mjs';
import vRequired                from '../src/functions/vRequired.mjs';
import vSize                    from '../src/functions/vSize.mjs';
import vSysMac                  from '../src/functions/vSysMac.mjs';
import vSysIPv4                 from '../src/functions/vSysIPv4.mjs';
import vSysIPv6                 from '../src/functions/vSysIPv6.mjs';
import vSysIPv4_or_v6           from '../src/functions/vSysIPv4_or_v6.mjs';
import vTimeZone                from '../src/functions/vTimeZone.mjs';
import vUrl                     from '../src/functions/vUrl.mjs';
import vUrlNoQuery              from '../src/functions/vUrlNoQuery.mjs';

describe('Validator - Core', () => {
    const subject = {
        a : 100,
        b : 200,
        c : 'hello',
        d : false,
        e : true,
        f : new RegExp(),
        g : new Date(),
        h : {},
        i : [],
        j : '',
        k : new String('Foo'),
    };

//  Validate that it has all the necessary functions

    it('[general] should instantiate to a validator object', () => {
        const validator = new Validator({});

        //  It should have a validate function on its instance
        assert.equal(typeof validator.validate, 'Function');

        //  It should have a extend function on the class
        assert.equal(typeof Validator.extend, 'Function');

        //  It should not have a extend function on its instance
        should.not.exist(validator.extend);

        //  It should have a extendMulti function on the class
        assert.equal(typeof Validator.extendMulti, 'Function');

        //  It should not have a extendMulti function on its instance
        should.not.exist(validator.extendMulti);

        //  It should have an 'is_valid' property that is a boolean and by default set to false
        assert.equal(validator.is_valid, false);

        //  It should have an 'errors' property that is an Object and by default set to an empty object
        assert.deepEqual(validator.errors, Object.create(null));

        //  It should not have an 'is_valid' property on the class
        should.not.exist(Validator.is_valid);

        //  It should not have an 'errors' property on the class
        should.not.exist(Validator.errors);
    });

    it('[general] should throw a type error when passed wrong configuration options', () => {
        expect(() => {
            new Validator();
        }).to.throw();

        expect(() => {
            new Validator(5);
        }).to.throw();

        expect(() => {
            new Validator([{hello: 'world'}, 5, true]);
        }).to.throw();

        expect(() => {
            new Validator('foo');
        }).to.throw();

        expect(() => {
            new Validator({});
        }).not.to.throw();

        expect(() => {
            new Validator({foo: 'string'});
        }).not.to.throw();

        expect(() => {
            new Validator({foo: 'number', a: {b: 'string', params: []}});
        }).to.throw();

        expect(() => {
            new Validator({foo: 5, a: {b: 'string', params: []}});
        }).to.throw();
    });

    describe('@validate FN', () => {
        it('Should return a properly formatted evaluation object', () => {
            const evaluation = new Validator({a: 'number'}).validate(subject);

            //  Evaluate object
            assert.typeOf(evaluation, 'Object');
            assert.deepEqual(Object.keys(evaluation), ['is_valid', 'errors']);

            //  Evaluate object structure : is_valid
            assert.typeOf(evaluation.is_valid, 'Boolean');

            //  Evaluate object structure : errors
            assert.typeOf(evaluation.errors, 'Object');
            assert.deepEqual(evaluation.errors, {a: []});
        });

        it('Should have errors where the object contains a msg and a params property', () => {
            const evaluation = new Validator({c: 'number'}).validate(subject);
            assert.deepEqual(evaluation.errors, {c: [{msg: 'number', params: []}]});
        });

        it('Should have errors where the key is the rule that failed', () => {
            const evaluation = new Validator({c: 'number'}).validate(subject);
            assert.equal(evaluation.errors.c[0].msg, 'number');
        });

        it('Should have errors where the params object is empty if no param was passed', () => {
            const evaluation = new Validator({c: 'number'}).validate(subject);
            assert.deepEqual(evaluation.errors.c[0].params, []);
        });

        it('Should have errors where the params object contains the passed param if passed', () => {
            const evaluation = new Validator({a: 'greater_than:150'}).validate(subject);
            assert.deepEqual(evaluation.errors.a[0].params, ['150']);
        });

        it('Should validate to true if no data was passed and no rules were set up', () => {
            const validator = new Validator({});
            const evaluation = validator.validate();
            assert.ok(evaluation.is_valid);
        });

        it('Should remember the validity of the last validation run', () => {
            const validator = new Validator({a: 'number'});
            validator.validate({a: 'foo'});

            assert.equal(validator.is_valid, false);
            assert.deepEqual(validator.errors, {a: [{msg: 'number', params: []}]});

            validator.validate({a: 10});

            assert.ok(validator.is_valid);
            assert.deepEqual(validator.errors, {a: []});
        });
    });

    describe('@validate FN - lexer: flag:sometimes (?)', () => {
        it('Should validate correctly if set and no value is passed', () => {
            const evaluation = new Validator({a: '?number'}).validate({});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a, []);
        });

        it('Should not interfere with other validation rules', () => {
            const evaluation = new Validator({
                a: '?number',
                b: 'number|less_than:20',
            }).validate({});

            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {
                a: [],
                b: [
                    {msg: 'number', params: []},
                    {msg: 'less_than', params: ['20']},
                ],
            });
        });
    });

    describe('@validate FN - lexer: flag:parameter (<...>)', () => {
        it('Should allow link to passed parameter', () => {
            const evaluation = new Validator({a: 'equal_to:<foo>'}).validate({a: 'hello', foo: 'hello'});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a, []);
        });

        it('Should fail if parameter is not passed', () => {
            const evaluation = new Validator({a: 'equal_to:<foo>'}).validate({a: 'hello', foobar: 'hello'});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg:'equal_to', params: [undefined]}]);
        });

        it('Should allow multiple parameters inside the same ruleset', () => {
            const evaluation = new Validator({a: 'between:<min>,<max>'}).validate({a: 5, min: 3, max: 7});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a, []);
        });

        it('Should allow multiple parameters inside the same config', () => {
            const evaluation = new Validator({a: 'in:<arr1>', b: 'in:<arr2>'}).validate({a: 1, b: 2, arr1: [1, 3, 5], arr2: [2, 4, 6]});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a, []);
            assert.deepEqual(evaluation.errors.b, []);
        });

        it('Should allow the same parameter on multiple rules inside the same config', () => {
            const evaluation = new Validator({a: 'in:<arr1>', b: 'in:<arr1>'}).validate({a: 1, b: 2, arr1: [1, 2, 3]});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a, []);
            assert.deepEqual(evaluation.errors.b, []);
        });
    });

    describe('@validate FN - lexer: flag:not (!)', () => {
        it('Should validate correct if set and no value is passed', () => {
            const evaluation = new Validator({a: '!number'}).validate({});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg: 'not_number', params: []}]);
        });

        it('Should validate correct if set and value is passed when using standard rule', () => {
            const evaluation = new Validator({a: '!number'}).validate({a: 'hello'});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a, []);

            const evaluation2 = new Validator({a: '!number'}).validate({a: 4});
            assert.equal(evaluation2.is_valid, false);
            assert.deepEqual(evaluation2.errors.a, [{msg: 'not_number', params: []}]);

            const evaluation3 = new Validator({a: '!between:5,10'}).validate({a: 4});
            assert.ok(evaluation3.is_valid);
            assert.deepEqual(evaluation3.errors.a, []);

            const evaluation4 = new Validator({a: '!between:5,10'}).validate({a: 6});
            assert.equal(evaluation4.is_valid, false);
            assert.deepEqual(evaluation4.errors.a, [{msg: 'not_between', params: ['5', '10']}]);
        });

        it('Should validate correct if set and value is passed when using parameter flag', () => {
            const evaluation = new Validator({a: '!equal_to:<foo>'}).validate({a: 'hello', foo: 'hello'});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg: 'not_equal_to', params: ['hello']}]);
        });

        it('Should validate correct if set and value is passed when using multiple validation rules', () => {
            const evaluation = new Validator({a: '!string|!equal_to:<foo>'}).validate({a: 'foo', foo: 'hello'});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [
                {msg: 'not_string', params: []},
            ]);

            const evaluation2 = new Validator({a: '!string|!equal_to:<foo>'}).validate({a: 'foo', foo: 'foo'});
            assert.equal(evaluation2.is_valid, false);
            assert.deepEqual(evaluation2.errors.a, [
                {msg: 'not_string', params: []},
                {msg: 'not_equal_to', params: ['foo']},
            ]);
        });
    });

    describe('@validate FN - lexer: iterable', () => {
        it('Should throw if passed an invalid iterable config during rule creation', () => {
            expect(() => {
                new Validator({a: '[string'});
            }).to.throw;

            expect(() => {
                new Validator({a: ']string'});
            }).to.throw;

            expect(() => {
                new Validator({a: '][string'});
            }).to.throw;
        });

        it('Should not throw if passed an iterable config during rule creation', () => {
            expect(() => {
                new Validator({a: '[]string'});
            }).to.not.throw;
        });

        it('Should return invalid when passing a non-array to an iterable', () => {
            const validator = new Validator({a: '[]string'});
            const evaluation = validator.validate({a: 'hello'});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [{msg: 'iterable', params: []}]});
        });

        it('Should return valid when passing an empty array to an iterable', () => {
            const validator = new Validator({a: '[]string'});
            const evaluation = validator.validate({a: []});
            assert.ok(evaluation.is_valid);
        });

        it('Should allow validating an array of values', () => {
            const validator = new Validator({a: '[]string'});
            let evaluation = validator.validate({a: ['hello', 'there']});
            assert.ok(evaluation.is_valid);

            evaluation = validator.validate({a: ['hello', false]});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg: 'string', idx: 1, params: []}]);

            evaluation = validator.validate({a: ['hello', false, true]});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg: 'string', idx: 1, params: []}, {msg: 'string', idx: 2, params: []}]);
        });

        it('Should allow validating an array of values with a \'?\' sometimes flag', () => {
            const validator = new Validator({a: '?[]string'});
            let evaluation = validator.validate({a: ['hello', 'there']});
            assert.ok(evaluation.is_valid);

            evaluation = validator.validate({});
            assert.ok(evaluation.is_valid);

            evaluation = validator.validate({a: ['hello', false, 'foo', true]});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a, [{msg: 'string', idx: 1, params: []}, {msg: 'string', idx: 3, params: []}]);
        });

        it('Should allow validating an array of values with a \'?\' sometimes flag and parameter pass', () => {
            const validator = new Validator({a: '?[]string|in:<genders>'});
            let evaluation = validator.validate({a: ['male', 'male', 'female', 'male', 'female'], genders: ['male', 'female', 'other']});
            assert.ok(evaluation.is_valid);

            evaluation = validator.validate({genders: ['male', 'female', 'other']});
            assert.ok(evaluation.is_valid);

            evaluation = validator.validate({a: ['dog'], genders: ['male', 'female', 'other']});
            assert.equal(evaluation.is_valid, false);
        });

        it('Should allow validating an array of values with a \'?\' sometimes flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '?[unique]string|in:<genders>'});
            let evaluation = validator.validate({a: ['male', 'male', 'female', 'male', 'female'], genders: ['male', 'female', 'other']});
            assert.equal(evaluation.is_valid, false);
            evaluation = validator.validate({a: ['male', 'female'], genders: ['male', 'female', 'other']});
            assert.ok(evaluation.is_valid);
        });

        it('Should allow validating an array of values with a \'!\' not flag and parameter pass', () => {
            const validator = new Validator({a: '[]string|!in:<genders>'});
            let evaluation = validator.validate({a: ['bob', 'bob', 'john', 'bob', 'john'], genders: ['male', 'female', 'other']});
            assert.ok(evaluation.is_valid);

            evaluation = validator.validate({a: ['male', 'female', 'female'], genders: ['male', 'female', 'other']});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [
                {idx: 0, msg: 'not_in', params: [['male', 'female', 'other']]},
                {idx: 1, msg: 'not_in', params: [['male', 'female', 'other']]},
                {idx: 2, msg: 'not_in', params: [['male', 'female', 'other']]},
            ]});

            evaluation = validator.validate({a: ['chicken', 'dog', 'female'], genders: ['male', 'female', 'other']});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [
                {idx: 2, msg: 'not_in', params: [['male', 'female', 'other']]},
            ]});
        });

        it('Should allow validating an array of values with a \'!\' not flag, uniqueness and parameter pass', () => {
            const validator = new Validator({a: '[unique]string|!in:<genders>'});
            let evaluation = validator.validate({a: ['bob', 'john'], genders: ['male', 'female', 'other']});
            assert.ok(evaluation.is_valid);

            evaluation = validator.validate({a: ['male', 'female', 'female'], genders: ['male', 'female', 'other']});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [
                {msg: 'iterable_unique', params: []},
                {idx: 0, msg: 'not_in', params: [['male', 'female', 'other']]},
                {idx: 1, msg: 'not_in', params: [['male', 'female', 'other']]},
                {idx: 2, msg: 'not_in', params: [['male', 'female', 'other']]},
            ]});

            evaluation = validator.validate({a: ['chicken', 'dog', 'female', 'dog'], genders: ['male', 'female', 'other']});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [
                {msg: 'iterable_unique', params: []},
                {idx: 2, msg: 'not_in', params: [['male', 'female', 'other']]},
            ]});
        });
    });

    describe('@validate FN - lexer: iterable:unique', () => {
        it('Should return valid when array is unique', () => {
            const validator = new Validator({a: '[unique]string'});
            const evaluation = validator.validate({a: ['a', 'b', 'c']});
            assert.ok(evaluation.is_valid);
        });

        it('Should return invalid when array is not unique', () => {
            const validator = new Validator({a: '[unique]string'});
            const evaluation = validator.validate({a: ['a', 'b', 'a']});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [{msg: 'iterable_unique', params: []}]});
        });

        it('Should return invalid when array is not unique when using numbers', () => {
            const validator = new Validator({a: '[unique]number'});
            const evaluation = validator.validate({a: [1, 2, 2]});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [{msg: 'iterable_unique', params: []}]});
        });

        it('Should return invalid when array is not unique when using objects', () => {
            const validator = new Validator({a: '[unique]object'});
            const evaluation = validator.validate({a: [{a: 1}, {b: 2}, {b: 2}]});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [{msg: 'iterable_unique', params: []}]});
        });

        it('Should return invalid when array is not unique and doesnt match rules', () => {
            const validator = new Validator({a: '[unique]integer'});
            const evaluation = validator.validate({a: [1, 2, 'a', 2]});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [
                {msg: 'iterable_unique', params: []},
                {idx: 2, msg: 'integer', params: []},
            ]});
        });

        it('Should return invalid when array is not unique, doesnt match rules and should only insert uniqueness invalidity once', () => {
            const validator = new Validator({a: '[unique]integer'});
            const evaluation = validator.validate({a: [1, 2, 'a', 2, 2, 2.2]});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [
                {msg: 'iterable_unique', params: []},
                {idx: 2, msg: 'integer', params: []},
                {idx: 5, msg: 'integer', params: []},
            ]});
        });
    });

    describe('@validate FN - lexer: iterable:max', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[max:5]string'});
            const evaluation = validator.validate({a: ['hello', 'there']});
            assert.ok(evaluation.is_valid);
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', '5']});
            assert.ok(evaluation.is_valid);
        });

        it('Should return invalid when above boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', '5', '6']});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [{msg: 'iterable_max', params: [5]}]});
        });

        it('Should only return iterable invalidity and not go into val evaluation when above boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', 5, '6']});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [{msg: 'iterable_max', params: [5]}]});
        });

        it('Should return iterable invalidity and go into val evaluation when at or below boundary', () => {
            const validator = new Validator({a: '[max:5]string'});
            const evaluation = validator.validate({a: ['1', false, false, '2', false]});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [
                {idx: 1, msg: 'string', params: []},
                {idx: 2, msg: 'string', params: []},
                {idx: 4, msg: 'string', params: []},
            ]});

            const evaluation2 = validator.validate({a: [false, '1', '2', '3']});
            assert.equal(evaluation2.is_valid, false);
            assert.deepEqual(evaluation2.errors, {a: [
                {idx: 0, msg: 'string', params: []},
            ]});
        });
    });

    describe('@validate FN - lexer: iterable:min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[min:5]string'});
            const evaluation = validator.validate({a: ['hello', 'there', 'this', 'is', 'cool', 'right']});
            assert.ok(evaluation.is_valid);
        });

        it('Should return valid when at boundary', () => {
            const validator = new Validator({a: '[min:5]string'});
            const evaluation = validator.validate({a: ['hello', 'there', 'this', 'is', 'cool']});
            assert.ok(evaluation.is_valid);
        });

        it('Should return invalid when below boundary', () => {
            const validator = new Validator({a: '[min:3]string'});
            const evaluation = validator.validate({a: ['1', '2']});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [{msg: 'iterable_min', params: [3]}]});
        });

        it('Should only return iterable invalidity and not go into val evaluation when below boundary', () => {
            const validator = new Validator({a: '[min:4]string'});
            const evaluation = validator.validate({a: ['1', false]});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [{msg: 'iterable_min', params: [4]}]});
        });

        it('Should return iterable invalidity and go into val evaluation when at or above boundary', () => {
            const validator = new Validator({a: '[min:4]string'});
            const evaluation = validator.validate({a: ['1', false, false, '2']});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [
                {idx: 1, msg: 'string', params: []},
                {idx: 2, msg: 'string', params: []},
            ]});

            const evaluation2 = validator.validate({a: ['1', false, '2', '3', false]});
            assert.equal(evaluation2.is_valid, false);
            assert.deepEqual(evaluation2.errors, {a: [
                {idx: 1, msg: 'string', params: []},
                {idx: 4, msg: 'string', params: []},
            ]});
        });
    });

    describe('@validate FN - lexer: iterable:max+min', () => {
        it('Should return valid when within boundaries', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['hello', 'there', 'cool']});
            assert.ok(evaluation.is_valid);
        });

        it('Should return valid when at top boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', '5']});
            assert.ok(evaluation.is_valid);
        });

        it('Should return invalid when above top boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', '5', '6']});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [{msg: 'iterable_max', params: [5]}]});
        });

        it('Should return valid when at bottom boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1', '2']});
            assert.ok(evaluation.is_valid);
        });

        it('Should return invalid when below bottom boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1']});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [{msg: 'iterable_min', params: [2]}]});
        });

        it('Should only return iterable invalidity and not go into val evaluation when above boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1', '2', '3', '4', 5, '6']});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [{msg: 'iterable_max', params: [5]}]});
        });

        it('Should only return iterable invalidity and not go into val evaluation when below boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: [5]});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [{msg: 'iterable_min', params: [2]}]});
        });

        it('Should return iterable invalidity and go into val evaluation when at or below boundary', () => {
            const validator = new Validator({a: '[max:5|min:2]string'});
            const evaluation = validator.validate({a: ['1', false, false, '2', false]});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {a: [
                {idx: 1, msg: 'string', params: []},
                {idx: 2, msg: 'string', params: []},
                {idx: 4, msg: 'string', params: []},
            ]});

            const evaluation2 = validator.validate({a: [false, '1', '2', '3']});
            assert.equal(evaluation2.is_valid, false);
            assert.deepEqual(evaluation2.errors, {a: [
                {idx: 0, msg: 'string', params: []},
            ]});

            const evaluation3 = validator.validate({a: ['1', 4]});
            assert.equal(evaluation3.is_valid, false);
            assert.deepEqual(evaluation3.errors, {a: [
                {idx: 1, msg: 'string', params: []},
            ]});
        });
    });

    describe('@rules GET', () => {
        it('Should return the configured rules on the Validator as an object', () => {
            assert.equal(typeof Validator.rules, 'Object');
        });

        it('Should return a correct kv-map of configured rules', () => {
            assert.deepEqual(Validator.rules, {
                alpha_num_spaces            : vAlphaNumSpaces,
                alpha_num_spaces_multiline  : vAlphaNumSpacesMultiline,
                array                       : Is.Array,
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
                integer                     : Is.Int,
                less_than                   : vLessThan,
                less_than_or_equal          : vLessThanOrEqual,
                max                         : vMax,
                min                         : vMin,
                number                      : Is.Num,
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
            let e = false;
            try {
                rules.hack = true;
            } catch (err) {
                e = err;
            }
            assert.typeOf(e, 'Error');
        });

        it('Should take into account extended rules', () => {
            const fn = () => true;
            Validator.extend('myfunction', fn);
            assert.equal(Validator.rules.myfunction, fn);
        });
    });

    describe('@extend FN', () => {
        it('Should throw if not provided anything', () => {
            expect(() => {
                Validator.extend();
            }).to.throw;
        });

        it('Should throw if not provided a string or if provided an empty after trimming string name', () => {
            for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
                expect(() => {
                    Validator.extend(el, () => true);
                }).to.throw;
            }
        });

        it('Should throw if not provided a function', () => {
            for (const el of CONSTANTS.NOT_FUNCTION) {
                expect(() => {
                    Validator.extend('rule', el);
                }).to.throw;
            }
        });

        it('Should work', () => {
            Validator.extend('trick', (val, p1) => {
                if (p1 === 'treat') return val === 'trick';
                if (p1 === 'trick') return val === 'treat';
                return false;
            });

            const evaluation = new Validator({a: 'trick:<b>'}).validate({a: 'trick', b: 'treat'});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a, []);
        });

        it('Should work with multiple parameters', () => {
            Validator.extend('sum', (val, p1, p2) => val === (p1 + p2));

            const evaluation = new Validator({a: 'sum:<b>,<c>'}).validate({a: 4, b: 1, c: 3});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a, []);
        });

        it('Should work across multiple instances', () => {
            Validator.extend('double', (val, p1) => val === (p1 * 2));

            //  Evaluation
            const evaluation = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a, []);

            //  Second evaluation
            const evaluation2 = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
            assert.ok(evaluation2.is_valid);
            assert.deepEqual(evaluation2.errors.a, []);
        });

        it('Should allow redefining the same validity function', () => {
            Validator.extend('ismyname', val => val === 'peter');

            //  Evaluation
            const evaluation = new Validator({name: 'ismyname'}).validate({name: 'peter'});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.name, []);

            //  Redefine
            Validator.extend('ismyname', val => val === 'josh');

            //  Second evaluation
            const evaluation2 = new Validator({name: 'ismyname'}).validate({name: 'peter'});
            assert.equal(evaluation2.is_valid, false);
            assert.deepEqual(evaluation2.errors.name, [{msg:'ismyname', params: []}]);
        });
    });

    describe('@extendMulti FN', () => {
        it('Should throw if not provided anything', () => {
            expect(() => {
                Validator.extendMulti();
            }).to.throw;
        });

        it('Should throw if not provided an object', () => {
            for (const el of CONSTANTS.NOT_OBJECT) {
                expect(() => {
                    Validator.extendMulti(el);
                }).to.throw;
            }
        });

        it('Should not throw if provided an empty object', () => {
            expect(() => {
                Validator.extendMulti({});
            }).to.not.throw;
        });

        it('Should throw if provided an object where certain values do not have a function', () => {
            for (const el of CONSTANTS.NOT_FUNCTION) {
                expect(() => {
                    Validator.extendMulti({
                        rule_1: el,
                    });
                }).to.throw;
            }
        });

        it('Should work', () => {
            Validator.extendMulti({
                trick: function (val, p1) {
                    return p1 === 'treat' ? val === 'trick' : p1 === 'trick' ? val === 'treat' : false;
                },
            });

            const evaluation = new Validator({a: 'trick:<b>'}).validate({a: 'trick', b: 'treat'});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a, []);
        });

        it('Should work with multiple parameters', () => {
            Validator.extendMulti({
                sum: function (val, p1, p2) {
                    return val === (p1 + p2);
                },
            });

            const evaluation = new Validator({a: 'sum:<b>,<c>'}).validate({a: 4, b: 1, c: 3});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a, []);
        });

        it('Should work across multiple instances', () => {
            Validator.extendMulti({
                double: function (val, p1) {
                    return val === (p1 * 2);
                },
            });

            //  Evaluation
            const evaluation = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a, []);

            //  Second evaluation
            const evaluation2 = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
            assert.ok(evaluation2.is_valid);
            assert.deepEqual(evaluation2.errors.a, []);
        });

        it('Should allow redefining the same validity function', () => {
            Validator.extendMulti({
                ismyname: function (val) {
                    return val === 'peter';
                },
            });

            //  Evaluation
            const evaluation = new Validator({name: 'ismyname'}).validate({name: 'peter'});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.name, []);

            //  Redefine
            Validator.extendMulti({
                ismyname: function (val) {
                    return val === 'josh';
                },
            });

            //  Second evaluation
            const evaluation2 = new Validator({name: 'ismyname'}).validate({name: 'peter'});
            assert.equal(evaluation2.is_valid, false);
            assert.deepEqual(evaluation2.errors.name, [{msg:'ismyname', params: []}]);
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
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.name, []);

            //  Second evaluation
            const evaluation2 = new Validator({name: 'ismyothername'}).validate({name: 'peter'});
            assert.equal(evaluation2.is_valid, false);
            assert.deepEqual(evaluation2.errors.name, [{msg:'ismyothername', params: []}]);
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

            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.password, []);
            assert.deepEqual(evaluation.errors.password_confirmation, []);
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

            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.first_name, []);
            assert.deepEqual(evaluation.errors.last_name, []);
            assert.deepEqual(evaluation.errors.age, []);
            assert.deepEqual(evaluation.errors.gender, []);
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

            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.first_name, []);
            assert.deepEqual(evaluation.errors.last_name, []);
            assert.deepEqual(evaluation.errors.age, [{msg: 'integer', params: []}, {msg: 'between', params: ['1', '150']}]);
            assert.deepEqual(evaluation.errors.gender, [{msg: 'in', params: [['m', 'f', 'o']]}]);
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

            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.address.street, []);
            assert.deepEqual(evaluation.errors.address.nr, []);
            assert.deepEqual(evaluation.errors.address.zip, []);
            assert.deepEqual(evaluation.errors.contact.email, [{msg: 'email', params: []}]);
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
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {
                filters: {
                    ids: [
                        {idx: 3, msg: 'integer', params: []},
                    ],
                    types: [
                        {msg: 'iterable_max', params: [3]},
                    ],
                },
                contact: {email: [{msg: 'email', params: []}]},
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
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors, {
                filters: {
                    ids: [
                        {msg: 'iterable_unique', params: []},
                        {idx: 3, msg: 'integer', params: []},
                    ],
                    types: [
                        {idx: 2, msg: 'is_type', params: []},
                    ],
                },
                contact: {
                    email: [],
                },
            });
        });
    });
});
