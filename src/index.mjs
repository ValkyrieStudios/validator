'use strict';

import isString                 from '@valkyriestudios/utils/src/string/is.mjs';
import isNeString               from '@valkyriestudios/utils/src/string/isNotEmpty.mjs';
import isDate                   from '@valkyriestudios/utils/src/date/is.mjs';
import isNeArray                from '@valkyriestudios/utils/src/array/isNotEmpty.mjs';
import isObject                 from '@valkyriestudios/utils/src/object/is.mjs';
import isNeObject               from '@valkyriestudios/utils/src/object/isNotEmpty.mjs';
import isEqual                  from '@valkyriestudios/utils/src/equal.mjs';
import deepGet                  from '@valkyriestudios/utils/src/deep/get.mjs';
import deepSet                  from '@valkyriestudios/utils/src/deep/set.mjs';
import fnv1A                    from '@valkyriestudios/utils/src/hash/fnv1A.mjs';

import vAlphaNumSpaces          from './functions/vAlphaNumSpaces.mjs';
import vAlphaNumSpacesMultiline from './functions/vAlphaNumSpacesMultiline.mjs';
import vBetween                 from './functions/vBetween.mjs';
import vBetweenInclusive        from './functions/vBetweenInclusive.mjs';
import vBoolean                 from './functions/vBoolean.mjs';
import vColorHex                from './functions/vColorHex.mjs';
import vContinent               from './functions/vContinent.mjs';
import vCountry                 from './functions/vCountry.mjs';
import vCountryAlpha3           from './functions/vCountryAlpha3.mjs';
import vDateString              from './functions/vDateString.mjs';
import vEmail                   from './functions/vEmail.mjs';
import vGeoLatitude             from './functions/vGeoLatitude.mjs';
import vGeoLongitude            from './functions/vGeoLongitude.mjs';
import vGreaterThan             from './functions/vGreaterThan.mjs';
import vGreaterThanOrEqual      from './functions/vGreaterThanOrEqual.mjs';
import vGuid                    from './functions/vGuid.mjs';
import vIn                      from './functions/vIn.mjs';
import vLessThan                from './functions/vLessThan.mjs';
import vLessThanOrEqual         from './functions/vLessThanOrEqual.mjs';
import vMax                     from './functions/vMax.mjs';
import vMin                     from './functions/vMin.mjs';
import vPhone                   from './functions/vPhone.mjs';
import vTimeZone                from './functions/vTimeZone.mjs';
import vRequired                from './functions/vRequired.mjs';
import vSize                    from './functions/vSize.mjs';
import vSysMac                  from './functions/vSysMac.mjs';
import vSysIPv4                 from './functions/vSysIPv4.mjs';
import vSysIPv6                 from './functions/vSysIPv6.mjs';
import vSysIPv4_or_v6           from './functions/vSysIPv4_or_v6.mjs';
import vUrl                     from './functions/vUrl.mjs';
import vUrlNoQuery              from './functions/vUrlNoQuery.mjs';
import vUrlImage                from './functions/vUrlImage.mjs';

const validateFn = {
    alpha_num_spaces            : vAlphaNumSpaces,
    alpha_num_spaces_multiline  : vAlphaNumSpacesMultiline,
    array                       : Array.isArray,
    array_ne                    : isNeArray,
    between                     : vBetween,
    between_inc                 : vBetweenInclusive,
    boolean                     : vBoolean,
    color_hex                   : vColorHex,
    continent                   : vContinent,
    country                     : vCountry,
    country_alpha3              : vCountryAlpha3,
    date                        : isDate,
    date_string                 : vDateString,
    email                       : vEmail,
    equal_to                    : isEqual,
    geo_latitude                : vGeoLatitude,
    geo_longitude               : vGeoLongitude,
    greater_than                : vGreaterThan,
    greater_than_or_equal       : vGreaterThanOrEqual,
    guid                        : vGuid,
    in                          : vIn,
    integer                     : Number.isInteger,
    less_than                   : vLessThan,
    less_than_or_equal          : vLessThanOrEqual,
    max                         : vMax,
    min                         : vMin,
    number                      : Number.isFinite,
    object                      : isObject,
    object_ne                   : isNeObject,
    phone                       : vPhone,
    required                    : vRequired,
    size                        : vSize,
    string                      : isString,
    string_ne                   : isNeString,
    sys_mac                     : vSysMac,
    sys_ipv4                    : vSysIPv4,
    sys_ipv6                    : vSysIPv6,
    sys_ipv4_or_v6              : vSysIPv4_or_v6,
    time_zone                   : vTimeZone,
    url                         : vUrl,
    url_noquery                 : vUrlNoQuery,
    url_img                     : vUrlImage,
    //  Aliases
    gt                          : vGreaterThan,
    gte                         : vGreaterThanOrEqual,
    lt                          : vLessThan,
    lte                         : vLessThanOrEqual,
    eq                          : isEqual,
};

