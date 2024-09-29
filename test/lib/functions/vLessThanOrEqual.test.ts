import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import Validator        from '../../../lib';

describe('vLessThanOrEqual', () => {
    it('Should be invalid when no params are passed', () => {
        const evaluation = new Validator({a1: 'less_than_or_equal:<meta.params>'}).validate({a1: 10});

        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a1: [{msg: 'less_than_or_equal', params: [undefined]}],
            },
        });
    });

    it('Should be invalid when non-numeric params are passed as part of params', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: 'less_than_or_equal:<meta>'}).validate({a: 10, meta: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'less_than_or_equal', params: [el]}],
                },
            });
        }
    });

    it('Should be invalid when non-numeric params are passed as part of rule', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: `less_than_or_equal:${el}`}).validate({a: 10});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'less_than_or_equal', params: [`${el}`]}],
                },
            });
        }
    });

    it('Should return a correct error message when invalid', () => {
        const evaluation = new Validator({a1: 'less_than_or_equal:4'}).validate({a1: 5});
        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a1: [{msg: 'less_than_or_equal', params: ['4']}],
            },
        });
    });

    it('Should allow a string as an acceptable value', () => {
        assert.ok(new Validator({a: 'less_than_or_equal:5'}).check({a: 'hello'}));
    });

    it('Should allow an array as an acceptable value', () => {
        assert.ok(new Validator({a: 'less_than_or_equal:10'}).check({a: ['foo', 'bar', 'bar', 'foo', 'hello', 'world']}));
    });

    it('Should allow a numerical value as an acceptable value', () => {
        assert.ok(new Validator({a: 'less_than_or_equal:20'}).check({a: 15}));
    });

    it('Should disallow NaN values', () => {
        assert.deepEqual(new Validator({a: 'less_than_or_equal:10'}).validate({a: Number.NaN}), {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'less_than_or_equal', params: ['10']}],
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
            i1: [],
            j1: '',
            l1: new Array(50),
            m1: Object.create(null),
        };

        const valid_keys    = ['a1', 'b1', 'c1', 'j1', 'i1', 'l1'];
        const invalid_keys  = ['d1', 'e1', 'g1', 'h1', 'm1'];
        const rules         = [...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'less_than_or_equal:250';
            return acc;
        }, {});

        const evaluation = new Validator(rules).validate(typechecks);

        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 5,
            errors: {
                d1: [{msg:'less_than_or_equal', params: ['250']}],
                e1: [{msg:'less_than_or_equal', params: ['250']}],
                g1: [{msg:'less_than_or_equal', params: ['250']}],
                h1: [{msg:'less_than_or_equal', params: ['250']}],
                m1: [{msg:'less_than_or_equal', params: ['250']}],
            },
        });
    });

    describe('String', () => {
        it('Should validate a string whose length is smaller than the provided parameter as valid', () => {
            assert.ok(new Validator({a: 'less_than_or_equal:10'}).check({a: 'hello'}));
        });

        it('Should validate a string whose length is equal to the provided parameter as valid', () => {
            assert.ok(new Validator({a: 'less_than_or_equal:11'}).check({a: 'hello world'}));
        });

        it('Should validate a string whose length is larger than the provided parameter as invalid', () => {
            assert.deepEqual(
                new Validator({a: 'less_than_or_equal:8'}).validate({a: 'hello world'}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: 'less_than_or_equal', params: ['8']}],
                    },
                }
            );
        });
    });

    describe('Array', () => {
        it('Should validate an array whose length is smaller than the provided parameter as valid', () => {
            assert.ok(new Validator({a: 'less_than_or_equal:10'}).check({a: [1,2,3]}));
        });

        it('Should validate an array whose length is equal to the provided parameter as valid', () => {
            assert.ok(new Validator({a: 'less_than_or_equal:6'}).check({a: [1,2,3,4,5,6]}));
        });

        it('Should validate an array whose length is larger than the provided parameter as invalid', () => {
            assert.deepEqual(
                new Validator({a: 'less_than_or_equal:4'}).validate({a: ['apple', 'fear', 'mango', 'grape', 'orange']}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: 'less_than_or_equal', params: ['4']}],
                    },
                }
            );
        });
    });

    describe('Blob and File', () => {
        it('Should validate a Blob whose size is smaller than the provided parameter as valid', () => {
            const smallBlob = new Blob(['Hello World']);
            assert.ok(new Validator({a: 'less_than_or_equal:20'}).check({a: smallBlob}));
        });

        it('Should validate a Blob whose size is equal to the provided parameter as valid', () => {
            const exactBlob = new Blob(['Hello, this is exactly 31 bytes']);
            assert.ok(new Validator({a: 'less_than_or_equal:31'}).check({a: exactBlob}));
        });

        it('Should validate a Blob whose size is larger than the provided parameter as invalid', () => {
            const largeBlob = new Blob(['This blob is way too large for validation']);
            assert.deepEqual(new Validator({a: 'less_than_or_equal:10'}).validate({a: largeBlob}), {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'less_than_or_equal', params: ['10']}],
                },
            });
        });

        it('Should validate a File whose size is smaller than the provided parameter as valid', () => {
            const smallFile = new File(['Hello File'], 'smallFile.txt', {type: 'text/plain'});
            assert.ok(new Validator({a: 'less_than_or_equal:20'}).check({a: smallFile}));
        });

        it('Should validate a File whose size is equal to the provided parameter as valid', () => {
            const exactFile = new File(['Exactly 29 bytes of text here'], 'exactFile.txt', {type: 'text/plain'});
            assert.ok(new Validator({a: 'less_than_or_equal:29'}).check({a: exactFile}));
        });

        it('Should validate a File whose size is larger than the provided parameter as invalid', () => {
            const largeFile = new File(['This file content is too large'], 'largeFile.txt', {type: 'text/plain'});
            assert.deepEqual(new Validator({a: 'less_than_or_equal:10'}).validate({a: largeFile}), {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'less_than_or_equal', params: ['10']}],
                },
            });
        });
    });

    describe('Number', () => {
        it('Should validate a number smaller than the provided parameter as valid', () => {
            assert.ok(new Validator({a: 'less_than_or_equal:1000'}).check({a: 950}));
        });

        it('Should validate a number equal to the provided parameter as valid', () => {
            assert.ok(new Validator({a: 'less_than_or_equal:42'}).check({a: 42}));
        });

        it('Should validate a number larger than the provided parameter as invalid', () => {
            assert.deepEqual(new Validator({a: 'less_than_or_equal:9000'}).validate({a: 9999}), {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'less_than_or_equal', params: ['9000']}],
                },
            });
        });

        it('Should validate negative number ranges that are below the provided parameter as valid', () => {
            assert.ok(new Validator({a: 'less_than_or_equal:-500'}).check({a: -501}));
        });

        it('Should validate negative number ranges that are above the provided parameter as invalid', () => {
            assert.deepEqual(new Validator({a: 'less_than_or_equal:-20'}).validate({a: -18}), {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'less_than_or_equal', params: ['-20']}],
                },
            });
        });

        it('Should validate negative number ranges that are equal to the provided parameter as valid', () => {
            assert.ok(new Validator({a: 'less_than_or_equal:-999'}).check({a: -999}));
        });
    });
});
