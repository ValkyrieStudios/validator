'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import Validator        from '../../../src/index.mjs';

function rCorrect () {
    return Math.floor(Math.random() * 256);
}

function rIncorrect () {
    return Math.floor(Math.random() * 256) + 256;
}

describe('vSysIPv4', () => {
    it('Should be invalid if not passed a string or passed an empty string after trimming', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            assert.equal(new Validator({a: 'sys_ipv4'}).validate({a: el}).is_valid, false);
        }
    });

    it('Should be invalid when passed random strings', () => {
        for (const el of ['foo', 'bar', 'hello world', 'hello.world', 'ewueioqw wqe uqwioeuowqeqw']) {
            assert.equal(new Validator({a: 'sys_ipv4'}).validate({a: el}).is_valid, false);
        }
    });

    it('Should be invalid with address containing only non-numeric characters and no separator', () => {
        const v = new Validator({a: 'sys_ipv4'});
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
        const v = new Validator({a: 'sys_ipv4'});
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
        const v = new Validator({a: 'sys_ipv4'});
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
        const v = new Validator({a: 'sys_ipv4'});
        for (let i = 0; i < 500; i++) {
            assert.equal(v.validate({a: `${rCorrect()}`}).is_valid, false);
        }
    });

    it('Should be invalid with addresses with only 2 octets', () => {
        const v = new Validator({a: 'sys_ipv4'});
        for (let i = 0; i < 500; i++) {
            assert.equal(v.validate({a: [rCorrect(), rCorrect()].join('.')}).is_valid, false);
        }
    });

    it('Should be invalid with addresses with only 3 octets', () => {
        const v = new Validator({a: 'sys_ipv4'});
        for (let i = 0; i < 500; i++) {
            assert.equal(v.validate({a: [rCorrect(), rCorrect(), rCorrect()].join('.')}).is_valid, false);
        }
    });

    it('Should be invalid with addresses where a single octet goes beyond the upper bound of a byte (255)', () => {
        const v = new Validator({a: 'sys_ipv4'});
        for (let i = 0; i < 500; i++) {
            assert.equal(v.validate({a: [rIncorrect(), rCorrect(), rCorrect(), rCorrect()].join('.')}).is_valid, false);
        }

        for (let i = 0; i < 500; i++) {
            assert.equal(v.validate({a: [rCorrect(), rIncorrect(), rCorrect(), rCorrect()].join('.')}).is_valid, false);
        }

        for (let i = 0; i < 500; i++) {
            assert.equal(v.validate({a: [rCorrect(), rCorrect(), rIncorrect(), rCorrect()].join('.')}).is_valid, false);
        }

        for (let i = 0; i < 500; i++) {
            assert.equal(v.validate({a: [rCorrect(), rCorrect(), rCorrect(), rIncorrect()].join('.')}).is_valid, false);
        }
    });

    it('Should be invalid with addresses where all octets go beyond the upper bound of a byte (255)', () => {
        const v = new Validator({a: 'sys_ipv4'});
        for (let i = 0; i < 500; i++) {
            assert.equal(v.validate({a: [rIncorrect(), rIncorrect(), rIncorrect(), rIncorrect()].join('.')}).is_valid, false);
        }
    });

    it('Should be invalid with addresses where all octets are correct but where the string contains spaces', () => {
        const v = new Validator({a: 'sys_ipv4'});
        for (let i = 0; i < 500; i++) {
            assert.equal(v.validate({a: `  ${rCorrect()}.${rCorrect()}.${rCorrect()}.${rCorrect()}`}).is_valid, false);
            assert.equal(v.validate({a: `${rCorrect()}.${rCorrect()}.${rCorrect()}.${rCorrect()}   `}).is_valid, false);
            assert.equal(v.validate({a: `  ${rCorrect()}.${rCorrect()}.${rCorrect()}.${rCorrect()}    `}).is_valid, false);
        }
    });

    it('Should be invalid with addresses where all octets are correct but where the string contains a non-dot separator', () => {
        const v = new Validator({a: 'sys_ipv4'});

        //  Character code of a dot is 46

        for (let i = 0; i < 46; i++) {
            const s = String.fromCharCode(i);
            assert.equal(v.validate({a: [rCorrect(), s, rCorrect(), s, rCorrect(), s, rCorrect()].join('')}).is_valid, false);
        }

        for (let i = 47; i < 1000; i++) {
            const s = String.fromCharCode(i);
            assert.equal(v.validate({a: [rCorrect(), s, rCorrect(), s, rCorrect(), s, rCorrect()].join('')}).is_valid, false);
        }
    });

    it('Should be valid when passed a list of valid addresses (sample list)', () => {
        const v = new Validator({a: 'sys_ipv4'});
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