//  Get the config for an iterable validation
//
//  @param string   val     Value to determine config from, eg: 'unique|min:1|max:5'
function getIterableConfig (val) {
    return {
        unique  : val.indexOf('unique') >= 0,
        max     : val.match(/max:\d{1,}(\||$)/) ? parseInt(`${val}`.split('max:', 2)[1].split('|', 1)[0]) : false,
        min     : val.match(/min:\d{1,}(\||$)/) ? parseInt(`${val}`.split('min:', 2)[1].split('|', 1)[0]) : false,
    };
}

export default class Validator {

    constructor (rules = undefined) {
        //  Check for rules
        if (!isObject(rules)) throw new TypeError('Please provide an object to define the rules of this validator');

        //  Recursively parse our validation rules, to allow for deeply nested validation to be done
        function parse (acc, key) {
            const cursor = deepGet(rules, key);

            //  If the cursor is an object, go deeper into the object
            if (isObject(cursor)) {
                Object.keys(cursor).map(cursor_key => `${key}.${cursor_key}`).reduce(parse, acc);
            } else if (isNeString(cursor)) {
                //  If the cursor is a string, we've hit a rule

                let startix     = 0;                        // Adjust to determine start of config rule
                let iterable    = /(\[|\])/g.test(cursor);  //  Iterable flag (false or an object, see iterable config)
                let sometimes   = false;                    //  Sometimes flag
                if (iterable) {
                    const iterable_startix  = cursor.indexOf('[');
                    const iterable_endix    = cursor.indexOf(']');

                    if (
                        iterable_startix < 0 ||
                        iterable_endix < 0 || 
                        iterable_startix > iterable_endix
                    ) throw new TypeError(`Iterable misconfiguration, please verify rule config for ${cursor}`);

                    if (cursor.substring(0, 2) === '?[') {
                        iterable  = getIterableConfig(cursor.substring(2, iterable_endix));
                        sometimes = true;
                        startix   = iterable_endix + 1;
                    } else if (cursor.charAt(0) === '[') {
                        iterable  = getIterableConfig(cursor.substring(1, iterable_endix));
                        startix   = iterable_endix + 1;
                    } else {
                        throw new Error(`Invalid iterable found, please verify rule config for ${cursor}`);
                    }
                } else if (cursor.charAt(0) === '?') {
                    sometimes = true;
                    startix = 1;
                }

                deepSet(acc, key, cursor.substring(startix).split('|').reduce((rule_acc, rule_string) => {
                    let params = rule_string.split(':');
                    let type = params.shift().trim();

                    //  Get 'not' flag
                    const not = type.charAt(0) === '!';
                    if (not) type = type.replace(/!/g, '');

                    //  Get parameters
                    params = params.length > 0 ? params[0].split(',') : [];

                    //  Parse parameters into callback functions
                    params = params.reduce((params_acc, param) => {
                        if (param.charAt(0) === '<' && param.charAt(param.length - 1) === '>') {
                            //  Ensure we validate that parameterized string value is correct eg: <meta.myval>
                            if (!/^[a-zA-Z0-9_.]{1,}$/ig.test(param.substr(1, param.length - 2))) {
                                throw new TypeError(`Parameterization misconfiguration, please verify rule config for ${cursor}`);
                            }
                            
                            param = param.substr(1, param.length - 2);
                            params_acc.push(data => {
                                try {
                                    return deepGet(data, param);
                                } catch (err) {
                                    return undefined;
                                }
                            });
                        } else {
                            params_acc.push(() => param);
                        }
                        return params_acc;
                    }, []);

                    rule_acc.push({type, params, not, sometimes, iterable});
                    return rule_acc;
                }, []));
            } else {
                //  Throw a type error if neither a string nor an object
                throw new TypeError('The rule for a key needs to be a string value');
            }

            return acc;
        }

        const parsed_rules = Object.keys(rules).reduce(parse, {});

        //  Set is_valid as a property on the validator, this will reflect the
        //  validity even if evaluation results are not caught
        this.evaluation = Object.seal({
            is_valid: false,
            errors: {},
        });

        //  Set the parsed rules as a get property on our validation instance
        Object.defineProperty(this, 'rules', {get: () => parsed_rules});
    }

    get is_valid () {
        return this.evaluation.is_valid;
    }

    get errors () {
        return this.evaluation.errors;
    }

