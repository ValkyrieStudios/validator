'use strict';

import Is                       from '@valkyriestudios/utils/is';
import Validator                from '../src/index';
import vAlphaNumSpaces          from '../src/functions/vAlphaNumSpaces';
import vAlphaNumSpacesMultiline from '../src/functions/vAlphaNumSpacesMultiline';
import vBetween                 from '../src/functions/vBetween';
import vBetweenInclusive        from '../src/functions/vBetweenInclusive';
import vBoolean                 from '../src/functions/vBoolean';
import vColorHex                from '../src/functions/vColorHex';
import vContinent               from '../src/functions/vContinent';
import vDateString              from '../src/functions/vDateString';
import vEmail                   from '../src/functions/vEmail';
import vGeoLatitude             from '../src/functions/vGeoLatitude';
import vGeoLongitude            from '../src/functions/vGeoLongitude';
import vGreaterThan             from '../src/functions/vGreaterThan';
import vGreaterThanOrEqual      from '../src/functions/vGreaterThanOrEqual';
import vGuid                    from '../src/functions/vGuid';
import vIn                      from '../src/functions/vIn';
import vLessThan                from '../src/functions/vLessThan';
import vLessThanOrEqual         from '../src/functions/vLessThanOrEqual';
import vMax                     from '../src/functions/vMax';
import vMin                     from '../src/functions/vMin';
import vPhone                   from '../src/functions/vPhone';
import vRequired                from '../src/functions/vRequired';
import vSize                    from '../src/functions/vSize';
import vSysMac                  from '../src/functions/vSysMac';
import vSysIPv4                 from '../src/functions/vSysIPv4';
import vSysIPv6                 from '../src/functions/vSysIPv6';
import vSysIPv4_or_v6           from '../src/functions/vSysIPv4_or_v6';
import vTimeZone                from '../src/functions/vTimeZone';
import vUrl                     from '../src/functions/vUrl';
import vUrlNoQuery              from '../src/functions/vUrlNoQuery';

const expect = require('chai').expect;
const assert = require('chai').assert;
const should = require('chai').should();

describe('Validator - Core', () => {
    const obj_tests = [[0,1,2], 1, 2, 3, 0.5, 0.4, -1, true, new Date(), /1/g, false, 'hello', 'abc'];
    const str_tests = [{a:1}, [0,1,2], true, new Date(), /1/g, false, 123, 0.123];
    const fn_tests  = [{a:1}, [0,1,2], true, new Date(), /1/g, false, 'hello', '', 'abc', 123, 0.123];

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
        should.exist(validator.validate);
        assert.typeOf(validator.validate, 'Function');

        //  It should have a extend function on the class
        should.exist(Validator.extend);
        assert.typeOf(Validator.extend, 'Function');

        //  It should not have a extend function on its instance
        should.not.exist(validator.extend);

        //  It should have a extendMulti function on the class
        should.exist(Validator.extendMulti);
        assert.typeOf(Validator.extendMulti, 'Function');

        //  It should not have a extendMulti function on its instance
        should.not.exist(validator.extendMulti);

        //  It should have an 'is_valid' property that is a boolean and by default set to false
        should.exist(validator.is_valid);
        expect(validator.is_valid).to.eql(false);

        //  It should have an 'errors' property that is an Object and by default set to an empty object
        should.exist(validator.errors);
        expect(validator.errors).to.deep.equal(Object.create(null));

        //  It should not have an 'is_valid' property on the class
        should.not.exist(Validator.is_valid);

        //  It should not have an 'errors' property on the class
        should.not.exist(Validator.errors);
    });

    it('[general] should throw a type error when passed wrong configuration options', () => {
        expect(() => {
            const v = new Validator();
        }).to.throw();

        expect(() => {
            const v = new Validator(5);
        }).to.throw();

        expect(() => {
            const v = new Validator([{hello: 'world'}, 5, true]);
        }).to.throw();

        expect(() => {
            const v = new Validator('foo');
        }).to.throw();

        expect(() => {
            const v = new Validator({});
        }).not.to.throw();

        expect(() => {
            const v = new Validator({foo: 'string'});
        }).not.to.throw();

        expect(() => {
            const v = new Validator({foo: 'number', a: {b: 'string', params: []}});
        }).to.throw();

        expect(() => {
            const v = new Validator({foo: 5, a: {b: 'string', params: []}});
        }).to.throw();
    });

