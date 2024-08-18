import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import Validator        from '../../../lib';
import CONSTANTS        from '../../constants';

describe('vBase64', () => {
    it('Should validate a base64 encoded string correctly', () => {
        const v = new Validator({a: 'base64'});

        for (const el of [
            'U29tZSB2YWxpZCBzdHJpbmc=',
            'U29tZSBvdGhlciBzdHJpbmc=',
            'U29tZQ==',
            'c3RyaW5nIHdpdGggYWRkaXRpb25hbCBjaGFyYWN0ZXJzIQ==',
            'YW5vdGhlciBvbmUgd2l0aCBwYWRkaW5n',
            'U29tZSB2YWxpZA==',
            'VGhpcyBpcyBhIHRlc3Q=',
            'VGhpcyBpcyBhbm90aGVyIHRlc3Qgd2l0aCBtb3JlIHRleHQ=',
            'SGVsbG8gd29ybGQ=',
            'U29tZSBkYXRhIHRvIGJlIGVuY29kZWQ=',
            'VGhpcyBpcyBhIGNvb2wgdmFsaWRhdG9yIHJpZ2h0Pw==',
            'c29tZSBvdGhlciBlbmNvZGVkIHN0cmluZw==',
            'bGV0J3MgdGVzdCB0aGlzIG91dA==',
            'cmFuZG9tIHZhbGlkIHN0cmluZw==',
            'YW5vdGhlciBzYW1wbGUgdGV4dA==',
            'dGVzdCBzdHJpbmcgd2l0aCBzb21lIGRhdGE=',
            'bW9yZSB0ZXN0aW5nIGRhdGEgc3RyaW5n',
            'c3ViamVjdCB0byB2YWxpZGF0ZQ==',
            'dmFsaWRhdG9yIHRlc3Qgc3RyaW5n',
            'b25lIG1vcmUgZXhhbXBsZSBzdHJpbmc=',
            'U29tZVN0cmluZw==',
            'Q29tcGxleEJhc2U2NCEh',
            'VmFsaWQhIUAj',
            'U3BlY2lhbFRleHQkJCQ=',
            'SGVyZVdpdGhFbWJlZGQ=',
            'TGV0c0NoZWNrVGhpcw==',
            'QXdlc29tZSUqKg==',
            'Q3VyaW91cyYmJg==',
            'Q2hlY2spdEhhdA==',
            'V2VpcmRTdHJpbmcjIw==',
        ]) {
            const evaluation = v.validate({a: el});
            assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
        }
    });

    it('Should not validate a non-string or an empty string after trimming as valid', () => {
        const v = new Validator({a: 'base64'});

        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            const evaluation = v.validate({a: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'base64', params: []}],
                },
            });
        }
    });

    it('Should not validate improper strings as valid', () => {
        const v = new Validator({a: 'base64'});

        for (const el of [
            'invalid base64 string',
            '1234567',                                          /* Length not a multiple of 4 */
            '!!!@@@$$$',                                        /* Invalid characters */
            'U29tZSBzdHJpbmc',                                  /* Invalid length */
            'U29tZSBzdHJpbmcg!',                                /* Invalid character at the end */
            'U29tZSBzdHJpbmc==!',                               /* Padding with invalid character */
            'U29tZSB2YWxpZCBzdHJpbmcg!!!',                      /* Contains invalid characters ! */
            'U29tZSBzdHJpbmc=U29t',                             /* Incorrect padding */
            'VGhpcyBpcyBhIHRlc3Q@@',                            /* Contains invalid characters @ */
            'VGhpcyBpcyBhbm90aGVyIHRlc3Q==',                    /* Too much padding */
            'U29tZSBzdHJpbmc#',                                 /* Contains invalid character # */
            'U29tZSBzdHJpbmc!!',                                /* Contains invalid characters ! */
            'U29tZSBzdHJpbmcg*',                                /* Contains invalid character * */
            'invalid!',
            '123456',
            '!@#$%^&*',
            'SGVsbG8gd29ybGQ',
            'This is not valid base64',
            'ABCDEF',
            '0Z0Z0Z',
            '###',
            '1234567890',
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        ]) {
            const evaluation = v.validate({a: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'base64', params: []}],
                },
            });
        }
    });
});
