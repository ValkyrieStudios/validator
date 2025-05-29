/* eslint-disable max-statements,max-lines */

import {describe, it, expect} from 'vitest';
import guid from '@valkyriestudios/utils/hash/guid';
import CONSTANTS from '../../constants';
import Validator from '../../../lib';

describe('vPhone', () => {
    it('Should be invalid if not passed a string or passed a string that is empty after trimming', () => {
        for (const el of CONSTANTS.NOT_STRING_WITH_EMPTY) {
            expect(new Validator({a: 'phone'}).validate({a: el})).toEqual({
                is_valid: false,
                count: 1,
                errors: {
                    a: [{msg: el === undefined ? 'not_found' : 'phone', params: []}],
                },
            });
        }
    });

    it('Should be valid with correct phone number (sample list)', () => {
        const v = new Validator({a: 'phone'});
        for (const el of [
            '+919367788755',
            '8989829304',
            '+16308520397',
            '786-307-3615',
        ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
    });

    it('Should be invalid with incorrect phone number (sample list)', () => {
        const v = new Validator({a: 'phone'});
        for (const el of [
            '789',
            '1-1-1',
            '+982',
            '423894dweqw',
            guid(),
            'foo423789',
            '(abc) def ghi',
        ]) expect(v.validate({a: el})).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'phone', params: []}]}});
    });

    it('Should be invalid with a phone number containing non-valid characters', () => {
        const v = new Validator({a: 'phone'});
        const tpl = c => '+32 487 6x 59 82'.replace(/x/g, c);
        const validchars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '+', ' ', '(', ')', '-', '.'].reduce((acc, c) => {
            acc[c] = c;
            return acc;
        }, {});

        for (let i = 0; i < 1000; i++) {
            if (validchars.hasOwnProperty(String.fromCharCode(i))) continue;
            expect(v.validate({a: tpl(String.fromCharCode(i))})).toEqual({
                is_valid: false,
                count: 1,
                errors: {a: [{msg: 'phone', params: []}]},
            });
        }
    });

    it('Should be valid with a phone number containing (xxx) format for area code', () => {
        const v = new Validator({a: 'phone'});
        for (const el of [
            '(03) 9739 1203',
            '(905) 495 1317',
            '+32 (487) 61 59 82',
            '0032 (487) 61 59 82',
        ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
    });

    it('Should be invalid with a phone number containing a (xxx) format for area code that is either not started or not closed', () => {
        const v = new Validator({a: 'phone'});
        for (const el of [
            '03) 9739 1203',
            '(905 495 1317',
            '+32 487) 61 59 82',
            '0032 (487 61 59 82',
        ]) expect(v.validate({a: el})).toEqual({is_valid: false, count: 1, errors: {a: [{msg: 'phone', params: []}]}});
    });

    it('Should be invalid with a phone number containing a mixed multiple separator format', () => {
        const v = new Validator({a: 'phone'});
        for (const el of [
            '(03)  9739 1203',
            '(03)- 9739 1203',
            '(905) 495-.1317',
            '+32 (487) 61.-59 82',
            '0032 (487)  .61 59  .82',
        ]) expect(v.validate({a: el}).is_valid).toBe(false);
    });

    it('Should be valid with a phone number containing dashes (-) for separator format', () => {
        const v = new Validator({a: 'phone'});
        for (const el of [
            '(905) 495-1317',
            '+32 (487)-61-59-82',
            '(334)-707-0855',
        ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
    });

    it('Should be valid with a phone number containing dots (.) for separator format', () => {
        const v = new Validator({a: 'phone'});
        for (const el of [
            '(905) 495.1317',
            '+32 (487).61.59.82',
            '(334).707.0855',
        ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
    });

    it('Should be valid with a phone number containing spaces ( ) for separator format', () => {
        const v = new Validator({a: 'phone'});
        for (const el of [
            '(905) 495 1317',
            '+32 (487) 61 59 82',
            '(334) 707 0855',
        ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
    });

    describe('afhanistan', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '077184 1042',
                '077 110 6362',
                '077 091 7454',
                '077 1486108',
                '077 338 5242',
                '077623 2634',
                '077 8682235',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '0093 077 148 6108',
                '+93 077 338 5242',
                '+93077 934 6774',
                '+93 077623 2634',
                '+93 077 8682235',
                '+93 077 311 3596',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('aland_islands', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '457 868 1707',
                '457 776 1700',
                '457 401 8364',
                '457 570 3310',
                '457 030 9712',
                '457 478 9216',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+385 457 868 1707',
                '+385 457 776 1700',
                '+385 457 401 8364',
                '+385 457 570 3310',
                '+385 457 030 9712',
                '+385 457 478 9216',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('albania', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '69 561 4643',
                '69 396 8206',
                '69 402 1819',
                '69 499 4090',
                '69 499 9956',
                '69 723 8790',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+355 69 561 4643',
                '+355 69 396 8206',
                '+355 69 402 1819',
                '+355 69 499 4090',
                '+355 69 499 9956',
                '+355 69 723 8790',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('algeria', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '5 479 8816',
                '5 073 8218',
                '5 858 8971',
                '5 551 3601',
                '5 810 8288',
                '5 765 7307',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+213 5 479 8816',
                '+213 5 073 8218',
                '+213 5 858 8971',
                '+213 5 551 3601',
                '+213 5 810 8288',
                '+213 5 765 7307',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('american_samoa', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '684 327 7985',
                '684 057 0611',
                '684 929 7160',
                '684 056 2069',
                '684 155 6063',
                '684 907 0443',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 684 327 7985',
                '+1 684 057 0611',
                '+1 684 929 7160',
                '+1 684 056 2069',
                '+1 684 155 6063',
                '+1 684 907 0443',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('andora', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '355 100 7602',
                '355 509 6901',
                '355 317 0885',
                '355 986 0229',
                '355 620 0788',
                '355 824 7464',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+376 355 100 7602',
                '+376 355 509 6901',
                '+376 355 317 0885',
                '+376 355 986 0229',
                '+376 355 620 0788',
                '+376 355 824 7464',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('angola', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '0915 711 7388',
                '0915 590 3780',
                '0915 587 8408',
                '0915 701 8461',
                '0915 789 0784',
                '0915 202 2395',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+244 0915 711 7388',
                '+244 0915 590 3780',
                '+244 0915 587 8408',
                '+244 0915 701 8461',
                '+244 0915 789 0784',
                '+244 0915 202 2395',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('anguilla', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '264 850 9190',
                '264 117 8744',
                '264 001 3315',
                '264 733 7033',
                '264 058 4197',
                '264 040 3584',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 264 850 9190',
                '+1 264 117 8744',
                '+1 264 001 3315',
                '+1 264 733 7033',
                '+1 264 058 4197',
                '+1 264 040 3584',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('antigua', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '268 554 6303',
                '268 732 3495',
                '268 950 2667',
                '268 237 2400',
                '268 426 4615',
                '268 151 5176',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 268 554 6303',
                '+1 268 732 3495',
                '+1 268 950 2667',
                '+1 268 237 2400',
                '+1 268 426 4615',
                '+1 268 151 5176',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('argentina', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '9 578 6327',
                '9 918 5166',
                '9 626 7258',
                '9 303 6299',
                '9 453 6683',
                '9 685 0352',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+54 9 578 6327',
                '+54 9 918 5166',
                '+54 9 626 7258',
                '+54 9 303 6299',
                '+54 9 453 6683',
                '+54 9 685 0352',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('armenia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '094 240 3930',
                '094 123 4550',
                '094 725 4612',
                '094 208 9305',
                '094 607 8228',
                '094 305 2541',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+374 094 240 3930',
                '+374 094 123 4550',
                '+374 094 725 4612',
                '+374 094 208 9305',
                '+374 094 607 8228',
                '+374 094 305 2541',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('aruba', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '58 454 5857',
                '58 599 0187',
                '58 047 8084',
                '58 338 8832',
                '58 864 2457',
                '58 733 4970',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+297 58 454 5857',
                '+297 58 599 0187',
                '+297 58 047 8084',
                '+297 58 338 8832',
                '+297 58 864 2457',
                '+297 58 733 4970',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('ascension_island', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '555 698 1982',
                '555 855 5134',
                '555 678 2749',
                '555 053 9902',
                '555 837 0874',
                '555 573 3355',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+247 555 698 1982',
                '+247 555 855 5134',
                '+247 555 678 2749',
                '+247 555 053 9902',
                '+247 555 837 0874',
                '+247 555 573 3355',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('australia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '004 875 8376',
                '004 940 2359',
                '004 029 9939',
                '004 080 1118',
                '004 299 4591',
                '004 795 1889',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+61 004 875 8376',
                '+61 004 940 2359',
                '+61 004 029 9939',
                '+61 004 080 1118',
                '+61 004 299 4591',
                '+61 004 795 1889',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('australian_antarctic_territory', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '001 883 5178',
                '001 086 8945',
                '001 501 0258',
                '001 126 9189',
                '001 076 4378',
                '001 477 1437',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+672 001 883 5178',
                '+672 001 086 8945',
                '+672 001 501 0258',
                '+672 001 126 9189',
                '+672 001 076 4378',
                '+672 001 477 1437',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('austria', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '660 594 0302',
                '660 744 3575',
                '660 286 3324',
                '660 463 2698',
                '660 818 5505',
                '660 727 0697',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+43 660 594 0302',
                '+43 660 744 3575',
                '+43 660 286 3324',
                '+43 660 463 2698',
                '+43 660 818 5505',
                '+43 660 727 0697',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('azerbaijan', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '055 550 6340',
                '055 479 3863',
                '055 724 4927',
                '055 541 2943',
                '055 694 6665',
                '055 293 6030',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+994 055 550 6340',
                '+994 055 479 3863',
                '+994 055 724 4927',
                '+994 055 541 2943',
                '+994 055 694 6665',
                '+994 055 293 6030',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('bahamas', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '788 137 3711',
                '788 053 1920',
                '788 208 7811',
                '788 165 6536',
                '788 094 8876',
                '788 405 6658',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 788 137 3711',
                '+1 788 053 1920',
                '+1 788 208 7811',
                '+1 788 165 6536',
                '+1 788 094 8876',
                '+1 788 405 6658',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('bahrain', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '344 863 0469',
                '344 244 0257',
                '344 905 4210',
                '344 725 8690',
                '344 009 6571',
                '344 695 3757',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+973 344 863 0469',
                '+973 344 244 0257',
                '+973 344 905 4210',
                '+973 344 725 8690',
                '+973 344 009 6571',
                '+973 344 695 3757',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('bangladesh', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '115 857 8485',
                '115 820 1443',
                '115 662 7969',
                '115 095 7904',
                '115 056 4245',
                '115 482 8595',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+880 115 857 8485',
                '+880 115 820 1443',
                '+880 115 662 7969',
                '+880 115 095 7904',
                '+880 115 056 4245',
                '+880 115 482 8595',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('barbados', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '246 783 9025',
                '246 053 4969',
                '246 880 1128',
                '246 103 7581',
                '246 129 7144',
                '246 552 6727',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 246 783 9025',
                '+1 246 053 4969',
                '+1 246 880 1128',
                '+1 246 103 7581',
                '+1 246 129 7144',
                '+1 246 552 6727',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('belarus', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '154 143 6654',
                '154 742 8988',
                '154 806 9636',
                '154 976 3983',
                '154 652 3968',
                '154 840 8891',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+375 154 143 6654',
                '+375 154 742 8988',
                '+375 154 806 9636',
                '+375 154 976 3983',
                '+375 154 652 3968',
                '+375 154 840 8891',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('belgium', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '456 961 2018',
                '456 050 1596',
                '456 435 4985',
                '456 458 3069',
                '456 702 8070',
                '456 775 8058',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+32 456 961 2018',
                '+32 456 050 1596',
                '+32 456 435 4985',
                '+32 456 458 3069',
                '+32 456 702 8070',
                '+32 456 775 8058',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('belize', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '208 4428',
                '624 9083',
                '196 6149',
                '293 5541',
                '056 5131',
                '084 2654',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+501 208 4428',
                '+501 624 9083',
                '+501 196 6149',
                '+501 293 5541',
                '+501 056 5131',
                '+501 084 2654',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('benin', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '955 381 0298',
                '955 735 8454',
                '955 385 5734',
                '955 789 0747',
                '955 682 0476',
                '955 852 3871',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+229 955 381 0298',
                '+229 955 735 8454',
                '+229 955 385 5734',
                '+229 955 789 0747',
                '+229 955 682 0476',
                '+229 955 852 3871',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('bermuda', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '441 075 6893',
                '441 042 4757',
                '441 010 1917',
                '441 744 9259',
                '441 419 0662',
                '441 225 8558',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 441 075 6893',
                '+1 441 042 4757',
                '+1 441 010 1917',
                '+1 441 744 9259',
                '+1 441 419 0662',
                '+1 441 225 8558',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('bhutan', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '17 612 9555',
                '17 286 1026',
                '17 399 6910',
                '17 850 3960',
                '17 743 2312',
                '17 113 2340',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+975 17 612 9555',
                '+975 17 286 1026',
                '+975 17 399 6910',
                '+975 17 850 3960',
                '+975 17 743 2312',
                '+975 17 113 2340',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('bolivia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '755 571 4862',
                '755 396 9237',
                '755 921 4275',
                '755 936 5446',
                '755 742 3314',
                '755 349 3523',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+591 755 571 4862',
                '+591 755 396 9237',
                '+591 755 921 4275',
                '+591 755 936 5446',
                '+591 755 742 3314',
                '+591 755 349 3523',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('bonaire', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '127 1901',
                '080 9828',
                '812 0385',
                '854 3777',
                '293 4361',
                '962 8886',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+599 127 1901',
                '+599 080 9828',
                '+599 812 0385',
                '+599 854 3777',
                '+599 293 4361',
                '+599 962 8886',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('bosnia_herzegovina', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '665 184 0789',
                '665 511 2089',
                '665 714 9736',
                '665 441 1356',
                '665 755 9182',
                '665 632 0125',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+387 665 184 0789',
                '+387 665 511 2089',
                '+387 665 714 9736',
                '+387 665 441 1356',
                '+387 665 755 9182',
                '+387 665 632 0125',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('botswana', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '401 9285',
                '354 4841',
                '561 8678',
                '163 6271',
                '091 0648',
                '323 0002',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+267 401 9285',
                '+267 354 4841',
                '+267 561 8678',
                '+267 163 6271',
                '+267 091 0648',
                '+267 323 0002',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('brazil', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '955 807 4494',
                '955 647 2133',
                '955 104 4021',
                '955 187 5734',
                '955 217 6941',
                '955 446 8388',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+55 955 807 4494',
                '+55 955 647 2133',
                '+55 955 104 4021',
                '+55 955 187 5734',
                '+55 955 217 6941',
                '+55 955 446 8388',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('british_virgin_islands', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '809 221 4883',
                '809 641 5531',
                '809 698 1231',
                '809 454 2769',
                '809 722 1143',
                '809 259 6034',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 809 221 4883',
                '+1 809 641 5531',
                '+1 809 698 1231',
                '+1 809 454 2769',
                '+1 809 722 1143',
                '+1 809 259 6034',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('brunei', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '716 4257',
                '245 8989',
                '923 9332',
                '034 0624',
                '453 7165',
                '047 7196',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+673 716 4257',
                '+673 245 8989',
                '+673 923 9332',
                '+673 034 0624',
                '+673 453 7165',
                '+673 047 7196',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('bulgaria', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '2 198 3012',
                '2 351 9818',
                '2 012 1206',
                '2 557 3950',
                '2 565 4759',
                '2 248 6466',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+359 2 198 3012',
                '+359 2 351 9818',
                '+359 2 012 1206',
                '+359 2 557 3950',
                '+359 2 565 4759',
                '+359 2 248 6466',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('burkina_faso', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '7 129 6176',
                '7 856 2307',
                '7 271 4731',
                '7 870 3582',
                '7 799 5644',
                '7 182 1268',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+226 7 129 6176',
                '+226 7 856 2307',
                '+226 7 271 4731',
                '+226 7 870 3582',
                '+226 7 799 5644',
                '+226 7 182 1268',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('burma', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '02 869 6362',
                '02 878 2465',
                '02 446 0658',
                '02 828 1654',
                '02 624 5561',
                '02 796 5234',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+95 02 869 6362',
                '+95 02 878 2465',
                '+95 02 446 0658',
                '+95 02 828 1654',
                '+95 02 624 5561',
                '+95 02 796 5234',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('burundi', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '556 7858',
                '884 7213',
                '162 7379',
                '842 1029',
                '491 6853',
                '605 8298',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+257 556 7858',
                '+257 884 7213',
                '+257 162 7379',
                '+257 842 1029',
                '+257 491 6853',
                '+257 605 8298',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('cambodia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '09 034 8646',
                '09 997 9920',
                '09 299 7056',
                '09 668 0390',
                '09 463 5312',
                '09 923 5131',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+855 09 034 8646',
                '+855 09 997 9920',
                '+855 09 299 7056',
                '+855 09 668 0390',
                '+855 09 463 5312',
                '+855 09 923 5131',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('cameroon', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '9 372 8970',
                '9 618 3293',
                '9 988 5356',
                '9 535 4782',
                '9 234 4679',
                '9 726 1656',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+237 9 372 8970',
                '+237 9 618 3293',
                '+237 9 988 5356',
                '+237 9 535 4782',
                '+237 9 234 4679',
                '+237 9 726 1656',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('canada', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '613-555-0122',
                '613-555-0178',
                '613-555-0133',
                '613-555-0189',
                '613-555-0162',
                '613-555-0172',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1-613-555-0122',
                '+1-613-555-0178',
                '+1-613-555-0133',
                '+1-613-555-0189',
                '+1-613-555-0162',
                '+1-613-555-0172',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('cape_verde', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '658 5558',
                '573 6777',
                '296 2897',
                '272 0310',
                '857 6040',
                '242 0477',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+238 658 5558',
                '+238 573 6777',
                '+238 296 2897',
                '+238 272 0310',
                '+238 857 6040',
                '+238 242 0477',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('cayman_islands', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '345 667 4378',
                '345 282 2406',
                '345 543 3748',
                '345 267 4370',
                '345 607 7620',
                '345 459 5177',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 345 667 4378',
                '+1 345 282 2406',
                '+1 345 543 3748',
                '+1 345 267 4370',
                '+1 345 607 7620',
                '+1 345 459 5177',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('central_african_republic', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '2 258 8495',
                '2 410 9231',
                '2 252 1685',
                '2 786 1990',
                '2 279 8577',
                '2 491 5371',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+236 2 258 8495',
                '+236 2 410 9231',
                '+236 2 252 1685',
                '+236 2 786 1990',
                '+236 2 279 8577',
                '+236 2 491 5371',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('chad', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '6 322 5282',
                '6 283 7025',
                '6 109 1439',
                '6 564 6419',
                '6 176 8409',
                '6 861 6020',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+235 6 322 5282',
                '+235 6 283 7025',
                '+235 6 109 1439',
                '+235 6 564 6419',
                '+235 6 176 8409',
                '+235 6 861 6020',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('chile', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '61 980 4699',
                '61 748 2421',
                '61 359 7690',
                '61 636 8730',
                '61 697 2759',
                '61 365 0025',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+56 61 980 4699',
                '+56 61 748 2421',
                '+56 61 359 7690',
                '+56 61 636 8730',
                '+56 61 697 2759',
                '+56 61 365 0025',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('china', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '591 102 9175',
                '591 151 2791',
                '591 297 9839',
                '591 888 3249',
                '591 970 3728',
                '591 560 2958',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+86 591 102 9175',
                '+86 591 151 2791',
                '+86 591 297 9839',
                '+86 591 888 3249',
                '+86 591 970 3728',
                '+86 591 560 2958',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('colombia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '350 312 6126',
                '350 067 0988',
                '350 090 6283',
                '350 227 5115',
                '350 786 0738',
                '350 660 3597',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+57 350 312 6126',
                '+57 350 067 0988',
                '+57 350 090 6283',
                '+57 350 227 5115',
                '+57 350 786 0738',
                '+57 350 660 3597',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('comoros', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '243 3021',
                '614 5204',
                '893 9045',
                '735 2529',
                '149 9146',
                '064 1950',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+269 243 3021',
                '+269 614 5204',
                '+269 893 9045',
                '+269 735 2529',
                '+269 149 9146',
                '+269 064 1950',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('congo_brazaville', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '22 245 1049',
                '22 778 7401',
                '22 203 9091',
                '22 187 4542',
                '22 010 2744',
                '22 502 8828',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+242 22 245 1049',
                '+242 22 778 7401',
                '+242 22 203 9091',
                '+242 22 187 4542',
                '+242 22 010 2744',
                '+242 22 502 8828',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('congo_kinshasa', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '80 368 2308',
                '80 318 8381',
                '80 990 9905',
                '80 605 0614',
                '80 847 3563',
                '80 940 5569',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+243 80 368 2308',
                '+243 80 318 8381',
                '+243 80 990 9905',
                '+243 80 605 0614',
                '+243 80 847 3563',
                '+243 80 940 5569',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('costa_rica', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '2 838 7883',
                '2 726 9132',
                '2 193 9700',
                '2 819 9464',
                '2 686 8122',
                '2 745 7438',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+506 2 838 7883',
                '+506 2 726 9132',
                '+506 2 193 9700',
                '+506 2 819 9464',
                '+506 2 686 8122',
                '+506 2 745 7438',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('cote_divoire', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '2 253 1698',
                '2 824 8905',
                '2 866 7507',
                '2 372 9751',
                '2 070 5344',
                '2 443 0657',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+225 2 253 1698',
                '+225 2 824 8905',
                '+225 2 866 7507',
                '+225 2 372 9751',
                '+225 2 070 5344',
                '+225 2 443 0657',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('croatia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '99 022 1530',
                '99 178 0124',
                '99 289 5428',
                '99 638 3988',
                '99 431 1535',
                '99 423 7230',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+385 99 022 1530',
                '+385 99 178 0124',
                '+385 99 289 5428',
                '+385 99 638 3988',
                '+385 99 431 1535',
                '+385 99 423 7230',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('cuba', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '555 978 4397',
                '555 253 3651',
                '555 868 4205',
                '555 639 8082',
                '555 841 8699',
                '555 898 4154',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+53 555 978 4397',
                '+53 555 253 3651',
                '+53 555 868 4205',
                '+53 555 639 8082',
                '+53 555 841 8699',
                '+53 555 898 4154',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('curacao', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '9 165 7419',
                '9 205 0365',
                '9 408 4168',
                '9 918 9477',
                '9 892 3548',
                '9 977 5327',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+599 9 165 7419',
                '+599 9 205 0365',
                '+599 9 408 4168',
                '+599 9 918 9477',
                '+599 9 892 3548',
                '+599 9 977 5327',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('cyprus', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '9 745 8811',
                '9 169 4770',
                '9 104 7705',
                '9 751 8367',
                '9 286 2853',
                '9 980 1604',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+357 9 745 8811',
                '+357 9 169 4770',
                '+357 9 104 7705',
                '+357 9 751 8367',
                '+357 9 286 2853',
                '+357 9 980 1604',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('czech_republic', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '77 125 7001',
                '77 024 5138',
                '77 690 6326',
                '77 652 9506',
                '77 572 2588',
                '77 509 9904',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+420 77 125 7001',
                '+420 77 024 5138',
                '+420 77 690 6326',
                '+420 77 652 9506',
                '+420 77 572 2588',
                '+420 77 509 9904',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('denmark', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '7 109 5691',
                '7 248 1398',
                '7 782 4635',
                '7 191 0951',
                '7 013 3189',
                '7 660 0503',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+42 7 109 5691',
                '+42 7 248 1398',
                '+42 7 782 4635',
                '+42 7 191 0951',
                '+42 7 013 3189',
                '+42 7 660 0503',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('diego_garcia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '772 4743',
                '329 6565',
                '758 6806',
                '146 2162',
                '960 4065',
                '257 7279',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+246 772 4743',
                '+246 329 6565',
                '+246 758 6806',
                '+246 146 2162',
                '+246 960 4065',
                '+246 257 7279',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('djibouti', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '2 507 3877',
                '2 836 3181',
                '2 724 1910',
                '2 634 8109',
                '2 769 4763',
                '2 474 6728',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+253 2 507 3877',
                '+253 2 836 3181',
                '+253 2 724 1910',
                '+253 2 634 8109',
                '+253 2 769 4763',
                '+253 2 474 6728',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('dominica', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '864 1618',
                '149 1212',
                '621 5738',
                '042 1453',
                '588 3953',
                '790 8330',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1767 864 1618',
                '+1767 149 1212',
                '+1767 621 5738',
                '+1767 042 1453',
                '+1767 588 3953',
                '+1767 790 8330',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('dominican_republic', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '044 5634',
                '015 2545',
                '961 2851',
                '404 3013',
                '731 1027',
                '329 7041',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1829 044 5634',
                '+1829 015 2545',
                '+1829 961 2851',
                '+1829 404 3013',
                '+1829 731 1027',
                '+1829 329 7041',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('east_timor', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '111 4288',
                '679 4473',
                '004 4804',
                '188 4229',
                '610 3010',
                '451 2255',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+670 111 4288',
                '+670 679 4473',
                '+670 004 4804',
                '+670 188 4229',
                '+670 610 3010',
                '+670 451 2255',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('ecuador', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '96 723 3098',
                '96 771 0298',
                '96 190 3673',
                '96 319 3083',
                '96 159 1841',
                '96 879 6350',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+593 96 723 3098',
                '+593 96 771 0298',
                '+593 96 190 3673',
                '+593 96 319 3083',
                '+593 96 159 1841',
                '+593 96 879 6350',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('egypt', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '117 812 4841',
                '117 148 4786',
                '117 160 0451',
                '117 548 1025',
                '117 314 8482',
                '117 517 1380',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+20 117 812 4841',
                '+20 117 148 4786',
                '+20 117 160 0451',
                '+20 117 548 1025',
                '+20 117 314 8482',
                '+20 117 517 1380',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('el_salvador', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '77 4557 5075',
                '77 7993 9385',
                '77 6389 9120',
                '77 5524 4287',
                '77 4332 1339',
                '77 3863 3287',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+503 77 4557 5075',
                '+503 77 7993 9385',
                '+503 77 6389 9120',
                '+503 77 5524 4287',
                '+503 77 4332 1339',
                '+503 77 3863 3287',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('eritrea', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '594 9552',
                '053 0123',
                '838 1090',
                '089 8313',
                '128 0532',
                '303 8049',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+291 594 9552',
                '+291 053 0123',
                '+291 838 1090',
                '+291 089 8313',
                '+291 128 0532',
                '+291 303 8049',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('estonia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '294 6941',
                '972 8604',
                '904 2527',
                '870 8749',
                '892 0217',
                '634 3728',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+372 294 6941',
                '+372 972 8604',
                '+372 904 2527',
                '+372 870 8749',
                '+372 892 0217',
                '+372 634 3728',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('ethiopia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '11 049 4688',
                '11 489 3161',
                '11 306 8083',
                '11 393 6415',
                '11 815 7263',
                '11 578 8064',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+251 11 049 4688',
                '+251 11 489 3161',
                '+251 11 306 8083',
                '+251 11 393 6415',
                '+251 11 815 7263',
                '+251 11 578 8064',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('falkland_islands', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '95500',
                '17049',
                '90001',
                '71319',
                '13381',
                '77653',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+500 95500',
                '+500 17049',
                '+500 90001',
                '+500 71319',
                '+500 13381',
                '+500 77653',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('faroe_islands', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '918332',
                '822023',
                '910228',
                '188158',
                '086834',
                '629779',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+298 918332',
                '+298 822023',
                '+298 910228',
                '+298 188158',
                '+298 086834',
                '+298 629779',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('fiji', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '698 5817',
                '403 4325',
                '591 5565',
                '217 6997',
                '668 0335',
                '935 0780',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+679 698 5817',
                '+679 403 4325',
                '+679 591 5565',
                '+679 217 6997',
                '+679 668 0335',
                '+679 935 0780',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('finland', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '40 789 0209',
                '40 559 1275',
                '40 702 2536',
                '40 357 1168',
                '40 677 5740',
                '40 235 5827',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+358 40 789 0209',
                '+358 40 559 1275',
                '+358 40 702 2536',
                '+358 40 357 1168',
                '+358 40 677 5740',
                '+358 40 235 5827',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('france', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '93 487 2643',
                '93 182 3751',
                '93 119 1943',
                '93 983 5128',
                '93 737 9760',
                '93 235 0609',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+33 93 487 2643',
                '+33 93 182 3751',
                '+33 93 119 1943',
                '+33 93 983 5128',
                '+33 93 737 9760',
                '+33 93 235 0609',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('french_antilles', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '1086 1203',
                '8601 8729',
                '3219 2344',
                '9173 4706',
                '0505 9102',
                '0880 4599',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+596 1086 1203',
                '+596 8601 8729',
                '+596 3219 2344',
                '+596 9173 4706',
                '+596 0505 9102',
                '+596 0880 4599',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('french_guiana', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '59 0753 0867',
                '59 1254 0778',
                '59 4148 5227',
                '59 4258 8056',
                '59 7821 6932',
                '59 7402 5485',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+594 59 0753 0867',
                '+594 59 1254 0778',
                '+594 59 4148 5227',
                '+594 59 4258 8056',
                '+594 59 7821 6932',
                '+594 59 7402 5485',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('french_polynesia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '725976',
                '583046',
                '635895',
                '179438',
                '792644',
                '402940',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+689 725976',
                '+689 583046',
                '+689 635895',
                '+689 179438',
                '+689 792644',
                '+689 402940',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('gabon', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '211643',
                '069519',
                '407007',
                '102163',
                '478129',
                '770490',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+241 211643',
                '+241 069519',
                '+241 407007',
                '+241 102163',
                '+241 478129',
                '+241 770490',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('gambia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '531 4329',
                '479 3705',
                '638 9906',
                '739 9644',
                '556 8599',
                '011 6592',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+220 531 4329',
                '+220 479 3705',
                '+220 638 9906',
                '+220 739 9644',
                '+220 556 8599',
                '+220 011 6592',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('georgia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '555 110222',
                '555 231941',
                '555 616979',
                '555 159681',
                '555 521440',
                '555 211312',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+995 555 110222',
                '+995 555 231941',
                '+995 555 616979',
                '+995 555 159681',
                '+995 555 521440',
                '+995 555 211312',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('germany', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '30 897053596',
                '30 088686226',
                '30 167985641',
                '30 674447737',
                '30 985019346',
                '30 815307602',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+49 30 897053596',
                '+49 30 088686226',
                '+49 30 167985641',
                '+49 30 674447737',
                '+49 30 985019346',
                '+49 30 815307602',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('ghana', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '30 058 4171',
                '30 957 4783',
                '30 173 9098',
                '30 263 6891',
                '30 032 6420',
                '30 135 7806',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+233 30 058 4171',
                '+233 30 957 4783',
                '+233 30 173 9098',
                '+233 30 263 6891',
                '+233 30 032 6420',
                '+233 30 135 7806',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('gibraltar', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '14576',
                '20017',
                '70632',
                '92725',
                '71983',
                '48213',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+350 14576',
                '+350 20017',
                '+350 70632',
                '+350 92725',
                '+350 71983',
                '+350 48213',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('greece', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '21 6993 1001',
                '21 5154 9078',
                '21 1408 6228',
                '21 1379 2972',
                '21 1712 8256',
                '21 4753 4356',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+350 21 6993 1001',
                '+350 21 5154 9078',
                '+350 21 1408 6228',
                '+350 21 1379 2972',
                '+350 21 1712 8256',
                '+350 21 4753 4356',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('greenland', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '110948',
                '198494',
                '091905',
                '023252',
                '326253',
                '967582',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+299 110948',
                '+299 198494',
                '+299 091905',
                '+299 023252',
                '+299 326253',
                '+299 967582',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('grenada', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '473 240 3871',
                '473 071 4379',
                '473 847 0306',
                '473 866 3539',
                '473 165 5760',
                '473 284 8858',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 473 240 3871',
                '+1 473 071 4379',
                '+1 473 847 0306',
                '+1 473 866 3539',
                '+1 473 165 5760',
                '+1 473 284 8858',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('guadeloupe', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '590 760598',
                '590 841904',
                '590 893749',
                '590 477882',
                '590 800123',
                '590 767116',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+590 590 760598',
                '+590 590 841904',
                '+590 590 893749',
                '+590 590 477882',
                '+590 590 800123',
                '+590 590 767116',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('guam', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '671 955 3730',
                '671 470 5611',
                '671 772 0894',
                '671 257 2706',
                '671 572 5472',
                '671 219 0503',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 671 955 3730',
                '+1 671 470 5611',
                '+1 671 772 0894',
                '+1 671 257 2706',
                '+1 671 572 5472',
                '+1 671 219 0503',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('guatemala', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '013 6758',
                '139 3737',
                '104 9819',
                '193 0425',
                '572 1935',
                '161 8170',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+502 013 6758',
                '+502 139 3737',
                '+502 104 9819',
                '+502 193 0425',
                '+502 572 1935',
                '+502 161 8170',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('guinea', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '624 379363',
                '624 633764',
                '624 851261',
                '624 617437',
                '624 416746',
                '624 028094',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+224 624 379363',
                '+224 624 633764',
                '+224 624 851261',
                '+224 624 617437',
                '+224 624 416746',
                '+224 624 028094',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('guinea_bissau', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '231 7959',
                '821 8520',
                '924 4397',
                '878 2159',
                '182 5290',
                '450 6518',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+245 231 7959',
                '+245 821 8520',
                '+245 924 4397',
                '+245 878 2159',
                '+245 182 5290',
                '+245 450 6518',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('guyana', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '557 6875',
                '157 1514',
                '509 2075',
                '420 2777',
                '854 8999',
                '785 1257',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+592 557 6875',
                '+592 157 1514',
                '+592 509 2075',
                '+592 420 2777',
                '+592 854 8999',
                '+592 785 1257',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('haiti', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '502 5700',
                '761 0469',
                '919 4242',
                '734 8078',
                '506 6631',
                '491 8523',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+509 502 5700',
                '+509 761 0469',
                '+509 919 4242',
                '+509 734 8078',
                '+509 506 6631',
                '+509 491 8523',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('honduras', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '786 3770',
                '300 9774',
                '985 8581',
                '394 9243',
                '473 0243',
                '102 0167',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+504 786 3770',
                '+504 300 9774',
                '+504 985 8581',
                '+504 394 9243',
                '+504 473 0243',
                '+504 102 0167',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('hong_kong', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '1599 0372',
                '8409 5606',
                '7132 7642',
                '8294 0950',
                '1418 9709',
                '3871 3259',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+852 1599 0372',
                '+852 8409 5606',
                '+852 7132 7642',
                '+852 8294 0950',
                '+852 1418 9709',
                '+852 3871 3259',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('hungary', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '06 55 993 456',
                '06 55 043 632',
                '06 55 977 924',
                '06 55 139 743',
                '06 55 874 745',
                '06 55 259 042',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+36 55 993 456',
                '+36 55 043 632',
                '+36 55 977 924',
                '+36 55 139 743',
                '+36 55 874 745',
                '+36 55 259 042',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('iceland', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '138 5675',
                '346 2918',
                '298 7530',
                '998 8269',
                '420 7080',
                '941 7859',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+354 138 5675',
                '+354 346 2918',
                '+354 298 7530',
                '+354 998 8269',
                '+354 420 7080',
                '+354 941 7859',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('india', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '385 280 2707',
                '385 706 1085',
                '385 153 2921',
                '385 997 3673',
                '385 333 6053',
                '385 553 8630',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+91 385 280 2707',
                '+91 385 706 1085',
                '+91 385 153 2921',
                '+91 385 997 3673',
                '+91 385 333 6053',
                '+91 385 553 8630',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('indonesia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '77 9514 0010',
                '77 3550 5126',
                '77 9897 4704',
                '77 8826 4045',
                '77 5220 7531',
                '77 8278 9741',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+62 77 9514 0010',
                '+62 77 3550 5126',
                '+62 77 9897 4704',
                '+62 77 8826 4045',
                '+62 77 5220 7531',
                '+62 77 8278 9741',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('iran', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '920 395 5072',
                '920 540 7774',
                '920 908 2910',
                '920 198 8327',
                '920 958 5751',
                '920 143 8341',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+98 920 395 5072',
                '+98 920 540 7774',
                '+98 920 908 2910',
                '+98 920 198 8327',
                '+98 920 958 5751',
                '+98 920 143 8341',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('iraq', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '72 587 6783',
                '72 409 6550',
                '72 819 4442',
                '72 450 8625',
                '72 382 7898',
                '72 337 9314',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+964 72 587 6783',
                '+964 72 409 6550',
                '+964 72 819 4442',
                '+964 72 450 8625',
                '+964 72 382 7898',
                '+964 72 337 9314',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('ireland', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '020 919 3784',
                '020 913 1424',
                '020 917 4642',
                '020 918 2349',
                '020 911 9472',
                '020 916 6191',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+353 20 919 3784',
                '+353 20 913 1424',
                '+353 20 917 4642',
                '+353 20 918 2349',
                '+353 20 911 9472',
                '+353 20 916 6191',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('israel', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '55 783 1786',
                '55 458 4076',
                '55 448 0000',
                '55 130 6298',
                '55 491 1394',
                '55 152 2448',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+972 55 783 1786',
                '+972 55 458 4076',
                '+972 55 448 0000',
                '+972 55 130 6298',
                '+972 55 491 1394',
                '+972 55 152 2448',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('italy', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '06 995 0140',
                '06 486 0080',
                '06 708 0251',
                '06 676 6256',
                '06 960 1307',
                '06 192 8160',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+39 06 995 0140',
                '+39 06 486 0080',
                '+39 06 708 0251',
                '+39 06 676 6256',
                '+39 06 960 1307',
                '+39 06 192 8160',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('jamaica', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '879 013 4479',
                '879 046 2638',
                '879 848 9008',
                '879 618 0700',
                '879 777 2034',
                '879 787 7132',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 879 013 4479',
                '+1 879 046 2638',
                '+1 879 848 9008',
                '+1 879 618 0700',
                '+1 879 777 2034',
                '+1 879 787 7132',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('japan', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '75 366 7077',
                '75 441 0723',
                '75 563 3717',
                '75 671 1380',
                '75 073 6627',
                '75 573 3883',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+81 75 366 7077',
                '+81 75 441 0723',
                '+81 75 563 3717',
                '+81 75 671 1380',
                '+81 75 073 6627',
                '+81 75 573 3883',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('jordan', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '7 446 9217',
                '7 455 0758',
                '7 321 2881',
                '7 215 1008',
                '7 404 6512',
                '7 016 0368',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+962 7 446 9217',
                '+962 7 455 0758',
                '+962 7 321 2881',
                '+962 7 215 1008',
                '+962 7 404 6512',
                '+962 7 016 0368',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('kazakhstan', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '711 794 5714',
                '711 984 7601',
                '711 596 2729',
                '711 582 3155',
                '711 439 3932',
                '711 134 7717',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+7 711 794 5714',
                '+7 711 984 7601',
                '+7 711 596 2729',
                '+7 711 582 3155',
                '+7 711 439 3932',
                '+7 711 134 7717',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('kenya', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '732 809686',
                '732 156069',
                '732 105108',
                '732 675825',
                '732 931421',
                '732 258405',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+7 732 809686',
                '+7 732 156069',
                '+7 732 105108',
                '+7 732 675825',
                '+7 732 931421',
                '+7 732 258405',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('kiribati', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '71744',
                '33654',
                '93477',
                '02979',
                '95711',
                '09689',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+686 71744',
                '+686 33654',
                '+686 93477',
                '+686 02979',
                '+686 95711',
                '+686 09689',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('kuwait', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '2003 8127',
                '2364 4185',
                '2273 3661',
                '2780 6906',
                '2061 9958',
                '2909 3444',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+965 2003 8127',
                '+965 2364 4185',
                '+965 2273 3661',
                '+965 2780 6906',
                '+965 2061 9958',
                '+965 2909 3444',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('kyrgyz_republic', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '312 688199',
                '312 146874',
                '312 590179',
                '312 656835',
                '312 184340',
                '312 032254',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+996 312 688199',
                '+996 312 146874',
                '+996 312 590179',
                '+996 312 656835',
                '+996 312 184340',
                '+996 312 032254',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('laos', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '20 6280 5325',
                '20 2889 8478',
                '20 5988 7851',
                '20 1933 7811',
                '20 3110 0934',
                '20 2867 8840',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+856 20 6280 5325',
                '+856 20 2889 8478',
                '+856 20 5988 7851',
                '+856 20 1933 7811',
                '+856 20 3110 0934',
                '+856 20 2867 8840',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('latvia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '3551 7975',
                '5527 0367',
                '7820 7202',
                '1756 6005',
                '2132 6587',
                '4313 6059',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+371 3551 7975',
                '+371 5527 0367',
                '+371 7820 7202',
                '+371 1756 6005',
                '+371 2132 6587',
                '+371 4313 6059',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('lebanon', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '76 521 898',
                '76 005 084',
                '76 702 831',
                '76 919 629',
                '76 160 250',
                '76 087 228',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+961 76 521 898',
                '+961 76 005 084',
                '+961 76 702 831',
                '+961 76 919 629',
                '+961 76 160 250',
                '+961 76 087 228',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('lesotho', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '5640 6067',
                '8018 8825',
                '7605 0379',
                '5228 3478',
                '3877 1488',
                '8831 3252',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+266 5640 6067',
                '+266 8018 8825',
                '+266 7605 0379',
                '+266 5228 3478',
                '+266 3877 1488',
                '+266 8831 3252',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('liberia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '88 366 7200',
                '88 964 5071',
                '88 332 0242',
                '88 435 6280',
                '88 318 8540',
                '88 272 2969',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+231 88 366 7200',
                '+231 88 964 5071',
                '+231 88 332 0242',
                '+231 88 435 6280',
                '+231 88 318 8540',
                '+231 88 272 2969',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('libya', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '91 537 1539',
                '91 660 5364',
                '91 438 9284',
                '91 506 8938',
                '91 672 0900',
                '91 400 2432',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+218 91 537 1539',
                '+218 91 660 5364',
                '+218 91 438 9284',
                '+218 91 506 8938',
                '+218 91 672 0900',
                '+218 91 400 2432',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('liechtenstein', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '353 4289',
                '167 0678',
                '786 6460',
                '677 8074',
                '398 2572',
                '685 4463',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+423 353 4289',
                '+423 167 0678',
                '+423 786 6460',
                '+423 677 8074',
                '+423 398 2572',
                '+423 685 4463',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('lithuania', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '686 24540',
                '686 92198',
                '686 79224',
                '686 71623',
                '686 85525',
                '686 58641',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+370 686 24540',
                '+370 686 92198',
                '+370 686 79224',
                '+370 686 71623',
                '+370 686 85525',
                '+370 686 58641',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('luxembourg', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '493312',
                '191229',
                '359196',
                '168995',
                '211884',
                '808188',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+370 493312',
                '+370 191229',
                '+370 359196',
                '+370 168995',
                '+370 211884',
                '+370 808188',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('macao', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '5226 1572',
                '4771 1580',
                '3498 6149',
                '5628 0082',
                '7971 8610',
                '2290 9197',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+853 5226 1572',
                '+853 4771 1580',
                '+853 3498 6149',
                '+853 5628 0082',
                '+853 7971 8610',
                '+853 2290 9197',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('macedonia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '2 762 7958',
                '2 530 2414',
                '2 091 7463',
                '2 191 8285',
                '2 198 9797',
                '2 935 1125',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+389 2 762 7958',
                '+389 2 530 2414',
                '+389 2 091 7463',
                '+389 2 191 8285',
                '+389 2 198 9797',
                '+389 2 935 1125',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('madagascar', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '824 7492',
                '962 9337',
                '788 5297',
                '437 3273',
                '985 4392',
                '759 6724',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+261 824 7492',
                '+261 962 9337',
                '+261 788 5297',
                '+261 437 3273',
                '+261 985 4392',
                '+261 759 6724',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('malawi', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '406503269',
                '845141090',
                '979801509',
                '278461527',
                '677839623',
                '713166219',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+265 406503269',
                '+265 845141090',
                '+265 979801509',
                '+265 278461527',
                '+265 677839623',
                '+265 713166219',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('malaysia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '2 578 4281',
                '2 667 1240',
                '2 180 7438',
                '2 086 3266',
                '2 857 5745',
                '2 052 0106',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+60 2 578 4281',
                '+60 2 667 1240',
                '+60 2 180 7438',
                '+60 2 086 3266',
                '+60 2 857 5745',
                '+60 2 052 0106',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('maldives', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '786 2595',
                '621 2305',
                '981 6976',
                '700 8025',
                '445 3244',
                '594 9639',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+960 786 2595',
                '+960 621 2305',
                '+960 981 6976',
                '+960 700 8025',
                '+960 445 3244',
                '+960 594 9639',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('mali', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '6135 2598',
                '1971 6478',
                '9182 4110',
                '1173 8270',
                '7723 0240',
                '4548 6217',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+223 6135 2598',
                '+223 1971 6478',
                '+223 9182 4110',
                '+223 1173 8270',
                '+223 7723 0240',
                '+223 4548 6217',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('malta', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '4761 0604',
                '1612 1733',
                '4398 2363',
                '1976 3886',
                '8491 0555',
                '3237 3930',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+356 4761 0604',
                '+356 1612 1733',
                '+356 4398 2363',
                '+356 1976 3886',
                '+356 8491 0555',
                '+356 3237 3930',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('marshall_islands', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '637 1475',
                '487 1462',
                '950 7447',
                '460 3294',
                '548 0245',
                '914 4656',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+692 637 1475',
                '+692 487 1462',
                '+692 950 7447',
                '+692 460 3294',
                '+692 548 0245',
                '+692 914 4656',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('martinique', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '596 842 6601',
                '596 048 7749',
                '596 337 8750',
                '596 381 4062',
                '596 329 7892',
                '596 404 3206',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+596 596 842 6601',
                '+596 596 048 7749',
                '+596 596 337 8750',
                '+596 596 381 4062',
                '+596 596 329 7892',
                '+596 596 404 3206',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('mauritania', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '559 7799',
                '439 1468',
                '189 5874',
                '451 9158',
                '386 1606',
                '228 6703',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+222 559 7799',
                '+222 439 1468',
                '+222 189 5874',
                '+222 451 9158',
                '+222 386 1606',
                '+222 228 6703',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('mauritius', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '567 0585',
                '693 2057',
                '930 6796',
                '825 5132',
                '044 7862',
                '051 8066',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+230 567 0585',
                '+230 693 2057',
                '+230 930 6796',
                '+230 825 5132',
                '+230 044 7862',
                '+230 051 8066',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('mayotte_and_reunion', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '639 249559',
                '639 917888',
                '639 175036',
                '639 939079',
                '639 469037',
                '639 554167',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+262 639 249559',
                '+262 639 917888',
                '+262 639 175036',
                '+262 639 939079',
                '+262 639 469037',
                '+262 639 554167',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('mexico', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '888 296 3645',
                '888 699 5294',
                '888 649 5761',
                '888 097 6091',
                '888 290 0582',
                '888 846 8170',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+52 888 296 3645',
                '+52 888 699 5294',
                '+52 888 649 5761',
                '+52 888 097 6091',
                '+52 888 290 0582',
                '+52 888 846 8170',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('micronesia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '866 0575',
                '359 7167',
                '492 6560',
                '542 2623',
                '022 6388',
                '960 8984',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+691 866 0575',
                '+691 359 7167',
                '+691 492 6560',
                '+691 542 2623',
                '+691 022 6388',
                '+691 960 8984',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('moldova', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '777 16890',
                '777 25502',
                '777 43797',
                '777 55921',
                '777 71554',
                '777 94014',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+373 777 16890',
                '+373 777 25502',
                '+373 777 43797',
                '+373 777 55921',
                '+373 777 71554',
                '+373 777 94014',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('monaco', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '0102 4157',
                '2725 1417',
                '3978 7166',
                '3270 9895',
                '8764 7289',
                '1684 9878',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+377 0102 4157',
                '+377 2725 1417',
                '+377 3978 7166',
                '+377 3270 9895',
                '+377 8764 7289',
                '+377 1684 9878',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('mongolia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '99 246179',
                '99 704641',
                '99 984744',
                '99 881187',
                '99 257410',
                '99 011494',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+976 99 246179',
                '+976 99 704641',
                '+976 99 984744',
                '+976 99 881187',
                '+976 99 257410',
                '+976 99 011494',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('montenegro', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '63 938188',
                '63 552705',
                '63 212312',
                '63 670036',
                '63 638012',
                '63 391640',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+382 63 938188',
                '+382 63 552705',
                '+382 63 212312',
                '+382 63 670036',
                '+382 63 638012',
                '+382 63 391640',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('montserrat', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '664 746 6751',
                '664 343 8124',
                '664 275 9749',
                '664 409 5292',
                '664 223 5447',
                '664 860 7146',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 664 746 6751',
                '+1 664 343 8124',
                '+1 664 275 9749',
                '+1 664 409 5292',
                '+1 664 223 5447',
                '+1 664 860 7146',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('morocco', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '61 377 8577',
                '61 261 2378',
                '61 362 5596',
                '61 728 2467',
                '61 534 2954',
                '61 168 0079',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+212 61 377 8577',
                '+212 61 261 2378',
                '+212 61 362 5596',
                '+212 61 728 2467',
                '+212 61 534 2954',
                '+212 61 168 0079',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('mozambique', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '84 287 0756',
                '84 007 1253',
                '84 414 3920',
                '84 238 6780',
                '84 736 9895',
                '84 348 5973',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+27 84 287 0756',
                '+27 84 007 1253',
                '+27 84 414 3920',
                '+27 84 238 6780',
                '+27 84 736 9895',
                '+27 84 348 5973',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('myanmar', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '99 06021',
                '99 35463',
                '99 98521',
                '99 30220',
                '99 56693',
                '99 56028',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+95 99 06021',
                '+95 99 35463',
                '+95 99 98521',
                '+95 99 30220',
                '+95 99 56693',
                '+95 99 56028',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('namibia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '63 503724',
                '63 128451',
                '63 880643',
                '63 577678',
                '63 589762',
                '63 957111',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+264 63 503724',
                '+264 63 128451',
                '+264 63 880643',
                '+264 63 577678',
                '+264 63 589762',
                '+264 63 957111',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('nauru', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '981 2592',
                '768 6658',
                '634 2823',
                '053 9484',
                '388 5379',
                '565 0894',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+674 981 2592',
                '+674 768 6658',
                '+674 634 2823',
                '+674 053 9484',
                '+674 388 5379',
                '+674 565 0894',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('nepal', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '985 447 4919',
                '985 810 7959',
                '985 477 0562',
                '985 335 4345',
                '985 993 3816',
                '985 956 5938',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+977 985 447 4919',
                '+977 985 810 7959',
                '+977 985 477 0562',
                '+977 985 335 4345',
                '+977 985 993 3816',
                '+977 985 956 5938',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('netherlands', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '71 903 6450',
                '71 246 2581',
                '71 494 7779',
                '71 306 8478',
                '71 289 9556',
                '71 165 9687',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+31 71 903 6450',
                '+31 71 246 2581',
                '+31 71 494 7779',
                '+31 71 306 8478',
                '+31 71 289 9556',
                '+31 71 165 9687',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('new_caledonia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '514486',
                '350070',
                '774812',
                '914457',
                '277234',
                '052402',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+687 514486',
                '+687 350070',
                '+687 774812',
                '+687 914457',
                '+687 277234',
                '+687 052402',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('new_zealand', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '3 158 0694',
                '3 106 5640',
                '3 737 6380',
                '3 486 6260',
                '3 100 5192',
                '3 108 8429',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+64 3 158 0694',
                '+64 3 106 5640',
                '+64 3 737 6380',
                '+64 3 486 6260',
                '+64 3 100 5192',
                '+64 3 108 8429',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('nicaragua', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '0053 0893',
                '5659 2773',
                '9443 8578',
                '0833 2937',
                '4622 0048',
                '5603 8623',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+505 0053 0893',
                '+505 5659 2773',
                '+505 9443 8578',
                '+505 0833 2937',
                '+505 4622 0048',
                '+505 5603 8623',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('niger', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '20 182148',
                '20 583536',
                '20 792095',
                '20 268920',
                '20 687821',
                '20 384376',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+227 20 182148',
                '+227 20 583536',
                '+227 20 792095',
                '+227 20 268920',
                '+227 20 687821',
                '+227 20 384376',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('nigeria', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '706 707 3799',
                '706 616 9683',
                '706 643 4849',
                '706 742 9199',
                '706 311 8658',
                '706 749 8532',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+234 706 707 3799',
                '+234 706 616 9683',
                '+234 706 643 4849',
                '+234 706 742 9199',
                '+234 706 311 8658',
                '+234 706 749 8532',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('north_korea', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '401 0291',
                '022 9674',
                '833 8466',
                '376 2137',
                '286 7927',
                '257 8729',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '401 0291',
                '022 9674',
                '833 8466',
                '376 2137',
                '286 7927',
                '257 8729',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('northern_mariana_islands', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '670 150 3929',
                '670 619 0689',
                '670 991 8461',
                '670 512 5577',
                '670 856 2363',
                '670 866 8073',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 670 150 3929',
                '+1 670 619 0689',
                '+1 670 991 8461',
                '+1 670 512 5577',
                '+1 670 856 2363',
                '+1 670 866 8073',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('norway', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '0533 3076',
                '5957 8263',
                '2143 3480',
                '4292 7739',
                '1408 0810',
                '5850 8632',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+47 0533 3076',
                '+47 5957 8263',
                '+47 2143 3480',
                '+47 4292 7739',
                '+47 1408 0810',
                '+47 5850 8632',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('oman', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '9009 1283',
                '8528 1863',
                '4613 1369',
                '6679 0265',
                '4657 2027',
                '0434 0205',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+968 9009 1283',
                '+968 8528 1863',
                '+968 4613 1369',
                '+968 6679 0265',
                '+968 4657 2027',
                '+968 0434 0205',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('pakistan', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '7081318',
                '207 4895',
                '411 8627',
                '254 5011',
                '241 8211',
                '894 0829',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+92 7081318',
                '+92 207 4895',
                '+92 411 8627',
                '+92 254 5011',
                '+92 241 8211',
                '+92 894 0829',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('palau', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '469 1911',
                '530 4372',
                '568 1357',
                '910 4734',
                '354 0685',
                '718 3902',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+680 469 1911',
                '+680 530 4372',
                '+680 568 1357',
                '+680 910 4734',
                '+680 354 0685',
                '+680 718 3902',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('palestine', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '8 641 0764',
                '8 949 1642',
                '8 857 9199',
                '8 227 1864',
                '8 040 8301',
                '8 346 4658',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+970 8 641 0764',
                '+970 8 949 1642',
                '+970 8 857 9199',
                '+970 8 227 1864',
                '+970 8 040 8301',
                '+970 8 346 4658',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('panama', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '087 9433',
                '373 1688',
                '390 1817',
                '623 7804',
                '376 5958',
                '739 7541',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+507 087 9433',
                '+507 373 1688',
                '+507 390 1817',
                '+507 623 7804',
                '+507 376 5958',
                '+507 739 7541',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('papua_new_guinea', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '701 6954',
                '064 9296',
                '113 0105',
                '660 7036',
                '150 7335',
                '185 0902',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+675 701 6954',
                '+675 064 9296',
                '+675 113 0105',
                '+675 660 7036',
                '+675 150 7335',
                '+675 185 0902',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('paraguay', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '985 206836',
                '985 449344',
                '985 371672',
                '985 312492',
                '985 797548',
                '985 939390',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+595 985 206836',
                '+595 985 449344',
                '+595 985 371672',
                '+595 985 312492',
                '+595 985 797548',
                '+595 985 939390',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('peru', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '41 096086020',
                '41 319077076',
                '41 355265899',
                '41 644062525',
                '41 354492331',
                '41 997007684',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+51 41 096086020',
                '+51 41 319077076',
                '+51 41 355265899',
                '+51 41 644062525',
                '+51 41 354492331',
                '+51 41 997007684',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('philippines', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '45 775 3952',
                '45 608 1846',
                '45 015 4296',
                '45 394 0533',
                '45 862 2674',
                '45 005 4285',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+63 45 775 3952',
                '+63 45 608 1846',
                '+63 45 015 4296',
                '+63 45 394 0533',
                '+63 45 862 2674',
                '+63 45 005 4285',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('poland', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '69 188 4984',
                '69 181 9708',
                '69 850 0950',
                '69 662 1820',
                '69 869 3211',
                '69 882 1499',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+48 69 188 4984',
                '+48 69 181 9708',
                '+48 69 850 0950',
                '+48 69 662 1820',
                '+48 69 869 3211',
                '+48 69 882 1499',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('portugal', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '289 364 630',
                '289 983 020',
                '289 555 247',
                '289 712 948',
                '289 281 063',
                '289 776 732',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+351 289 364 630',
                '+351 289 983 020',
                '+351 289 555 247',
                '+351 289 712 948',
                '+351 289 281 063',
                '+351 289 776 732',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('puerto_rico', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '958 4540',
                '282 2901',
                '817 8492',
                '142 6122',
                '704 2717',
                '773 1792',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1787 958 4540',
                '+1787 282 2901',
                '+1787 817 8492',
                '+1787 142 6122',
                '+1787 704 2717',
                '+1787 773 1792',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('quatar', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '9942 6845',
                '7236 0158',
                '5124 6041',
                '6109 5130',
                '6374 1774',
                '1888 2635',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+974 9942 6845',
                '+974 7236 0158',
                '+974 5124 6041',
                '+974 6109 5130',
                '+974 6374 1774',
                '+974 1888 2635',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('romania', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '257 241 926',
                '257 575 189',
                '257 896 581',
                '257 010 018',
                '257 100 364',
                '257 071 901',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+40 257 241 926',
                '+40 257 575 189',
                '+40 257 896 581',
                '+40 257 010 018',
                '+40 257 100 364',
                '+40 257 071 901',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('russia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '401 960 7109',
                '401 377 5503',
                '401 449 6849',
                '401 557 5234',
                '401 316 6309',
                '401 583 3001',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+7 401 960 7109',
                '+7 401 377 5503',
                '+7 401 449 6849',
                '+7 401 557 5234',
                '+7 401 316 6309',
                '+7 401 583 3001',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('rwanda', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '724 272 493',
                '553 559 477',
                '541 643 257',
                '025 280 834',
                '802 255 702',
                '770 650 769',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+7 724 272 493',
                '+7 553 559 477',
                '+7 541 643 257',
                '+7 025 280 834',
                '+7 802 255 702',
                '+7 770 650 769',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('saba', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '329 9916',
                '069 7559',
                '698 4537',
                '704 2784',
                '382 4566',
                '904 2718',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+599 329 9916',
                '+599 069 7559',
                '+599 698 4537',
                '+599 704 2784',
                '+599 382 4566',
                '+599 904 2718',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('saint_helena', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '59634',
                '84661',
                '99120',
                '37093',
                '20284',
                '08586',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+290 59634',
                '+290 84661',
                '+290 99120',
                '+290 37093',
                '+290 20284',
                '+290 08586',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('saint_kitts_and_nevis', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '869 422 4379',
                '869 406 4398',
                '869 388 7142',
                '869 013 2500',
                '869 774 3549',
                '869 229 9685',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 869 422 4379',
                '+1 869 406 4398',
                '+1 869 388 7142',
                '+1 869 013 2500',
                '+1 869 774 3549',
                '+1 869 229 9685',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('saint_pierre', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '129035',
                '587008',
                '805118',
                '308427',
                '771295',
                '194689',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+508 129035',
                '+508 587008',
                '+508 805118',
                '+508 308427',
                '+508 771295',
                '+508 194689',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('saint_vincent_and_grenadines', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '784 499 7493',
                '784 724 3627',
                '784 519 7394',
                '784 746 0501',
                '784 832 8591',
                '784 743 5788',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 784 499 7493',
                '+1 784 724 3627',
                '+1 784 519 7394',
                '+1 784 746 0501',
                '+1 784 832 8591',
                '+1 784 743 5788',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('samoa', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '807 4779',
                '976 4985',
                '349 5344',
                '729 3325',
                '604 4970',
                '022 1178',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+685 807 4779',
                '+685 976 4985',
                '+685 349 5344',
                '+685 729 3325',
                '+685 604 4970',
                '+685 022 1178',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('san_marino', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '0549 037498',
                '0549 155526',
                '0549 689527',
                '0549 232058',
                '0549 913889',
                '0549 399967',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+378 0549 037498',
                '+378 0549 155526',
                '+378 0549 689527',
                '+378 0549 232058',
                '+378 0549 913889',
                '+378 0549 399967',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('saotome_principe', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '236 4922',
                '944 2098',
                '271 1328',
                '209 7110',
                '653 2965',
                '227 9158',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+239 236 4922',
                '+239 944 2098',
                '+239 271 1328',
                '+239 209 7110',
                '+239 653 2965',
                '+239 227 9158',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('saudi_arabia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '56 503 9685',
                '56 574 2036',
                '56 190 3927',
                '56 962 8307',
                '56 940 0839',
                '56 580 9988',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+966 56 503 9685',
                '+966 56 574 2036',
                '+966 56 190 3927',
                '+966 56 962 8307',
                '+966 56 940 0839',
                '+966 56 580 9988',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('senegal', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '76 935 5067',
                '76 516 5591',
                '76 782 8603',
                '76 157 9039',
                '76 027 0452',
                '76 203 4794',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+221 76 935 5067',
                '+221 76 516 5591',
                '+221 76 782 8603',
                '+221 76 157 9039',
                '+221 76 027 0452',
                '+221 76 203 4794',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('serbia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '61 597 0931',
                '61 973 4983',
                '61 378 1234',
                '61 310 7066',
                '61 053 3943',
                '61 859 0840',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+381 61 597 0931',
                '+381 61 973 4983',
                '+381 61 378 1234',
                '+381 61 310 7066',
                '+381 61 053 3943',
                '+381 61 859 0840',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('seychelles', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '158 9551',
                '455 6805',
                '268 3913',
                '438 6269',
                '495 1840',
                '318 5373',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+248 158 9551',
                '+248 455 6805',
                '+248 268 3913',
                '+248 438 6269',
                '+248 495 1840',
                '+248 318 5373',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('sierra_leone', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '21 052225',
                '21 700424',
                '21 650977',
                '21 850817',
                '21 404485',
                '21 392569',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+232 21 052225',
                '+232 21 700424',
                '+232 21 650977',
                '+232 21 850817',
                '+232 21 404485',
                '+232 21 392569',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('singapore', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '5900 8494',
                '0942 0632',
                '6444 0214',
                '2335 8815',
                '8026 1166',
                '9278 6090',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+65 5900 8494',
                '+65 0942 0632',
                '+65 6444 0214',
                '+65 2335 8815',
                '+65 8026 1166',
                '+65 9278 6090',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('saint_eustatius', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '332 0866',
                '567 2483',
                '738 0141',
                '971 8720',
                '780 4413',
                '641 8698',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+599 332 0866',
                '+599 567 2483',
                '+599 738 0141',
                '+599 971 8720',
                '+599 780 4413',
                '+599 641 8698',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('sint_maarten', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '721 314 9505',
                '721 547 6632',
                '721 285 4660',
                '721 925 6168',
                '721 340 9505',
                '721 335 5608',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 721 314 9505',
                '+1 721 547 6632',
                '+1 721 285 4660',
                '+1 721 925 6168',
                '+1 721 340 9505',
                '+1 721 335 5608',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('slovakia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '90 106 0318',
                '90 840 0883',
                '90 794 0600',
                '90 537 8714',
                '90 271 7840',
                '90 383 7649',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+421 90 106 0318',
                '+421 90 840 0883',
                '+421 90 794 0600',
                '+421 90 537 8714',
                '+421 90 271 7840',
                '+421 90 383 7649',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('solomon_islands', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '11904',
                '10762',
                '87036',
                '46771',
                '69134',
                '88795',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+677 11904',
                '+677 10762',
                '+677 87036',
                '+677 46771',
                '+677 69134',
                '+677 88795',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('somalia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '61 563 8174',
                '61 045 5857',
                '61 237 0142',
                '61 907 8446',
                '61 647 9190',
                '61 992 3501',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+252 61 563 8174',
                '+252 61 045 5857',
                '+252 61 237 0142',
                '+252 61 907 8446',
                '+252 61 647 9190',
                '+252 61 992 3501',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('south_africa', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '81 296 0146',
                '81 047 7215',
                '81 261 3729',
                '81 633 5220',
                '81 834 9515',
                '81 510 2405',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+27 81 296 0146',
                '+27 81 047 7215',
                '+27 81 261 3729',
                '+27 81 633 5220',
                '+27 81 834 9515',
                '+27 81 510 2405',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('south_korea', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '2 650 9669',
                '2 177 9383',
                '2 944 5220',
                '2 525 0591',
                '2 213 9726',
                '2 556 3465',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+82 2 650 9669',
                '+82 2 177 9383',
                '+82 2 944 5220',
                '+82 2 525 0591',
                '+82 2 213 9726',
                '+82 2 556 3465',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('south_sudan', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '910 589294',
                '910 614209',
                '910 574903',
                '910 429996',
                '910 059085',
                '910 565484',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+211 910 589294',
                '+211 910 614209',
                '+211 910 574903',
                '+211 910 429996',
                '+211 910 059085',
                '+211 910 565484',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('spain', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '793 682 147',
                '476 415 917',
                '657 804 635',
                '646 517 456',
                '088 198 557',
                '994 356 278',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+34 793 682 147',
                '+34 476 415 917',
                '+34 657 804 635',
                '+34 646 517 456',
                '+34 088 198 557',
                '+34 994 356 278',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('srilanka', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '47 716 0886',
                '47 422 4877',
                '47 174 6299',
                '47 209 9410',
                '47 489 5292',
                '47 238 7692',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+94 47 716 0886',
                '+94 47 422 4877',
                '+94 47 174 6299',
                '+94 47 209 9410',
                '+94 47 489 5292',
                '+94 47 238 7692',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('sudan', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '12 190 6880',
                '12 833 0385',
                '12 762 4147',
                '12 353 3079',
                '12 397 0017',
                '12 150 1623',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+249 12 190 6880',
                '+249 12 833 0385',
                '+249 12 762 4147',
                '+249 12 353 3079',
                '+249 12 397 0017',
                '+249 12 150 1623',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('suriname', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '890613',
                '319221',
                '336975',
                '082990',
                '657786',
                '104006',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+597 890613',
                '+597 319221',
                '+597 336975',
                '+597 082990',
                '+597 657786',
                '+597 104006',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('swaziland', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '2 918 6058',
                '2 388 5886',
                '2 439 3863',
                '2 498 2932',
                '2 712 7215',
                '2 889 2340',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+268 2 918 6058',
                '+268 2 388 5886',
                '+268 2 439 3863',
                '+268 2 498 2932',
                '+268 2 712 7215',
                '+268 2 889 2340',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('sweden', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '16 159 4226',
                '16 765 7965',
                '16 893 1393',
                '16 216 9443',
                '16 296 0194',
                '16 392 2549',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+46 16 159 4226',
                '+46 16 765 7965',
                '+46 16 893 1393',
                '+46 16 216 9443',
                '+46 16 296 0194',
                '+46 16 392 2549',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('switzerland', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '33 785 5018',
                '33 655 2692',
                '33 688 8670',
                '33 510 7345',
                '33 995 1501',
                '33 468 9461',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+41 33 785 5018',
                '+41 33 655 2692',
                '+41 33 688 8670',
                '+41 33 510 7345',
                '+41 33 995 1501',
                '+41 33 468 9461',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('syria', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '33 677 3492',
                '33 705 3898',
                '33 987 5441',
                '33 915 2603',
                '33 641 7078',
                '33 232 5670',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+963 33 677 3492',
                '+963 33 705 3898',
                '+963 33 987 5441',
                '+963 33 915 2603',
                '+963 33 641 7078',
                '+963 33 232 5670',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('taiwan', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '4 7716 2752',
                '4 6339 2802',
                '4 5456 2932',
                '4 0904 8027',
                '4 1046 5587',
                '4 7086 7466',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+886 4 7716 2752',
                '+886 4 6339 2802',
                '+886 4 5456 2932',
                '+886 4 0904 8027',
                '+886 4 1046 5587',
                '+886 4 7086 7466',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('tajikistan', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '32 615 7946',
                '32 183 6844',
                '32 840 4635',
                '32 623 8336',
                '32 135 7651',
                '32 868 7269',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+992 32 615 7946',
                '+992 32 183 6844',
                '+992 32 840 4635',
                '+992 32 623 8336',
                '+992 32 135 7651',
                '+992 32 868 7269',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('tanzania', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '75 317 3863',
                '75 543 8089',
                '75 818 4678',
                '75 296 1106',
                '75 875 2582',
                '75 773 7094',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+255 75 317 3863',
                '+255 75 543 8089',
                '+255 75 818 4678',
                '+255 75 296 1106',
                '+255 75 875 2582',
                '+255 75 773 7094',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('thailand', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '2 669 2803',
                '2 948 7749',
                '2 769 7622',
                '2 640 7315',
                '2 942 6943',
                '2 593 0213',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+66 2 669 2803',
                '+66 2 948 7749',
                '+66 2 769 7622',
                '+66 2 640 7315',
                '+66 2 942 6943',
                '+66 2 593 0213',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('togolese_republic', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '9 572 7326',
                '9 748 1900',
                '9 329 6963',
                '9 299 9889',
                '9 602 3085',
                '9 743 3437',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+228 9 572 7326',
                '+228 9 748 1900',
                '+228 9 329 6963',
                '+228 9 299 9889',
                '+228 9 602 3085',
                '+228 9 743 3437',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('tonga', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '577 7896',
                '920 3296',
                '293 5826',
                '605 9198',
                '469 0148',
                '804 5816',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+676 577 7896',
                '+676 920 3296',
                '+676 293 5826',
                '+676 605 9198',
                '+676 469 0148',
                '+676 804 5816',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('trinidad_and_tobago', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '868 836 9919',
                '868 352 2868',
                '868 998 1590',
                '868 245 9311',
                '868 241 3534',
                '868 740 3512',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 868 836 9919',
                '+1 868 352 2868',
                '+1 868 998 1590',
                '+1 868 245 9311',
                '+1 868 241 3534',
                '+1 868 740 3512',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('tunisia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '0328 3880',
                '4703 9200',
                '0275 9453',
                '1175 1218',
                '2869 3277',
                '4056 9802',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+216 0328 3880',
                '+216 4703 9200',
                '+216 0275 9453',
                '+216 1175 1218',
                '+216 2869 3277',
                '+216 4056 9802',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('turkey', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '242 202 9038',
                '242 252 4435',
                '242 749 0558',
                '242 748 0308',
                '242 637 4182',
                '242 350 4328',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+90 242 202 9038',
                '+90 242 252 4435',
                '+90 242 749 0558',
                '+90 242 748 0308',
                '+90 242 637 4182',
                '+90 242 350 4328',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('turkmenistan', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '12 456433',
                '12 291326',
                '12 721607',
                '12 981722',
                '12 866188',
                '12 963383',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+993 12 456433',
                '+993 12 291326',
                '+993 12 721607',
                '+993 12 981722',
                '+993 12 866188',
                '+993 12 963383',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('turks_and_caicos_islands', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '649 260 4597',
                '649 416 3384',
                '649 765 8347',
                '649 702 1780',
                '649 112 0549',
                '649 970 3924',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 649 260 4597',
                '+1 649 416 3384',
                '+1 649 765 8347',
                '+1 649 702 1780',
                '+1 649 112 0549',
                '+1 649 970 3924',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('tuvalu', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '33335',
                '91984',
                '94597',
                '49163',
                '06944',
                '91409',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+688 33335',
                '+688 91984',
                '+688 94597',
                '+688 49163',
                '+688 06944',
                '+688 91409',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('uganda', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '751 832673',
                '751 080067',
                '751 946790',
                '751 321833',
                '751 308802',
                '751 916647',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+256 751 832673',
                '+256 751 080067',
                '+256 751 946790',
                '+256 751 321833',
                '+256 751 308802',
                '+256 751 916647',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('ukraine', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '44 967 9091',
                '44 366 2280',
                '44 914 8718',
                '44 602 6592',
                '44 997 9270',
                '44 576 2346',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+380 44 967 9091',
                '+380 44 366 2280',
                '+380 44 914 8718',
                '+380 44 602 6592',
                '+380 44 997 9270',
                '+380 44 576 2346',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('united_arab_emirates', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '55 312 1304',
                '55 096 4755',
                '55 139 7157',
                '55 078 7924',
                '55 492 8342',
                '55 224 3223',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+971 55 312 1304',
                '+971 55 096 4755',
                '+971 55 139 7157',
                '+971 55 078 7924',
                '+971 55 492 8342',
                '+971 55 224 3223',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('united_kingdom', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '01632 960262',
                '01632 960853',
                '01632 960254',
                '01632 960174',
                '01632 960942',
                '01632 960966',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+44 1632 960262',
                '+44 1632 960853',
                '+44 1632 960254',
                '+44 1632 960174',
                '+44 1632 960942',
                '+44 1632 960966',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('united_states', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '202-555-0157',
                '202-555-0104',
                '202-555-0132',
                '202-555-0150',
                '202-555-0181',
                '202-555-0143',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1-202-555-0157',
                '+1-202-555-0104',
                '+1-202-555-0132',
                '+1-202-555-0150',
                '+1-202-555-0181',
                '+1-202-555-0143',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('us_virgin_islands', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '340 290 8688',
                '340 820 6614',
                '340 450 7199',
                '340 490 8352',
                '340 759 0208',
                '340 725 5189',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+1 340 290 8688',
                '+1 340 820 6614',
                '+1 340 450 7199',
                '+1 340 490 8352',
                '+1 340 759 0208',
                '+1 340 725 5189',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('uruguay', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '9911 1109',
                '1733 9552',
                '2995 3902',
                '8633 5374',
                '7733 9954',
                '4480 8162',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+598 9911 1109',
                '+598 1733 9552',
                '+598 2995 3902',
                '+598 8633 5374',
                '+598 7733 9954',
                '+598 4480 8162',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('uzbekistan', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '99 876 0439',
                '99 642 2773',
                '99 861 5985',
                '99 935 2571',
                '99 742 3079',
                '99 645 0279',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+998 99 876 0439',
                '+998 99 642 2773',
                '+998 99 861 5985',
                '+998 99 935 2571',
                '+998 99 742 3079',
                '+998 99 645 0279',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('vanuatu', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '07889',
                '07401',
                '54287',
                '84429',
                '73481',
                '72412',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+678 07889',
                '+678 07401',
                '+678 54287',
                '+678 84429',
                '+678 73481',
                '+678 72412',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('venezuela', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '212 464 7306',
                '212 850 4223',
                '212 002 0500',
                '212 054 4478',
                '212 440 0643',
                '212 255 0882',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+58 212 464 7306',
                '+58 212 850 4223',
                '+58 212 002 0500',
                '+58 212 054 4478',
                '+58 212 440 0643',
                '+58 212 255 0882',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('vietnam', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '121 186 0025',
                '121 820 2465',
                '121 512 7605',
                '121 473 2166',
                '121 371 7675',
                '121 150 5249',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+84 121 186 0025',
                '+84 121 820 2465',
                '+84 121 512 7605',
                '+84 121 473 2166',
                '+84 121 371 7675',
                '+84 121 150 5249',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('wallis_and_futuna', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '198 8397',
                '033 7076',
                '841 6313',
                '382 2735',
                '920 4655',
                '987 6219',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+681 198 8397',
                '+681 033 7076',
                '+681 841 6313',
                '+681 382 2735',
                '+681 920 4655',
                '+681 987 6219',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('yemen', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '5 543851',
                '5 392922',
                '5 901723',
                '5 814568',
                '5 481537',
                '5 038719',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+967 5 543851',
                '+967 5 392922',
                '+967 5 901723',
                '+967 5 814568',
                '+967 5 481537',
                '+967 5 038719',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('zambia', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '95 400 3954',
                '95 866 1438',
                '95 210 6021',
                '95 732 8299',
                '95 047 2800',
                '95 247 9032',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+260 95 400 3954',
                '+260 95 866 1438',
                '+260 95 210 6021',
                '+260 95 732 8299',
                '+260 95 047 2800',
                '+260 95 247 9032',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });

    describe('zimbabwe', () => {
        it('Should be valid for sample list of local phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '78 512 3645',
                '78 818 2343',
                '78 624 9942',
                '78 790 9226',
                '78 601 1962',
                '78 876 7423',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });

        it('Should be valid for sample list of international phone numbers', () => {
            const v = new Validator({a: 'phone'});
            for (const el of [
                '+263 78 512 3645',
                '+263 78 818 2343',
                '+263 78 624 9942',
                '+263 78 790 9226',
                '+263 78 601 1962',
                '+263 78 876 7423',
            ]) expect(v.validate({a: el})).toEqual({is_valid: true, count: 0, errors: {}});
        });
    });
});
