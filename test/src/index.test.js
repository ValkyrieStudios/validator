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
        const validator = new Validator({
            a : 'number',
        });

        const evaluation = validator.validate(subject);

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

    it ('should remember the validity of the last validation run', () => {
        const validator = new Validator({ a : 'number' });

        validator.validate({ a: 'foo' });

        expect(validator.is_valid).toEqual(false);
        expect(validator.errors).toEqual(jasmine.any(Object));
        expect(validator.errors.a).toEqual([{msg:'number'}]);

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
            const v = new Validator({ foo: 'number', a : { b: 'string' }});
        }).toThrowError(TypeError);

        expect(function () {
            const v = new Validator({ foo: 5, a : { b: 'string' }});
        }).toThrowError(TypeError);
    });

})