'use strict';

import {describe, it}   from 'node:test';
import assert           from 'node:assert/strict';
import CONSTANTS        from '../../constants.mjs';
import Validator        from '../../../src/index.mjs';

describe('vSysMac', () => {
    it('Should be invalid if not passed a string or passed a string that is empty after trimming', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            assert.equal(new Validator({a: 'sys_mac'}).validate({a: el}).is_valid, false);
        }
    });

    it('Should be invalid with mac address containing only non-hexadecimal characters and no separator', () => {
        const v = new Validator({a: 'sys_mac'});
        const tpl = c => 'xxxxxxxxxxxx'.replace(/x/g, c);

        //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
        //  A-Z are charcode range [65..90] in Ascii table (and subsequently unicode) as such we exclude those
        //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

        for (let i = 0; i < 48; i++) {
            assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
        }

        for (let i = 58; i < 65; i++) {
            assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
        }

        for (let i = 91; i < 96; i++) {
            assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
        }

        for (let i = 123; i < 10000; i++) {
            assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
        }
    });

    it('Should be valid with valid mac address (sample list in different formats)', () => {
        const lst = [
            '24:db:96:83:af:cd',
            '8c:85:11:33:e6:e6',
            '7c:6d:f0:89:52:7d',
            '6b:47:ee:d8:b0:2e',
            '05:44:25:c3:01:64',
            'a8:be:fe:ec:eb:8d',
            '6b:85:64:f9:5a:4e',
            'bd:d6:ad:09:a6:c7',
            'ce:02:e5:d9:7d:fc',
            '7f:db:04:01:b9:b9',
            '05:8c:5f:fc:f8:29',
            'bb:b6:7f:0b:ae:5a',
            '7c:d7:b3:78:22:14',
            '83:f6:dd:9e:16:59',
            'b3:cc:b4:75:46:bb',
            'e8:96:37:3f:1d:60',
            'bd:33:16:0a:ad:1d',
            '05:04:c6:fa:7f:71',
            'd5:83:37:91:30:1d',
            '11:97:67:c7:22:7f',
            '47:16:98:9a:c0:f0',
            '3d:87:d2:82:84:68',
            'bd:93:77:21:16:0c',
            '35:a9:4c:49:42:29',
            'ad:90:0e:00:aa:54',
            'eb:bf:cf:17:3a:bc',
            'ee:e8:87:2c:bd:ec',
            'e3:bb:1b:9a:21:a5',
            'd2:9e:0d:e2:80:af',
            'd7:f8:56:d9:d5:4a',
            '61:c4:8a:fe:d8:50',
            'f0:1a:fa:62:76:05',
            'bc:fe:44:fa:15:10',
            '18:c7:d9:84:bf:ed',
            '7b:bc:f1:a7:a7:b3',
            '48:6d:95:e5:95:e3',
            '72:bb:60:b5:bd:fe',
            '8a:64:8d:59:08:20',
            'bb:eb:97:b9:59:68',
            '61:f7:20:73:29:96',
            '3e:f9:35:fb:96:fa',
            '48:fc:3f:1d:cb:cb',
            'a6:55:d1:1e:14:9a',
            'a6:a5:bb:8d:f0:7d',
            '67:19:2d:ed:b6:c6',
            '26:16:1f:26:43:32',
            '0c:7d:c9:54:38:ca',
            'b9:7a:85:a9:80:6e',
            'ab:fd:5d:4d:bb:9d',
            '89:ce:0a:97:2c:bb',
            '9C:3D:EA:D2:FC:E6',
            'C2:5E:40:7C:DD:B1',
            'A7:B2:B5:A4:9C:EE',
            '85:9C:4D:AB:28:51',
            'CC:A0:60:2E:94:D7',
            'EC:2D:F8:5B:67:4A',
            'DB:66:2D:3A:A5:10',
            '86:F8:29:35:A8:06',
            'B0:EE:4E:F8:64:3D',
            '25:84:96:7E:BC:3D',
            '1A:9D:FC:C4:8D:92',
            'F1:6F:34:E0:21:99',
            'CA:E6:8F:81:95:E5',
            '67:1D:45:FC:4D:8C',
            'BB:8A:12:89:61:34',
            'C3:48:D8:44:70:EC',
            '44:32:89:1D:E2:6C',
            '06:44:A0:A8:26:24',
            '5C:51:7E:5F:BD:C0',
            '0B:9A:8A:80:58:B3',
            '6E:44:32:67:27:C6',
            '7D:21:DD:4F:68:B0',
            'F3:ED:BD:9D:A1:A5',
            '86:39:47:EF:B9:E0',
            '9B:CB:AE:67:53:92',
            '1F:BE:E4:81:7F:FC',
            'DC:E6:3E:FD:C6:C0',
            '6C:43:7B:4D:97:B4',
            'A0:51:0B:38:75:83',
            'F5:18:99:0B:6F:BD',
            'D1:F2:4A:A5:23:72',
            'F6:F5:A2:4E:4B:F1',
            '03:6E:65:A3:C3:FB',
            '9F:74:8D:7A:B4:CF',
            '88:65:6B:FF:4C:DA',
            '4D:83:2C:E8:C8:D7',
            'BE:E1:4A:73:54:1B',
            '0E:D7:0B:E4:66:72',
            '0E:66:5C:55:19:CA',
            'F1:0C:58:E3:2E:C2',
            '7C:89:0B:AB:FF:8D',
            'B1:DF:EC:99:9C:D1',
            '07:3B:F1:0C:35:1E',
            'A2:4A:7E:26:A2:B6',
            '09:7B:02:1E:05:3F',
            '62:C0:EB:C8:55:38',
            '6B:E0:10:00:1C:76',
            '92:76:C1:A3:DC:51',
            '87:49:06:1C:9A:47',
            'DE:37:0B:CC:C4:40',
            '3A-43-C7-79-FE-08',
            '0E-7D-F8-F6-7A-BD',
            '39-BE-7E-ED-74-C8',
            'F1-7F-67-94-31-6F',
            '46-D1-AB-67-3F-68',
            'B1-0D-FD-BE-81-89',
            'CE-ED-9C-D6-47-8A',
            '2E-82-45-88-4D-B7',
            '01-0C-A8-5B-EB-05',
            'D0-08-BA-ED-5B-7B',
            'A9-9D-08-84-D0-7A',
            'D5-A8-B5-3B-07-7A',
            '71-63-AD-1A-C4-03',
            'E7-52-96-AF-3D-42',
            '06-2A-DF-26-56-3D',
            '38-F1-82-B3-67-67',
            'D3-88-3E-91-5C-CB',
            'F0-D4-BC-5A-17-4C',
            '8D-3F-B7-85-E5-46',
            '55-1E-17-1F-9B-57',
            '98-60-8F-40-D0-F1',
            '34-8F-1A-01-09-4F',
            '47-15-85-04-6D-56',
            '06-18-20-5B-FC-01',
            '84-0C-5D-11-A7-6D',
            '5A-AA-F2-F8-F0-41',
            'CF-43-7A-82-BA-66',
            '88-56-3A-8F-D6-70',
            'DE-15-25-27-68-DC',
            '36-75-CA-01-73-FF',
            'F4-C8-1C-19-22-5F',
            'FD-6C-93-B6-53-63',
            '9D-4F-A7-E0-CA-33',
            '2B-A2-F8-EE-14-5A',
            '6E-99-28-38-85-12',
            '44-87-52-5D-00-A5',
            'D5-FB-B7-38-1F-80',
            'D2-EA-54-FD-43-EC',
            'D6-14-C4-0A-E9-05',
            '28-E3-E7-65-D3-08',
            '0B-FB-88-6F-81-1F',
            '00-BD-93-6F-A7-2D',
            'D1-B9-40-08-04-8D',
            'B1-7C-8F-38-42-6F',
            '5D-C1-FB-B2-40-D0',
            '27-48-F1-54-C7-F9',
            '3C-9E-C7-06-1A-22',
            '16-19-56-E5-66-87',
            '2B-70-A5-1D-4F-E9',
            '6D-DF-CE-C8-17-04',
            '82-dd-46-85-46-2f',
            '35-f1-3e-3c-3b-b8',
            '0f-36-66-11-42-52',
            'ac-72-5d-58-7c-9f',
            '86-6a-6d-6c-3e-3a',
            'e2-5b-22-18-74-e1',
            '32-58-90-de-71-f4',
            'd4-dc-e4-c3-7e-90',
            '82-e5-98-50-e9-8a',
            '16-4e-4a-ef-e8-00',
            'b4-e1-37-f9-db-53',
            '36-ad-fe-09-a2-b7',
            '44-ca-c5-79-d1-eb',
            'ce-4b-84-2a-92-8d',
            '61-f1-ec-3c-c5-27',
            '8c-c1-10-73-6e-8e',
            '20-52-ec-e0-28-f8',
            'fe-68-99-63-3d-34',
            'e3-5a-be-3c-9d-26',
            '27-3f-e9-0d-5a-14',
            '42-fc-8a-55-e8-07',
            'c1-f4-d0-39-b6-d1',
            'ea-af-af-f2-6a-91',
            'ff-99-ae-b9-88-f4',
            'be-f8-7b-17-0e-4b',
            '8d-25-1b-a0-79-4f',
            '4d-46-8b-06-c0-46',
            'bf-81-59-7a-ed-60',
            '6f-18-66-5c-80-eb',
            'ce-18-8d-cf-09-ed',
            '3e-2a-17-1b-0f-92',
            'ee-21-38-1d-ec-2e',
            'f2-97-29-9d-90-86',
            '97-9e-98-9b-a7-e7',
            '46-65-45-b5-2d-2d',
            'd9-c2-52-75-c0-d3',
            '97-31-6d-93-64-62',
            '2f-41-32-31-55-4e',
            '45-8d-1d-f6-2a-5d',
            'ca-83-1a-a2-7f-07',
            '70-b9-3f-b1-97-65',
            '3f-a4-a1-7c-83-c5',
            '36-4f-17-da-60-0b',
            'e9-83-07-c2-e1-5e',
            'e6-2f-b2-5b-a8-1a',
            '64-1a-5f-76-77-40',
            '2c-85-16-f3-c9-2f',
            '67-b4-74-da-f8-7d',
            '70-96-f1-15-63-ac',
            'fa-b5-3e-72-87-c2',
            'EA4.C63.8E2.81E',
            '6DD.6AD.364.3BA',
            'DA0.8BB.BA7.9BE',
            'E5F.CC9.59D.A72',
            'D00.6A6.BC7.959',
            'BD7.0FC.A02.BA0',
            'D11.EA7.7EF.FE0',
            '12E.D9C.025.198',
            'A20.23D.A57.78E',
            '608.F8E.2AF.2A2',
            '35D.376.005.9CD',
            '9BE.AF9.926.A3C',
            'A26.53D.C45.70D',
            '1F6.9BE.850.7D7',
            '0D4.70E.0B6.B9C',
            'CB1.7B2.B74.007',
            'E20.22B.606.518',
            '77B.80A.A98.11F',
            '0D2.1BD.A47.ABC',
            '8D0.0C6.894.FC4',
            'AAF.0D0.313.F59',
            '0FA.DC8.D29.A22',
            '044.492.AAD.9D6',
            '3A1.7DB.33D.F14',
            '8B6.C2B.443.BE4',
            '349.E6D.B04.B94',
            '081.BA7.702.4D6',
            '6EE.245.B88.AAC',
            'FE5.CE6.89B.0B7',
            'D13.A7F.923.15B',
            '85B.503.274.324',
            '345.EC4.E52.AF3',
            '508.A93.03F.82F',
            '5CA.E30.DBB.446',
            '657.720.FA8.326',
            '9C1.651.FE9.9A8',
            'AF1.A9D.2B4.6D8',
            '835.1F3.00F.334',
            'C94.162.4E2.13B',
            '6E2.137.575.870',
            '6B3.5D1.D3D.2CC',
            '4C6.870.DF3.664',
            'B77.8A0.6C9.D14',
            '13B.5D0.09E.BB4',
            'E0C.A19.6A2.923',
            '9BE.388.34B.AB7',
            '7AA.013.52F.292',
            '137.3A6.026.06F',
            '21E.D35.B48.838',
            '307.695.104.347',
            '1fb.edd.245.99d',
            'efc.679.68f.0f0',
            '68b.726.1ec.817',
            'af4.c99.5b6.3a1',
            '5bc.939.7d5.79b',
            '8d7.7ac.e14.b10',
            '1b7.24b.b01.e0f',
            '1a0.444.4b0.14b',
            '511.1c9.bd9.84d',
            'ca0.c04.a91.19a',
            'f80.768.cc7.7dc',
            '1dc.1df.63b.c7e',
            '56a.b4b.3c2.5e1',
            '2d7.f29.8fa.6f0',
            '22b.ade.f0b.d06',
            '542.14f.1c8.739',
            '477.1b6.385.f05',
            '7ef.902.514.7eb',
            '692.de4.627.2d5',
            '65f.321.4a0.86d',
            '26a.be0.e45.3f2',
            '774.68c.9f4.1d3',
            '412.564.88a.057',
            'c8b.98d.863.eec',
            'f1e.fca.611.2fa',
            '9d2.0ee.f65.0d6',
            '0a7.d07.fb6.851',
            'dcc.34f.c26.f7b',
            '248.06c.a9d.bda',
            'd9b.778.e98.b26',
            '6ca.a38.2ba.1e4',
            '5bf.1f7.fb9.d3e',
            '3dd.2a7.fd0.b42',
            '716.c26.31f.cd7',
            'd89.451.56e.ceb',
            'f88.9af.dbd.079',
            'dc7.fb5.79b.239',
            'ac9.4db.f25.6bc',
            'f1c.07c.008.472',
            '01e.cda.727.602',
            '696.fa6.374.81c',
            '91c.8f3.f29.ffc',
            'e28.cc3.a38.c12',
            '87d.d66.7eb.b4c',
            '9f4.b56.5b8.705',
            '112.66e.ab1.c66',
            'da5.60d.536.ea8',
            '47c.024.279.305',
            '109.276.061.1ae',
            'cc4.de0.95f.44e',
        ];
        const v = new Validator({a: 'sys_mac'});
        for (const a of lst) assert.ok(v.validate({a}).is_valid);
    });

    it('Should be invalid with mac address using a mixture of separators (: and -)', () => {
        assert.equal(new Validator({a: 'sys_mac'}).validate({a: '01:23-45:67-89:AB'}).is_valid, false);
    });

    it('Should be invalid with mac address using a mixture of separators (: and .)', () => {
        assert.equal(new Validator({a: 'sys_mac'}).validate({a: '012:345.678:9AB'}).is_valid, false);
    });

    it('Should be invalid with mac address using a mixture of separators (- and .)', () => {
        assert.equal(new Validator({a: 'sys_mac'}).validate({a: '012-345.678-9AB'}).is_valid, false);
    });

    it('Should be invalid with 64-bit mac address using 2 digit grouping and a mixture of separators (: and -)', () => {
        assert.equal(new Validator({a: 'sys_mac'}).validate({a: '01:23-45:FF-FE:67-89:AB'}).is_valid, false);
    });

    it('Should be invalid with 64-bit mac address using 4 digit grouping and a mixture of separators (: and -)', () => {
        assert.equal(new Validator({a: 'sys_mac'}).validate({a: '0123-45FF:FE67-89AB'}).is_valid, false);
    });

    describe('MM:MM:MM:SS:SS:SS Format', () => {
        it('Should be valid with valid mac address using a dash (-) as separator', () => {
            assert.ok(new Validator({a: 'sys_mac'}).validate({a: '01-23-45-67-89-AB'}).is_valid);
        });

        it('Should be invalid with mac address containing only non-hexadecimal characters and a dash as a separator', () => {
            const v = new Validator({a: 'sys_mac'});
            const tpl = c => 'xx-xx-xx-xx-xx-xx'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  A-Z are charcode range [65..90] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 58; i < 65; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 91; i < 96; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 123; i < 10000; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }
        });

        it('Should be invalid with mac address containing a single non-hexadecimal characters and a dash as a separator', () => {
            const v = new Validator({a: 'sys_mac'});
            const tpl = c => '01-23-45-x7-89-AB'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  A-Z are charcode range [65..90] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 58; i < 65; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 91; i < 96; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 123; i < 10000; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }
        });
    });

    describe('MM-MM-MM-SS-SS-SS Format', () => {
        it('Should be valid with valid mac address using a colon (:) as separator', () => {
            assert.ok(new Validator({a: 'sys_mac'}).validate({a: '01:23:45:67:89:AB'}).is_valid);
        });

        it('Should be invalid with mac address containing only non-hexadecimal characters and a colon as a separator', () => {
            const v = new Validator({a: 'sys_mac'});
            const tpl = c => 'xx:xx:xx:xx:xx:xx'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  A-Z are charcode range [65..90] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 58; i < 65; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 91; i < 96; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 123; i < 10000; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }
        });

        it('Should be invalid with mac address containing a single non-hexadecimal characters and a colon as a separator', () => {
            const v = new Validator({a: 'sys_mac'});
            const tpl = c => '01:23:45:x7:89:AB'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  A-Z are charcode range [65..90] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 58; i < 65; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 91; i < 96; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 123; i < 10000; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }
        });
    });

    describe('MMM.MMM.SSS.SSS Format', () => {
        it('Should be valid when passed valid mac address using a 3 char format and dot (.) as separator', () => {
            assert.ok(new Validator({a: 'sys_mac'}).validate({a: '012.345.678.9AB'}).is_valid);
        });

        it('Should be invalid with mac address containing only non-hexadecimal characters, 3 char format, dot as separator', () => {
            const v = new Validator({a: 'sys_mac'});
            const tpl = c => 'xxx.xxx.xxx.xxx'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  A-Z are charcode range [65..90] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 58; i < 65; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 91; i < 96; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 123; i < 10000; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }
        });

        it('Should be invalid with mac address containing single non-hexadecimal characters and dot as a separator', () => {
            const v = new Validator({a: 'sys_mac'});
            const tpl = c => '012.345.x78.9AB'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  A-Z are charcode range [65..90] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 58; i < 65; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 91; i < 96; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 123; i < 10000; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }
        });
    });

    describe('Special case 48-bit mac address converted to a 64-bit address (ipv6)', () => {
        it('Should be valid with 48-bit address converted using correct FFFE val, 2 digit, : separator', () => {
            const v = new Validator({a: 'sys_mac'});
            assert.ok(v.validate({a: '00:25:96:FF:FE:12:34:56'}).is_valid);
        });

        it('Should be valid with 48-bit address converted using correct FFFE val, 4 digit, : separator', () => {
            const v = new Validator({a: 'sys_mac'});
            assert.ok(v.validate({a: '0025:96FF:FE12:3456'}).is_valid);
        });

        it('Should be invalid with 48-bit address that does not have a correct FFFE val, 2 digit, : separator', () => {
            const v = new Validator({a: 'sys_mac'});
            assert.equal(v.validate({a: '00:25:96:FA:FE:12:34:56'}).is_valid, false);
        });

        it('Should be valid with 48-bit address that does not have a correct FFFE val, 4 digit, : separator', () => {
            const v = new Validator({a: 'sys_mac'});
            assert.equal(v.validate({a: '0025:96FF:BE12:3456'}).is_valid, false);
        });

        it('Should be invalid with 64-bit address containing a single non-hexadecimal character, 2 digit, : separator', () => {
            const v = new Validator({a: 'sys_mac'});
            const tpl = c => '01:23:45:FF:FE:x7:89:AB'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  A-Z are charcode range [65..90] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 58; i < 65; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 91; i < 96; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 123; i < 10000; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }
        });

        it('Should be invalid with 64-bit address containing only non-hexadecimal characters, 4 digit, : separator', () => {
            const v = new Validator({a: 'sys_mac'});
            const tpl = c => 'xxxx:xxFF:FExx:xxxx'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  A-Z are charcode range [65..90] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 58; i < 65; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 91; i < 96; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 123; i < 10000; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }
        });

        it('Should be valid with 48-bit address converted using correct FFFE val, 2 digit, - separator', () => {
            const v = new Validator({a: 'sys_mac'});
            assert.ok(v.validate({a: '00-25-96-FF-FE-12-34-56'}).is_valid);
        });

        it('Should be valid with 48-bit address converted using correct FFFE val, 4 digit, - separator', () => {
            const v = new Validator({a: 'sys_mac'});
            assert.ok(v.validate({a: '0025-96FF-FE12-3456'}).is_valid);
        });

        it('Should be invalid with 48-bit address that does not have a correct FFFE val, 2 digit, - separator', () => {
            const v = new Validator({a: 'sys_mac'});
            assert.equal(v.validate({a: '00-25-96-FA-FE-12-34-56'}).is_valid, false);
        });

        it('Should be valid with 48-bit address that does not have a correct FFFE val, 4 digit, - separator', () => {
            const v = new Validator({a: 'sys_mac'});
            assert.equal(v.validate({a: '0025-96FF-BE12-3456'}).is_valid, false);
        });

        it('Should be invalid with 64-bit address containing a single non-hexadecimal character, 2 digit, - separator', () => {
            const v = new Validator({a: 'sys_mac'});
            const tpl = c => '01-23-45-FF-FE-x7-89-AB'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  A-Z are charcode range [65..90] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 58; i < 65; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 91; i < 96; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 123; i < 10000; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }
        });

        it('Should be invalid with 64-bit address containing only non-hexadecimal characters, 4 digit, - separator', () => {
            const v = new Validator({a: 'sys_mac'});
            const tpl = c => 'xxxx-xxFF-FExx-xxxx'.replace(/x/g, c);

            //  0-9 are charcode range [48..57] in Ascii table (and subsequently unicode) as such we exclude those
            //  A-Z are charcode range [65..90] in Ascii table (and subsequently unicode) as such we exclude those
            //  a-z are charcode range [97..122] in Ascii table (and subsequently unicode) as such we exclude those

            for (let i = 0; i < 48; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 58; i < 65; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 91; i < 96; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }

            for (let i = 123; i < 10000; i++) {
                assert.equal(v.validate({a: tpl(String.fromCharCode(i))}).is_valid, false);
            }
        });
    });
});
