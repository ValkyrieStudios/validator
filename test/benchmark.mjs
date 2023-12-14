'use strict';

/* eslint-disable max-len,no-console,no-unused-vars */

import fs from 'fs';

import vAlphaNumSpaces          from '../src/functions/vAlphaNumSpaces.mjs';
import vAlphaNumSpacesMultiline from '../src/functions/vAlphaNumSpacesMultiline.mjs';
import vBetween                 from '../src/functions/vBetween.mjs';
import vBetweenInclusive        from '../src/functions/vBetweenInclusive.mjs';
import vBoolean                 from '../src/functions/vBoolean.mjs';
import vColorHex                from '../src/functions/vColorHex.mjs';
import vContinent               from '../src/functions/vContinent.mjs';
import vCountry                 from '../src/functions/vCountry.mjs';
import vCountryAlpha3           from '../src/functions/vCountryAlpha3.mjs';
import vDateString              from '../src/functions/vDateString.mjs';
import vEmail                   from '../src/functions/vEmail.mjs';
import vFalse                   from '../src/functions/vFalse.mjs';
import vGeoLatitude             from '../src/functions/vGeoLatitude.mjs';
import vGeoLongitude            from '../src/functions/vGeoLongitude.mjs';
import vGreaterThan             from '../src/functions/vGreaterThan.mjs';
import vGreaterThanOrEqual      from '../src/functions/vGreaterThanOrEqual.mjs';
import vGuid                    from '../src/functions/vGuid.mjs';
import vIn                      from '../src/functions/vIn.mjs';
import vLessThan                from '../src/functions/vLessThan.mjs';
import vLessThanOrEqual         from '../src/functions/vLessThanOrEqual.mjs';
import vMax                     from '../src/functions/vMax.mjs';
import vMin                     from '../src/functions/vMin.mjs';
import vPhone                   from '../src/functions/vPhone.mjs';
import vRequired                from '../src/functions/vRequired.mjs';
import vSize                    from '../src/functions/vSize.mjs';
import vSysIPv4                 from '../src/functions/vSysIPv4.mjs';
import vSysIPv4_or_v6           from '../src/functions/vSysIPv4_or_v6.mjs';
import vSysIPv6                 from '../src/functions/vSysIPv6.mjs';
import vSysMac                  from '../src/functions/vSysMac.mjs';
import vTimeZone                from '../src/functions/vTimeZone.mjs';
import vTrue                    from '../src/functions/vTrue.mjs';
import vUrl                     from '../src/functions/vUrl.mjs';
import vUrlNoQuery              from '../src/functions/vUrlNoQuery.mjs';
import vUrlImage                from '../src/functions/vUrlImage.mjs';
import Validator                from '../src/index.mjs';

const ROW_TEST_WIDTH    = 60;
const ROW_OPS_WIDTH     = 20;
const EXPORT_COLLECTOR  = [];

function separator () {
    console.info(''.padEnd(ROW_TEST_WIDTH + ROW_OPS_WIDTH, '-'));
}

function bench (el, iterations) {
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
const vsimple_groups = new Validator({a: '(string_ne)(false)'});
const vmedium_groups = new Validator({
    first_name: '(string|alpha_num_spaces|min:2)(false)',
    last_name: '(string|alpha_num_spaces|min:2)(false)',
    age: '?integer|between:1,150',
    gender: 'in:<meta.gender_options>',
});
const venum = new Validator({animal: 'MYENUM'});
Validator.extendEnum({MYENUM: ['dog', 'cat', 'bird', 'donkey', 'cow', 'horse', 'pig']});

const vregex = new Validator({a: 'is_hello'});
Validator.extendRegex({is_hello: /^((h|H)ello|(o|O)la)$/});

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
        fn: () => new Validator({a: '(string_ne)(false)'}).validate({a: 'hello'}),
    },
    {
        lbl: 'Validator@validate - coldstart - groups/medium',
        fn: () => new Validator({
            first_name: '(string|alpha_num_spaces|min:2)(false)',
            last_name: '(string|alpha_num_spaces|min:2)(false)',
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
        fn: () => new Validator({a: '(string_ne)(false)'}).check({a: 'hello'}),
    },
    {
        lbl: 'Validator@check - coldstart - groups/simple - invalid',
        fn: () => new Validator({a: '(string_ne)(false)'}).check({a: 42}),
    },
    {
        lbl: 'Validator@check - coldstart - groups/medium - valid',
        fn: () => new Validator({
            first_name: '(string|alpha_num_spaces|min:2)(false)',
            last_name: '(string|alpha_num_spaces|min:2)(false)',
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
            first_name: '(string|alpha_num_spaces|min:2)(false)',
            last_name: '(string|alpha_num_spaces|min:2)(false)',
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
    //  vBoolean
    {
        lbl: 'functions/vBoolean - valid',
        fn: () => vBoolean(true),
    },
    {
        lbl: 'functions/vBoolean - invalid',
        fn: () => vBoolean('hello'),
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
    //  vMax
    {
        lbl: 'functions/vMax - valid',
        fn: () => vMax(5, 10),
    },
    {
        lbl: 'functions/vMax - invalid',
        fn: () => vMax(99, 10),
    },
    //  vMin
    {
        lbl: 'functions/vMin - valid',
        fn: () => vMin(10, 5),
    },
    {
        lbl: 'functions/vMin - invalid',
        fn: () => vMin(10, 99),
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
    //  vRequired
    {
        lbl: 'functions/vRequired - valid',
        fn: () => vRequired('amazing'),
    },
    {
        lbl: 'functions/vRequired - invalid',
        fn: () => vRequired(null),
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
]) bench(el, 100000);

fs.writeFileSync('./test/benchmarks/latest.json', JSON.stringify(EXPORT_COLLECTOR, null, 4, true), 'utf8');

separator();
