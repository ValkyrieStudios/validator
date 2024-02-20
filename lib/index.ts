'use strict';

import isBoolean                from '@valkyriestudios/utils/boolean/is';
import isString                 from '@valkyriestudios/utils/string/is';
import isNeString               from '@valkyriestudios/utils/string/isNotEmpty';
import isDate                   from '@valkyriestudios/utils/date/is';
import isFunction               from '@valkyriestudios/utils/function/is';
import isAsyncFunction          from '@valkyriestudios/utils/function/isAsync';
import isNeArray                from '@valkyriestudios/utils/array/isNotEmpty';
import isObject                 from '@valkyriestudios/utils/object/is';
import isNeObject               from '@valkyriestudios/utils/object/isNotEmpty';
import isEqual                  from '@valkyriestudios/utils/equal';
import fnv1A                    from '@valkyriestudios/utils/hash/fnv1A';

import vAlphaNumSpaces          from './functions/vAlphaNumSpaces';
import vAlphaNumSpacesMultiline from './functions/vAlphaNumSpacesMultiline';
import vBetween                 from './functions/vBetween';
import vBetweenInclusive        from './functions/vBetweenInclusive';
import vColorHex                from './functions/vColorHex';
import vContinent               from './functions/vContinent';
import vCountry                 from './functions/vCountry';
import vCountryAlpha3           from './functions/vCountryAlpha3';
import vDateString              from './functions/vDateString';
import vEmail                   from './functions/vEmail';
import vFalse                   from './functions/vFalse';
import vGeoLatitude             from './functions/vGeoLatitude';
import vGeoLongitude            from './functions/vGeoLongitude';
import vGreaterThan             from './functions/vGreaterThan';
import vGreaterThanOrEqual      from './functions/vGreaterThanOrEqual';
import vGuid                    from './functions/vGuid';
import vIn                      from './functions/vIn';
import vLessThan                from './functions/vLessThan';
import vLessThanOrEqual         from './functions/vLessThanOrEqual';
import vPhone                   from './functions/vPhone';
import vTimeZone                from './functions/vTimeZone';
import vRequired                from './functions/vRequired';
import vSize                    from './functions/vSize';
import vSysMac                  from './functions/vSysMac';
import vSysIPv4                 from './functions/vSysIPv4';
import vSysIPv6                 from './functions/vSysIPv6';
import vSysIPv4_or_v6           from './functions/vSysIPv4_or_v6';
import vSysPort                 from './functions/vSysPort';
import vTrue                    from './functions/vTrue';
import vUrl                     from './functions/vUrl';
import vUrlNoQuery              from './functions/vUrlNoQuery';
import vUrlImage                from './functions/vUrlImage';

//  Raw data type for input checking
type DataPrimitive          = string | number | boolean | Date | symbol | null | unknown;
type DataVal                = DataPrimitive | DataObject | DataArray;
type DataArray              = Array<DataVal>;
type DataObject             = {[key:string]: DataVal};
export type GenericObject   = {[key:string]:any};

//  Validation rule input data types
type RulesRawVal            = string | RulesRaw;
export type RulesRaw        = {[key:string]: RulesRawVal};

//  Validation components
interface ValidationError {
    msg:string;
    params:DataVal[];
}

interface ValidationIterable {
    unique: boolean;
    max: number|boolean;
    min: number|boolean;
}

interface ValidationRulePart {
    type:string;
    params:unknown[];
    not:boolean;
}

interface ValidationRules {
    iterable:ValidationIterable|false;
    list: ValidationRulePart[];
}

interface ValidationGroup {
    key:string;
    sometimes:boolean;
    rules:ValidationRules[];
}

//  Used for enum storage using extendEnum
type ExtEnumValInner    = string | number;
type ExtEnumVal         = ExtEnumValInner[];
type ExtEnum            = Record<string, ExtEnumVal>;
const ENUM_STORE:Map<string, Map<ExtEnumValInner, boolean>> = new Map();

//  Used for regex storage using extendRegex
type ExtRegExpVal   = RegExp;
type ExtRegExp      = Record<string, ExtRegExpVal>;
const REGEX_STORE:Map<string, ExtRegExpVal> = new Map();