    validate (data) {
        const keys = Object.keys(this.rules);

        //  Reset evaluation
        this.evaluation.is_valid = true;
        this.evaluation.errors = {};

        //  No data passed? Check if rules were set up
        if (!data) {
            this.evaluation.is_valid = keys.length === 0;
        } else {
            const run = key => {
                const cursor = deepGet(this.rules, key);

                //  Recursively validate
                if (isNeObject(cursor)) {
                    return Object.keys(cursor).map(cursor_key => {
                        cursor_key = `${key}.${cursor_key}`;
                        deepSet(this.evaluation.errors, cursor_key, []);
                        return cursor_key;
                    }).forEach(run);
                } else {
                    deepSet(this.evaluation.errors, key, []);
                }

                //  Get value
                const val = deepGet(data, key);

                //  Iterable error flags
                let iterable_unique     = true;
                let iterable_err        = false;
                let iterable_min_err    = false;
                let iterable_max_err    = false;

                //  Validate array of rules for this property
                if (!isNeArray(cursor)) return;
                for (const rule of cursor) {
                    //  Check if rule exists
                    if (!validateFn[rule.type]) throw new Error(`Rule: ${rule.type} was not found`);

                    //  Each param rule is a cb function that should be executed on each run, retrieving
                    //  the value inside of the dataset
                    const params = [];
                    for (const rule_param of rule.params) params.push(rule_param(data));

                    //  If rule.sometimes is set and val is not provided, break
                    if (val === undefined) {
                        if (!rule.sometimes) {
                            deepGet(this.evaluation.errors, key).push({msg: `${rule.not ? 'not_' : ''}${rule.type}`, params});
                            this.evaluation.is_valid = false;
                        }
                        continue;
                    }

                    //  If this is an iterable
                    if (isObject(rule.iterable)) {
                        //  If not an array -> invalid
                        if (!Array.isArray(val)) {
                            iterable_err = true;
                            break;
                        }

                        //  rule.iterable.min is set and val length is below the min -> invalid
                        if (Number.isFinite(rule.iterable.min) && val.length < rule.iterable.min) {
                            iterable_min_err = rule.iterable.min;
                            break;
                        }

                        //  rule.iterable.min is set and val length is below the min -> invalid
                        if (Number.isFinite(rule.iterable.max) && val.length > rule.iterable.max) {
                            iterable_max_err = rule.iterable.max;
                            break;
                        }

                        const unique_map = iterable_unique && rule.iterable.unique ? new Map() : false;
                        for (let i = 0; i < val.length; i++) {
                            //  Run validation
                            const rule_valid = validateFn[rule.type].call(this, val[i], ...params);

                            //  If check fails (not valid && not not | not && valid)
                            if ((!rule_valid && !rule.not) || (rule_valid && rule.not)) {
                                deepGet(this.evaluation.errors, key).push({msg: `${rule.not ? 'not_' : ''}${rule.type}`, params, idx: i});
                                this.evaluation.is_valid = false;
                            }

                            //  Uniqueness checks for iterable
                            if (unique_map && iterable_unique) {
                                unique_map.set(fnv1A(val[i]), true);
                                if (unique_map.size !== (i + 1)) iterable_unique = false;
                            }
                        }
                    } else {
                        //  Run validation
                        const rule_valid = validateFn[rule.type].call(this, val, ...params);

                        //  If check fails (not valid && not not | not && valid)
                        if ((!rule_valid && !rule.not) || (rule_valid && rule.not)) {
                            deepGet(this.evaluation.errors, key).push({msg: `${rule.not ? 'not_' : ''}${rule.type}`, params});
                            this.evaluation.is_valid = false;
                        }
                    }
                }

                //  Inject iterable errors
                if (iterable_err === true) {
                    deepGet(this.evaluation.errors, key).push({msg: 'iterable', params: []});
                    this.evaluation.is_valid = false;
                } else if (Number.isFinite(iterable_min_err)) {
                    deepGet(this.evaluation.errors, key).push({msg: 'iterable_min', params: [iterable_min_err]});
                    this.evaluation.is_valid = false;
                } else if (Number.isFinite(iterable_max_err)) {
                    deepGet(this.evaluation.errors, key).push({msg: 'iterable_max', params: [iterable_max_err]});
                    this.evaluation.is_valid = false;
                } else if (!iterable_unique) {
                    deepGet(this.evaluation.errors, key).unshift({msg: 'iterable_unique', params: []});
                    this.evaluation.is_valid = false;
                }
            };

            //  Prep the evaluation for the keys in the rules
            for (const key of keys) {
                deepSet(this.evaluation.errors, key, {});
                run(key);
            }
        }

        return Object.assign({}, this.evaluation);
    }

    //  Returns the rule set currently on the validator, will return it as an immutable dereferenced object
    static get rules () {
        return Object.freeze(Object.assign({}, validateFn));
    }

    //  Extend validator rule set
    //
    //  @param string   name    Name of the rule
    //  @param Function fn      Validation function
    static extend (name, fn) {
        //  Check if a name which is a non-empty string is provided
        if (
            typeof name !== 'string' ||
            name.trim().length === 0
        ) throw new Error('Invalid extension: please ensure a valid name is passed');

        const sanitized_name = name.trim();

        //  Check if function is provided
        if (
            typeof fn !== 'function'
        ) throw new Error(`Invalid extension: ${sanitized_name}, please ensure a valid function is passed`);

        //  If prop already exists, delete it
        if (validateFn[sanitized_name]) delete validateFn[sanitized_name];

        //  Define property with a configurable flag to allow reconfiguration
        Object.defineProperty(validateFn, sanitized_name, {configurable: true, enumerable: true, get : () => fn});
    }

    //  Run multiple validator extensions in one go by passing an object
    //
    //  @param object   obj     Object in the format of {rule_1: Function, rule_2: Function, ...}
    static extendMulti (obj) {
        //  Check if passed variable is an object
        if (
            !isObject(obj)
        ) throw new Error('Please provide an object to extendMulti');

        //  For each key in object, check if its value is a function
        for (const name of Object.keys(obj)) Validator.extend(name, obj[name]);
    }

}