//  Validate that the returned value from validate(...) has the correct format

    it('[validate] should return a properly formatted evaluation object', () => {
        const evaluation = new Validator({a : 'number'}).validate(subject);

        //  Evaluate object
        assert.typeOf(evaluation, 'Object');
        expect(Object.keys(evaluation)).to.deep.equal(['is_valid', 'errors']);

        //  Evaluate object structure : is_valid
        should.exist(evaluation.is_valid);
        assert.typeOf(evaluation.is_valid, 'Boolean');

        //  Evaluate object structure : errors
        should.exist(evaluation.errors);
        assert.typeOf(evaluation.errors, 'Object');
        expect(evaluation.errors).to.deep.equal({a: []});
    });

    it('[validate] should have errors where the object contains a msg and a params property', () => {
        const evaluation = new Validator({c : 'number'}).validate(subject);

        expect(evaluation.errors).to.deep.equal({
            c: [{msg: 'number', params: []}],
        });
    });

    it('[validate] should have errors where the key is the rule that failed', () => {
        const evaluation = new Validator({c : 'number'}).validate(subject);
        expect(evaluation.errors.c[0].msg).to.eql('number');
    });

    it('[validate] should have errors where the params object is empty if no param was passed', () => {
        const evaluation = new Validator({c : 'number'}).validate(subject);
        expect(evaluation.errors.c[0].params).to.deep.equal([]);
    });

    it('[validate] should have errors where the params object contains the passed param if passed', () => {
        const evaluation = new Validator({a : 'greater_than:150'}).validate(subject);
        expect(evaluation.errors.a[0].params).to.deep.equal(['150']);
    });

//  Validate functionality

    it('[validate] should validate to true if no data was passed and no rules were set up', () => {
        const validator = new Validator({});
        const evaluation = validator.validate();
        expect(evaluation.is_valid).to.eql(true);
    });

    it('[validate] should remember the validity of the last validation run', () => {
        const validator = new Validator({a : 'number'});

        validator.validate({a: 'foo'});

        expect(validator.is_valid).to.eql(false);
        expect(validator.errors).to.deep.equal({
            a: [{msg: 'number', params: []}],
        });

        validator.validate({a: 10});

        expect(validator.is_valid).to.eql(true);
        expect(validator.errors).to.deep.equal({
            a: [],
        });
    });

//  Flag: Sometimes

    it('[flags] sometimes flag(?) should validate correctly if set and no value is passed', () => {
        const evaluation = new Validator({a: '?number'}).validate({});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it('[flags] sometimes flag (?) should not interfere with other validation rules', () => {
        const evaluation = new Validator({
            a: '?number',
            b: 'number|less_than:20',
        }).validate({});

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
            a: [],
            b: [
                {msg: 'number', params: []},
                {msg: 'less_than', params: ['20']},
            ],
        });
    });