//  Rule storage
type DefaultRuleDictionary = {
    alpha_num_spaces: typeof vAlphaNumSpaces;
    alpha_num_spaces_multiline: typeof vAlphaNumSpaces;
    array: (val:unknown) => boolean;
    array_ne: typeof isNeArray;
    between: typeof vBetween;
    between_inc: typeof vBetweenInclusive;
    boolean: typeof isBoolean;
    color_hex: typeof vColorHex;
    continent: typeof vContinent;
    country: typeof vCountry;
    country_alpha3: typeof vCountryAlpha3;
    date: typeof isDate;
    date_string: typeof vDateString;
    email: typeof vEmail;
    equal_to: typeof isEqual;
    false: typeof vFalse;
    function: typeof isFunction;
    async_function: typeof isAsyncFunction;
    geo_latitude: typeof vGeoLatitude;
    geo_longitude: typeof vGeoLongitude;
    greater_than: typeof vGreaterThan;
    greater_than_or_equal: typeof vGreaterThanOrEqual;
    guid: typeof vGuid;
    in: typeof vIn;
    integer: (val:unknown) => boolean;
    less_than: typeof vLessThan;
    less_than_or_equal: typeof vLessThanOrEqual;
    max: typeof vLessThanOrEqual;
    min: typeof vGreaterThanOrEqual;
    number: (val:unknown) => boolean;
    object: typeof isObject;
    object_ne: typeof isNeObject;
    phone: typeof vPhone;
    required: typeof vRequired;
    size: typeof vSize;
    string: typeof isString;
    string_ne: typeof isNeString;
    sys_mac: typeof vSysMac;
    sys_ipv4: typeof vSysIPv4;
    sys_ipv6: typeof vSysIPv6;
    sys_ipv4_or_v6: typeof vSysIPv4_or_v6;
    sys_port: typeof vSysPort;
    time_zone: typeof vTimeZone;
    true: typeof vTrue;
    url: typeof vUrl;
    url_noquery: typeof vUrlNoQuery;
    url_img: typeof vUrlImage;
    gt: typeof vGreaterThan;
    gte: typeof vGreaterThanOrEqual;
    lt: typeof vLessThan;
    lte: typeof vLessThanOrEqual;
    eq: typeof isEqual;
};

type CustomRuleDictionary = Record<string, (...args:any[]) => boolean>;

type RuleDictionary = DefaultRuleDictionary & CustomRuleDictionary;

/**
 * Validate whether or not a passed object has valid names/values
 *
 * @param obj - Object to validate
 * @param valueFn - Function to use for value checks
 *
 * @throws {Error} Will throw if the extension is invalid
 */
function validExtension  <T> (
    obj:Record<string, T>,
    valueFn:(arg0:T) => void
) {
    if (
        !isObject(obj) ||
        Object.keys(obj).filter(val => !/^[A-Za-z_\-0-9]{1,}$/g.test(val)).length > 0
    ) throw new Error('Invalid extension');

    //  Validate all values
    for (const val of Object.values(obj)) valueFn(val);
}

/**
 * Get a value from a path in a json-like structure
 *
 * @param obj - Object to pull data from (eg: {a: {b: {c: 'hello}}})
 * @param path - Path to pull from (eg: 'a.b.c')
 *
 * @returns {DataVal} Value at path position
 */
function deepGet (obj:DataObject, path:string):DataVal {
    const parts = path.split('.');

    let cursor:DataVal = obj;
    while (parts.length > 0) {
        if (isObject(cursor)) {
            const key = parts.shift();
            if (!Object.prototype.hasOwnProperty.call(cursor, key)) return undefined;
            cursor = (cursor as DataObject)[key];
        }

        //  If we have more parts and cursor is not an object -> immediately return undefined
        if (parts.length > 0 && !isObject(cursor)) return undefined;
    }

    return cursor;
}

/**
 * Parse raw string into iterable configuration
 *
 * @param val - Value to determine config from, eg: 'unique|min:1|max:5'
 *
 * @returns {ValidationIterable} Iterable configuration
 */
