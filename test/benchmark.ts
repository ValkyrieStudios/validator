/* eslint-disable @typescript-eslint/no-explicit-any */

import * as fs from 'node:fs';

import vAlphaNumSpaces          from '../lib/functions/vAlphaNumSpaces';
import vAlphaNumSpacesMultiline from '../lib/functions/vAlphaNumSpacesMultiline';
import vBetween                 from '../lib/functions/vBetween';
import vBase64                  from '../lib/functions/vBase64';
import vBetweenInclusive        from '../lib/functions/vBetweenInclusive';
import vColorHex                from '../lib/functions/vColorHex';
import vContinent               from '../lib/functions/vContinent';
import vCountry                 from '../lib/functions/vCountry';
import vCountryAlpha3           from '../lib/functions/vCountryAlpha3';
import vDateString              from '../lib/functions/vDateString';
import vEmail                   from '../lib/functions/vEmail';
import vFalse                   from '../lib/functions/vFalse';
import vGeoLatitude             from '../lib/functions/vGeoLatitude';
import vGeoLongitude            from '../lib/functions/vGeoLongitude';
import vGreaterThan             from '../lib/functions/vGreaterThan';
import vGreaterThanOrEqual      from '../lib/functions/vGreaterThanOrEqual';
import vGuid                    from '../lib/functions/vGuid';
import vIn                      from '../lib/functions/vIn';
import vLessThan                from '../lib/functions/vLessThan';
import vLessThanOrEqual         from '../lib/functions/vLessThanOrEqual';
import vPhone                   from '../lib/functions/vPhone';
import vSize                    from '../lib/functions/vSize';
import vSysIPv4                 from '../lib/functions/vSysIPv4';
import vSysIPv4_or_v6           from '../lib/functions/vSysIPv4_or_v6';
import vSysIPv6                 from '../lib/functions/vSysIPv6';
import vSysMac                  from '../lib/functions/vSysMac';
import vSysPort                 from '../lib/functions/vSysPort';
import vTimeZone                from '../lib/functions/vTimeZone';
import vTrue                    from '../lib/functions/vTrue';
import vUrl                     from '../lib/functions/vUrl';
import vUrlNoQuery              from '../lib/functions/vUrlNoQuery';
import {
    vISBN,
    vISBN10,
    vISBN13,
} from '../lib/functions/vISBN';
import {vSSN}                       from '../lib/functions/vSSN';
import {
    vEAN,
    vEAN8,
    vEAN13,
} from '../lib/functions/vEAN';
import {vUlid}                      from '../lib/functions/vUlid';
import {
    vUuid,
    vUuidV1,
    vUuidV2,
    vUuidV3,
    vUuidV4,
    vUuidV5,
} from '../lib/functions/vUuid';
import Validator                from '../lib/index';
import {
    vUrlImage,
    vUrlVideo,
    vUrlAudio,
    vUrlMedia,
} from '../lib/functions/vUrlExtensions';

const ROW_TEST_WIDTH    = 60;
const ROW_OPS_WIDTH     = 20;
const EXPORT_COLLECTOR:{lbl:string, ops:number}[]  = [];

function separator () {
    console.info(''.padEnd(ROW_TEST_WIDTH + ROW_OPS_WIDTH, '-'));
}

function bench (el:{lbl:string,fn:(...args:any)=>any}, iterations) {
    let runtime = performance.now();
    for (let i = 0; i < iterations; i++) el.fn();
    runtime = performance.now() - runtime;
    const ops =  Math.floor(iterations * (1000/runtime));
    EXPORT_COLLECTOR.push({lbl: el.lbl, ops});
    console.info([el.lbl.padEnd(ROW_TEST_WIDTH, ' '), `${ops}`.padEnd(ROW_OPS_WIDTH, ' ')].join('| '));
}

//  Header
console.info(`${'Test'.padEnd(ROW_TEST_WIDTH, ' ')}| ${'ops/sec'.padEnd(ROW_OPS_WIDTH, ' ')}`);
separator();

