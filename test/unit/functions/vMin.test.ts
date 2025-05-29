import {describe, it, expect} from 'vitest';
import Validator from '../../../lib';

describe('vMin', () => {
    it('Should be invalid when no params are passed', () => {
        const evaluation = new Validator({a1: 'min:<meta.params>'}).validate({a1: 10});

        expect(evaluation).toEqual({
            is_valid: false,
            count: 1,
            errors: {
                a1: [{msg: 'min', params: [undefined]}],
            },
        });
    });

    it('Should be invalid when non-numeric params are passed as part of params', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: 'min:<meta>'}).validate({a: 10, meta: el});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'min', params: [el]}],
                },
            });
        }
    });

    it('Should be invalid when non-numeric params are passed as part of rule', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: `min:${el}`}).validate({a: 10});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'min', params: [`${el}`]}],
                },
            });
        }
    });

    it('Should return a correct error message when invalid', () => {
        const evaluation = new Validator({a1: 'min:10'}).validate({a1: 5});
        expect(evaluation).toEqual({
            is_valid: false,
            count: 1,
            errors: {
                a1: [{msg: 'min', params: ['10']}],
            },
        });
    });

    it('Should allow a string as an acceptable value', () => {
        expect(new Validator({a: 'min:4'}).check({a: 'hello'})).toBe(true);
    });

    it('Should allow an array as an acceptable value', () => {
        expect(new Validator({a: 'min:5'}).check({a: ['foo', 'bar', 'bar', 'foo', 'hello', 'world']})).toBe(true);
    });

    it('Should allow a numerical value as an acceptable value', () => {
        expect(new Validator({a: 'min:10'}).check({a: 15})).toBe(true);
    });

    it('Should disallow NaN values', () => {
        expect(new Validator({a: 'min:10'}).validate({a: Number.NaN})).toEqual({
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'min', params: ['10']}],
            },
        });
    });

    it('Should not allow other types as values', () => {
        const typechecks = {
            a1: 100,
            b1: 200,
            c1: 'hello',
            d1: false,
            e1: true,
            g1: new Date(),
            h1: {},
            i1: ['oh', 'say', 'can', 'you', 'see'],
            j1: 'abc',
            l1: new Array(3),
            m1: Object.create(null),
        };

        const valid_keys    = ['a1', 'b1', 'c1', 'j1', 'i1', 'l1'];
        const invalid_keys  = ['d1', 'e1', 'g1', 'h1', 'm1'];
        const rules         = [...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'min:2';
            return acc;
        }, {});

        const evaluation = new Validator(rules).validate(typechecks);

        expect(evaluation).toEqual({
            is_valid: false,
            count: 5,
            errors: {
                d1: [{msg:'min', params: ['2']}],
                e1: [{msg:'min', params: ['2']}],
                g1: [{msg:'min', params: ['2']}],
                h1: [{msg:'min', params: ['2']}],
                m1: [{msg:'min', params: ['2']}],
            },
        });
    });

    describe('String', () => {
        it('Should validate a string whose length is greater than the provided parameter as valid', () => {
            expect(new Validator({a: 'min:10'}).check({a: 'The fox leaped over the fence'})).toBe(true);
        });

        it('Should validate a string whose length is equal to the provided parameter as valid', () => {
            expect(new Validator({a: 'min:11'}).check({a: 'hello world'})).toBe(true);
        });

        it('Should validate a string whose length is smaller than the provided parameter as invalid', () => {
            expect(new Validator({a: 'min:8'}).validate({a: 'Frantic'})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'min', params: ['8']}],
                },
            });
        });
    });

    describe('Array', () => {
        it('Should validate an array whose length is greater than the provided parameter as valid', () => {
            expect(new Validator({a: 'min:5'}).check({a: [1,2,3,4,5]})).toBe(true);
        });

        it('Should validate an array whose length is equal to the provided parameter as valid', () => {
            expect(new Validator({a: 'min:2'}).check({a: ['foo', 'bar']})).toBe(true);
        });

        it('Should validate an array whose length is smaller than the provided parameter as invalid', () => {
            expect(new Validator({a: 'min:3'}).validate({a: ['foo']})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'min', params: ['3']}],
                },
            });
        });
    });

    describe('Number', () => {
        it('Should validate a number greater than the provided parameter as valid', () => {
            expect(new Validator({a: 'min:1000'}).check({a: 10425})).toBe(true);
        });

        it('Should validate a number equal to the provided parameter as valid', () => {
            expect(new Validator({a: 'min:42'}).check({a: 42})).toBe(true);
        });

        it('Should validate a number smaller than the provided parameter as invalid', () => {
            expect(new Validator({a: 'min:502'}).validate({a: 59})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'min', params: ['502']}],
                },
            });
        });

        it('Should validate negative number ranges that are above the provided parameter as valid', () => {
            expect(new Validator({a: 'min:-500'}).check({a: -245})).toBe(true);
        });

        it('Should validate negative number ranges that are below the provided parameter as invalid', () => {
            expect(new Validator({a: 'min:-20'}).validate({a: -45})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'min', params: ['-20']}],
                },
            });
        });

        it('Should validate negative number ranges that are equal to the provided parameter as valid', () => {
            expect(new Validator({a: 'min:-999'}).check({a: -999})).toBe(true);
        });
    });
});
