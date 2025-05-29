import {describe, it, expect} from 'vitest';
import Validator from '../../../lib';

describe('vBetween', () => {
    it('Should be invalid when no params or not all params are passed', () => {
        const evaluation = new Validator({a: 'between:<min>,<max>'}).validate({a: 10});
        expect(evaluation).toEqual({
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'between', params: [undefined, undefined]}],
            },
        });

        const evaluation2 = new Validator({a: 'between:<min>,<max>'}).validate({a: 10, min: 5});
        expect(evaluation2).toEqual({
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'between', params: [5, undefined]}],
            },
        });

        const evaluation3 = new Validator({a: 'between:<min>,<max>'}).validate({a: 10, max: 15});
        expect(evaluation3).toEqual({
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'between', params: [undefined, 15]}],
            },
        });
    });

    it('Should be invalid when params are passed but not all are numeric', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: 'between:<min>,<max>'}).validate({a: 10, min: el, max: 20});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between', params: [el, 20]}],
                },
            });
        }

        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: 'between:<min>,<max>'}).validate({a: 10, min: 0, max: el});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between', params: [0, el]}],
                },
            });
        }

        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: 'between:<min>,<max>'}).validate({a: 10, min: el, max: el});
            expect(evaluation).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between', params: [el, el]}],
                },
            });
        }
    });

    it('Should be invalid when incorrect params are passed as part of string literal', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: `between:0,${el}`}).validate({a: 10});
            expect(evaluation).toEqual({is_valid: false, count: 1,errors: {a: [{msg: 'between', params: ['0', `${el}`]}]}});
        }

        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: `between:${el},0`}).validate({a: 10});
            expect(evaluation).toEqual({is_valid: false, count: 1,errors: {a: [{msg: 'between', params: [`${el}`, '0']}]}});
        }

        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: `between:${el},${el}`}).validate({a: 10});
            expect(evaluation).toEqual({is_valid: false, count: 1,errors: {a: [{msg: 'between', params: [`${el}`, `${el}`]}]}});
        }

        const evaluation3 = new Validator({a: 'between:0'}).validate({a: 10});
        expect(evaluation3).toEqual({is_valid: false, count: 1,errors: {a: [{msg: 'between', params: ['0']}]}});

        const evaluation5 = new Validator({a: 'between'}).validate({a: 10});
        expect(evaluation5).toEqual({is_valid: false, count: 1,errors: {a: [{msg: 'between', params: []}]}});
    });

    it('Should return a correct error message when invalid', () => {
        const evaluation = new Validator({a: 'between:5,15'}).validate({a: 25});
        expect(evaluation).toEqual({
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'between', params: ['5', '15']}],
            },
        });
    });

    it('Should allow a string as an acceptable value', () => {
        const evaluation = new Validator({a: 'between:4,10'}).validate({a: 'hello'});
        expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
    });

    it('Should allow an array as an acceptable value', () => {
        const evaluation = new Validator({a: 'between:5,10'}).validate({a: ['foo', 'bar', 'bar', 'foo', 'hello', 'world']});
        expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
    });

    it('Should allow a numerical value as an acceptable value', () => {
        const evaluation = new Validator({a: 'between:10,20'}).validate({a: 15});
        expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
    });

    it('Should disallow NaN values', () => {
        const evaluation = new Validator({a: 'between:10,20'}).validate({a: Number.NaN});
        expect(evaluation).toEqual({
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'between', params: ['10', '20']}],
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
            f1: new RegExp(''),
            g1: new Date(),
            h1: {},
            i1: ['hey', 'hi', 'hello'],
            j1: 'abc',
            l1: new Array(3),
            m1: Object.create(null),
        };

        const valid_keys    = ['a1', 'b1', 'c1', 'j1', 'i1', 'l1'];
        const invalid_keys  = ['d1', 'e1', 'f1', 'g1', 'h1', 'm1'];
        const rules         = [...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'between:2,300';
            return acc;
        }, {});

        const evaluation = new Validator(rules).validate(typechecks);

        expect(evaluation.is_valid).toBe(false);
        expect(evaluation.count).toBe(invalid_keys.length);

        valid_keys.forEach(key => expect(evaluation.errors.hasOwnProperty(key)).toBe(false));
        invalid_keys.forEach(key => expect(evaluation.errors[key]).toEqual([{msg:'between', params: ['2', '300']}]));
    });

    describe('String', () => {
        it('Should validate a string whose length is between the provided parameters as valid', () => {
            const evaluation = new Validator({a: 'between:10,30'}).validate({a: 'The fox leaped over the fence'});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should validate a string whose length is equal to the start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:11,15'}).validate({a: 'hello world'});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['11', '15']}]}});
        });

        it('Should validate a string whose length is equal to the end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:1,11'}).validate({a: 'hello world'});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['1', '11']}]}});
        });

        it('Should validate a string whose length is smaller than the start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:10,20'}).validate({a: 'Frantic'});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['10', '20']}]}});
        });

        it('Should validate a string whose length is larger than the end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:2,5'}).validate({a: 'Frantic'});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['2', '5']}]}});
        });
    });

    describe('Array', () => {
        it('Should validate an array whose length is between the provided parameters as valid', () => {
            const evaluation = new Validator({a: 'between:2,6'}).validate({a: ['The', 'fox', 'leaped']});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should validate an array whose length is equal to the start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:3,10'}).validate({a: ['The', 'Fox', 'leaped']});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['3', '10']}]}});
        });

        it('Should validate an array whose length is equal to the end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:1,3'}).validate({a: ['The', 'Fox', 'leaped']});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['1', '3']}]}});
        });

        it('Should validate an array whose length is smaller than the start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:10,20'}).validate({a: ['Strong']});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['10', '20']}]}});
        });

        it('Should validate a string whose length is larger than the end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:2,5'}).validate({a: ['The', 'fox', 'leaped', 'over', 'the', 'fence']});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['2', '5']}]}});
        });
    });

    describe('Blob and File', () => {
        it('Should validate a Blob whose size is between the provided parameters as valid', () => {
            const mediumBlob = new Blob(['This is a medium-sized blob.']);
            expect(new Validator({a: 'between:10,100'}).check({a: mediumBlob})).toBe(true);
        });

        it('Should validate a Blob whose size is equal to the start parameter as invalid', () => {
            const exactBlob = new Blob(['Exactly 31 bytes of content']);
            expect(new Validator({a: 'between:31,100'}).validate({a: exactBlob})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between', params: ['31', '100']}],
                },
            });
        });

        it('Should validate a Blob whose size is equal to the end parameter as invalid', () => {
            const exactBlob = new Blob(new Array(100).fill('a'));
            expect(new Validator({a: 'between:10,100'}).validate({a: exactBlob})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between', params: ['10', '100']}],
                },
            });
        });

        it('Should validate a Blob whose size is smaller than the start parameter as invalid', () => {
            const smallBlob = new Blob(['Short']);
            expect(new Validator({a: 'between:10,100'}).validate({a: smallBlob})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between', params: ['10', '100']}],
                },
            });
        });

        it('Should validate a Blob whose size is larger than the end parameter as invalid', () => {
            const largeBlob = new Blob(new Array(100).fill('a'));
            expect(new Validator({a: 'between:10,50'}).validate({a: largeBlob})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between', params: ['10', '50']}],
                },
            });
        });

        it('Should validate a File whose size is between the provided parameters as valid', () => {
            const mediumFile = new File(['This file is a decent size'], 'mediumFile.txt', {type: 'text/plain'});
            expect(new Validator({a: 'between:10,100'}).check({a: mediumFile})).toBe(true);
        });

        it('Should validate a File whose size is equal to the start parameter as invalid', () => {
            const exactFile = new File(['Exactly 25 bytes'], 'exactFile.txt', {type: 'text/plain'});
            expect(new Validator({a: 'between:25,100'}).validate({a: exactFile})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between', params: ['25', '100']}],
                },
            });
        });

        it('Should validate a File whose size is equal to the end parameter as invalid', () => {
            const exactFile = new File(new Array(100).fill('a'), 'exactFile.txt', {type: 'text/plain'});
            expect(new Validator({a: 'between:10,100'}).validate({a: exactFile})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between', params: ['10', '100']}],
                },
            });
        });

        it('Should validate a File whose size is smaller than the start parameter as invalid', () => {
            const smallFile = new File(['Tiny file'], 'smallFile.txt', {type: 'text/plain'});
            expect(new Validator({a: 'between:20,50'}).validate({a: smallFile})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between', params: ['20', '50']}],
                },
            });
        });

        it('Should validate a File whose size is larger than the end parameter as invalid', () => {
            const largeFile = new File(['This file content is too large'], 'largeFile.txt', {type: 'text/plain'});
            expect(new Validator({a: 'between:10,30'}).validate({a: largeFile})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'between', params: ['10', '30']}],
                },
            });
        });
    });

    describe('Number', () => {
        it('Should validate a number greater than the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'between:1000,100000'}).validate({a: 10425});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should validate a number equal to the provided start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:42,100'}).validate({a: 42});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['42', '100']}]}});
        });

        it('Should validate a number equal to the provided end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:1,42'}).validate({a: 42});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['1', '42']}]}});
        });

        it('Should validate a number smaller than the provided start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:100,200'}).validate({a: 59});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['100', '200']}]}});
        });

        it('Should validate a number larger than the provided end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:10,25'}).validate({a: 59});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['10', '25']}]}});
        });

        it('Should validate negative number ranges that are above the provided parameter as valid', () => {
            const evaluation = new Validator({a: 'between:-500,-200'}).validate({a: -245});
            expect(evaluation).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should validate negative number ranges that are below the provided start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:-60,-50'}).validate({a: -45});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['-60', '-50']}]}});
        });

        it('Should validate negative number ranges that are above the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:-40,-20'}).validate({a: -45});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['-40', '-20']}]}});
        });

        it('Should validate negative number ranges that are equal to the provided start parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:-999,-100'}).validate({a: -999});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['-999', '-100']}]}});
        });

        it('Should validate negative number ranges that are equal to the provided end parameter as invalid', () => {
            const evaluation = new Validator({a: 'between:-10000,-999'}).validate({a: -999});
            expect(evaluation).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'between', params: ['-10000', '-999']}]}});
        });
    });
});