//  Used in benchmarks
const vsimple = new Validator({a: 'string_ne'});
const vmedium = new Validator({
    first_name: 'string|alpha_num_spaces|min:2',
    last_name: 'string|alpha_num_spaces|min:2',
    age: '?integer|between:1,150',
    gender: 'in:<meta.gender_options>',
});
const vcomplex = new Validator({
    first_name: 'string|alpha_num_spaces|min:2',
    last_name: 'string|alpha_num_spaces|min:2',
    age: '?integer|between:1,150',
    gender: 'in:<meta.gender_options>',
    address: {
        street: 'string|alpha_num_spaces',
        nr: 'integer',
        zip: 'integer|between:1000,9999',
    },
    contact: {
        email: 'string|email',
        phone: '?phone',
    },
});
const vsimple_groups = new Validator({a: ['string_ne', 'false']});
const vmedium_groups = new Validator({
    first_name: ['string|alpha_num_spaces|min:2', 'false'],
    last_name: ['string|alpha_num_spaces|min:2', 'false'],
    age: '?integer|between:1,150',
    gender: 'in:<meta.gender_options>',
});
const venum = new Validator({animal: 'MYENUM'});
Validator.extend({
    MYENUM: ['dog', 'cat', 'bird', 'donkey', 'cow', 'horse', 'pig'],
    is_hello: /^((h|H)ello|(o|O)la)$/,
    small: {
        first_name: 'string_ne|min:3',
        last_name: 'string_ne|min:3',
        email: 'email',
    },
    medium: {
        first_name: 'string_ne|min:3',
        last_name: 'string_ne|min:3',
        email: 'email',
        phone: 'phone',
        tz: 'time_zone',
    },
    address: {
        street: 'string_ne|min:3',
        zip: 'integer|min:1000|max:9999',
        number: 'string_ne|min:3',
        city: 'string_ne|min:2',
    },
    large: {
        first_name: 'string_ne|min:3',
        last_name: 'string_ne|min:3',
        email: 'email',
        phone: 'phone',
        tz: 'time_zone',
        address: 'address',
    },
});

const vregex = new Validator({a: 'is_hello'});
const vsimple_schema = new Validator({a: 'small'});
const vmedium_schema = new Validator({a: 'medium'});
const vlarge_schema = new Validator({a: 'large'});

const vFormValid = new FormData();
vFormValid.append('first_name', 'Peter');
vFormValid.append('last_name', 'Vermeulen');
vFormValid.append('email', 'contact@valkyriestudios.be');

const vFormInvalid = new FormData();
vFormInvalid.append('first_name', 'Peter');
vFormInvalid.append('last_name', 'Vermeulen');
vFormInvalid.append('email', 'contact.valkyriestudios.be');