//  Flag: Parameter

    it('[flags] parameter flag (<...>) should allow link to passed parameter', () => {
        const evaluation = new Validator({a: 'equal_to:<foo>'}).validate({a: 'hello', foo: 'hello'});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it('[flags] parameter flag (<...>) should fail if parameter is not passed', () => {
        const evaluation = new Validator({a: 'equal_to:<foo>'}).validate({a: 'hello', foobar: 'hello'});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg:'equal_to', params: [undefined]}]);
    });

    it('[flags] parameter flag (<...>) should allow multiple parameters inside the same ruleset', () => {
        const evaluation = new Validator({a: 'between:<min>,<max>'}).validate({a: 5, min: 3, max: 7});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it('[flags] parameter flag (<...>) should allow multiple parameters inside the same config', () => {
        const evaluation = new Validator({a: 'in:<arr1>', b: 'in:<arr2>'}).validate({a: 1, b: 2, arr1: [1, 3, 5], arr2: [2, 4, 6]});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
        expect(evaluation.errors.b).to.deep.equal([]);
    });

    it('[flags] parameter flag (<...>) should allow the same parameter on multiple rules inside the same config', () => {
        const evaluation = new Validator({a: 'in:<arr1>', b: 'in:<arr1>'}).validate({a: 1, b: 2, arr1: [1, 2, 3]});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
        expect(evaluation.errors.b).to.deep.equal([]);
    });

//  Flag: Not

    it('[flags] not flag (!) should validate correct if set and no value is passed', () => {
        const evaluation = new Validator({a: '!number'}).validate({});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'not_number', params: []}]);
    });

    it('[flags] not flag (!) should validate correct if set and value is passed when using standard rule', () => {
        const evaluation = new Validator({a: '!number'}).validate({a: 'hello'});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);

        const evaluation2 = new Validator({a: '!number'}).validate({a: 4});
        expect(evaluation2.is_valid).to.eql(false);
        expect(evaluation2.errors.a).to.deep.equal([{msg: 'not_number', params: []}]);

        const evaluation3 = new Validator({a: '!between:5,10'}).validate({a: 4});
        expect(evaluation3.is_valid).to.eql(true);
        expect(evaluation3.errors.a).to.deep.equal([]);

        const evaluation4 = new Validator({a: '!between:5,10'}).validate({a: 6});
        expect(evaluation4.is_valid).to.eql(false);
        expect(evaluation4.errors.a).to.deep.equal([{msg: 'not_between', params: ['5', '10']}]);
    });

    it('[flags] not flag (!) should validate correct if set and value is passed when using parameter flag', () => {
        const evaluation = new Validator({a: '!equal_to:<foo>'}).validate({a: 'hello', foo: 'hello'});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'not_equal_to', params: ['hello']}]);
    });

    it('[flags] not flag (!) should validate correct if set and value is passed when using multiple validation rules', () => {
        const evaluation = new Validator({a: '!string|!equal_to:<foo>'}).validate({a: 'foo', foo: 'hello'});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([
            {msg: 'not_string', params: []},
        ]);

        const evaluation2 = new Validator({a: '!string|!equal_to:<foo>'}).validate({a: 'foo', foo: 'foo'});
        expect(evaluation2.is_valid).to.eql(false);
        expect(evaluation2.errors.a).to.deep.equal([
            {msg: 'not_string', params: []},
            {msg: 'not_equal_to', params: ['foo']},
        ]);
    });

