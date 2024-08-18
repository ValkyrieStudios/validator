import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import Validator        from '../../../lib';

describe('vSize', () => {
    it('Should be invalid when no params are passed', () => {
        const evaluation = new Validator({a: 'size:<meta.params>'}).validate({a: 'hello'});

        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'size', params: [undefined]}],
            },
        });
    });

    it('Should be invalid when non-numeric params are passed as part of params', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: 'size:<meta>'}).validate({a: 10, meta: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'size', params: [el]}],
                },
            });
        }
    });

    it('Should be invalid when non-numeric params are passed as part of rule', () => {
        for (const el of ['hello', true, false]) {
            const evaluation = new Validator({a: `size:${el}`}).validate({a: 10});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'size', params: [`${el}`]}],
                },
            });
        }
    });

    it('Should return a correct error message when invalid', () => {
        const evaluation = new Validator({a: 'size:10'}).validate({a: 'this is a string'});
        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a: [{msg: 'size', params: ['10']}],
            },
        });
    });

    it('Should allow a string as an acceptable value', () => {
        assert.ok(new Validator({a: 'size:16'}).check({a: 'this is a string'}));
    });

    it('Should allow an array as an acceptable value', () => {
        assert.ok(new Validator({a: 'size:5'}).check({a: ['foo', 'bar', 'hello', 'world', 'sweet']}));
    });

    it('Should only allow numerical values as parameter in the rule', () => {
        const evaluation = new Validator({a: 'size:foo'}).validate({a: 'bar'});
        assert.equal(evaluation.is_valid, false);
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
            i1: [1,2,3,4,5],
            j1: '',
            l1: new Array(5),
            m1: Object.create(null),
        };

        const valid_keys    = ['c1', 'i1', 'l1'];
        const invalid_keys  = ['a1', 'b1', 'd1', 'e1', 'g1', 'h1', 'j1', 'm1'];
        const rules         = [...valid_keys, ...invalid_keys].reduce((acc, key) => {
            acc[key] = 'size:5';
            return acc;
        }, {});

        const evaluation = new Validator(rules).validate(typechecks);

        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 8,
            errors: {
                a1: [{msg: 'size', params: ['5']}],
                b1: [{msg: 'size', params: ['5']}],
                d1: [{msg: 'size', params: ['5']}],
                e1: [{msg: 'size', params: ['5']}],
                g1: [{msg: 'size', params: ['5']}],
                h1: [{msg: 'size', params: ['5']}],
                j1: [{msg: 'size', params: ['5']}],
                m1: [{msg: 'size', params: ['5']}],
            },
        });
    });

    describe('String', () => {
        it('Should validate a string whose length is smaller than the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'size:10'}).validate({a: 'hello'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'size', params: ['10']}]},
            });
        });

        it('Should validate a string whose length is equal to the provided parameter as valid', () => {
            assert.ok(new Validator({a: 'size:11'}).check({a: 'hello world'}));
        });

        it('Should validate a string whose length is larger than the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'size:8'}).validate({a: 'hello world'});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'size', params: ['8']}]},
            });
        });
    });

    describe('Array', () => {
        it('Should validate an array whose length is smaller than the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'size:10'}).validate({a: ['foo', 'bar']});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'size', params: ['10']}]},
            });
        });

        it('Should validate an array whose length is equal to the provided parameter as valid', () => {
            assert.ok(new Validator({a: 'size:5'}).check({a: ['apple', 'pear', 'orange', 'melon', 'grape']}));
        });

        it('Should validate an array whose length is larger than the provided parameter as invalid', () => {
            const evaluation = new Validator({a: 'size:4'}).validate({a: ['apple', 'pear', 'orange', 'melon', 'grape']});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'size', params: ['4']}]},
            });
        });
    });
});