//  Run benchmarks
for (const el of [
    //  Baseline
    {
        lbl: 'Validator@ctor - simple',
        fn: () => new Validator({a: 'string_ne'}),
    },
    {
        lbl: 'Validator@ctor - medium',
        fn: () => new Validator({
            first_name: 'string|alpha_num_spaces|min:2',
            last_name: 'string|alpha_num_spaces|min:2',
            age: '?integer|between:1,150',
            gender: 'in:<meta.gender_options>',
        }),
    },
    {
        lbl: 'Validator@ctor - complex',
        fn: () => new Validator({
            first_name: 'string|alpha_num_spaces|min:2',
            last_name: 'string|alpha_num_spaces|min:2',
            age: '?integer|between:1,150',
            gender: 'in:<meta.gender_options>',
            address: {
                street: 'string|alpha_num_spaces',
                nr: 'integer',
                zip: 'integer|between:1000,9999',
            },
            contact: {
                email: 'string|email',
                phone: '?phone',
            },
        }),
    },
    //  Baseline - validating coldstart
    {
        lbl: 'Validator@validate - coldstart - simple',
        fn: () => new Validator({a: 'string_ne'}).validate({a: 'hello'}),
    },
    {
        lbl: 'Validator@validate - coldstart - medium',
        fn: () => new Validator({
            first_name: 'string|alpha_num_spaces|min:2',
            last_name: 'string|alpha_num_spaces|min:2',
            age: '?integer|between:1,150',
            gender: 'in:<meta.gender_options>',
        }).validate({
            first_name: 'Peter',
            last_name: false,
            age: 33,
            gender: 'M',
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@validate - coldstart - complex',
        fn: () => new Validator({
            first_name: 'string|alpha_num_spaces|min:2',
            last_name: 'string|alpha_num_spaces|min:2',
            age: '?integer|between:1,150',
            gender: 'in:<meta.gender_options>',
            address: {
                street: 'string|alpha_num_spaces',
                nr: 'integer',
                zip: 'integer|between:1000,9999',
            },
            contact: {
                email: 'string|email',
                phone: '?phone',
            },
        }).validate({
            first_name: 'Peter',
            last_name: false,
            age: 33,
            gender: 'M',
            address: {
                street: 'Amazing Road',
                nr: 999,
                zip: 1250,
            },
            contact: {
                email: 'contact@valkyriestudios.be',
            },
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@validate - coldstart - groups/simple',
        fn: () => new Validator({a: ['string_ne', 'false']}).validate({a: 'hello'}),
    },
    {
        lbl: 'Validator@validate - coldstart - groups/medium',
        fn: () => new Validator({
            first_name: ['string|min:2', 'false'],
            last_name: ['string|min:2', 'false'],
            age: '?integer|between:1,150',
            gender: 'in:<meta.gender_options>',
        }).validate({
            first_name: 'Peter',
            last_name: false,
            age: 33,
            gender: 'M',
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@validate - coldstart - schema/small - valid',
        fn: () => new Validator({a: 'small'}).validate({a: {
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
        }}),
    },
    {
        lbl: 'Validator@validate - coldstart - schema/small - invalid',
        fn: () => new Validator({a: 'small'}).validate({a: {
            first_name: 'Peter',
            last_name: false,
            email: 'bla',
        }}),
    },
    {
        lbl: 'Validator@validate - coldstart - schema/medium - valid',
        fn: () => new Validator({a: 'medium'}).validate({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
            phone: '(555) 123-4567',
            tz: 'America/New_York',
        }),
    },
    {
        lbl: 'Validator@validate - coldstart - schema/medium - invalid',
        fn: () => new Validator({a: 'medium'}).validate({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
            phone: '(555) 123-4567',
            tz: 'America/New_York',
        }),
    },
    {
        lbl: 'Validator@validate - coldstart - schema/large - valid',
        fn: () => new Validator({a: 'large'}).validate({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
            phone: '(555) 123-4567',
            tz: 'America/New_York',
            address: {
                street: 'Example Rd',
                zip: 9999,
                number: '594F',
                city: 'New York',
            },
        }),
    },
    {
        lbl: 'Validator@validate - coldstart - schema/large - invalid',
        fn: () => new Validator({a: 'large'}).validate({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
            phone: '(555) 123-4567',
            tz: 'America/New_York',
            address: {
                street: 'Example Rd',
                zip: 9999,
                number: false,
                city: 'New York',
            },
        }),
    },
    //  Baseline - validating pre-existing
    {
        lbl: 'Validator@validate - existing - simple',
        fn: () => vsimple.validate({a: 'hello'}),
    },
    {
        lbl: 'Validator@validate - existing - medium',
        fn: () => vmedium.validate({
            first_name: 'Peter',
            last_name: false,
            age: 33,
            gender: 'M',
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@validate - existing - complex',
        fn: () => vcomplex.validate({
            first_name: 'Peter',
            last_name: false,
            age: 33,
            gender: 'M',
            address: {
                street: 'Amazing Road',
                nr: 999,
                zip: 1250,
            },
            contact: {
                email: 'contact@valkyriestudios.be',
            },
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    //  Baseline - check coldstart
    {
        lbl: 'Validator@check - coldstart - simple - valid',
        fn: () => new Validator({a: 'string_ne'}).check({a: 'hello'}),
    },
    {
        lbl: 'Validator@check - coldstart - simple - invalid',
        fn: () => new Validator({a: 'string_ne'}).check({a: 12345}),
    },
    {
        lbl: 'Validator@check - coldstart - medium - valid',
        fn: () => new Validator({
            first_name: 'string|alpha_num_spaces|min:2',
            last_name: 'string|alpha_num_spaces|min:2',
            age: '?integer|between:1,150',
            gender: 'in:<meta.gender_options>',
        }).check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            age: 33,
            gender: 'M',
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@check - coldstart - medium - invalid',
        fn: () => new Validator({
            first_name: 'string|alpha_num_spaces|min:2',
            last_name: 'string|alpha_num_spaces|min:2',
            age: '?integer|between:1,150',
            gender: 'in:<meta.gender_options>',
        }).check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            age: 'None of ya business',
            gender: 'M',
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@check - coldstart - complex - valid',
        fn: () => new Validator({
            first_name: 'string|alpha_num_spaces|min:2',
            last_name: 'string|alpha_num_spaces|min:2',
            age: '?integer|between:1,150',
            gender: 'in:<meta.gender_options>',
            address: {
                street: 'string|alpha_num_spaces',
                nr: 'integer',
                zip: 'integer|between:1000,9999',
            },
            contact: {
                email: 'string|email',
                phone: '?phone',
            },
        }).check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            age: 33,
            gender: 'M',
            address: {
                street: 'Amazing Road',
                nr: 999,
                zip: 1250,
            },
            contact: {
                email: 'contact@valkyriestudios.be',
            },
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@check - coldstart - complex - invalid',
        fn: () => new Validator({
            first_name: 'string|alpha_num_spaces|min:2',
            last_name: 'string|alpha_num_spaces|min:2',
            age: '?integer|between:1,150',
            gender: 'in:<meta.gender_options>',
            address: {
                street: 'string|alpha_num_spaces',
                nr: 'integer',
                zip: 'integer|between:1000,9999',
            },
            contact: {
                email: 'string|email',
                phone: '?phone',
            },
        }).check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            age: 33,
            gender: 'M',
            address: {
                street: 'Amazing Road',
                nr: 'None of ya business',
                zip: 1250,
            },
            contact: {
                email: 'contact@valkyriestudios.be',
            },
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@check - coldstart - groups/simple - valid',
        fn: () => new Validator({a: ['string_ne', 'false']}).check({a: 'hello'}),
    },
    {
        lbl: 'Validator@check - coldstart - groups/simple - invalid',
        fn: () => new Validator({a: ['string_ne', 'false']}).check({a: 42}),
    },
    {
        lbl: 'Validator@check - coldstart - groups/medium - valid',
        fn: () => new Validator({
            first_name: ['string|min:2', 'false'],
            last_name: ['string|min:2', 'false'],
            age: '?integer|between:1,150',
            gender: 'in:<meta.gender_options>',
        }).check({
            first_name: 'Peter',
            last_name: false,
            age: 33,
            gender: 'M',
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@check - coldstart - groups/medium - invalid',
        fn: () => new Validator({
            first_name: ['string|min:2', 'false'],
            last_name: ['string|min:2', 'false'],
            age: '?integer|between:1,150',
            gender: 'in:<meta.gender_options>',
        }).check({
            first_name: 'Peter',
            last_name: 'a',
            age: 33,
            gender: 'M',
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@check - coldstart - schema/small - valid',
        fn: () => new Validator({a: 'small'}).check({a: {
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
        }}),
    },
    {
        lbl: 'Validator@check - coldstart - schema/small - invalid',
        fn: () => new Validator({a: 'small'}).check({a: {
            first_name: 'Peter',
            last_name: false,
            email: 'bla',
        }}),
    },
    {
        lbl: 'Validator@check - coldstart - schema/medium - valid',
        fn: () => new Validator({a: 'medium'}).check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
            phone: '(555) 123-4567',
            tz: 'America/New_York',
        }),
    },
    {
        lbl: 'Validator@check - coldstart - schema/medium - invalid',
        fn: () => new Validator({a: 'medium'}).check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
            phone: '(555) 123-4567',
            tz: 'America/New_York',
        }),
    },
    {
        lbl: 'Validator@check - coldstart - schema/large - valid',
        fn: () => new Validator({a: 'large'}).check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
            phone: '(555) 123-4567',
            tz: 'America/New_York',
            address: {
                street: 'Example Rd',
                zip: 9999,
                number: '594F',
                city: 'New York',
            },
        }),
    },
    {
        lbl: 'Validator@check - coldstart - schema/large - invalid',
        fn: () => new Validator({a: 'large'}).check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
            phone: '(555) 123-4567',
            tz: 'America/New_York',
            address: {
                street: 'Example Rd',
                zip: 9999,
                number: false,
                city: 'New York',
            },
        }),
    },
    //  Baseline - check pre-existing
    {
        lbl: 'Validator@check - existing - simple - valid',
        fn: () => vsimple.check({a: 'hello'}),
    },
    {
        lbl: 'Validator@check - existing - simple - invalid',
        fn: () => vsimple.check({a: 12345}),
    },
    {
        lbl: 'Validator@check - existing - medium - valid',
        fn: () => vmedium.check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            age: 33,
            gender: 'M',
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@check - existing - medium - invalid',
        fn: () => vmedium.check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            age: 'None of ya business',
            gender: 'M',
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@check - existing - complex - valid',
        fn: () => vcomplex.check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            age: 33,
            gender: 'M',
            address: {
                street: 'Amazing Road',
                nr: 999,
                zip: 1250,
            },
            contact: {
                email: 'contact@valkyriestudios.be',
            },
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@check - existing - complex - invalid',
        fn: () => vcomplex.check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            age: 33,
            gender: 'M',
            address: {
                street: 'Amazing Road',
                nr: 'None of ya business',
                zip: 1250,
            },
            contact: {
                email: 'contact@valkyriestudios.be',
            },
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@check - existing - groups/simple - valid',
        fn: () => vsimple_groups.check({a: 'hello'}),
    },
    {
        lbl: 'Validator@check - existing - groups/simple - invalid',
        fn: () => vsimple_groups.check({a: 12345}),
    },
    {
        lbl: 'Validator@check - existing - groups/medium - valid',
        fn: () => vmedium_groups.check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            age: 33,
            gender: 'M',
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@check - existing - groups/medium - invalid',
        fn: () => vmedium_groups.check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            age: 'None of ya business',
            gender: 'M',
            meta: {gender_options: ['F', 'M', 'U']},
        }),
    },
    {
        lbl: 'Validator@check - existing - schema/small - valid',
        fn: () => vsimple_schema.check({a: {
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
        }}),
    },
    {
        lbl: 'Validator@check - existing - schema/small - invalid',
        fn: () => vsimple_schema.check({a: {
            first_name: 'Peter',
            last_name: false,
            email: 'bla',
        }}),
    },
    {
        lbl: 'Validator@check - existing - schema/medium - valid',
        fn: () => vmedium_schema.check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
            phone: '(555) 123-4567',
            tz: 'America/New_York',
        }),
    },
    {
        lbl: 'Validator@check - existing - schema/medium - invalid',
        fn: () => vmedium_schema.check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
            phone: '(555) 123-4567',
            tz: 'America/New_York',
        }),
    },
    {
        lbl: 'Validator@check - existing - schema/large - valid',
        fn: () => vlarge_schema.check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
            phone: '(555) 123-4567',
            tz: 'America/New_York',
            address: {
                street: 'Example Rd',
                zip: 9999,
                number: '594F',
                city: 'New York',
            },
        }),
    },
    {
        lbl: 'Validator@check - existing - schema/large - invalid',
        fn: () => vlarge_schema.check({
            first_name: 'Peter',
            last_name: 'Vermeulen',
            email: 'contact@valkyriestudios.be',
            phone: '(555) 123-4567',
            tz: 'America/New_York',
            address: {
                street: 'Example Rd',
                zip: 9999,
                number: false,
                city: 'New York',
            },
        }),
    },
    //  Baseline - check enum
    {
        lbl: 'Validator@check - existing - enum - valid',
        fn: () => venum.check({animal: 'pig'}),
    },
    {
        lbl: 'Validator@check - existing - enum - invalid',
        fn: () => venum.check({animal: 12345}),
    },
    //  Baseline - check regex
    {
        lbl: 'Validator@check - existing - regex - valid',
        fn: () => vregex.check({a: 'Hello'}),
    },
    {
        lbl: 'Validator@check - existing - regex - invalid',
        fn: () => vregex.check({a: 'Helo'}),
    },
    //  Baseline - checkForm
    {
        lbl: 'Validator@checkForm - valid',
        fn: () => vsimple.checkForm(vFormValid),
    },
    {
        lbl: 'Validator@checkForm - invalid',
        fn: () => vsimple.checkForm(vFormInvalid),
    },
    //  rules.* (testing with string_ne as baseline)
    {
        lbl: 'rules/* - string_ne for comparison',
        fn: () => Validator.rules.string_ne(' hello world '),
    },
    //  vAlphaNumSpaces
    {
        lbl: 'functions/vAlphaNumSpaces - 10 chars',
        fn: () => vAlphaNumSpaces('123456789 '),
    },
    {
        lbl: 'functions/vAlphaNumSpaces - 20 chars',
        fn: () => vAlphaNumSpaces('123456789 abcdefghi '),
    },
    {
        lbl: 'functions/vAlphaNumSpaces - not valid',
        fn: () => vAlphaNumSpaces('this$shouldnotbevalid'),
    },
    //  vAlphaNumSpacesMultiline
    {
        lbl: 'functions/vAlphaNumSpacesMultiline - 10 chars',
        fn: () => vAlphaNumSpacesMultiline('123456789 '),
    },
    {
        lbl: 'functions/vAlphaNumSpacesMultiline - 20 chars',
        fn: () => vAlphaNumSpacesMultiline('123456789 abcdefghi '),
    },
    {
        lbl: 'functions/vAlphaNumSpacesMultiline - not valid',
        fn: () => vAlphaNumSpacesMultiline('this$shouldnotbevalid'),
    },
    //  vBase64
    {
        lbl: 'functions/vBase64 - valid',
        fn: () => vBase64('SGVsbG8gd29ybGQ='),
    },
    {
        lbl: 'functions/vBase64 - invalid',
        fn: () => vBase64('U29tZSBzdHJpbmcg*'),
    },
    //  vBetween
    {
        lbl: 'functions/vBetween - valid',
        fn: () => vBetween(50, 10, 99),
    },
    {
        lbl: 'functions/vBetween - invalid',
        fn: () => vBetween(102, 10, 99),
    },
    //  vBetweenInclusive
    {
        lbl: 'functions/vBetweenInclusive - valid',
        fn: () => vBetweenInclusive(99, 10, 99),
    },
    {
        lbl: 'functions/vBetweenInclusive - invalid',
        fn: () => vBetweenInclusive(100, 10, 99),
    },
    //  vColorHex
    {
        lbl: 'functions/vColorHex - valid',
        fn: () => vColorHex('#FF1234'),
    },
    {
        lbl: 'functions/vColorHex - invalid',
        fn: () => vColorHex('Blue'),
    },
    //  vContinent
    {
        lbl: 'functions/vContinent - valid',
        fn: () => vContinent('EU'),
    },
    {
        lbl: 'functions/vContinent - invalid',
        fn: () => vContinent('Madagascar'),
    },
    //  vCountry
    {
        lbl: 'functions/vCountry - valid',
        fn: () => vCountry('BE'),
    },
    {
        lbl: 'functions/vCountry - invalid',
        fn: () => vCountry('Antarctica'),
    },
    //  vCountryAlpha3
    {
        lbl: 'functions/vCountryAlpha3 - valid',
        fn: () => vCountryAlpha3('BEL'),
    },
    {
        lbl: 'functions/vCountryAlpha3 - invalid',
        fn: () => vCountryAlpha3('Antarctica'),
    },
    //  vDateString
    {
        lbl: 'functions/vDateString - valid',
        fn: () => vDateString('21 March 2019'),
    },
    {
        lbl: 'functions/vDateString - invalid',
        fn: () => vDateString('45 March 2019'),
    },
    //  vEmail
    {
        lbl: 'functions/vEmail - valid short',
        fn: () => vEmail('me@gmail.com'),
    },
    {
        lbl: 'functions/vEmail - valid medium',
        fn: () => vEmail('contact@valkyriestudios.be'),
    },
    {
        lbl: 'functions/vEmail - valid long',
        fn: () => vEmail('peter.vermeulen@valkyriestudios.be'),
    },
    //  vGeoLatitude
    {
        lbl: 'functions/vGeoLatitude - valid',
        fn: () => vGeoLatitude(34.567),
    },
    {
        lbl: 'functions/vGeoLatitude - invalid',
        fn: () => vGeoLatitude(132.12),
    },
    //  vGeoLongitude
    {
        lbl: 'functions/vGeoLongitude - valid',
        fn: () => vGeoLongitude(134.567),
    },
    {
        lbl: 'functions/vGeoLongitude - invalid',
        fn: () => vGeoLongitude(232.12),
    },
    //  vGreaterThan
    {
        lbl: 'functions/vGreaterThan - valid',
        fn: () => vGreaterThan(10, 5),
    },
    {
        lbl: 'functions/vGreaterThan - invalid',
        fn: () => vGreaterThan(10, 99),
    },
    //  vGreaterThanOrEqual
    {
        lbl: 'functions/vGreaterThanOrEqual - valid',
        fn: () => vGreaterThanOrEqual(10, 10),
    },
    {
        lbl: 'functions/vGreaterThanOrEqual - invalid',
        fn: () => vGreaterThanOrEqual(10, 99),
    },
    //  vGuid
    {
        lbl: 'functions/vGuid - valid',
        fn: () => vGuid('aaf062a6-fdbc-48f4-9b39-b3c9957b147b'),
    },
    {
        lbl: 'functions/vGuid - invalid',
        fn: () => vGuid('aafG62a6-fdbc-48f4-9b39-b3c9957b147b'),
    },
    //  vIn
    {
        lbl: 'functions/vIn - valid',
        fn: () => vIn('pie', ['cake', 'pie', 'cupcake']),
    },
    {
        lbl: 'functions/vIn - invalid',
        fn: () => vIn('wine', ['cake', 'pie', 'cupcake']),
    },
    //  vFalse
    {
        lbl: 'functions/vFalse - valid',
        fn: () => vFalse(false),
    },
    {
        lbl: 'functions/vFalse - invalid',
        fn: () => vFalse(true),
    },
    //  vTrue
    {
        lbl: 'functions/vTrue - valid',
        fn: () => vTrue(true),
    },
    {
        lbl: 'functions/vTrue - invalid',
        fn: () => vTrue(false),
    },
    //  vLessThan
    {
        lbl: 'functions/vLessThan - valid',
        fn: () => vLessThan(5, 10),
    },
    {
        lbl: 'functions/vLessThan - invalid',
        fn: () => vLessThan(99, 10),
    },
    //  vLessThanOrEqual
    {
        lbl: 'functions/vLessThanOrEqual - valid',
        fn: () => vLessThanOrEqual(10, 10),
    },
    {
        lbl: 'functions/vLessThanOrEqual - invalid',
        fn: () => vLessThanOrEqual(99, 10),
    },
    //  vPhone
    {
        lbl: 'functions/vPhone - valid',
        fn: () => vPhone('+32 487 61 59 82'),
    },
    {
        lbl: 'functions/vPhone - invalid',
        fn: () => vPhone('+32 487'),
    },
    //  vSize
    {
        lbl: 'functions/vSize - string valid',
        fn: () => vSize('hello world', 11),
    },
    {
        lbl: 'functions/vSize - string invalid',
        fn: () => vSize('hello world', 4),
    },
    {
        lbl: 'functions/vSize - array valid',
        fn: () => vSize(['foo', 'bar', true, false], 4),
    },
    {
        lbl: 'functions/vSize - array invalid',
        fn: () => vSize(['foo', 'bar', true, false], 9),
    },
    //  vSysIPv4
    {
        lbl: 'functions/vSysIPv4 - valid',
        fn: () => vSysIPv4('91.18.170.230'),
    },
    {
        lbl: 'functions/vSysIPv4 - invalid',
        fn: () => vSysIPv4('192.x.5.42'),
    },
    //  vSysIPv4_or_v6
    {
        lbl: 'functions/vSysIPv4_or_v6 - valid ipv4',
        fn: () => vSysIPv4_or_v6('91.18.170.230'),
    },
    {
        lbl: 'functions/vSysIPv4_or_v6 - invalid ipv4',
        fn: () => vSysIPv4_or_v6('192.x.5.42'),
    },
    {
        lbl: 'functions/vSysIPv4_or_v6 - valid ipv6',
        fn: () => vSysIPv4_or_v6('04e6:b27a:570b:f035:f3d0:7929:afa9:0ce3'),
    },
    {
        lbl: 'functions/vSysIPv4_or_v6 - invalid ipv6',
        fn: () => vSysIPv4_or_v6('9325:xxxx:568b:39ad:d5bc:8548:d23b:6f92'),
    },
    //  vSysIPv6
    {
        lbl: 'functions/vSysIPv6 - valid',
        fn: () => vSysIPv6('04e6:b27a:570b:f035:f3d0:7929:afa9:0ce3'),
    },
    {
        lbl: 'functions/vSysIPv6 - invalid',
        fn: () => vSysIPv6('9325:xxxx:568b:39ad:d5bc:8548:d23b:6f92'),
    },
    //  vSysPort
    {
        lbl: 'functions/vSysPort - valid',
        fn: () => vSysPort(9999),
    },
    {
        lbl: 'functions/vSysPort - invalid',
        fn: () => vSysPort(0),
    },
    //  vSysMac
    {
        lbl: 'functions/vSysMac - valid',
        fn: () => vSysMac('bb:b6:7f:0b:ae:5a'),
    },
    {
        lbl: 'functions/vSysMac - invalid',
        fn: () => vSysMac('01:23-45:FF-FE:67-89:AB'),
    },
    //  vTimeZone
    {
        lbl: 'functions/vTimeZone - valid',
        fn: () => vTimeZone('Europe/Brussels'),
    },
    {
        lbl: 'functions/vTimeZone - invalid',
        fn: () => vTimeZone('Europe/NewYork'),
    },
    //  vUrl
    {
        lbl: 'functions/vUrl - valid',
        fn: () => vUrl('https://www.146.72.38.20.com'),
    },
    {
        lbl: 'functions/vUrl - invalid',
        fn: () => vUrl('hops://www.146.72.38.20.com'),
    },
    //  vUrlNoQuery
    {
        lbl: 'functions/vUrlNoQuery - valid',
        fn: () => vUrlNoQuery('https://www.146.72.38.20.com'),
    },
    {
        lbl: 'functions/vUrlNoQuery - invalid',
        fn: () => vUrlNoQuery('https://www.146.72.38.20.com?aquery=true'),
    },
    //  vUrlImage
    {
        lbl: 'functions/vUrlImage - valid',
        fn: () => vUrlImage('https://www.myfancyimage.com/123.jpg'),
    },
    {
        lbl: 'functions/vUrlImage - invalid',
        fn: () => vUrlImage('https://www.myfancyimage.com/jpg?aquery=true'),
    },
    //  vUrlAudio
    {
        lbl: 'functions/vUrlAudio - valid',
        fn: () => vUrlAudio('https://www.myfancyimage.com/123.mp3'),
    },
    {
        lbl: 'functions/vUrlAudio - invalid',
        fn: () => vUrlAudio('https://www.myfancyimage.com/mp3?aquery=true'),
    },
    //  vUrlVideo
    {
        lbl: 'functions/vUrlVideo - valid',
        fn: () => vUrlVideo('https://www.myfancyimage.com/123.mp4'),
    },
    {
        lbl: 'functions/vUrlVideo - invalid',
        fn: () => vUrlVideo('https://www.myfancyimage.com/mp4?aquery=true'),
    },
    //  vUrlMedia
    {
        lbl: 'functions/vUrlMedia - valid',
        fn: () => vUrlMedia('https://www.myfancyimage.com/123.jpg'),
    },
    {
        lbl: 'functions/vUrlMedia - invalid',
        fn: () => vUrlMedia('https://www.myfancyimage.com/jpg?aquery=true'),
    },
    //  vISBN
    {
        lbl: 'functions/vISBN - valid',
        fn: () => vISBN('123456789X'),
    },
    {
        lbl: 'functions/vISBN - invalid',
        fn: () => vISBN('12345678912X'),
    },
    //  vISBN-10
    {
        lbl: 'functions/vISBN10 - valid',
        fn: () => vISBN10('123456789X'),
    },
    {
        lbl: 'functions/vISBN10 - invalid',
        fn: () => vISBN10('12345678912X'),
    },
    //  vISBN-13
    {
        lbl: 'functions/vISBN13 - valid',
        fn: () => vISBN13('9781234567897'),
    },
    {
        lbl: 'functions/vISBN10 - invalid',
        fn: () => vISBN13('12345678912X'),
    },
    //  vEAN
    {
        lbl: 'functions/vEAN - valid',
        fn: () => vEAN('1234567890128'),
    },
    {
        lbl: 'functions/vEAN - invalid',
        fn: () => vEAN('12345678901234'),
    },
    //  vEAN-8
    {
        lbl: 'functions/vEAN8 - valid',
        fn: () => vEAN8('12345670'),
    },
    {
        lbl: 'functions/vEAN8 - invalid',
        fn: () => vEAN8('12345678912X'),
    },
    //  vEAN-13
    {
        lbl: 'functions/vEAN13 - valid',
        fn: () => vEAN13('9781234567897'),
    },
    {
        lbl: 'functions/vEAN13 - invalid',
        fn: () => vEAN13('12345678901234'),
    },
    //  vSSN
    {
        lbl: 'functions/vSSN - valid',
        fn: () => vSSN('123-45-6789'),
    },
    {
        lbl: 'functions/vSSN - invalid',
        fn: () => vSSN('12345678901234'),
    },
    //  vULID
    {
        lbl: 'functions/vULID - valid',
        fn: () => vUlid('01ARZ3NDEKTSV4RRFFQ69G5FAV'),
    },
    {
        lbl: 'functions/vULID - invalid',
        fn: () => vUlid('12345678901234'),
    },
    //  vUUID_V1
    {
        lbl: 'functions/vUUID_V1 - valid',
        fn: () => vUuidV1('550e8400-e29b-11d4-a716-446655440000'),
    },
    {
        lbl: 'functions/vUUID_V1 - invalid',
        fn: () => vUuidV1('12345678901234'),
    },
    //  vUUID_V2
    {
        lbl: 'functions/vUUID_V2 - valid',
        fn: () => vUuidV2('550e8400-e29b-21d4-a716-446655440000'),
    },
    {
        lbl: 'functions/vUUID_V2 - invalid',
        fn: () => vUuidV2('12345678901234'),
    },
    //  vUUID_V3
    {
        lbl: 'functions/vUUID_V3 - valid',
        fn: () => vUuidV3('550e8400-e29b-31d4-a716-446655440000'),
    },
    {
        lbl: 'functions/vUUID_V3 - invalid',
        fn: () => vUuidV3('12345678901234'),
    },
    //  vUUID_V4
    {
        lbl: 'functions/vUUID_V4 - valid',
        fn: () => vUuidV4('550e8400-e29b-41d4-a716-446655440000'),
    },
    {
        lbl: 'functions/vUUID_V4 - invalid',
        fn: () => vUuidV4('12345678901234'),
    },
    //  vUUID_V5
    {
        lbl: 'functions/vUUID_V5 - valid',
        fn: () => vUuidV5('550e8400-e29b-51d4-a716-446655440000'),
    },
    {
        lbl: 'functions/vUUID_V5 - invalid',
        fn: () => vUuidV5('12345678901234'),
    },
    //  vUUID
    {
        lbl: 'functions/vUUID - valid',
        fn: () => vUuid('550e8400-e29b-51d4-a716-446655440000'),
    },
    {
        lbl: 'functions/vUUID - invalid',
        fn: () => vUuid('12345678901234'),
    },
]) bench(el, 500000);

fs.writeFileSync('./test/benchmarks/latest.json', JSON.stringify(EXPORT_COLLECTOR, null, 4), 'utf8');

separator();
