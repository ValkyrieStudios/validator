'use strict';

import Validator from '../src/index';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const assert = chai.assert;
const should = chai.should();
const spy = chai.spy;

describe("Validator - Core", () => {

    const obj_tests = [[0,1,2], 1, 2, 3, .5, 0.4, -1, true, new Date(), /1/g, false, 'hello', 'abc'];
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

    it ('should instantiate to a validator object', () => {
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

//  Validate that the returned value from validate(...) has the correct format

    it ('should return a properly formatted evaluation object', () => {
        const evaluation = (new Validator({ a : 'number' })).validate(subject);

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

    it ('should have errors where the object contains a msg and a params property', () => {
        const evaluation = (new Validator({ c : 'number' })).validate(subject);

        expect(evaluation.errors).to.deep.equal({
            c: [{msg: 'number', params: []}],
        });
    });

    it ('should have errors where the key is the rule that failed', () => {
        const evaluation = (new Validator({ c : 'number' })).validate(subject);
        expect(evaluation.errors.c[0].msg).to.eql('number');
    });

    it ('should have errors where the params object is empty if no param was passed', () => {
        const evaluation = (new Validator({ c : 'number' })).validate(subject);
        expect(evaluation.errors.c[0].params).to.deep.equal([]);
    });

    it ('should have errors where the params object contains the passed param if passed', () => {
        const evaluation = (new Validator({ a : 'greater_than:150' })).validate(subject);
        expect(evaluation.errors.a[0].params).to.deep.equal(['150']);
    });

//  Validate functionality

    it ('should validate to true if no data was passed and no rules were set up', () => {
        const validator = new Validator({});
        const evaluation = validator.validate();
        expect(evaluation.is_valid).to.eql(true);
    });

    it ('should remember the validity of the last validation run', () => {
        const validator = new Validator({ a : 'number' });

        validator.validate({ a: 'foo' });

        expect(validator.is_valid).to.eql(false);
        expect(validator.errors).to.deep.equal({
            a: [{msg: 'number', params: []}],
        });

        validator.validate({ a: 10 });

        expect(validator.is_valid).to.eql(true);
        expect(validator.errors).to.deep.equal({
            a: [],
        });
    });

    it ('should throw a type error when passed wrong configuration options', () => {
        expect(function () {
            const v = new Validator();
        }).to.throw();

        expect(function () {
            const v = new Validator(5);
        }).to.throw();

        expect(function () {
            const v = new Validator([{ hello: 'world' }, 5, true]);
        }).to.throw();

        expect(function () {
            const v = new Validator('foo');
        }).to.throw();

        expect(function () {
            const v = new Validator({});
        }).not.to.throw();

        expect(function () {
            const v = new Validator({ foo: 'string' });
        }).not.to.throw();

        expect(function () {
            const v = new Validator({ foo: 'number', a : { b: 'string', params: [] }});
        }).to.throw();

        expect(function () {
            const v = new Validator({ foo: 5, a : { b: 'string', params: [] }});
        }).to.throw();
    });

//  Flag : Sometimes

    it ('sometimes flag(?) should validate correctly if set and no value is passed', () => {
        const evaluation = (new Validator({ a : '?number' })).validate({});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it ('sometimes flag (?) should not interfere with other validation rules', () => {
        const evaluation = (new Validator({
            a : '?number',
            b : 'number|less_than:20',
        })).validate({});

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors).to.deep.equal({
            a: [],
            b: [
                {msg: 'number', params: []},
                {msg: 'less_than', params: ['20']}
            ],
        });
    });

//  Flag : Parameter

    it ('parameter flag (<...>) should allow link to passed parameter', () => {
        const evaluation = (new Validator({ a: 'equal_to:<foo>'})).validate({ a: 'hello', foo: 'hello' });
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it ('parameter flag (<...>) should fail if parameter is not passed', () => {
        const evaluation = (new Validator({ a: 'equal_to:<foo>'})).validate({ a: 'hello', foobar: 'hello' });
        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.a).to.deep.equal([{msg:'equal_to', params: [undefined]}]);
    });

    it ('parameter flag (<...>) should allow multiple parameters inside the same ruleset', () => {
        const evaluation = (new Validator({ a: 'between:<min>,<max>'})).validate({ a: 5, min: 3, max: 7 });
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it ('parameter flag (<...>) should allow multiple parameters inside the same config', () => {
        const evaluation = (new Validator({ a: 'in:<arr1>', b: 'in:<arr2>'})).validate({ a: 1, b: 2, arr1: [1, 3, 5], arr2: [2, 4, 6] });
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
        expect(evaluation.errors.b).to.deep.equal([]);
    });

    it ('parameter flag (<...>) should allow the same parameter on multiple rules inside the same config', () => {
        const evaluation = (new Validator({ a: 'in:<arr1>', b: 'in:<arr1>'})).validate({a: 1, b: 2, arr1: [1, 2, 3]});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
        expect(evaluation.errors.b).to.deep.equal([]);
    });

//  Extend functionality

    it ('extend functionality should throw if not provided anything', () => {
        expect(function () {
            Validator.extend();
        }).to.throw;
    });

    it ('extend functionality should throw if not provided a string name', () => {
        for (const el of str_tests) {
            expect(function () {
                Validator.extend(el, val => true);
            }).to.throw;
        }
    });

    it ('extend functionality should throw if provided a empty (or empty after trimming) string name', () => {
        for (const el of ['', ' ', '    ']) {
            expect(function () {
                Validator.extend(el, val => true);
            }).to.throw;
        }
    });

    it ('extend functionality should throw if not provided a function', () => {
        for (const el of fn_tests) {
            expect(function () {
                Validator.extend('rule', el);
            }).to.throw;
        }
    });

    it ('extend functionality should work', () => {
        Validator.extend('trick', function (val, p1) {
            return p1 === 'treat' ? (val === 'trick') : (p1 === 'trick' ? val === 'treat' : false);
        });

        const evaluation = (new Validator({ a: 'trick:<b>' })).validate({ a: 'trick', b: 'treat' });
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it ('extend functionality should work with multiple parameters', () => {
        Validator.extend('sum', function (val, p1, p2) {
            return val === (p1 + p2);
        });

        const evaluation = (new Validator({ a: 'sum:<b>,<c>' })).validate({ a: 4, b: 1, c: 3 });
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it ('extend functionality should work across multiple instances', () => {
        Validator.extend('double', function (val, p1, p2) {
            return val === (p1 * 2);
        });

        //  Evaluation
        const evaluation = (new Validator({ a: 'double:<b>' })).validate({ a: 4, b: 2 });
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);

        //  Second evaluation
        const evaluation2 = (new Validator({ a: 'double:<b>' })).validate({ a: 4, b: 2 });
        expect(evaluation2.is_valid).to.eql(true);
        expect(evaluation2.errors.a).to.deep.equal([]);
    });

    it ('extend functionality should allow redefining the same validity function', () => {
        Validator.extend('ismyname', function (val, p1, p2) {return val === 'peter';});

        //  Evaluation
        const evaluation = (new Validator({ name: 'ismyname' })).validate({ name: 'peter' });
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.name).to.deep.equal([]);

        //  Redefine
        Validator.extend('ismyname', function (val, p1, p2) {return val === 'josh';});

        //  Second evaluation
        const evaluation2 = (new Validator({ name: 'ismyname' })).validate({ name: 'peter' });
        expect(evaluation2.is_valid).to.eql(false);
        expect(evaluation2.errors.name).to.deep.equal([{msg:'ismyname', params: []}]);
    });

//  Extend Multi functionality

    it ('extendMulti functionality should throw if not provided anything', () => {
        expect(function () {
            Validator.extend();
        }).to.throw;
    });

    it ('extendMulti functionality should throw if not provided an object', () => {
        for (const el of obj_tests) {
            expect(function () {
                Validator.extendMulti(el);
            }).to.throw;
        }
    });

    it ('extendMulti functionality should not throw if provided an empty object', () => {
        expect(function () {
            Validator.extendMulti({});
        }).to.not.throw;
    });

    it ('extendMulti functionality should throw if provided an object where certain values do not have a function', () => {
        for (const el of fn_tests) {
            expect(function () {
                Validator.extendMulti({
                    rule_1: el,
                });
            }).to.throw;
        }
    });

    it ('extendMulti functionality should work', () => {
        Validator.extendMulti({
            trick: function (val, p1) {
                return p1 === 'treat' ? (val === 'trick') : (p1 === 'trick' ? val === 'treat' : false);
            },
        });

        const evaluation = (new Validator({a: 'trick:<b>'})).validate({a: 'trick', b: 'treat'});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it ('extendMulti functionality should work with multiple parameters', () => {
        Validator.extendMulti({
            sum: function (val, p1, p2) {
                return val === (p1 + p2);
            },
        });

        const evaluation = (new Validator({a: 'sum:<b>,<c>'})).validate({a: 4, b: 1, c: 3});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);
    });

    it ('extendMulti functionality should work across multiple instances', () => {
        Validator.extendMulti({
            double: function (val, p1, p2) {
                return val === (p1 * 2);
            },
        });

        //  Evaluation
        const evaluation = (new Validator({a: 'double:<b>'})).validate({a: 4, b: 2});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.a).to.deep.equal([]);

        //  Second evaluation
        const evaluation2 = (new Validator({a: 'double:<b>'})).validate({a: 4, b: 2});
        expect(evaluation2.is_valid).to.eql(true);
        expect(evaluation2.errors.a).to.deep.equal([]);
    });

    it ('extendMulti functionality should allow redefining the same validity function', () => {
        Validator.extendMulti({
            ismyname: function (val, p1, p2) {return val === 'peter';},
        });

        //  Evaluation
        const evaluation = (new Validator({name: 'ismyname'})).validate({name: 'peter'});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.name).to.deep.equal([]);

        //  Redefine
        Validator.extendMulti({
            ismyname: function (val, p1, p2) {return val === 'josh';},
        });

        //  Second evaluation
        const evaluation2 = (new Validator({name: 'ismyname'})).validate({name: 'peter'});
        expect(evaluation2.is_valid).to.eql(false);
        expect(evaluation2.errors.name).to.deep.equal([{msg:'ismyname', params: []}]);
    });

    it ('extendMulti functionality should allow defining multiple rules at the same time', () => {
        Validator.extendMulti({
            ismyname: function (val, p1, p2) {return val === 'peter';},
            ismyothername: function (val, p1, p2) {return val === 'josh';},
        });

        //  Evaluation
        const evaluation = (new Validator({name: 'ismyname'})).validate({name: 'peter'});
        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.name).to.deep.equal([]);

        //  Second evaluation
        const evaluation2 = (new Validator({name: 'ismyothername'})).validate({name: 'peter'});
        expect(evaluation2.is_valid).to.eql(false);
        expect(evaluation2.errors.name).to.deep.equal([{msg:'ismyothername', params: []}]);
    });

//  Complex validations

    it ('should be able to validate complex objects [1]', () => {
        const evaluation = (new Validator({
            password: 'required|string|min:8',
            password_confirmation: 'required|equal_to:<password>',
        })).validate({
            password: 'thisIsMy1Little!Secret',
            password_confirmation: 'thisIsMy1Little!Secret',
        });

        expect(evaluation.is_valid).to.eql(true);
        expect(evaluation.errors.password).to.deep.equal([]);
        expect(evaluation.errors.password_confirmation).to.deep.equal([]);
    });

    it ('should be able to validate complex objects [2]', () => {
        const evaluation = (new Validator({
            first_name: 'required|string|alpha_num_spaces|min:2',
            last_name: 'required|string|alpha_num_spaces|min:2',
            age: '?required|integer|between:1,150',
            gender: 'required|in:<meta.gender_options>',
        })).validate({
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

    it ('should be able to validate complex objects [3]', () => {
        const evaluation = (new Validator({
            first_name: 'required|string|alpha_num_spaces|min:2',
            last_name: 'required|string|alpha_num_spaces|min:2',
            age: '?required|integer|between:1,150',
            gender: 'required|in:<meta.gender_options>',
        })).validate({
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

    it ('should be able to validate complex multidimensional objects [4]', () => {
        const evaluation = (new Validator({
            address: {
                street: 'required|string|alpha_num_spaces',
                nr: 'required|integer',
                zip: 'required|integer|between:1000,9999',
            },
            contact: {
                email: 'required|string|email',
            }
        })).validate({
            address: {
                street: 'First avenue',
                nr: 50,
                zip: 1500
            },
            contact: {
                email: 'contact.valkyriestudios.be'
            },
        });

        expect(evaluation.is_valid).to.eql(false);
        expect(evaluation.errors.address.street).to.deep.equal([]);
        expect(evaluation.errors.address.nr).to.deep.equal([]);
        expect(evaluation.errors.address.zip).to.deep.equal([]);
        expect(evaluation.errors.contact.email).to.deep.equal([{msg: 'email', params: []}]);
    });

})
