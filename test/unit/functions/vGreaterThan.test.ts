import {describe, it, expect} from 'vitest';
import Validator from '../../../lib';

describe('vGreaterThan', () => {
    it('Should be invalid when no params are passed', () => {
        const evaluation = new Validator({a1: 'greater_than:<meta.params>'}).validate({a1: 10});

        expect(evaluation).toEqual({
            is_valid: false,
            count: 1,
            errors: {
                a1: [{msg: 'greater_than', params: [undefined]}],
            },
        });
    });

    it('Should be invalid when non-numeric params are passed as part of params', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: 'greater_than:<meta>'}).validate({a: 10, meta: el});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: [el]}],
                },
            });
        }
    });

    it('Should be invalid when non-numeric params are passed as part of rule', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: `greater_than:${el}`}).validate({a: 10});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: [`${el}`]}],
                },
            });
        }
    });

    it('Should return a correct error message when invalid', () => {
        const evaluation = new Validator({a1: 'greater_than:10'}).validate({a1: 5});
        expect(evaluation).toEqual({
            is_valid: false,
            count: 1,
            errors: {
                a1: [{msg: 'greater_than', params: ['10']}],
            },
        });
    });

    it('Should allow a string as an acceptable value', () => {
        expect(new Validator({a: 'greater_than:4'}).check({a: 'hello'})).toBe(true);
    });

    it('Should allow an array as an acceptable value', () => {
        expect(new Validator({a: 'greater_than:5'}).check({a: ['foo', 'bar', 'bar', 'foo', 'hello', 'world']})).toBe(true);
    });

    it('Should allow a numerical value as an acceptable value', () => {
        expect(new Validator({a: 'greater_than:10'}).check({a: 15})).toBe(true);
    });

    it('Should disallow NaN values', () => {
        expect(new Validator({a: 'greater_than:10'}).validate({a: Number.NaN})).toEqual({
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'greater_than', params: ['10']}],
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
            i1: ['this', 'rocks', 'sweet'],
            j1: 'abc',
            l1: new Array(3),
            m1: Object.create(null),
        };

        const valid_keys    = ['a1', 'b1', 'c1', 'j1', 'i1', 'l1'];
        const invalid_keys  = ['d1', 'e1', 'g1', 'h1', 'm1'];
        const rules         = [...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'greater_than:2';
            return acc;
        }, {});

        const evaluation = new Validator(rules).validate(typechecks);

        expect(evaluation).toEqual({
            is_valid: false,
            count: 5,
            errors: {
                d1: [{msg:'greater_than', params: ['2']}],
                e1: [{msg:'greater_than', params: ['2']}],
                g1: [{msg:'greater_than', params: ['2']}],
                h1: [{msg:'greater_than', params: ['2']}],
                m1: [{msg:'greater_than', params: ['2']}],
            },
        });
    });

    describe('String', () => {
        it('Should validate a string whose length is greater than the provided parameter as valid', () => {
            expect(new Validator({a: 'greater_than:10'}).check({a: 'The fox leaped over the fence'})).toBe(true);
        });

        it('Should validate a string whose length is equal to the provided parameter as invalid', () => {
            expect(new Validator({a: 'greater_than:11'}).validate({a: 'hello world'})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: ['11']}],
                },
            });
        });

        it('Should validate a string whose length is smaller than the provided parameter as invalid', () => {
            expect(new Validator({a: 'greater_than:8'}).validate({a: 'Frantic'})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: ['8']}],
                },
            });
        });
    });

    describe('Array', () => {
        it('Should validate an array whose length is greater than the provided parameter as valid', () => {
            expect(new Validator({a: 'greater_than:3'}).check({a: [1,2,3,4]})).toBe(true);
        });

        it('Should validate an array whose length is equal to the provided parameter as invalid', () => {
            expect(new Validator({a: 'greater_than:3'}).validate({a: ['hello', 'this', 'is']})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: ['3']}],
                },
            });
        });

        it('Should validate an array whose length is smaller than the provided parameter as invalid', () => {
            expect(new Validator({a: 'greater_than:3'}).validate({a: ['hello', 'this']})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: ['3']}],
                },
            });
        });
    });

    describe('Blob and File', () => {
        it('Should validate a Blob whose size is greater than the provided parameter as valid', () => {
            const largeBlob = new Blob(['This is a large blob with a significant amount of content.']);
            expect(new Validator({a: 'greater_than:10'}).check({a: largeBlob})).toBe(true);
        });

        it('Should validate a Blob whose size is equal to the provided parameter as invalid', () => {
            const exactBlob = new Blob(['Exactly 31 bytes of content']);
            expect(new Validator({a: 'greater_than:31'}).validate({a: exactBlob})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: ['31']}],
                },
            });
        });

        it('Should validate a Blob whose size is smaller than the provided parameter as invalid', () => {
            const smallBlob = new Blob(['Short']);
            expect(new Validator({a: 'greater_than:20'}).validate({a: smallBlob})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: ['20']}],
                },
            });
        });

        it('Should validate a File whose size is greater than the provided parameter as valid', () => {
            const largeFile = new File(['This file content is quite large'], 'largeFile.txt', {type: 'text/plain'});
            expect(new Validator({a: 'greater_than:10'}).check({a: largeFile})).toBe(true);
        });

        it('Should validate a File whose size is equal to the provided parameter as invalid', () => {
            const exactFile = new File(['This file is exactly 29 bytes'], 'exactFile.txt', {type: 'text/plain'});
            expect(new Validator({a: 'greater_than:29'}).validate({a: exactFile})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: ['29']}],
                },
            });
        });

        it('Should validate a File whose size is smaller than the provided parameter as invalid', () => {
            const smallFile = new File(['Tiny file'], 'smallFile.txt', {type: 'text/plain'});
            expect(new Validator({a: 'greater_than:20'}).validate({a: smallFile})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: ['20']}],
                },
            });
        });
    });

    describe('Number', () => {
        it('Should validate a number greater than the provided parameter as valid', () => {
            expect(new Validator({a: 'greater_than:1000'}).check({a: 10425})).toBe(true);
        });

        it('Should validate a number equal to the provided parameter as invalid', () => {
            expect(new Validator({a: 'greater_than:42'}).validate({a: 42})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: ['42']}],
                },
            });
        });

        it('Should validate a number smaller than the provided parameter as invalid', () => {
            expect(new Validator({a: 'greater_than:502'}).validate({a: 59})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: ['502']}],
                },
            });
        });

        it('Should validate negative number ranges that are above the provided parameter as valid', () => {
            expect(new Validator({a: 'greater_than:-500'}).check({a: -245})).toBe(true);
        });

        it('Should validate negative number ranges that are below the provided parameter as invalid', () => {
            expect(new Validator({a: 'greater_than:-20'}).validate({a: -45})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: ['-20']}],
                },
            });
        });

        it('Should validate negative number ranges that are equal to the provided parameter as invalid', () => {
            expect(new Validator({a: 'greater_than:-999'}).validate({a: -999})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'greater_than', params: ['-999']}],
                },
            });
        });
    });
});
