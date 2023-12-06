'use strict';

/* eslint-disable max-statements,max-lines */

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import Validator        from '../../../src/index.mjs';

const IPV6_VALID_CHARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

function IPV6V () {
    return IPV6_VALID_CHARS[Math.floor(Math.random() * 16)];
}

function IPV6C () {
    return `${IPV6V()}${IPV6V()}${IPV6V()}${IPV6V()}`;
}

function IPV4Good () {
    return Math.floor(Math.random() * 256);
}

function IPV4Bad () {
    return Math.floor(Math.random() * 256) + 256;
}

describe('vSysIPv4orv6', () => {
    it('Should be invalid if not passed a string or passed a string empty after trimming', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            assert.equal(new Validator({a: 'sys_ipv4_or_v6'}).validate({a: el}).is_valid, false);
        }
    });

    it('Should be invalid when passed random strings', () => {
        for (const el of ['foo', 'bar', 'hello world', 'hello.world', 'ewueioqw wqe uqwioeuowqeqw']) {
            assert.equal(new Validator({a: 'sys_ipv4_or_v6'}).validate({a: el}).is_valid, false);
        }
    });

    describe('ipv4 checks', () => {
        it('Should be invalid with address containing only non-numeric characters and no separator', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            const tpl = c => 'xxxxxxxxxxxx'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 58; i < 1000; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }
        });

        it('Should be invalid with address containing only non-numeric characters and with separator', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            const tpl = c => 'x.x.x.x'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 58; i < 1000; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }
        });

        it('Should be invalid with address containing a single octet with non-numeric characters', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            const tplOct1 = c => 'x.10.5.42'.replace(/x/g, c);
            const tplOct2 = c => '192.x.5.42'.replace(/x/g, c);
            const tplOct3 = c => '192.10.x.42'.replace(/x/g, c);
            const tplOct4 = c => '192.10.5.x'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({a: tplOct1(String.fromCharCode(i))}).is_valid, false);
                assert.equal(v.validate({a: tplOct2(String.fromCharCode(i))}).is_valid, false);
                assert.equal(v.validate({a: tplOct3(String.fromCharCode(i))}).is_valid, false);
                assert.equal(v.validate({a: tplOct4(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 58; i < 1000; i++) {
                assert.equal(v.validate({a: tplOct1(String.fromCharCode(i))}).is_valid, false);
                assert.equal(v.validate({a: tplOct2(String.fromCharCode(i))}).is_valid, false);
                assert.equal(v.validate({a: tplOct3(String.fromCharCode(i))}).is_valid, false);
                assert.equal(v.validate({a: tplOct4(String.fromCharCode(i))}).is_valid, false);
            }
        });

        it('Should be invalid with addresses with only 1 octet', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({a: `${IPV4Good()}`}).is_valid, false);
            }
        });

        it('Should be invalid with addresses with only 2 octets', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({a: `${IPV4Good()}.${IPV4Good()}`}).is_valid, false);
            }
        });

        it('Should be invalid with addresses with only 3 octets', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({a: `${IPV4Good()}.${IPV4Good()}.${IPV4Good()}`}).is_valid, false);
            }
        });

        it('Should be invalid with addresses where a single octet goes beyond the upper bound of a byte (255)', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: [
                        IPV4Bad(),
                        IPV4Good(),
                        IPV4Good(),
                        IPV4Good(),
                    ].join('.'),
                }).is_valid, false);
            }

            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: [
                        IPV4Good(),
                        IPV4Bad(),
                        IPV4Good(),
                        IPV4Good(),
                    ].join('.'),
                }).is_valid, false);
            }

            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: [
                        IPV4Good(),
                        IPV4Good(),
                        IPV4Bad(),
                        IPV4Good(),
                    ].join('.'),
                }).is_valid, false);
            }

            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: [
                        IPV4Good(),
                        IPV4Good(),
                        IPV4Good(),
                        IPV4Bad(),
                    ].join('.'),
                }).is_valid, false);
            }
        });

        it('Should be invalid with addresses where all octets go beyond the upper bound of a byte (255)', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: [IPV4Bad(), IPV4Bad(), IPV4Bad(), IPV4Bad()].join('.'),
                }).is_valid, false);
            }
        });

        it('Should be invalid with addresses where all octets are correct but where the string contains spaces', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: `  ${IPV4Good()}.${IPV4Good()}.${IPV4Good()}.${IPV4Good()}`,
                }).is_valid, false);
                assert.equal(v.validate({
                    a: `${IPV4Good()}.${IPV4Good()}.${IPV4Good()}.${IPV4Good()}   `,
                }).is_valid, false);
                assert.equal(v.validate({
                    a: `  ${IPV4Good()}.${IPV4Good()}.${IPV4Good()}.${IPV4Good()}    `,
                }).is_valid, false);
            }
        });

        it('Should be invalid with addresses where all octets are correct but where the string contains a non-dot separator', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});

            //  Character code of a dot is 46

            for (let i = 0; i < 46; i++) {
                const sep = String.fromCharCode(i);
                assert.equal(v.validate({
                    a: `${IPV4Good()}${sep}${IPV4Good()}${sep}${IPV4Good()}${sep}${IPV4Good()}`,
                }).is_valid, false);
            }

            for (let i = 47; i < 1000; i++) {
                const sep = String.fromCharCode(i);
                assert.equal(v.validate({
                    a: `${IPV4Good()}${sep}${IPV4Good()}${sep}${IPV4Good()}${sep}${IPV4Good()}`,
                }).is_valid, false);
            }
        });

        it('Should be valid when passed a list of valid addresses', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (const a of [
                '80.172.79.93',
                '69.7.134.15',
                '140.72.122.109',
                '91.18.170.230',
                '105.255.97.182',
                '17.216.196.173',
                '126.174.150.230',
                '45.110.24.222',
                '159.93.33.224',
                '189.224.154.109',
                '123.151.203.14',
                '241.77.188.186',
                '103.29.89.136',
                '167.1.25.219',
                '167.32.168.199',
                '218.15.121.111',
                '146.67.44.9',
                '74.51.68.207',
                '179.141.139.97',
                '213.40.210.126',
                '99.124.172.11',
                '241.239.162.207',
                '112.47.107.111',
                '166.250.230.122',
                '104.181.239.12',
                '219.127.199.20',
                '219.59.135.55',
                '152.205.110.114',
                '197.211.120.47',
                '75.158.141.50',
                '65.127.29.245',
                '178.18.252.141',
                '180.123.11.250',
                '105.198.142.163',
                '147.194.36.176',
                '175.25.45.155',
                '95.247.245.9',
                '111.158.176.142',
                '205.223.43.103',
                '92.182.249.218',
                '182.196.235.107',
                '9.176.214.18',
                '178.37.211.28',
                '223.204.93.221',
                '83.63.43.135',
                '5.159.153.224',
                '156.180.201.67',
                '246.254.223.10',
                '20.15.55.114',
                '55.142.230.122',
                '101.143.128.14',
                '203.117.52.176',
                '202.188.255.22',
                '37.184.52.167',
                '88.120.176.122',
                '229.195.90.86',
                '224.182.197.20',
                '252.91.164.164',
                '131.83.65.46',
                '246.213.31.87',
                '247.161.141.44',
                '253.167.222.4',
                '162.209.30.203',
                '168.20.173.4',
                '156.138.61.101',
                '124.7.206.197',
                '151.45.171.234',
                '11.137.227.72',
                '124.25.108.14',
                '172.125.0.209',
                '134.96.140.1',
                '128.11.128.215',
                '14.186.136.207',
                '247.191.102.81',
                '100.91.194.249',
                '198.159.103.69',
                '85.177.70.254',
                '202.21.174.233',
                '219.44.38.208',
                '47.12.195.231',
                '20.40.137.162',
                '199.213.233.220',
                '240.54.143.168',
                '29.139.217.230',
                '72.112.183.77',
                '42.45.79.212',
                '145.110.79.182',
                '225.134.115.211',
                '165.213.160.243',
                '213.176.96.87',
                '2.20.199.118',
                '170.244.20.115',
                '89.234.75.188',
                '35.48.245.207',
                '244.175.194.89',
                '73.152.92.66',
                '155.162.167.245',
                '20.211.112.88',
                '227.64.5.10',
                '142.101.121.75',
            ]) assert.ok(v.validate({a}).is_valid);
        });
    });

    describe('ipv6 checks', () => {
        it('Should be invalid with address containing only invalid characters and no separator', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            const tpl = c => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({
                    a: tpl(String.fromCharCode(i)),
                }).is_valid, false);
            }

            for (let i = 58; i < 96; i++) {
                assert.equal(v.validate({
                    a: tpl(String.fromCharCode(i)),
                }).is_valid, false);
            }

            for (let i = 123; i < 1000; i++) {
                assert.equal(v.validate({
                    a: tpl(String.fromCharCode(i)),
                }).is_valid, false);
            }
        });

        it('Should be invalid with address containing only invalid characters and with separator', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            const tpl = c => 'xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({
                    a: tpl(String.fromCharCode(i)),
                }).is_valid, false);
            }

            for (let i = 58; i < 96; i++) {
                assert.equal(v.validate({
                    a: tpl(String.fromCharCode(i)),
                }).is_valid, false);
            }

            for (let i = 123; i < 1000; i++) {
                assert.equal(v.validate({
                    a: tpl(String.fromCharCode(i)),
                }).is_valid, false);
            }
        });

        it('Should be invalid with address containing a single chunk with invalid characters and with separator', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            const tpl1 = c => 'xxxx:d2ec:568b:39ad:d5bc:8548:d23b:6f92'.replace(/x/g, c);
            const tpl2 = c => '9325:xxxx:568b:39ad:d5bc:8548:d23b:6f92'.replace(/x/g, c);
            const tpl3 = c => '9325:d2ec:xxxx:39ad:d5bc:8548:d23b:6f92'.replace(/x/g, c);
            const tpl4 = c => '9325:d2ec:568b:xxxx:d5bc:8548:d23b:6f92'.replace(/x/g, c);
            const tpl5 = c => '9325:d2ec:568b:39ad:xxxx:8548:d23b:6f92'.replace(/x/g, c);
            const tpl6 = c => '9325:d2ec:568b:39ad:d5bc:xxxx:d23b:6f92'.replace(/x/g, c);
            const tpl7 = c => '9325:d2ec:568b:39ad:d5bc:8548:xxxx:6f92'.replace(/x/g, c);
            const tpl8 = c => '9325:d2ec:568b:39ad:d5bc:8548:d23b:xxxx'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({
                    a: tpl1(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl2(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl3(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl4(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl5(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl6(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl7(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl8(String.fromCharCode(i)),
                }).is_valid, false);
            }

            for (let i = 58; i < 96; i++) {
                assert.equal(v.validate({
                    a: tpl1(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl2(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl3(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl4(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl5(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl6(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl7(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl8(String.fromCharCode(i)),
                }).is_valid, false);
            }

            for (let i = 123; i < 1000; i++) {
                assert.equal(v.validate({
                    a: tpl1(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl2(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl3(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl4(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl5(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl6(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl7(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl8(String.fromCharCode(i)),
                }).is_valid, false);
            }
        });

        it('Should be invalid with address containing a single invalid character and with separator', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            const tpl1 = c => 'xc55:897f:e0f5:c12c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl2 = c => '6x55:897f:e0f5:c12c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl3 = c => '6cx5:897f:e0f5:c12c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl4 = c => '6c5x:897f:e0f5:c12c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl5 = c => '6c55:x97f:e0f5:c12c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl6 = c => '6c55:8x7f:e0f5:c12c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl7 = c => '6c55:89xf:e0f5:c12c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl8 = c => '6c55:897x:e0f5:c12c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl9 = c => '6c55:897f:x0f5:c12c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl10 = c => '6c55:897f:exf5:c12c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl11 = c => '6c55:897f:e0x5:c12c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl12 = c => '6c55:897f:e0fx:c12c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl13 = c => '6c55:897f:e0f5:x12c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl14 = c => '6c55:897f:e0f5:cx2c:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl15 = c => '6c55:897f:e0f5:c1xc:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl16 = c => '6c55:897f:e0f5:c12x:109a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl17 = c => '6c55:897f:e0f5:c12c:x09a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl18 = c => '6c55:897f:e0f5:c12c:1x9a:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl19 = c => '6c55:897f:e0f5:c12c:10xa:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl20 = c => '6c55:897f:e0f5:c12c:109x:4d8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl21 = c => '6c55:897f:e0f5:c12c:109a:xd8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl22 = c => '6c55:897f:e0f5:c12c:109a:4x8b:f2a5:bbd1'.replace(/x/g, c);
            const tpl23 = c => '6c55:897f:e0f5:c12c:109a:4dxb:f2a5:bbd1'.replace(/x/g, c);
            const tpl24 = c => '6c55:897f:e0f5:c12c:109a:4d8x:f2a5:bbd1'.replace(/x/g, c);
            const tpl25 = c => '6c55:897f:e0f5:c12c:109a:4d8b:x2a5:bbd1'.replace(/x/g, c);
            const tpl26 = c => '6c55:897f:e0f5:c12c:109a:4d8b:fxa5:bbd1'.replace(/x/g, c);
            const tpl27 = c => '6c55:897f:e0f5:c12c:109a:4d8b:f2x5:bbd1'.replace(/x/g, c);
            const tpl28 = c => '6c55:897f:e0f5:c12c:109a:4d8b:f2ax:bbd1'.replace(/x/g, c);
            const tpl29 = c => '6c55:897f:e0f5:c12c:109a:4d8b:f2a5:xbd1'.replace(/x/g, c);
            const tpl30 = c => '6c55:897f:e0f5:c12c:109a:4d8b:f2a5:bxd1'.replace(/x/g, c);
            const tpl31 = c => '6c55:897f:e0f5:c12c:109a:4d8b:f2a5:bbx1'.replace(/x/g, c);
            const tpl32 = c => '6c55:897f:e0f5:c12c:109a:4d8b:f2a5:bbdx'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({
                    a: tpl1(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl2(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl3(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl4(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl5(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl6(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl7(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl8(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl9(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl10(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl11(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl12(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl13(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl14(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl15(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl16(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl17(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl18(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl19(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl20(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl21(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl22(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl23(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl24(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl25(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl26(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl27(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl28(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl29(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl30(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl31(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl32(String.fromCharCode(i)),
                }).is_valid, false);
            }

            for (let i = 58; i < 96; i++) {
                assert.equal(v.validate({
                    a: tpl1(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl2(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl3(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl4(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl5(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl6(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl7(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl8(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl9(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl10(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl11(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl12(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl13(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl14(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl15(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl16(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl17(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl18(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl19(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl20(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl21(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl22(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl23(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl24(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl25(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl26(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl27(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl28(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl29(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl30(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl31(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl32(String.fromCharCode(i)),
                }).is_valid, false);
            }

            for (let i = 123; i < 1000; i++) {
                assert.equal(v.validate({
                    a: tpl1(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl2(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl3(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl4(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl5(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl6(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl7(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl8(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl9(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl10(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl11(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl12(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl13(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl14(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl15(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl16(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl17(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl18(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl19(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl20(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl21(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl22(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl23(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl24(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl25(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl26(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl27(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl28(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl29(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl30(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl31(String.fromCharCode(i)),
                }).is_valid, false);
                assert.equal(v.validate({
                    a: tpl32(String.fromCharCode(i)),
                }).is_valid, false);
            }
        });

        it('Should be invalid with addresses with only 1 chunk', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: `${IPV6C()}`,
                }).is_valid, false);
            }
        });

        it('Should be invalid with addresses with only 2 chunks', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: `${IPV6C()}:${IPV6C()}`,
                }).is_valid, false);
            }
        });

        it('Should be invalid with addresses with only 3 chunks', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: `${IPV6C()}:${IPV6C()}:${IPV6C()}`,
                }).is_valid, false);
            }
        });

        it('Should be invalid with addresses with only 4 chunks', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: `${IPV6C()}:${IPV6C()}:${IPV6C()}:${IPV6C()}`,
                }).is_valid, false);
            }
        });

        it('Should be invalid with addresses with only 5 chunks', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: `${IPV6C()}:${IPV6C()}:${IPV6C()}:${IPV6C()}:${IPV6C()}`,
                }).is_valid, false);
            }
        });

        it('Should be invalid with addresses with only 6 chunks', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: `${IPV6C()}:${IPV6C()}:${IPV6C()}:${IPV6C()}:${IPV6C()}:${IPV6C()}`,
                }).is_valid, false);
            }
        });

        it('Should be invalid with addresses with only 7 chunks', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: `${IPV6C()}:${IPV6C()}:${IPV6C()}:${IPV6C()}:${IPV6C()}:${IPV6C()}:${IPV6C()}`,
                }).is_valid, false);
            }
        });

        it('Should be invalid with addresses where all chunks are correct but where the string contains spaces', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (let i = 0; i < 500; i++) {
                assert.equal(v.validate({
                    a: `  ${IPV6C()}.${IPV6C()}.${IPV6C()}.${IPV6C()}${IPV6C()}.${IPV6C()}.${IPV6C()}.${IPV6C()}`,
                }).is_valid, false);
                assert.equal(v.validate({
                    a: `${IPV6C()}.${IPV6C()}.${IPV6C()}.${IPV6C()}${IPV6C()}.${IPV6C()}.${IPV6C()}.${IPV6C()}   `,
                }).is_valid, false);
                assert.equal(v.validate({
                    a: `  ${IPV6C()}.${IPV6C()}.${IPV6C()}.${IPV6C()}${IPV6C()}.${IPV6C()}.${IPV6C()}.${IPV6C()}    `,
                }).is_valid, false);
            }
        });

        it('Should be invalid with addresses where all chunks are correct but where the string contains a non-dot separator', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});

            //  Character code of a colon is 58

            for (let i = 0; i < 58; i++) {
                const sep = String.fromCharCode(i);
                assert.equal(v.validate({
                    a: [
                        IPV6C(),
                        IPV6C(),
                        IPV6C(),
                        IPV6C(),
                        IPV6C(),
                        IPV6C(),
                        IPV6C(),
                        IPV6C(),
                    ].join(sep),
                }).is_valid, false);
            }

            for (let i = 59; i < 1000; i++) {
                const sep = String.fromCharCode(i);
                assert.equal(v.validate({
                    a: [
                        IPV6C(),
                        IPV6C(),
                        IPV6C(),
                        IPV6C(),
                        IPV6C(),
                        IPV6C(),
                        IPV6C(),
                        IPV6C(),
                    ].join(sep),
                }).is_valid, false);
            }
        });

        it('Should be valid when passed a list of valid addresses', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (const a of [
                '0e89:d118:a944:d817:4548:95ed:3081:c98f',
                'ec9c:eb71:7c56:8e8e:cd82:f1a0:b597:5da0',
                '6c55:897f:e0f5:c12c:109a:4d8b:f2a5:bbd1',
                'c69f:1123:b860:1da9:fe73:e99e:f80b:9d17',
                'dc54:3624:ad2c:a0c1:c750:e191:fd36:1353',
                'd805:4288:108d:4e3d:d2d4:aca8:b476:14c9',
                '3576:45c4:6481:5f05:6487:a4b9:a1a7:a42c',
                '8bc3:3c26:26fe:d310:71a0:bc1a:3fb8:6b51',
                'af21:8f98:e544:47ef:b3e7:ae45:28ad:7499',
                '2123:ec9b:ef92:6982:1852:21b2:afac:0ee8',
                '9336:f6d0:f751:0143:da91:6ad3:ddee:3e9e',
                '30d3:6a6d:99d4:6bed:c6d9:2007:18b3:a965',
                '9325:d2ec:568b:39ad:d5bc:8548:d23b:6f92',
                '6ec4:a43d:e4d0:8c99:6237:d9df:d42c:8c12',
                '1084:0faf:bb4c:2bcf:da10:9a44:1cea:f8c8',
                '15f4:9801:93df:106c:9307:8cd7:b689:b9d9',
                '7aca:ea26:3425:82e4:17a3:ea0b:1ff0:4e33',
                'c627:c894:0966:76b1:22a9:3425:67fa:40a6',
                '63f1:776c:e365:fcc0:5cfb:ea67:b6a4:1c54',
                '44dd:8650:aa10:e49e:ef47:b913:d3a7:4487',
                '9c18:f8df:1e38:2471:3c43:9746:f1fa:2328',
                '928f:3d22:8fc9:d541:372a:e9da:3603:9ac2',
                'cbc5:9e87:e87f:f20d:1756:8dff:7f01:6df9',
                '99c6:b913:36a3:08e6:1699:9e8c:931f:6af0',
                '64a2:c59e:e79a:f95d:d388:4965:f7a2:cade',
                '8d7e:50a0:8076:30ee:b4c4:921f:3763:a2b7',
                'd5b7:6958:1ae9:c0ce:419f:f757:f5f7:6631',
                'fba2:ed8e:3292:13ca:dbe6:0d4d:904e:cf8e',
                '187e:0148:9f90:0707:9e81:24c4:4562:c6e3',
                'd8ec:7c40:a616:0cee:5400:ad97:de7b:2afe',
                '61d1:3be1:d081:8dcf:002b:9324:c6dc:7ade',
                'cfdf:ab69:d937:6d80:c5ed:382e:8ca5:0435',
                '090c:1989:3b03:d9e8:9f9c:8bc6:e662:d319',
                'f9bc:9711:1f6b:9306:3f26:fffa:f842:aa5c',
                '2647:70b3:7727:60a0:195b:ff31:3110:3d1b',
                'e6f3:3402:3aa9:f4a1:01a9:6af1:5bb5:a720',
                '4175:18ce:818c:7082:d2da:480a:067a:fee3',
                'a024:5061:0e0f:bde0:ebb7:d1ce:acb5:ee22',
                'ac0f:8dc6:acc3:ae49:1d01:591d:f3a1:3364',
                'c90f:5206:0991:f9fd:c148:4fa4:f55a:4f95',
                '3701:c3a6:4fb6:786f:74d3:d426:aa8a:9d69',
                'd394:3193:71ca:6297:06d0:fd6f:cd71:2e61',
                '3cff:53fa:2937:3456:3167:9ad4:c999:de54',
                '3861:66b9:01dc:d67f:c148:946b:cda1:ef42',
                'c8eb:46b1:ee2f:c587:ac34:d909:693a:7a42',
                'ff32:c1f5:d167:5cc8:910c:a0a1:1b82:9a2d',
                '3013:a21d:99a6:067e:bc90:ae4e:4819:78bb',
                '440c:8be0:3add:1d3e:7e3b:1f47:950b:f5a1',
                'acb5:33e0:c826:6329:e6c7:4ee0:50b3:e418',
                '7f9e:aff5:ab67:55de:b1be:e2b5:e7f7:4c7b',
                'bbb9:8aca:d988:2a33:a798:042f:4c00:863c',
                '2b03:4f68:012d:31a6:29e7:f985:8f04:c5ab',
                'b09c:d7f5:85ce:f170:416a:bfa6:5082:4730',
                '1454:f289:6786:b9f9:cbb2:b75c:1e6b:2186',
                'ddd4:fb62:dc71:db5f:2cb3:4d53:d1d6:ebd2',
                '3294:c275:2a31:d4ca:325e:f40d:8b58:bc58',
                '3b42:c12a:f793:b942:83c0:536c:a8bd:1df1',
                '0b38:012b:76ee:cfe9:5180:cb8f:41da:9c5c',
                '475e:ed8c:a88d:718c:d573:fc50:112a:2c12',
                'eba3:baec:7e6e:a213:82cf:cf2d:6b4e:455b',
                '25bc:b758:8af8:f477:55a5:9c55:52de:f9f4',
                'f5b1:745a:7734:f863:1506:9dbf:5e47:fc06',
                '3723:878f:4c62:e65d:8b44:cac0:8823:fec5',
                '04e6:b27a:570b:f035:f3d0:7929:afa9:0ce3',
                'f3d8:9ea1:93d6:f106:e02b:2701:eaf5:b759',
                '94b3:20c0:881b:8b91:00ce:3866:87c7:69a2',
                '2139:72a0:44a4:bfc9:a033:25f6:9c25:3023',
                '0526:56c6:3b5e:d45d:55e8:842c:0d37:231f',
                'f452:a96f:6638:f0dd:6fb7:eaae:2a57:24cd',
                'd4f1:6bb9:b882:d9a8:bcab:0236:0214:db1b',
                '5b40:d10d:eb3a:33fd:17a3:8f87:acd1:c620',
                '5683:bc98:94d2:0319:d559:1286:5227:668a',
                '4824:82b9:4835:e4d4:4e24:9beb:fb41:3c1b',
                'e352:e3d4:5827:6942:5c04:70d0:1d12:de3e',
                '426a:9cdb:9db7:92a2:a385:ac04:da6b:d8a8',
                '2ac4:30f2:cb26:84b9:6424:cc38:3485:5fd6',
                '7d71:5fe0:2c34:ab84:e322:327b:fac5:7728',
                'cd89:efff:18c4:a8ff:f98a:8cbd:1f2e:da71',
                '8e0a:2fcc:1055:5f45:49d5:2289:abd2:d80f',
                'a18a:eae8:4467:b49f:894a:083d:a1f9:4649',
                'c73d:2abe:0091:57fb:a032:0643:9a62:638e',
                'dfec:53a2:4585:b090:8f42:2514:f082:066f',
                '5649:c434:350c:dac6:139f:b640:3d95:614c',
                '6081:08d1:6822:740e:2677:0638:9e0b:7739',
                'dafd:cc67:b131:3d4d:9198:7252:410d:5118',
                '5e48:67a9:bb99:6082:684c:b5a0:4a30:6c2d',
                '5eeb:c960:0bdb:ec59:6b5f:ee20:1453:4a98',
                '68a0:bdb2:91c7:5bf7:e47f:709d:947b:f92a',
                '7a32:259b:3f8d:939b:f04b:1d2e:fd74:993a',
                'c266:b747:24ed:ec04:2ff3:97ef:75b0:df32',
                'b45b:b5f4:016b:01bc:a258:b375:f270:2b2c',
                '87a8:a088:f799:15b6:314e:6915:c296:6cab',
                '7b63:2f6a:771f:e8ed:098e:113a:0da0:5104',
                '5f89:1dbf:b208:1e4c:6bc8:c527:256d:88e6',
                '1932:a6ad:c2d5:a3a6:88a3:89a2:626f:6617',
                '1047:90d8:0cc0:5f77:09f6:a4b8:905e:84bd',
                '8d6e:1f6c:44cf:66d4:5b00:ec32:31aa:e24f',
                'eb80:a8f4:de2d:4400:8847:ae62:6c1e:bd1a',
                '4af0:15f1:39bb:115f:12da:5103:263a:9fcc',
                'f523:60af:53b4:396b:f9cb:6f85:d40b:dc52',
                '0e89:d118:a944:d817:4548:95ed:3081:c98f',
                'ec9c:eb71:7c56:8e8e:cd82:f1a0:b597:5da0',
                '6c55:897f:e0f5:c12c:109a:4d8b:f2a5:bbd1',
                'c69f:1123:b860:1da9:fe73:e99e:f80b:9d17',
                'dc54:3624:ad2c:a0c1:c750:e191:fd36:1353',
                'd805:4288:108d:4e3d:d2d4:aca8:b476:14c9',
                '3576:45c4:6481:5f05:6487:a4b9:a1a7:a42c',
                '8bc3:3c26:26fe:d310:71a0:bc1a:3fb8:6b51',
                'af21:8f98:e544:47ef:b3e7:ae45:28ad:7499',
                '2123:ec9b:ef92:6982:1852:21b2:afac:0ee8',
                '9336:f6d0:f751:0143:da91:6ad3:ddee:3e9e',
                '30d3:6a6d:99d4:6bed:c6d9:2007:18b3:a965',
                '9325:d2ec:568b:39ad:d5bc:8548:d23b:6f92',
                '6ec4:a43d:e4d0:8c99:6237:d9df:d42c:8c12',
                '1084:0faf:bb4c:2bcf:da10:9a44:1cea:f8c8',
                '15f4:9801:93df:106c:9307:8cd7:b689:b9d9',
                '7aca:ea26:3425:82e4:17a3:ea0b:1ff0:4e33',
                'c627:c894:0966:76b1:22a9:3425:67fa:40a6',
                '63f1:776c:e365:fcc0:5cfb:ea67:b6a4:1c54',
                '44dd:8650:aa10:e49e:ef47:b913:d3a7:4487',
                '9c18:f8df:1e38:2471:3c43:9746:f1fa:2328',
                '928f:3d22:8fc9:d541:372a:e9da:3603:9ac2',
                'cbc5:9e87:e87f:f20d:1756:8dff:7f01:6df9',
                '99c6:b913:36a3:08e6:1699:9e8c:931f:6af0',
                '64a2:c59e:e79a:f95d:d388:4965:f7a2:cade',
                '8d7e:50a0:8076:30ee:b4c4:921f:3763:a2b7',
                'd5b7:6958:1ae9:c0ce:419f:f757:f5f7:6631',
                'fba2:ed8e:3292:13ca:dbe6:0d4d:904e:cf8e',
                '187e:0148:9f90:0707:9e81:24c4:4562:c6e3',
                'd8ec:7c40:a616:0cee:5400:ad97:de7b:2afe',
                '61d1:3be1:d081:8dcf:002b:9324:c6dc:7ade',
                'cfdf:ab69:d937:6d80:c5ed:382e:8ca5:0435',
                '090c:1989:3b03:d9e8:9f9c:8bc6:e662:d319',
                'f9bc:9711:1f6b:9306:3f26:fffa:f842:aa5c',
                '2647:70b3:7727:60a0:195b:ff31:3110:3d1b',
                'e6f3:3402:3aa9:f4a1:01a9:6af1:5bb5:a720',
                '4175:18ce:818c:7082:d2da:480a:067a:fee3',
                'a024:5061:0e0f:bde0:ebb7:d1ce:acb5:ee22',
                'ac0f:8dc6:acc3:ae49:1d01:591d:f3a1:3364',
                'c90f:5206:0991:f9fd:c148:4fa4:f55a:4f95',
                '3701:c3a6:4fb6:786f:74d3:d426:aa8a:9d69',
                'd394:3193:71ca:6297:06d0:fd6f:cd71:2e61',
                '3cff:53fa:2937:3456:3167:9ad4:c999:de54',
                '3861:66b9:01dc:d67f:c148:946b:cda1:ef42',
                'c8eb:46b1:ee2f:c587:ac34:d909:693a:7a42',
                'ff32:c1f5:d167:5cc8:910c:a0a1:1b82:9a2d',
                '3013:a21d:99a6:067e:bc90:ae4e:4819:78bb',
                '440c:8be0:3add:1d3e:7e3b:1f47:950b:f5a1',
                'acb5:33e0:c826:6329:e6c7:4ee0:50b3:e418',
                '7f9e:aff5:ab67:55de:b1be:e2b5:e7f7:4c7b',
                'bbb9:8aca:d988:2a33:a798:042f:4c00:863c',
                '2b03:4f68:012d:31a6:29e7:f985:8f04:c5ab',
                'b09c:d7f5:85ce:f170:416a:bfa6:5082:4730',
                '1454:f289:6786:b9f9:cbb2:b75c:1e6b:2186',
                'ddd4:fb62:dc71:db5f:2cb3:4d53:d1d6:ebd2',
                '3294:c275:2a31:d4ca:325e:f40d:8b58:bc58',
                '3b42:c12a:f793:b942:83c0:536c:a8bd:1df1',
                '0b38:012b:76ee:cfe9:5180:cb8f:41da:9c5c',
                '475e:ed8c:a88d:718c:d573:fc50:112a:2c12',
                'eba3:baec:7e6e:a213:82cf:cf2d:6b4e:455b',
                '25bc:b758:8af8:f477:55a5:9c55:52de:f9f4',
                'f5b1:745a:7734:f863:1506:9dbf:5e47:fc06',
                '3723:878f:4c62:e65d:8b44:cac0:8823:fec5',
                '04e6:b27a:570b:f035:f3d0:7929:afa9:0ce3',
                'f3d8:9ea1:93d6:f106:e02b:2701:eaf5:b759',
                '94b3:20c0:881b:8b91:00ce:3866:87c7:69a2',
                '2139:72a0:44a4:bfc9:a033:25f6:9c25:3023',
                '0526:56c6:3b5e:d45d:55e8:842c:0d37:231f',
                'f452:a96f:6638:f0dd:6fb7:eaae:2a57:24cd',
                'd4f1:6bb9:b882:d9a8:bcab:0236:0214:db1b',
                '5b40:d10d:eb3a:33fd:17a3:8f87:acd1:c620',
                '5683:bc98:94d2:0319:d559:1286:5227:668a',
                '4824:82b9:4835:e4d4:4e24:9beb:fb41:3c1b',
                'e352:e3d4:5827:6942:5c04:70d0:1d12:de3e',
                '426a:9cdb:9db7:92a2:a385:ac04:da6b:d8a8',
                '2ac4:30f2:cb26:84b9:6424:cc38:3485:5fd6',
                '7d71:5fe0:2c34:ab84:e322:327b:fac5:7728',
                'cd89:efff:18c4:a8ff:f98a:8cbd:1f2e:da71',
                '8e0a:2fcc:1055:5f45:49d5:2289:abd2:d80f',
                'a18a:eae8:4467:b49f:894a:083d:a1f9:4649',
                'c73d:2abe:0091:57fb:a032:0643:9a62:638e',
                'dfec:53a2:4585:b090:8f42:2514:f082:066f',
                '5649:c434:350c:dac6:139f:b640:3d95:614c',
                '6081:08d1:6822:740e:2677:0638:9e0b:7739',
                'dafd:cc67:b131:3d4d:9198:7252:410d:5118',
                '5e48:67a9:bb99:6082:684c:b5a0:4a30:6c2d',
                '5eeb:c960:0bdb:ec59:6b5f:ee20:1453:4a98',
                '68a0:bdb2:91c7:5bf7:e47f:709d:947b:f92a',
                '7a32:259b:3f8d:939b:f04b:1d2e:fd74:993a',
                'c266:b747:24ed:ec04:2ff3:97ef:75b0:df32',
                'b45b:b5f4:016b:01bc:a258:b375:f270:2b2c',
                '87a8:a088:f799:15b6:314e:6915:c296:6cab',
                '7b63:2f6a:771f:e8ed:098e:113a:0da0:5104',
                '5f89:1dbf:b208:1e4c:6bc8:c527:256d:88e6',
                '1932:a6ad:c2d5:a3a6:88a3:89a2:626f:6617',
                '1047:90d8:0cc0:5f77:09f6:a4b8:905e:84bd',
                '8d6e:1f6c:44cf:66d4:5b00:ec32:31aa:e24f',
                'eb80:a8f4:de2d:4400:8847:ae62:6c1e:bd1a',
                '4af0:15f1:39bb:115f:12da:5103:263a:9fcc',
                'f523:60af:53b4:396b:f9cb:6f85:d40b:dc52',
            ]) assert.ok(v.validate({a}).is_valid);
        });

        it('Should be valid with addresses in shortened format', () => {
            const v = new Validator({a: 'sys_ipv4_or_v6'});
            for (const a of [
                'e89:d118:a944:d817:4548:95ed:3081:c98f',
                '2123:ec9b:ef92:6982:1852:21b2:afac:ee8',
                '9336:f6d0:f751:143:da91:6ad3:ddee:3e9e',
                '1084:faf:bb4c:2bcf:da10:9a44:1cea:f8c8',
                'c627:c894:966:76b1:22a9:3425:67fa:40a6',
                '99c6:b913:36a3:8e6:1699:9e8c:931f:6af0',
                '187e:0148:9f90:707:9e81:24c4:4562:c6e3',
                'd8ec:7c40:a616:cee:5400:ad97:de7b:2afe',
                '61d1:3be1:d081:8dcf:2b:9324:c6dc:7ade',
                'cfdf:ab69:d937:6d80:c5ed:382e:8ca5:435',
                '90c:1989:3b03:d9e8:9f9c:8bc6:e662:d319',
                'd394:3193:71ca:6297:6d0:fd6f:cd71:2e61',
                '3861:66b9:1dc:d67f:c148:946b:cda1:ef42',
                '3013:a21d:99a6:67e:bc90:ae4e:4819:78bb',
                'bbb9:8aca:d988:2a33:a798:42f:4c00:863c',
                '2b03:4f68:12d:31a6:29e7:f985:8f04:c5ab',
                'b38:012b:76ee:cfe9:5180:cb8f:41da:9c5c',
                '2001:db8::8a2e:370:7334',
            ]) assert.ok(v.validate({a}).is_valid);
        });
    });
});
