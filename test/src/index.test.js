'use strict';

import Validator from '../../src/index';

describe("Validator - Core", () => {
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
        expect(validator.validate).toBeDefined();
        expect(validator.validate).toEqual(jasmine.any(Function));

        //  It should have a extend function on the class
        expect(Validator.extend).toBeDefined();
        expect(Validator.extend).toEqual(jasmine.any(Function));

        //  It should not have a extend function on its instance
        expect(validator.extend).not.toBeDefined();
        expect(validator.extend).not.toEqual(jasmine.any(Function));

        //  It should have an 'is_valid' property that is a boolean and by default set to false
        expect(validator.is_valid).toBeDefined();
        expect(validator.is_valid).toEqual(false);

        //  It should have an 'errors' property that is an Object and by default set to an empty object
        expect(validator.errors).toBeDefined();
        expect(validator.errors).toEqual(Object.create(null));

        //  It should not have an 'is_valid' property on the class
        expect(Validator.is_valid).not.toBeDefined();
        expect(Validator.is_valid).toEqual(undefined);

        //  It should not have an 'errors' property on the class
        expect(Validator.errors).not.toBeDefined();
        expect(Validator.errors).toEqual(undefined);
    });

//  Validate that the returned value from validate(...) has the correct format

    it ('should return a properly formatted evaluation object', () => {
        const evaluation = (new Validator({ a : 'number' })).validate(subject);

        //  Evaluate object
        expect(evaluation).toEqual(jasmine.any(Object));
        expect(Object.keys(evaluation)).toEqual(['is_valid', 'errors']);

        //  Evaluate object structure : is_valid
        expect(evaluation.is_valid).toBeDefined();
        expect(evaluation.is_valid).toEqual(jasmine.any(Boolean));

        //  Evaluate object structure : errors
        expect(evaluation.errors).toBeDefined();
        expect(evaluation.errors).toEqual(jasmine.any(Object));
    });

    it ('should have errors where the object contains a msg and a params property', () => {
        const evaluation = (new Validator({ c : 'number' })).validate(subject);

        //  Evalute object
        expect(evaluation.errors.c).toEqual(jasmine.any(Array));
        expect(evaluation.errors.c[0]).toEqual(jasmine.any(Object));

        //  Check for msg
        expect(evaluation.errors.c[0].msg).toEqual(jasmine.any(String));
        expect(evaluation.errors.c[0]).toEqual(jasmine.objectContaining({ msg: 'number' }));

        //  Check for params
        expect(evaluation.errors.c[0].params).toEqual(jasmine.any(Array));
        expect(evaluation.errors.c[0]).toEqual(jasmine.objectContaining({ params: [] }));
    });

    it ('should have errors where the key is the rule that failed', () => {
        const evaluation = (new Validator({ c : 'number' })).validate(subject);
        expect(evaluation.errors.c[0].msg).toEqual('number');
    });

    it ('should have errors where the params object is empty if no param was passed', () => {
        const evaluation = (new Validator({ c : 'number' })).validate(subject);
        expect(evaluation.errors.c[0].params).toEqual([]);
    });

    it ('should have errors where the params object contains the passed param if passed', () => {
        const evaluation = (new Validator({ a : 'greater_than:150' })).validate(subject);
        expect(evaluation.errors.a[0].params).toEqual(['150']);
    });

//  Validate functionality

    it ('should remember the validity of the last validation run', () => {
        const validator = new Validator({ a : 'number' });

        validator.validate({ a: 'foo' });

        expect(validator.is_valid).toEqual(false);
        expect(validator.errors).toEqual(jasmine.any(Object));
        expect(validator.errors.a).toEqual([{msg:'number', params: []}]);

        validator.validate({ a: 10 });

        expect(validator.is_valid).toEqual(true);
        expect(validator.errors).toEqual(jasmine.any(Object));
        expect(validator.errors.a).toEqual([]);
    });

    it ('should throw a type error when passed wrong configuration options', () => {
        expect(function () {
            const v = new Validator();
        }).toThrowError(TypeError);

        expect(function () {
            const v = new Validator(5);
        }).toThrowError(TypeError);

        expect(function () {
            const v = new Validator([{ hello: 'world' }, 5, true]);
        }).toThrowError(TypeError);

        expect(function () {
            const v = new Validator('foo');
        }).toThrowError(TypeError);

        expect(function () {
            const v = new Validator({});
        }).not.toThrowError(TypeError);

        expect(function () {
            const v = new Validator({ foo: 'string' });
        }).not.toThrowError(TypeError);

        expect(function () {
            const v = new Validator({ foo: 'number', a : { b: 'string', params: [] }});
        }).toThrowError(TypeError);

        expect(function () {
            const v = new Validator({ foo: 5, a : { b: 'string', params: [] }});
        }).toThrowError(TypeError);
    });