//  Iterable

    it('[iterable] config: Should throw if passed an invalid iterable config during rule creation', () => {
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

    it('[iterable] config: Should not throw if passed an iterable config during rule creation', () => {
        expect(() => {
            new Validator({a: '[]string'});
        }).to.not.throw;
    });

    it('[iterable] config: Should return invalid when passing a non-array to an iterable', () => {
        const validator = new Validator({a: '[]string'});
        const evaluation = validator.validate({a: 'hello'});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [{msg: 'iterable', params: []}]});
    });

    it('[iterable] config: Should return valid when passing an empty array to an iterable', () => {
        const validator = new Validator({a: '[]string'});
        const evaluation = validator.validate({a: []});
        expect(evaluation.is_valid).to.eql(true);
    });

    it('[iterable] unique config: Should return valid when the passed array is unique', () => {
        const validator = new Validator({a: '[unique]string'});
        const evaluation = validator.validate({a: ['a', 'b', 'c']});
        expect(evaluation.is_valid).to.eql(true);
    });

    it('[iterable] unique config: Should return invalid when the passed array is not unique', () => {
        const validator = new Validator({a: '[unique]string'});
        const evaluation = validator.validate({a: ['a', 'b', 'a']});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [{msg: 'iterable_unique', params: []}]});
    });

    it('[iterable] unique config: Should return invalid when the passed array is not unique when using numbers', () => {
        const validator = new Validator({a: '[unique]number'});
        const evaluation = validator.validate({a: [1, 2, 2]});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [{msg: 'iterable_unique', params: []}]});
    });

    it('[iterable] unique config: Should return invalid when the passed array is not unique when using objects', () => {
        const validator = new Validator({a: '[unique]object'});
        const evaluation = validator.validate({a: [{a: 1}, {b: 2}, {b: 2}]});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [{msg: 'iterable_unique', params: []}]});
    });

    it('[iterable] unique config: Should return invalid when the passed array is both not unique and doesnt match rules', () => {
        const validator = new Validator({a: '[unique]integer'});
        const evaluation = validator.validate({a: [1, 2, 'a', 2]});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [
            {msg: 'iterable_unique', params: []},
            {idx: 2, msg: 'integer', params: []},
        ]});
    });

    it('[iterable] unique config: Should return invalid when the passed array is both not unique and doesnt match rules, and should only insert uniqueness invalidity once', () => {
        const validator = new Validator({a: '[unique]integer'});
        const evaluation = validator.validate({a: [1, 2, 'a', 2, 2, 2.2]});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [
            {msg: 'iterable_unique', params: []},
            {idx: 2, msg: 'integer', params: []},
            {idx: 5, msg: 'integer', params: []},
        ]});
    });

    it('[iterable] max config: Should return valid when within boundaries', () => {
        const validator = new Validator({a: '[max:5]string'});
        const evaluation = validator.validate({a: ['hello', 'there']});
        expect(evaluation.is_valid).to.eql(true);
    });

    it('[iterable] max config: Should return valid when at boundary', () => {
        const validator = new Validator({a: '[max:5]string'});
        const evaluation = validator.validate({a: ['1', '2', '3', '4', '5']});
        expect(evaluation.is_valid).to.eql(true);
    });

    it('[iterable] max config: Should return invalid when above boundary', () => {
        const validator = new Validator({a: '[max:5]string'});
        const evaluation = validator.validate({a: ['1', '2', '3', '4', '5', '6']});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [{msg: 'iterable_max', params: [5]}]});
    });

    it('[iterable] max config: Should only return iterable invalidity and not go into val evaluation when above boundary', () => {
        const validator = new Validator({a: '[max:5]string'});
        const evaluation = validator.validate({a: ['1', '2', '3', '4', 5, '6']});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [{msg: 'iterable_max', params: [5]}]});
    });

    it('[iterable] max config: Should return iterable invalidity and go into val evaluation when at or below boundary', () => {
        const validator = new Validator({a: '[max:5]string'});
        const evaluation = validator.validate({a: ['1', false, false, '2', false]});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [
            {idx: 1, msg: 'string', params: []},
            {idx: 2, msg: 'string', params: []},
            {idx: 4, msg: 'string', params: []},
        ]});

        const evaluation2 = validator.validate({a: [false, '1', '2', '3']});
        expect(evaluation2.is_valid).to.eql(false);
        expect(evaluation2.errors).to.deep.equal({a: [
            {idx: 0, msg: 'string', params: []},
        ]});
    });

    it('[iterable] min config: Should return valid when within boundaries', () => {
        const validator = new Validator({a: '[min:5]string'});
        const evaluation = validator.validate({a: ['hello', 'there', 'this', 'is', 'cool', 'right']});
        expect(evaluation.is_valid).to.eql(true);
    });

    it('[iterable] min config: Should return valid when at boundary', () => {
        const validator = new Validator({a: '[min:5]string'});
        const evaluation = validator.validate({a: ['hello', 'there', 'this', 'is', 'cool']});
        expect(evaluation.is_valid).to.eql(true);
    });

    it('[iterable] min config: Should return invalid when below boundary', () => {
        const validator = new Validator({a: '[min:3]string'});
        const evaluation = validator.validate({a: ['1', '2']});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [{msg: 'iterable_min', params: [3]}]});
    });

    it('[iterable] min config: Should only return iterable invalidity and not go into val evaluation when below boundary', () => {
        const validator = new Validator({a: '[min:4]string'});
        const evaluation = validator.validate({a: ['1', false]});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [{msg: 'iterable_min', params: [4]}]});
    });

    it('[iterable] min config: Should return iterable invalidity and go into val evaluation when at or above boundary', () => {
        const validator = new Validator({a: '[min:4]string'});
        const evaluation = validator.validate({a: ['1', false, false, '2']});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [
            {idx: 1, msg: 'string', params: []},
            {idx: 2, msg: 'string', params: []},
        ]});

        const evaluation2 = validator.validate({a: ['1', false, '2', '3', false]});
        expect(evaluation2.is_valid).to.eql(false);
        expect(evaluation2.errors).to.deep.equal({a: [
            {idx: 1, msg: 'string', params: []},
            {idx: 4, msg: 'string', params: []},
        ]});
    });

    it('[iterable] max+min config: Should return valid when within boundaries', () => {
        const validator = new Validator({a: '[max:5|min:2]string'});
        const evaluation = validator.validate({a: ['hello', 'there', 'cool']});
        expect(evaluation.is_valid).to.eql(true);
    });

    it('[iterable] max+min config: Should return valid when at top boundary', () => {
        const validator = new Validator({a: '[max:5|min:2]string'});
        const evaluation = validator.validate({a: ['1', '2', '3', '4', '5']});
        expect(evaluation.is_valid).to.eql(true);
    });

    it('[iterable] max+min config: Should return invalid when above top boundary', () => {
        const validator = new Validator({a: '[max:5|min:2]string'});
        const evaluation = validator.validate({a: ['1', '2', '3', '4', '5', '6']});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [{msg: 'iterable_max', params: [5]}]});
    });

    it('[iterable] max+min config: Should return valid when at bottom boundary', () => {
        const validator = new Validator({a: '[max:5|min:2]string'});
        const evaluation = validator.validate({a: ['1', '2']});
        expect(evaluation.is_valid).to.eql(true);
    });

    it('[iterable] max+min config: Should return invalid when below bottom boundary', () => {
        const validator = new Validator({a: '[max:5|min:2]string'});
        const evaluation = validator.validate({a: ['1']});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [{msg: 'iterable_min', params: [2]}]});
    });

    it('[iterable] max+min config: Should only return iterable invalidity and not go into val evaluation when above boundary', () => {
        const validator = new Validator({a: '[max:5|min:2]string'});
        const evaluation = validator.validate({a: ['1', '2', '3', '4', 5, '6']});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [{msg: 'iterable_max', params: [5]}]});
    });

    it('[iterable] max+min config: Should only return iterable invalidity and not go into val evaluation when below boundary', () => {
        const validator = new Validator({a: '[max:5|min:2]string'});
        const evaluation = validator.validate({a: [5]});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [{msg: 'iterable_min', params: [2]}]});
    });

    it('[iterable] max+min config: Should return iterable invalidity and go into val evaluation when at or below boundary', () => {
        const validator = new Validator({a: '[max:5|min:2]string'});
        const evaluation = validator.validate({a: ['1', false, false, '2', false]});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [
            {idx: 1, msg: 'string', params: []},
            {idx: 2, msg: 'string', params: []},
            {idx: 4, msg: 'string', params: []},
        ]});

        const evaluation2 = validator.validate({a: [false, '1', '2', '3']});
        expect(evaluation2.is_valid).to.eql(false);
        expect(evaluation2.errors).to.deep.equal({a: [
            {idx: 0, msg: 'string', params: []},
        ]});

        const evaluation3 = validator.validate({a: ['1', 4]});
        expect(evaluation3.is_valid).to.eql(false);
        expect(evaluation3.errors).to.deep.equal({a: [
            {idx: 1, msg: 'string', params: []},
        ]});
    });

    it('[iterable] Should allow validating an array of values', () => {
        const validator = new Validator({a: '[]string'});
        let evaluation = validator.validate({a: ['hello', 'there']});
        expect(evaluation.is_valid).to.eql(true);

        evaluation = validator.validate({a: ['hello', false]});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'string', idx: 1, params: []}]);

        evaluation = validator.validate({a: ['hello', false, true]});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'string', idx: 1, params: []}, {msg: 'string', idx: 2, params: []}]);
    });

    it('[iterable] Should allow validating an array of values with a \'?\' sometimes flag', () => {
        const validator = new Validator({a: '?[]string'});
        let evaluation = validator.validate({a: ['hello', 'there']});
        expect(evaluation.is_valid).to.eql(true);

        evaluation = validator.validate({});
        expect(evaluation.is_valid).to.eql(true);

        evaluation = validator.validate({a: ['hello', false, 'foo', true]});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg: 'string', idx: 1, params: []}, {msg: 'string', idx: 3, params: []}]);
    });

    it('[iterable] Should allow validating an array of values with a \'?\' sometimes flag and parameter pass', () => {
        const validator = new Validator({a: '?[]string|in:<genders>'});
        let evaluation = validator.validate({a: ['male', 'male', 'female', 'male', 'female'], genders: ['male', 'female', 'other']});
        expect(evaluation.is_valid).to.eql(true);

        evaluation = validator.validate({genders: ['male', 'female', 'other']});
        expect(evaluation.is_valid).to.eql(true);

        evaluation = validator.validate({a: ['dog'], genders: ['male', 'female', 'other']});
        expect(evaluation.is_valid).to.eql(false);
    });

    it('[iterable] Should allow validating an array of values with a \'?\' sometimes flag, uniqueness and parameter pass', () => {
        const validator = new Validator({a: '?[unique]string|in:<genders>'});
        let evaluation = validator.validate({a: ['male', 'male', 'female', 'male', 'female'], genders: ['male', 'female', 'other']});
        expect(evaluation.is_valid).to.eql(false);
        evaluation = validator.validate({a: ['male', 'female'], genders: ['male', 'female', 'other']});
        expect(evaluation.is_valid).to.eql(true);
    });

    it('[iterable] Should allow validating an array of values with a \'!\' not flag and parameter pass', () => {
        const validator = new Validator({a: '[]string|!in:<genders>'});
        let evaluation = validator.validate({a: ['bob', 'bob', 'john', 'bob', 'john'], genders: ['male', 'female', 'other']});
        expect(evaluation.is_valid).to.eql(true);

        evaluation = validator.validate({a: ['male', 'female', 'female'], genders: ['male', 'female', 'other']});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [
            {idx: 0, msg: 'not_in', params: [['male', 'female', 'other']]},
            {idx: 1, msg: 'not_in', params: [['male', 'female', 'other']]},
            {idx: 2, msg: 'not_in', params: [['male', 'female', 'other']]},
        ]});

        evaluation = validator.validate({a: ['chicken', 'dog', 'female'], genders: ['male', 'female', 'other']});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [
            {idx: 2, msg: 'not_in', params: [['male', 'female', 'other']]},
        ]});
    });

    it('[iterable] Should allow validating an array of values with a \'!\' not flag, uniqueness and parameter pass', () => {
        const validator = new Validator({a: '[unique]string|!in:<genders>'});
        let evaluation = validator.validate({a: ['bob', 'john'], genders: ['male', 'female', 'other']});
        expect(evaluation.is_valid).to.eql(true);

        evaluation = validator.validate({a: ['male', 'female', 'female'], genders: ['male', 'female', 'other']});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [
            {msg: 'iterable_unique', params: []},
            {idx: 0, msg: 'not_in', params: [['male', 'female', 'other']]},
            {idx: 1, msg: 'not_in', params: [['male', 'female', 'other']]},
            {idx: 2, msg: 'not_in', params: [['male', 'female', 'other']]},
        ]});

        evaluation = validator.validate({a: ['chicken', 'dog', 'female', 'dog'], genders: ['male', 'female', 'other']});
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({a: [
            {msg: 'iterable_unique', params: []},
            {idx: 2, msg: 'not_in', params: [['male', 'female', 'other']]},
        ]});
    });