function getIterableConfig (val:string):ValidationIterable {
    const max = val.match(/max:\d{1,}/);
    const min = val.match(/min:\d{1,}/);
    return {
        unique  : val.indexOf('unique') >= 0,
        max     : max ? parseInt(`${max[0]}`.split('max:', 2)[1]) : false,
        min     : min ? parseInt(`${min[0]}`.split('min:', 2)[1]) : false,
    };
}

/**
 * Parse a rule into a sub validator pipeline
 *
 * @param raw - Raw validation rule
 *
 * @returns {ValidationRules} Parsed validation rule
 */
function parseRule (raw:string):ValidationRules {
    //  Copy contents of raw into here as working-copy
    let cursor = `${raw}`;

    //  ([...]) Check for iterable behavior
    let iterable:ValidationIterable|false = false;
    if (/(\[|\]){1,}/.test(cursor)) {
        const start_ix  = cursor.indexOf('[');
        const end_ix    = cursor.indexOf(']');
        if (start_ix !== 0 || end_ix < 0) throw new TypeError(`Iterable misconfiguration, verify rule config for ${raw}`);

        iterable  = getIterableConfig(cursor.substring(0, end_ix));
        cursor    = cursor.substring(end_ix + 1);
    }

    /**
     * Accumulate all the checks that need to be run for this field
     * (eg: string_ne|min:20 will become an array with two checks)
     */
    const list = cursor.split('|').reduce((acc, rule_part) => {
        let params:string[]|string[][]|unknown[]|unknown[][]  = rule_part.split(':');
        let type    = (params.shift() as string).trim();

        //  Get 'not' flag
        const not = type.charAt(0) === '!';
        if (not) type = type.substring(1);

        //  Get parameters
        if (params.length > 0) {
            if (type === 'in' && (params[0] as string).indexOf(',') > 0) {
                params = [(params[0] as string).split(',')];
            } else {
                params = (params[0] as string).split(',');

                //  Parse parameters into callback functions
                for (let i = 0; i < params.length; i++) {
                    let param = params[i] as string;
                    if (param.charAt(0) === '<' && param.charAt(param.length - 1) === '>') {
                        //  Ensure we validate that parameterized string value is correct eg: <meta.myval>
                        if (!/^[a-zA-Z0-9_.]{1,}$/ig.test(param.substr(1, param.length - 2))) {
                            throw new TypeError(`Parameterization misconfiguration, verify rule config for ${raw}`);
                        }

                        param = param.substr(1, param.length - 2);
                        params[i] = (data:DataObject) => deepGet(data, param);
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

/**
 * Parse a rule into a validation group (X OR Y OR Z)
 *
 * @param key - Name of the group (key path on the validator)
 * @param raw - Full rule string with possible or groups
 *
 * @returns Parsed validation group
 */
function parseGroup (key:string, raw:string):ValidationGroup {
    //  Copy contents of raw into here as working-copy
    let cursor = `${raw}`;

    //  (?) Parse sometimes flag
    const sometimes = cursor.charAt(0) === '?';
    if (sometimes) cursor = cursor.substring(1);

    //  Conditional or group
    const rules = [];
    const conditionals = cursor.match(/\([a-zA-Z0-9|?.[\],:<>]{1,}\)/g);
    if (!conditionals) {
        rules.push(parseRule(cursor));
    } else {
        for (const el of conditionals) rules.push(parseRule(el.replace(/(\(|\))/g, '')));
    }

    return {key, sometimes, rules};
}

/**
 * Fully validate a rule list against a certain field cursor
 *
 * @param cursor - Cursor value to run the rule list against
 * @param list - List of rules to run against the cursor
 * @param data - Original data object (used in param checks)
 *
 * @returns Object containing an errors array and is_valid prop
 */
function validateField (
    cursor:DataVal,
    list:ValidationRulePart[],
    data:DataObject
):{
    errors:ValidationError[];
    is_valid:boolean;
} {
    const errors:ValidationError[] = [];
    for (const rule of list) {
        //  Check if rule exists
        if (!RULE_STORE[rule.type]) {
            errors.push({msg: 'rule_not_found', params: [rule.type]});
            continue;
        }

        //  Get params that need to be passed, each param is either a function or a primitive
        const params = [];
        for (const p of rule.params) params.push(typeof p === 'function' ? p(data) : p);

        //  Run rule - if check fails (not valid && not not | not && valid) push into errors
        const rule_valid = RULE_STORE[rule.type](cursor, ...params);
        if ((!rule_valid && !rule.not) || (rule_valid && rule.not)) {
            errors.push({msg: `${rule.not ? 'not_' : ''}${rule.type}`, params});
        }
    }

    return {errors, is_valid: errors.length === 0};
}

/**
 * Check a rule list against a certain field cursor
 *
 * @param cursor - Cursor value to run the rule list against
 * @param list - List of rules to run against the cursor
 * @param data - Original data object (used in param checks)
 *
 * @returns {boolean} Whether or not the value is valid
 */
function checkField (
    cursor:DataVal,
    list:ValidationRulePart[],
    data:DataObject
):boolean {
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

/**
 * Freeze a store for public consumption through Validator.rules
 *
 * @param store - Rule store to freeze
 *
 * @returns Frozen rule store
 */
function freezeStore (store:RuleDictionary):Readonly<RuleDictionary>  {
    return Object.freeze({...store});
}

let RULE_STORE:RuleDictionary = {
    alpha_num_spaces            : vAlphaNumSpaces,
    alpha_num_spaces_multiline  : vAlphaNumSpacesMultiline,
    array                       : Array.isArray,
    array_ne                    : isNeArray,
    between                     : vBetween,
    between_inc                 : vBetweenInclusive,
    boolean                     : isBoolean,
    color_hex                   : vColorHex,
    continent                   : vContinent,
    country                     : vCountry,
    country_alpha3              : vCountryAlpha3,
    date                        : isDate,
    date_string                 : vDateString,
    email                       : vEmail,
    equal_to                    : isEqual,
    false                       : vFalse,
    function                    : isFunction,
    async_function              : isAsyncFunction,
    geo_latitude                : vGeoLatitude,
    geo_longitude               : vGeoLongitude,
    greater_than                : vGreaterThan,
    greater_than_or_equal       : vGreaterThanOrEqual,
    guid                        : vGuid,
    in                          : vIn,
    integer                     : Number.isInteger,
    less_than                   : vLessThan,
    less_than_or_equal          : vLessThanOrEqual,
    max                         : vLessThanOrEqual,
    min                         : vGreaterThanOrEqual,
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
    sys_port                    : vSysPort,
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

let FROZEN_RULE_STORE:Readonly<RuleDictionary> = freezeStore(RULE_STORE);

export type TV <T> = Record<keyof T, string>;

class Validator <T extends RulesRaw> {

    private plan:ValidationGroup[];

    constructor (rules:T) {
        //  Check for rules
        if (!isObject(rules)) throw new TypeError('Provide an object to define the rules of this validator');

        //  Recursively parse our validation rules, to allow for deeply nested validation to be done
        const plan:ValidationGroup[] = [];
        function recursor (val:RulesRawVal, key?:string):void {
            /**
             * If   the cursor is a string -> parse
             * Elif the cursor is an object -> recurse
             * El   throw error as misconfiguration
             */
            if (typeof val === 'string') {
                if (val.trim().length === 0) throw new TypeError('Rule value is empty');
                plan.push(parseGroup(key, val));
            } else if (isObject(val)) {
                Object.keys(val).forEach(val_key => recursor(val[val_key], key ? `${key}.${val_key}` : val_key));
            } else {
                //  Throw a type error if neither a string nor an object
                throw new TypeError('Invalid rule value');
            }
        }
        recursor(rules);

        //  Set the parsed plan as a get property on our validation instance
        this.plan = plan;
    }

    check <K extends GenericObject> (data:K):boolean {
        //  No data passed? Check if rules were set up
        if (!isObject(data)) return this.plan.length === 0;

        for (const part of this.plan) {
            //  Retrieve cursor that part is run against
            const cursor = deepGet(data as DataObject, part.key);

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
                        (Number.isFinite(rule.iterable.min) && cursor.length < (rule.iterable.min as number)) ||
                        //  rule.iterable.max is set and val length is above max -> invalid
                        (Number.isFinite(rule.iterable.max) && cursor.length > (rule.iterable.max as number))
                    ) {
                        is_valid = false;
                    } else {
                        /**
                         * If rule.iterable.unique is set create map to store hashes and keep tabs
                         * on uniqueness as we run through the array
                         */
                        const unique_map = new Map();
                        for (let idx = 0; idx < cursor.length; idx++) {
                            if (!checkField(cursor[idx], rule.list, data as DataObject)) {
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
                } else if (!checkField(cursor, rule.list, data as DataObject)) {
                    is_valid = false;
                }

                if (is_valid) valid_count++;
            }

            if (!valid_count) return false;
        }

        return true;
    }

    validate <K extends GenericObject> (data:K) {
        //  No data passed? Check if rules were set up
        if (!isObject(data)) {
            const is_valid = this.plan.length === 0;
            return {
                is_valid,
                count: this.plan.length,
                errors: is_valid ? {} : 'NO_DATA',
            };
        }

        const errors:{[key:string]: ValidationError[]} = {};
        for (const part of this.plan) {
            //  Retrieve cursor that part is run against
            const cursor = deepGet(data as DataObject, part.key);

            //  If we cant find cursor we need to validate for the 'sometimes' flag
            if (cursor === undefined) {
                if (!part.sometimes) errors[part.key] = [{msg: 'not_found', params: []}];
                continue;
            }

            let has_valid = false;
            const part_errors:(ValidationError|ValidationError[])[] = [];
            for (const rule of part.rules) {
                let error_cursor:ValidationError[] = [];

                //  Check for iterable config
                if (rule.iterable) {
                    /**
                     * If      not an array -> invalid
                     * Elif    rule.iterable.min is set and val length is below the min -> invalid
                     * Elif    rule.iterable.max is set and val length is above max -> invalid
                     * El      iterable validation
                     */
                    if (!Array.isArray(cursor)) {
                        error_cursor.push({msg: 'iterable', params: []});
                    } else if (Number.isFinite(rule.iterable.min) && cursor.length < (rule.iterable.min as number)) {
                        error_cursor.push({msg: 'iterable_min', params: [rule.iterable.min]});
                    } else if (Number.isFinite(rule.iterable.max) && cursor.length > (rule.iterable.max as number)) {
                        error_cursor.push({msg: 'iterable_max', params: [rule.iterable.max]});
                    } else {
                        /**
                         * If rule.iterable.unique is set create map to store hashes and keep tabs
                         * on uniqueness as we run through the array
                         */
                        let iterable_unique = true;
                        const unique_map    = iterable_unique && rule.iterable.unique ? new Map() : false;
                        for (let idx = 0; idx < cursor.length; idx++) {
                            const evaluation = validateField(cursor[idx], rule.list, data as DataObject);
                            if (!evaluation.is_valid) error_cursor.push(...evaluation.errors.map(el => ({idx, ...el})));

                            //  If no unique map or iterable unique was already turned off continue
                            if (!unique_map || !iterable_unique) continue;

                            /**
                             * Compute fnv hash if uniqueness needs to be checked, if map size differs from
                             * our current point in the iteration add uniqueness error
                             */
                            unique_map.set(fnv1A(cursor[idx]), true);
                            if (unique_map.size !== (idx + 1)) {
                                iterable_unique = false;
                                error_cursor.unshift({msg: 'iterable_unique', params: []});
                            }
                        }
                    }
                } else {
                    const evaluation = validateField(cursor, rule.list, data as DataObject);
                    if (!evaluation.is_valid) error_cursor = evaluation.errors;
                }

                if (error_cursor.length === 0) {
                    has_valid = true;
                    break;
                } else {
                    part_errors.push(error_cursor);
                }
            }

            if (!has_valid) {
                errors[part.key] = part.rules.length > 1
                    ? (part_errors as ValidationError[])
                    : (part_errors[0] as ValidationError[]);
            }
        }

        const count = Object.keys(errors).length;

        return {is_valid: !count, count, errors};
    }

    static get rules ():Readonly<RuleDictionary> {
        return FROZEN_RULE_STORE;
    }

    /**
     * Extend validator rule set with a new rule
     *
     * @param name - Name of the rule you want to add
     * @param fn - Rule Function (function that returns a boolean and as its first value will get the value being validated)
     */
    static extend (name:string, fn:(...args:any[]) => boolean):void {
        if (typeof name !== 'string') throw new Error('Invalid extension');
        Validator.extendMulti({[name]: fn});
    }

    /**
     * Run multiple validator extends using a function kv-map
     *
     * Example:
     *  Validator.extendMulti({
     *      is_fruit: val => ['apple', 'pear', 'orange'].indexOf(val) >= 0,
     *      is_pet: val => ['dog', 'cat'].indexOf(val) >= 0,
     *  });
     *
     * @param obj - Function kv-map to extend the validator with
     */
    static extendMulti<K extends CustomRuleDictionary> (obj:K):void {
        validExtension(obj, val => {
            if (typeof val !== 'function') throw new Error('Invalid extension');
        });

        //  Register each rule
        RULE_STORE = {...RULE_STORE, ...obj};

        //  Freeze Rule store
        FROZEN_RULE_STORE = freezeStore(RULE_STORE);
    }

    /**
     * Extend the validation using a regex kv-map
     *
     * Example:
     *  Validator.extendRegex({
     *      is_fruit    : /^((a|A)pple|(p|P)ear|(o|O)range)$/g,
     *      is_animal   : /^((d|D)og|(c|C)at|(h|H)orse)$/g,
     *  });
     * Usage:
     *  new Validator({a: 'is_fruit', b: 'is_pet'}).check({a: 'kiwi', b: 'dog'});  // false
     *  new Validator({a: 'is_fruit', b: 'is_pet'}).check({a: 'aPple', b: 'Dog'}); // true
     *
     * @param obj - RegExp kv-map to extend the validator with
     */
    static extendRegex (obj:ExtRegExp):void {
        validExtension(obj, (val:ExtRegExpVal) => {
            if (Object.prototype.toString.call(val) !== '[object RegExp]') throw new Error('Invalid extension');
        });

        //  For each key in object, check if its value is a function
        for (const key of Object.keys(obj)) {
            //  Create function and transfer key to it
            let f = function (val:string):boolean {
                return typeof val === 'string' && REGEX_STORE.get(this.uid).test(val); // eslint-disable-line no-invalid-this
            };

            //  eslint-disable-next-line
            //  @ts-ignore
            f.uid = key;

            f = f.bind(f);
            REGEX_STORE.set(key, new RegExp(obj[key])); // Copy regex

            //  Store on map
            Validator.extendMulti({[key]: f});
        }

        //  Freeze Rule store
        FROZEN_RULE_STORE = freezeStore(RULE_STORE);
    }

    /**
     * Extend the validation using an enum rule kv-map
     *
     * Example:
     *  Validator.extendEnum({
     *      is_fruit: ['apple', 'banana', 'pear'],
     *      is_pet: ['dog', 'cat'],
     *  });
     * Usage:
     *  new Validator({a: 'is_fruit', b: 'is_pet'}).check({a: 'kiwi', b: 'dog'}); // false
     *  new Validator({a: 'is_fruit', b: 'is_pet'}).check({a: 'apple', b: 'dog'}); // true
     *
     * @param obj - Enumeration kv-map to extend the validator with
     */
    static extendEnum (obj:ExtEnum):void {
        validExtension(obj, (val:ExtEnumVal):void => {
            if (
                !Array.isArray(val) ||
                val.length === 0 ||
                val.filter(el => isNeString(el) || Number.isFinite(el)).length !== val.length
            ) throw new Error('Invalid extension');
        });

        //  For each key in object, check if its value is a function
        for (const key of Object.keys(obj)) {
            //  Convert array to map (also dedupes)
            const enum_map:Map<ExtEnumValInner, boolean> = new Map();
            for (const el of obj[key]) enum_map.set(el, true);

            //  Create function and transfer key to it
            let f = function (val:ExtEnumValInner):boolean {
                return (typeof val === 'string' || Number.isFinite(val)) && ENUM_STORE.get(this.uid).has(val); // eslint-disable-line no-invalid-this,max-len
            };

            //  eslint-disable-next-line
            //  @ts-ignore
            f.uid = key;

            f = f.bind(f);
            ENUM_STORE.set(key, enum_map);

            //  Store on map
            Validator.extendMulti({[key]: f});
        }

        //  Freeze Rule store
        FROZEN_RULE_STORE = freezeStore(RULE_STORE);
    }

}

export default Validator;