//  Flag : Sometimes

    it ('sometimes flag(?) should validate correctly if set and no value is passed', () => {
        const evaluation = (new Validator({ a : '?number' })).validate({});
        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('sometimes flag (?) should not interfere with other validation rules', () => {
        const evaluation = (new Validator({
            a : '?number',
            b : 'number|less_than:20',
        })).validate({});

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([
            {msg: 'number', params: []},
            {msg: 'less_than', params: ['20']}
        ]);
    });

//  Flag : Parameter

    it ('parameter flag (<...>) should allow link to passed parameter', () => {
        const evaluation = (new Validator({ a: 'equal_to:<foo>'})).validate({ a: 'hello', foo: 'hello' });
        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('parameter flag (<...>) should fail if parameter is not passed', () => {
        const evaluation = (new Validator({ a: 'equal_to:<foo>'})).validate({ a: 'hello', foobar: 'hello' });
        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.a).toEqual([{msg:'equal_to', params: [undefined]}]);
    });

    it ('parameter flag (<...>) should allow multiple parameters inside the same ruleset', () => {
        const evaluation = (new Validator({ a: 'between:<min>,<max>'})).validate({ a: 5, min: 3, max: 7 });
        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('parameter flag (<...>) should allow multiple parameters inside the same config', () => {
        const evaluation = (new Validator({ a: 'in:<arr1>', b: 'in:<arr2>'})).validate({ a: 1, b: 2, arr1: [1, 3, 5], arr2: [2, 4, 6] });
        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
        expect(evaluation.errors.b).toEqual([]);
    });

//  Extend functionality

    it ('extend functionality should work', () => {
        Validator.extend('trick', function (val, p1) {
            return p1 === 'treat' ? (val === 'trick') : (p1 === 'trick' ? val === 'treat' : false);
        });

        const evaluation = (new Validator({ a: 'trick:<b>' })).validate({ a: 'trick', b: 'treat' });
        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('extend functionality should work with multiple parameters', () => {
        Validator.extend('sum', function (val, p1, p2) {
            return val === (p1 + p2);
        });

        const evaluation = (new Validator({ a: 'sum:<b>,<c>' })).validate({ a: 4, b: 1, c: 3 });
        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);
    });

    it ('extend functionality should work across multiple instances', () => {
        Validator.extend('double', function (val, p1, p2) {
            return val === (p1 * 2);
        });

        //  Evaluation
        const evaluation = (new Validator({ a: 'double:<b>' })).validate({ a: 4, b: 2 });
        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.a).toEqual([]);

        //  Second evaluation
        const evaluation2 = (new Validator({ a: 'double:<b>' })).validate({ a: 4, b: 2 });
        expect(evaluation2.is_valid).toEqual(true);
        expect(evaluation2.errors.a).toEqual([]);
    });

    it ('extend functionality should allow redefining the same validity function', () => {
        Validator.extend('ismyname', function (val, p1, p2) {return val === 'peter';});

        //  Evaluation
        const evaluation = (new Validator({ name: 'ismyname' })).validate({ name: 'peter' });
        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.name).toEqual([]);

        //  Redefine
        Validator.extend('ismyname', function (val, p1, p2) {return val === 'josh';});

        //  Second evaluation
        const evaluation2 = (new Validator({ name: 'ismyname' })).validate({ name: 'peter' });
        expect(evaluation2.is_valid).toEqual(false);
        expect(evaluation2.errors.name).toEqual([{msg:'ismyname', params: []}]);
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

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.password).toEqual([]);
        expect(evaluation.errors.password_confirmation).toEqual([]);
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

        expect(evaluation.is_valid).toEqual(true);
        expect(evaluation.errors.first_name).toEqual([]);
        expect(evaluation.errors.last_name).toEqual([]);
        expect(evaluation.errors.age).toEqual([]);
        expect(evaluation.errors.gender).toEqual([]);
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

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.first_name).toEqual([]);
        expect(evaluation.errors.last_name).toEqual([]);
        expect(evaluation.errors.age).toEqual([{msg: 'integer', params: []}, {msg: 'between', params: ['1', '150']}]);
        expect(evaluation.errors.gender).toEqual([{msg: 'in', params: [['m', 'f', 'o']]}]);
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

        expect(evaluation.is_valid).toEqual(false);
        expect(evaluation.errors.address.street).toEqual([]);
        expect(evaluation.errors.address.nr).toEqual([]);
        expect(evaluation.errors.address.zip).toEqual([]);
        expect(evaluation.errors.contact.email).toEqual([{msg: 'email', params: []}]);
    });

})
