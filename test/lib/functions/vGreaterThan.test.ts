'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import Validator        from '../../../lib';

describe('vGreaterThan', () => {
    it('Should be invalid when no params are passed', () => {
        const evaluation = new Validator({a1: 'greater_than:<meta.params>'}).validate({a1: 10});

        assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
            assert.deepEqual(evaluation, {
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
        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 1,
            errors: {
                a1: [{msg: 'greater_than', params: ['10']}],
            },
        });
    });

    it('Should allow a string as an acceptable value', () => {
        assert.ok(new Validator({a: 'greater_than:4'}).check({a: 'hello'}));
    });

    it('Should allow an array as an acceptable value', () => {
        assert.ok(new Validator({a: 'greater_than:5'}).check({a: ['foo', 'bar', 'bar', 'foo', 'hello', 'world']}));
    });

    it('Should allow a numerical value as an acceptable value', () => {
        assert.ok(new Validator({a: 'greater_than:10'}).check({a: 15}));
    });

    it('Should disallow NaN values', () => {
        assert.deepEqual(new Validator({a: 'greater_than:10'}).validate({a: Number.NaN}), {
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

        assert.deepEqual(evaluation, {
            is_valid: false,
            count: 6,
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
            assert.ok(new Validator({a: 'greater_than:10'}).check({a: 'The fox leaped over the fence'}));
        });

        it('Should validate a string whose length is equal to the provided parameter as invalid', () => {
            assert.deepEqual(
                new Validator({a: 'greater_than:11'}).validate({a: 'hello world'}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: 'greater_than', params: ['11']}],
                    },
                }
            );
        });

        it('Should validate a string whose length is smaller than the provided parameter as invalid', () => {
            assert.deepEqual(
                new Validator({a: 'greater_than:8'}).validate({a: 'Frantic'}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: 'greater_than', params: ['8']}],
                    },
                }
            );
        });
    });

    describe('Array', () => {
        it('Should validate an array whose length is greater than the provided parameter as valid', () => {
            assert.ok(new Validator({a: 'greater_than:3'}).check({a: [1,2,3,4]}));
        });

        it('Should validate an array whose length is equal to the provided parameter as invalid', () => {
            assert.deepEqual(
                new Validator({a: 'greater_than:3'}).validate({a: ['hello', 'this', 'is']}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: 'greater_than', params: ['3']}],
                    },
                }
            );
        });

        it('Should validate an array whose length is smaller than the provided parameter as invalid', () => {
            assert.deepEqual(
                new Validator({a: 'greater_than:3'}).validate({a: ['hello', 'this']}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: 'greater_than', params: ['3']}],
                    },
                }
            );
        });
    });

    describe('Number', () => {
        it('Should validate a number greater than the provided parameter as valid', () => {
            assert.ok(new Validator({a: 'greater_than:1000'}).check({a: 10425}));
        });

        it('Should validate a number equal to the provided parameter as invalid', () => {
            assert.deepEqual(
                new Validator({a: 'greater_than:42'}).validate({a: 42}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: 'greater_than', params: ['42']}],
                    },
                }
            );
        });

        it('Should validate a number smaller than the provided parameter as invalid', () => {
            assert.deepEqual(
                new Validator({a: 'greater_than:502'}).validate({a: 59}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: 'greater_than', params: ['502']}],
                    },
                }
            );
        });

        it('Should validate negative number ranges that are above the provided parameter as valid', () => {
            assert.ok(new Validator({a: 'greater_than:-500'}).check({a: -245}));
        });

        it('Should validate negative number ranges that are below the provided parameter as invalid', () => {
            assert.deepEqual(
                new Validator({a: 'greater_than:-20'}).validate({a: -45}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: 'greater_than', params: ['-20']}],
                    },
                }
            );
        });

        it('Should validate negative number ranges that are equal to the provided parameter as invalid', () => {
            assert.deepEqual(
                new Validator({a: 'greater_than:-999'}).validate({a: -999}),
                {
                    is_valid: false,
                    count: 1,
                    errors: {
                        a: [{msg: 'greater_than', params: ['-999']}],
                    },
                }
            );
        });
    });
});
