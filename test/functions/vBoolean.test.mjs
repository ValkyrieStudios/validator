'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../constants.mjs';
import Validator        from '../../src/index.mjs';

describe('vBoolean', () => {
    it('Should validate a boolean correctly', () => {
        for (const el of CONSTANTS.IS_BOOLEAN) {
            const validator = new Validator({a1: 'boolean'});
            const evaluation = validator.validate({a1: el});
            assert.ok(evaluation.is_valid);
            assert.deepEqual(evaluation.errors.a1, []);
        }
    });

    it('Should not validate other types as valid booleans', () => {
        for (const el of CONSTANTS.NOT_BOOLEAN) {
            const validator = new Validator({a1: 'boolean'});
            const evaluation = validator.validate({a1: el});
            assert.equal(evaluation.is_valid, false);
            assert.deepEqual(evaluation.errors.a1, [{msg: 'boolean', parans: []}]);
        }
    });

    it('Should return a correct error message when invalid and passing a mixed object', () => {
        const evaluation = new Validator({
            a1: 'boolean',
            b1: 'boolean',
            c1: 'boolean',
            d1: 'boolean',
            e1: 'boolean',
            f1: 'boolean',
            g1: 'boolean',
            h1: 'boolean',
            i1: 'boolean',
            j1: 'boolean',
            k1: 'boolean',
            l1: 'boolean',
            n1: 'boolean',
        }).validate({
            a1: 100,
            b1: 200,
            c1: 'hello',
            d1: false,
            e1: true,
            f1: new RegExp(),
            g1: new Date(),
            h1: {},
            i1: [],
            j1: '',
            k1: new String('Foo'),
            l1: new Array(),
            n1: Object.create(null),
        });
        assert.equal(evaluation.is_valid, false);
        assert.deepEqual(evaluation.errors, {
            a1: [{msg:'boolean', params: []}],
            b1: [{msg:'boolean', params: []}],
            c1: [{msg:'boolean', params: []}],
            d1: [],
            e1: [],
            f1: [{msg:'boolean', params: []}],
            g1: [{msg:'boolean', params: []}],
            h1: [{msg:'boolean', params: []}],
            i1: [{msg:'boolean', params: []}],
            j1: [{msg:'boolean', params: []}],
            k1: [{msg:'boolean', params: []}],
            l1: [{msg:'boolean', params: []}],
            n1: [{msg:'boolean', params: []}],
        });
    });
});
