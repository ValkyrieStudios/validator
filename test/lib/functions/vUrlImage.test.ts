'use strict';

import {describe, it}   from 'node:test';
import * as assert      from 'node:assert/strict';
import guid             from '@valkyriestudios/utils/hash/guid';
import CONSTANTS        from '../../constants';
import Validator        from '../../../lib';
import {EXTENSIONS}     from '../../../lib/functions/vUrlImage';

describe('vUrlImage', () => {
    it('Should validate a url string that is a valid url and an image url as valid', () => {
        const v = new Validator({a: 'url_img'});

        for (const ext of EXTENSIONS) {
            for (const el of [
                `http://foo.com/blah_blah/${guid()}.${ext}`,
                `http://foo.com/blah_blah_(wikipedia).${ext}`,
                `http://foo.com/blah_blah_(wikipedia)_(again)/${guid()}.${ext}`,
                `http://www.example.com/wpstyle/hello.${ext}?p=364`,
                `https://www.example.com/foo/1.${ext}?bar=baz&inga=42&quux`,
                `http://✪df.ws/123.${ext}`,
                `http://userid:password@example.com:8080/${guid()}.${ext}`,
                `http://userid:password@example.com:8080/index.${ext}`,
                `http://userid@example.com:8080/me.${ext}`,
                `http://➡.ws/䨹.${ext}`,
                `http://⌘.ws/me.${ext}`,
                `http://foo.com/blah_(wikipedia)/avatar.${ext}#cite-1`,
                `http://foo.com/blah_(wikipedia)_blah.${ext}#cite-1`,
                `http://foo.com/unicode_(✪)_in_parens.${ext}`,
                `http://foo.com/(something).${ext}?after=parens`,
                `http://☺.damowmow.com/file.${ext}`,
                `http://code.google.com/events.${ext}#&product=browser`,
                `ftp://foo.bar/baz.${ext}`,
                `http://foo.bar/index.${ext}?q=Test%20URL-encoded%20stuff`,
                `http://مثال.إختبار/hello.${ext}`,
                `http://例子.测试/${guid()}.${ext}`,
                `http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com/${guid()}.${ext}`,
                `http://me.com//123.${ext}`, // Double slashes are valid according to RFC 2396
                `http://223.255.255.254/why.${ext}`,
                `https://www.valkyriestudios.com/queryhere.${ext}?a=1&b=2`,
                `https://www.valkyriestudios.com/this.something.${ext}#4802394`,
                `https://www.valkyriestudios.com/myawesome_avatar.${ext}#inbox?a=2`,
                `https://valkyriestudios.com/coulditbe.${ext}#floo_bar?a=2&c=foo`,
                `https://www.valkyriestudios.co.uk:3000/eweqweeqwe/ewqeeqweqe.${ext}`,
                `https://www.valkyriestudios.co.uk/eweqweeqwe/ewqeeqweqe.${ext}`,
                `https://valkyriestudios.com/afile.${ext}?a=1&b=2#eweqweqwewqeqweweqweqweqweqwewopqieqwoeqweipqwoeiqweiqwpoeiqwieqwopeiqwpooeqwieiqwoeiqwoeiqweiqwopeiqwpeiqweiqweoiwqopepwoqiepqwoieoiwqeipqwoeiowqieoipoeiwqoiepowiqoieqw&ewquie`, // eslint-disable-line max-len
            ]) {
                const evaluation = v.validate({a: el});
                assert.deepEqual(evaluation, {is_valid: true, count: 0, errors: {}});
            }
        }
    });

    it('Should not validate a url string that is a valid url but not an image url as valid', () => {
        const v = new Validator({a: 'url_img'});

        for (const el of [
            'http://foo.com/blah_blah',
            'http://foo.com/blah_blah/',
            'http://foo.com/blah_blah_(wikipedia)',
            'http://foo.com/blah_blah_(wikipedia)_(again)',
            'http://www.example.com/wpstyle/?p=364',
            'http://www.example.com/wpstyle/jpg?p=364',
            'https://www.example.com/foo/png?bar=baz&inga=42&quux',
            'https://www.example.com/foo/?bar=baz&inga=42&quux',
            'http://✪df.ws/123',
            'http://userid:password@example.com:8080',
            'http://userid:password@example.com:8080/',
            'http://userid@example.com',
            'http://userid@example.com/',
            'http://userid@example.com:8080',
            'http://userid@example.com:8080/',
            'http://userid:password@example.com',
            'http://userid:password@example.com/',
            'http://➡.ws/䨹',
            'http://⌘.ws',
            'http://⌘.ws/',
            'http://j.mp.jpg',
            'https://valkyriestudios.com:3000/.jpg?a=1&b=2#eweqweqwewqeqweweqweqweqweqwewopqieqwoeqweipqwoeiqweiqwpoeiqwieqwopeiqwpooeqwieiqwoeiqwoeiqweiqwopeiqwpeiqweiqweoiwqopepwoqiepqwoieoiwqeipqwoeiowqieoipoeiwqoiepowiqoieqw&ewquie', // eslint-disable-line max-len
            'http://foo.com/blah_(wikipedia)#cite-1',
            'http://foo.com/blah_(wikipedia)_blah#cite-1',
            'http://foo.com/unicode_(✪)_in_parens',
            'http://foo.com/(something)?after=parens',
            'http://☺.damowmow.com/',
            'http://code.google.com/events/#&product=browser',
            'http://j.mp',
            'ftp://foo.bar/baz',
            'http://foo.bar/?q=Test%20URL-encoded%20stuff',
            'http://مثال.إختبار',
            'http://例子.测试',
            'http://-.~_!$&\'()*+,;=:%40:80%2f::::::@example.com',
            'http://1337.net',
            'http://a.b-c.de',
            'http://a.b--c.de',
            'http://me.com//123', // Double slashes are valid according to RFC 2396
            'http://223.255.255.254',
            'https://www.valkyriestudios.be',
            'https://www.valkyriestudios.be/?q=test',
            'https://www.valkyriestudios.be?q=test',
            'https://www.valkyriestudios.be?q=test&hi=true',
            'https://www.valkyriestudios.com/?a=1&b=2',
            'https://www.valkyriestudios.com/#4802394',
            'https://www.valkyriestudios.com/#inbox?a=2',
            'https://valkyriestudios.com/#floo_bar?a=2&c=foo',
            'https://www.valkyriestudios.co.uk:3000/eweqweeqwe/ewqeeqweqe',
            'https://www.valkyriestudios.co.uk/eweqweeqwe/ewqeeqweqe',
            'https://valkyriestudios.com/?a=1&b=2#eweqweqwewqeqweweqweqweqweqwewopqieqwoeqweipqwoeiqweiqwpoeiqwieqwopeiqwpooeqwieiqwoeiqwoeiqweiqwopeiqwpeiqweiqweoiwqopepwoqiepqwoieoiwqeipqwoeiowqieoipoeiwqoiepowiqoieqw&ewquie', // eslint-disable-line max-len
            'https://valkyriestudios.com:3000/?a=1&b=2#eweqweqwewqeqweweqweqweqweqwewopqieqwoeqweipqwoeiqweiqwpoeiqwieqwopeiqwpooeqwieiqwoeiqwoeiqweiqwopeiqwpeiqweiqweoiwqopepwoqiepqwoieoiwqeipqwoeiowqieoipoeiwqoiepowiqoieqw&ewquie', // eslint-disable-line max-len
            'http://x.comddfsdfsdf.', // Trailing dots in tlds are valid
        ]) {
            const evaluation = v.validate({a: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'url_img', params: []}],
                },
            });
        }
    });

    it('Should not validate other types as valid urls', () => {
        const v = new Validator({a: 'url_img'});

        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            const evaluation = v.validate({a: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'url_img', params: []}],
                },
            });
        }
    });

    it('Should not validate strings that are image urls after trimming as valid', () => {
        const v = new Validator({a: 'url_img'});

        for (const el of [
            'https://www.myfancylink.com/123.jpg   ',
            '    https://www.myfancylink.com/123.jpg   ',
            '    https://www.myfancylink.com/123.jpg',
        ]) {
            const evaluation = v.validate({a: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'url_img', params: []}],
                },
            });
        }
    });

    it('Should not validate improper strings as valid urls', () => {
        const v = new Validator({a: 'url_img'});

        for (const el of [
            'http://',
            'http://.',
            'http://..',
            'http://../',
            'http://?',
            'http://??',
            'http://??/',
            'http://#',
            'http://##',
            'http://##/',
            'http://foo.bar?q=Spaces should be encoded',
            '//',
            '//a',
            '///a',
            '///',
            'http:///a',
            'foo.com',
            'rdar://1234',
            'h://test',
            'http:// shouldfail.com',
            ':// should fail',
            'http://foo.bar/foo(bar)baz quux',
            'ftps://foo.bar/',
            'http://-error-.invalid/',
            'http://-a.b.co',
            'http://a.b-.co',
            'http://0.0.0.0',
            'http://10.1.1.0',
            'http://10.1.1.255',
            'http://224.1.1.1',
            'http://1.1.1.1.1',
            'http://123.123.123',
            'http://3628126748',
            'http://.www.foo.bar/',
            'http://.www.foo.bar./',
            'http://10.1.1.1',
            'http://10.1.1.254',
        ]) {
            const evaluation = v.validate({a: el});
            assert.deepEqual(evaluation, {
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: 'url_img', params: []}],
                },
            });
        }
    });
});
