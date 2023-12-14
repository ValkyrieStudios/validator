'use strict';

import isString                 from '@valkyriestudios/utils/src/string/is.mjs';
import isNeString               from '@valkyriestudios/utils/src/string/isNotEmpty.mjs';
import isDate                   from '@valkyriestudios/utils/src/date/is.mjs';
import isNeArray                from '@valkyriestudios/utils/src/array/isNotEmpty.mjs';
import isObject                 from '@valkyriestudios/utils/src/object/is.mjs';
import isNeObject               from '@valkyriestudios/utils/src/object/isNotEmpty.mjs';
import isEqual                  from '@valkyriestudios/utils/src/equal.mjs';
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
import vFalse                   from './functions/vFalse.mjs';
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
import vTrue                    from './functions/vTrue.mjs';
import vUrl                     from './functions/vUrl.mjs';
import vUrlNoQuery              from './functions/vUrlNoQuery.mjs';
import vUrlImage                from './functions/vUrlImage.mjs';

//  Used for enum storage using extendEnum
const ENUM_STORE = new Map();

//  Used for regex storage using extendRegex
const REGEX_STORE = new Map();

//  Used for rule storage of all validation rules
const RULE_STORE = {
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
    false                       : vFalse,
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
    true                        : vTrue,
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

//  Validate whether or not a name is valid
//
//  @param string   val     Value to validate
function isValidName (val) {
    return /^[A-Za-z_\-0-9]{1,}$/g.test(val);
}

//  Validate whether or not a passed object has valid names/values
//
//  @param Object   obj         Object to validate
//  @param Function valueFn     Function to use for value checks
function isValidExtension (obj, valueFn) {
    if (!isObject(obj) || Object.keys(obj).filter(val => !isValidName(val)).length > 0) throw new Error('Invalid extension');

    //  Validate all values
    for (const val of Object.values(obj)) valueFn(val);
}

//  Error model function
//
//  @param string   msg     Error message being hit
//  @param array    params  (default=[]) Parameters that were passed
function M_Error (msg, params = []) {
    return {msg, params};
}

//  Get a value from a path in a json-like structure
//
//  @param object   obj     Object to pull data from
//  @param string   path    Path to pull from (eg: 'a.b.c')
function deepGet (obj, path) {
    const parts = path.split('.');

    let cursor = obj;
    while (parts.length > 0) {
        if (isObject(cursor)) {
            const key = parts.shift();
            if (!Object.prototype.hasOwnProperty.call(cursor, key)) return undefined;
            cursor = cursor[key];
        }

        //  If we have more parts and cursor is not an object -> immediately return undefined
        if (parts.length > 0 && !isObject(cursor)) return undefined;
    }

    return cursor;
}

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

//  Parse a rule into a sub validator pipeline
//
//  @param string   raw    Rule value
function parseRule (raw) {
    //  Copy contents of raw into here as working-copy
    let cursor = `${raw}`;

    //  ([...]) Check for iterable behavior
    let iterable = /(\[|\])/g.test(cursor);
    if (iterable) {
        const start_ix  = cursor.indexOf('[');
        const end_ix    = cursor.indexOf(']');
        if (start_ix !== 0 || end_ix < 0) throw new TypeError(`Iterable misconfiguration, verify rule config for ${raw}`);

        iterable  = getIterableConfig(cursor.substring(0, end_ix));
        cursor    = cursor.substring(end_ix + 1);
    }

    //  Accumulate all the checks that need to be run for this field
    //  (eg: string_ne|min:20 will become an array with two checks)
    const list = cursor.split('|').reduce((acc, rule_part) => {
        let params  = rule_part.split(':');
        let type    = params.shift().trim();

        //  Get 'not' flag
        const not = type.charAt(0) === '!';
        if (not) type = type.substring(1);

        //  Get parameters
        if (params.length > 0) {
            if (type === 'in' && params[0].indexOf(',') > 0) {
                params = [params[0].split(',')];
            } else {
                params = params[0].split(',');

                //  Parse parameters into callback functions
                for (let i = 0; i < params.length; i++) {
                    let param = params[i];
                    if (param.charAt(0) === '<' && param.charAt(param.length - 1) === '>') {
                        //  Ensure we validate that parameterized string value is correct eg: <meta.myval>
                        if (!/^[a-zA-Z0-9_.]{1,}$/ig.test(param.substr(1, param.length - 2))) {
                            throw new TypeError(`Parameterization misconfiguration, verify rule config for ${raw}`);
                        }
                        
                        param = param.substr(1, param.length - 2);
                        params[i] = data => deepGet(data, param);
                    } else {
                        params[i] = param;
                    }
                }
            }
        }

        acc.push({type, params, not});
        return acc;
    }, []);

    return {iterable, list};
}

//  Parse a rule into or-group
//
//  @param string   raw    Raw configured string with possible or groups
function parseGroups (raw) {
    //  Copy contents of raw into here as working-copy
    let cursor = `${raw}`;

    //  (?) Parse sometimes flag
    const sometimes = cursor.charAt(0) === '?';
    if (sometimes) cursor = cursor.substring(1);

    //  Conditional or group
    let conditionals = cursor.match(/\([a-zA-Z0-9\|?\.\[\]\:\<\>]{1,}\)/g);
    if (!conditionals) conditionals = [cursor];

    //  Parse into rules
    const rules = [];
    for (const el of conditionals) rules.push(parseRule(el.replace(/(\(|\))/g, '')));

    return {sometimes, rules};
}

//  Fully validate a rule list against a certain field cursor, returns errors array and is_valid prop
//
//  @param mixed    cursor          Cursor value to run the rule list against
//  @param array    list            List of rules to run against the cursor
//  @param object   data            Original data object (used in param checks)
function validateField (cursor, list, data) {
    const errors = [];
    for (const rule of list) {
        //  Check if rule exists
        if (!RULE_STORE[rule.type]) {
            errors.push(M_Error('rule_not_found', [rule.type]));
            continue;
        }

        //  Get params that need to be passed, each param is either a function or a primitive
        const params = [];
        for (const p of rule.params) params.push(typeof p === 'function' ? p(data) : p);

        //  Run rule - if check fails (not valid && not not | not && valid) push into errors
        const rule_valid = RULE_STORE[rule.type](cursor, ...params);
        if ((!rule_valid && !rule.not) || (rule_valid && rule.not)) {
            errors.push(M_Error(`${rule.not ? 'not_' : ''}${rule.type}`, params));
        }
    }

    return {errors, is_valid: errors.length === 0};
}

//  Check a rule list against a certain field cursor, returns true/false if valid or not
//
//  @param mixed    cursor          Cursor value to run the rule list against
//  @param array    list            List of rules to run against the cursor
//  @param object   data            Original data object (used in param checks)
function checkField (cursor, list, data) {
    for (const rule of list) {
        //  Check if rule exists
        if (!RULE_STORE[rule.type]) return false;

        //  Get params that need to be passed, each param is either a function or a primitive
        const params = [];
        for (const p of rule.params) params.push(typeof p === 'function' ? p(data) : p);

        //  Run rule - if check fails (not valid && not not | not && valid)
        const rule_valid = RULE_STORE[rule.type](cursor, ...params);
        if ((!rule_valid && !rule.not) || (rule_valid && rule.not)) return false;
    }

    return true;
}

export default class Validator {

    constructor (rules = undefined) {
        //  Check for rules
        if (!isObject(rules)) throw new TypeError('Provide an object to define the rules of this validator');

        //  Recursively parse our validation rules, to allow for deeply nested validation to be done
        const plan = [];
        function recursor (val, key) {
            //  If      the cursor is an object -> recurse
            //  Elif    the cursor is a string -> parse
            //  El      throw error as misconfiguration
            if (isObject(val)) {
                Object.keys(val).forEach(val_key => recursor(val[val_key], key ? `${key}.${val_key}` : val_key));
            } else if (isNeString(val)) {
                const rule = parseGroups(val);
                rule.key = key;
                plan.push(rule);
            } else {
                //  Throw a type error if neither a string nor an object
                throw new TypeError('The rule for a key needs to be a string value');
            }
        }
        recursor(rules);

        //  Set the parsed plan as a get property on our validation instance
        Object.defineProperty(this, 'plan', {get: () => plan});
    }

    check (data) {
        //  No data passed? Check if rules were set up
        if (!isObject(data)) return this.plan.length === 0;
        
        for (const part of this.plan) {
            //  Retrieve cursor that part is run against
            const cursor = deepGet(data, part.key);
            
            //  If we cant find cursor we need to validate for the 'sometimes' flag
            if (cursor === undefined) {
                if (part.sometimes) continue;
                return false;
            }

            //  Go through rules in cursor: if all of them are invalid return false immediately
            let valid_count = 0;
            for (const rule of part.rules) {
                let is_valid = true;

                //  Check for iterable config
                if (rule.iterable) {
                    if (
                        //  If not an array -> invalid
                        !Array.isArray(cursor) || 
                        //  rule.iterable.min is set and val length is below the min -> invalid
                        (Number.isFinite(rule.iterable.min) && cursor.length < rule.iterable.min) || 
                        //  rule.iterable.max is set and val length is above max -> invalid
                        (Number.isFinite(rule.iterable.max) && cursor.length > rule.iterable.max)
                    ) {
                        is_valid = false;
                    } else {
                        //  If rule.iterable.unique is set create map to store hashes and keep tabs
                        //  on uniqueness as we run through the array
                        const unique_map = new Map();
                        for (let idx = 0; idx < cursor.length; idx++) {
                            if (!checkField(cursor[idx], rule.list, data)) {
                                is_valid = false;
                                break;
                            }

                            //  Continue if no uniqueness checks need to happen
                            if (!rule.iterable.unique) continue;

                            //  Compute fnv hash if uniqueness needs to be checked, if map size differs its not unique
                            unique_map.set(fnv1A(cursor[idx]), true);
                            if (unique_map.size !== (idx + 1)) {
                                is_valid = false;
                                break;
                            }
                        }
                    }
                } else if (!checkField(cursor, rule.list, data)) {
                    is_valid = false;
                }

                if (is_valid) valid_count++;
            }

            if (!valid_count) return false;
        }

        return true;
    }

    validate (data) {
        //  No data passed? Check if rules were set up
        if (!isObject(data)) {
            const is_valid = this.plan.length === 0;
            return {
                is_valid,
                count: this.plan.length,
                errors: is_valid ? {} : 'NO_DATA',
            };
        }

        const errors = {};
        for (const rule of this.plan) {
            //  Retrieve cursor that rule is run against
            const cursor = deepGet(data, rule.key);
            
            //  If we cant find cursor we need to validate for the 'sometimes' flag
            if (cursor === undefined) {
                if (!rule.sometimes) errors[rule.key] = [M_Error('not_found')];
                continue;
            }

            //  Check for iterable config
            if (rule.iterable) {
                //  If not an array -> invalid
                if (!Array.isArray(cursor)) {
                    errors[rule.key] = [M_Error('iterable')];
                    continue;
                }

                //  rule.iterable.min is set and val length is below the min -> invalid
                if (Number.isFinite(rule.iterable.min) && cursor.length < rule.iterable.min) {
                    errors[rule.key] = [M_Error('iterable_min', [rule.iterable.min])];
                    continue;
                }

                //  rule.iterable.max is set and val length is above max -> invalid
                if (Number.isFinite(rule.iterable.max) && cursor.length > rule.iterable.max) {
                    errors[rule.key] = [M_Error('iterable_max', [rule.iterable.max])];
                    continue;
                }

                //  If rule.iterable.unique is set create map to store hashes and keep tabs
                //  on uniqueness as we run through the array
                let iterable_unique = true;
                const unique_map    = iterable_unique && rule.iterable.unique ? new Map() : false;
                for (let idx = 0; idx < cursor.length; idx++) {
                    const field_evaluation = validateField(cursor[idx], rule.list, data);
                    if (!field_evaluation.is_valid) {
                        if (!errors[rule.key]) errors[rule.key] = [];
                        for (const obj of field_evaluation.errors) errors[rule.key].push(Object.assign({idx}, obj));
                    }

                    //  If no unique map or iterable unique was already turned off continue
                    if (!unique_map || !iterable_unique) continue;

                    //  Compute fnv hash if uniqueness needs to be checked, if map size differs from
                    //  our current point in the iteration add uniqueness error
                    unique_map.set(fnv1A(cursor[idx]), true);
                    if (unique_map.size !== (idx + 1)) {
                        iterable_unique = false;
                        if (!errors[rule.key]) errors[rule.key] = [];
                        errors[rule.key].unshift(M_Error('iterable_unique'));
                    }
                }
            } else {
                const field_evaluation = validateField(cursor, rule.list, data);
                if (!field_evaluation.is_valid) errors[rule.key] = field_evaluation.errors;
            }
        }

        const count = Object.keys(errors).length;

        return {is_valid: !count, count, errors};
    }

    //  Returns the rule set currently on the validator, will return it as an immutable dereferenced object
    static get rules () {
        return Object.freeze(Object.assign({}, RULE_STORE));
    }

    //  Extend validator rule set
    //
    //  @param string   name    Name of the rule
    //  @param Function fn      Validation function
    static extend (name, fn) {
        if (typeof name !== 'string') throw new Error('Invalid extension');
        Validator.extendMulti({[name]: fn});
    }

    //  Run multiple validator extensions in one go by passing an object
    //
    //  @param object   obj     Object in the format of {rule_1: Function, rule_2: Function, ...}
    static extendMulti (obj) {
        isValidExtension(obj, val => {
            if (typeof val !== 'function') throw new Error('Invalid extension');
        });

        //  Register each rule
        for (const key of Object.keys(obj)) RULE_STORE[key] = obj[key];
    }

    //  Add regex validation rule
    //
    //  @param object   obj     Regex rule objects, in format of {myregex: /.../, myotherregex: new RegExp()}
    static extendRegex (obj) {
        isValidExtension(obj, val => {
            if (Object.prototype.toString.call(val) !== '[object RegExp]') throw new Error('Invalid extension');
        });

        //  For each key in object, check if its value is a function
        for (const key of Object.keys(obj)) {
            //  Create function and transfer key to it
            let f = function (val) {
                return typeof val === 'string' && REGEX_STORE.get(this.uid).test(val); // eslint-disable-line no-invalid-this
            };
            f.uid = key;
            f = f.bind(f);
            REGEX_STORE.set(key, new RegExp(obj[key])); // Copy regex

            //  Store on map
            RULE_STORE[key] = f;
        }
    }

    //  Add an enum validation rule
    //
    //  @param object   obj     Enumeration rule objects, in format of {myenum: [...], myotherenum: [...]}
    static extendEnum (obj) {
        isValidExtension(obj, val => {
            if (Array.isArray(val) && val.length !== 0 && val.filter(el => isNeString(el) || Number.isFinite(el)).length === val.length) return;
            throw new Error('Invalid extension');
        });

        //  For each key in object, check if its value is a function
        for (const key of Object.keys(obj)) {
            //  Convert array to map (also dedupes)
            const enum_map = new Map();
            for (const el of obj[key]) enum_map.set(el, true);

            //  Create function and transfer key to it
            let f = function (val) {
                return (typeof val === 'string' || Number.isFinite(val)) && ENUM_STORE.get(this.uid).has(val); // eslint-disable-line no-invalid-this,max-len
            };
            f.uid = key;
            f = f.bind(f);
            ENUM_STORE.set(key, enum_map);

            //  Store on map
            RULE_STORE[key] = f;
        }
    }

}