//  Static: rules getter

    it('[rules] should return the configured rules on the Validator as an object', () => {
        assert.typeOf(Validator.rules, 'Object');
    });

    it('[rules] should return a correct kv-map of configured rules', () => {
        expect(Validator.rules).to.deep.equal({
            alpha_num_spaces            : vAlphaNumSpaces,
            alpha_num_spaces_multiline  : vAlphaNumSpacesMultiline,
            array                       : Is.Array,
            array_ne                    : Is.NeArray,
            between                     : vBetween,
            between_inc                 : vBetweenInclusive,
            boolean                     : vBoolean,
            color_hex                   : vColorHex,
            continent                   : vContinent,
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

    it('[rules] should return a immutable frozen version of the configured rules', () => {
        const rules = Validator.rules;
        expect(Object.isFrozen(rules)).to.eql(true);
        let e = false;
        try {
            rules.hack = true;
        } catch (err) {
            e = err;
        }
        assert.typeOf(e, 'Error');
    });

    it('[rules] should take into account extended rules', () => {
        const fn = val => true;
        Validator.extend('myfunction', fn);
        expect(Validator.rules.myfunction).to.eql(fn);
    });

//  Static: Extend functionality

    it('[extend] functionality should throw if not provided anything', () => {
        expect(() => {
            Validator.extend();
        }).to.throw;
    });

    it('[extend] functionality should throw if not provided a string name', () => {
        for (const el of str_tests) {
            expect(() => {
                Validator.extend(el, val => true);
            }).to.throw;
        }
    });

    it('[extend] functionality should throw if provided a empty (or empty after trimming) string name', () => {
        for (const el of ['', ' ', '    ']) {
            expect(() => {
                Validator.extend(el, val => true);
            }).to.throw;
        }
    });

    it('[extend] functionality should throw if not provided a function', () => {
        for (const el of fn_tests) {
            expect(() => {
                Validator.extend('rule', el);
            }).to.throw;
        }
    });

    it('[extend] functionality should work', () => {
        Validator.extend('trick', (val, p1) => p1 === 'treat' ? val === 'trick' : p1 === 'trick' ? val === 'treat' : false);

        const evaluation = new Validator({a: 'trick:<b>'}).validate({a: 'trick', b: 'treat'});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it('[extend] functionality should work with multiple parameters', () => {
        Validator.extend('sum', (val, p1, p2) => val === (p1 + p2));

        const evaluation = new Validator({a: 'sum:<b>,<c>'}).validate({a: 4, b: 1, c: 3});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it('[extend] functionality should work across multiple instances', () => {
        Validator.extend('double', (val, p1, p2) => val === (p1 * 2));

        //  Evaluation
        const evaluation = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);

        //  Second evaluation
        const evaluation2 = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
        expect(evaluation2.is_valid).to.eql(true);
        expect(evaluation2.errors.a).to.deep.equal([]);
    });

    it('[extend] functionality should allow redefining the same validity function', () => {
        Validator.extend('ismyname', (val, p1, p2) => val === 'peter');

        //  Evaluation
        const evaluation = new Validator({name: 'ismyname'}).validate({name: 'peter'});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.name).to.deep.equal([]);

        //  Redefine
        Validator.extend('ismyname', (val, p1, p2) => val === 'josh');

        //  Second evaluation
        const evaluation2 = new Validator({name: 'ismyname'}).validate({name: 'peter'});
        expect(evaluation2.is_valid).to.eql(false);
        expect(evaluation2.errors.name).to.deep.equal([{msg:'ismyname', params: []}]);
    });

//  Extend Multi functionality

    it('[extendMulti] functionality should throw if not provided anything', () => {
        expect(() => {
            Validator.extend();
        }).to.throw;
    });

    it('[extendMulti] functionality should throw if not provided an object', () => {
        for (const el of obj_tests) {
            expect(() => {
                Validator.extendMulti(el);
            }).to.throw;
        }
    });

    it('[extendMulti] functionality should not throw if provided an empty object', () => {
        expect(() => {
            Validator.extendMulti({});
        }).to.not.throw;
    });

    it('[extendMulti] functionality should throw if provided an object where certain values do not have a function', () => {
        for (const el of fn_tests) {
            expect(() => {
                Validator.extendMulti({
                    rule_1: el,
                });
            }).to.throw;
        }
    });

    it('[extendMulti] functionality should work', () => {
        Validator.extendMulti({
            trick: function (val, p1) {
                return p1 === 'treat' ? val === 'trick' : p1 === 'trick' ? val === 'treat' : false;
            },
        });

        const evaluation = new Validator({a: 'trick:<b>'}).validate({a: 'trick', b: 'treat'});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it('[extendMulti] functionality should work with multiple parameters', () => {
        Validator.extendMulti({
            sum: function (val, p1, p2) {
                return val === (p1 + p2);
            },
        });

        const evaluation = new Validator({a: 'sum:<b>,<c>'}).validate({a: 4, b: 1, c: 3});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it('[extendMulti] functionality should work across multiple instances', () => {
        Validator.extendMulti({
            double: function (val, p1, p2) {
                return val === (p1 * 2);
            },
        });

        //  Evaluation
        const evaluation = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);

        //  Second evaluation
        const evaluation2 = new Validator({a: 'double:<b>'}).validate({a: 4, b: 2});
        expect(evaluation2.is_valid).to.eql(true);
        expect(evaluation2.errors.a).to.deep.equal([]);
    });

    it('[extendMulti] functionality should allow redefining the same validity function', () => {
        Validator.extendMulti({
            ismyname: function (val, p1, p2) {
                return val === 'peter';
            },
        });

        //  Evaluation
        const evaluation = new Validator({name: 'ismyname'}).validate({name: 'peter'});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.name).to.deep.equal([]);

        //  Redefine
        Validator.extendMulti({
            ismyname: function (val, p1, p2) {
                return val === 'josh';
            },
        });

        //  Second evaluation
        const evaluation2 = new Validator({name: 'ismyname'}).validate({name: 'peter'});
        expect(evaluation2.is_valid).to.eql(false);
        expect(evaluation2.errors.name).to.deep.equal([{msg:'ismyname', params: []}]);
    });

    it('[extendMulti] functionality should allow defining multiple rules at the same time', () => {
        Validator.extendMulti({
            ismyname: function (val, p1, p2) {
                return val === 'peter';
            },
            ismyothername: function (val, p1, p2) {
                return val === 'josh';
            },
        });

        //  Evaluation
        const evaluation = new Validator({name: 'ismyname'}).validate({name: 'peter'});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.name).to.deep.equal([]);

        //  Second evaluation
        const evaluation2 = new Validator({name: 'ismyothername'}).validate({name: 'peter'});
        expect(evaluation2.is_valid).to.eql(false);
        expect(evaluation2.errors.name).to.deep.equal([{msg:'ismyothername', params: []}]);
    });

//  Complex Validations

    it('[complexflow] should be able to validate complex objects [1]', () => {
        const evaluation = new Validator({
            password: 'string|min:8',
            password_confirmation: 'equal_to:<password>',
        }).validate({
            password: 'thisIsMy1Little!Secret',
            password_confirmation: 'thisIsMy1Little!Secret',
        });

        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.password).to.deep.equal([]);
        expect(evaluation.errors.password_confirmation).to.deep.equal([]);
    });

    it('[complexflow] should be able to validate complex objects [2]', () => {
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

        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.first_name).to.deep.equal([]);
        expect(evaluation.errors.last_name).to.deep.equal([]);
        expect(evaluation.errors.age).to.deep.equal([]);
        expect(evaluation.errors.gender).to.deep.equal([]);
    });

    it('[complexflow] should be able to validate complex objects [3]', () => {
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

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.first_name).to.deep.equal([]);
        expect(evaluation.errors.last_name).to.deep.equal([]);
        expect(evaluation.errors.age).to.deep.equal([{msg: 'integer', params: []}, {msg: 'between', params: ['1', '150']}]);
        expect(evaluation.errors.gender).to.deep.equal([{msg: 'in', params: [['m', 'f', 'o']]}]);
    });

    it('[complexflow] should be able to validate complex multidimensional objects [4]', () => {
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

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.address.street).to.deep.equal([]);
        expect(evaluation.errors.address.nr).to.deep.equal([]);
        expect(evaluation.errors.address.zip).to.deep.equal([]);
        expect(evaluation.errors.contact.email).to.deep.equal([{msg: 'email', params: []}]);
    });

    it('[complexflow] should be able to validate complex multidimensional objects [5]', () => {
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
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
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
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
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
