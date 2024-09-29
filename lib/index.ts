import {isNotEmptyArray}            from '@valkyriestudios/utils/array/isNotEmpty';
import {isBoolean}                  from '@valkyriestudios/utils/boolean/is';
import {isDate}                     from '@valkyriestudios/utils/date/is';
import {isFormData}                 from '@valkyriestudios/utils/formdata/is';
import {toObject}                   from '@valkyriestudios/utils/formdata/toObject';
import {isFunction}                 from '@valkyriestudios/utils/function/is';
import {isAsyncFunction}            from '@valkyriestudios/utils/function/isAsync';
import {isObject}                   from '@valkyriestudios/utils/object/is';
import {isNotEmptyObject}           from '@valkyriestudios/utils/object/isNotEmpty';
import {isString}                   from '@valkyriestudios/utils/string/is';
import {isNotEmptyString}           from '@valkyriestudios/utils/string/isNotEmpty';
import {equal}                      from '@valkyriestudios/utils/equal';
import {fnv1A}                      from '@valkyriestudios/utils/hash/fnv1A';
import {vAlphaNumSpaces}            from './functions/vAlphaNumSpaces';
import {vAlphaNumSpacesMultiline}   from './functions/vAlphaNumSpacesMultiline';
import {vBase64}                    from './functions/vBase64';
import {vBetween}                   from './functions/vBetween';
import {vBetweenInclusive}          from './functions/vBetweenInclusive';
import {vBlob}                      from './functions/vBlob';
import {vColorHex}                  from './functions/vColorHex';
import {vContinent}                 from './functions/vContinent';
import {vCountry}                   from './functions/vCountry';
import {vCountryAlpha3}             from './functions/vCountryAlpha3';
import {vDateString}                from './functions/vDateString';
import {vDateISO, vDateDay}         from './functions/vDateSpecs';
import {vEmail}                     from './functions/vEmail';
import {vFalse}                     from './functions/vFalse';
import {vGeoLatitude}               from './functions/vGeoLatitude';
import {vGeoLongitude}              from './functions/vGeoLongitude';
import {vGreaterThan}               from './functions/vGreaterThan';
import {vGreaterThanOrEqual}        from './functions/vGreaterThanOrEqual';
import {vGuid}                      from './functions/vGuid';
import {vIn}                        from './functions/vIn';
import {vLessThan}                  from './functions/vLessThan';
import {vLessThanOrEqual}           from './functions/vLessThanOrEqual';
import {vNull}                      from './functions/vNull';
import {vPhone}                     from './functions/vPhone';
import {vTimeZone}                  from './functions/vTimeZone';
import {vRequired}                  from './functions/vRequired';
import {vSize}                      from './functions/vSize';
import {vSysMac}                    from './functions/vSysMac';
import {vSysIPv4}                   from './functions/vSysIPv4';
import {vSysIPv6}                   from './functions/vSysIPv6';
import {vSysIPv4_or_v6}             from './functions/vSysIPv4_or_v6';
import {vSysPort}                   from './functions/vSysPort';
import {vTrue}                      from './functions/vTrue';
import {vUrl}                       from './functions/vUrl';
import {vUrlNoQuery}                from './functions/vUrlNoQuery';
import {
    vUrlImage,
    vUrlAudio,
    vUrlVideo,
    vUrlMedia,
} from './functions/vUrlExtensions';

/* Raw data type for input checking */
type DataPrimitive          = string | number | boolean | Date | symbol | null | unknown;

type DataVal                = DataPrimitive | DataObject | DataArray; /* eslint-disable-line */
type DataArray              = Array<DataVal>;
type DataObject             = {[key:string]: DataVal};
export type GenericObject   = {[key:string]:any};

/* Validation rule input data types */
type RulesRawVal            = string | RulesRaw; /* eslint-disable-line */
export type RulesRaw        = {[key:string]: RulesRawVal};

/* Validation components */
interface ValidationError {
    idx?:number;
    msg:string;
    params:DataVal[];
}

interface ValidationIterable {
    unique: boolean;
    max: number;
    min: number;
    handler: {
        typ: (obj:any) => boolean;
        len: (obj:any) => number;
        val: (obj:any) => any[];
    };
}

interface ValidationRulePart {
    type:string;
    params:unknown[];
    params_length:number;
    not:boolean;
}

interface ValidationRules {
    iterable:ValidationIterable|false;
    list: ValidationRulePart[];
    list_length:number;
}

interface ValidationGroup {
    key:string;
    sometimes:boolean;
    rules:ValidationRules[];
}

interface ValidationResult {
    /**
     * Whether or not the validation was valid
     */
    is_valid:boolean;
    /**
     * Integer value defining how many fields were invalid in the provided data object
     */
    count:number;
    /**
     * Errors object which will be filled with the errors of the validation result if there are any.
     *
     * Take note: 'NO_DATA' is set when no data was passed to the validator.
     *
     * Example: {b: [{msg: 'number', params: []}]}
     */
    errors: 'NO_DATA' | {[key:string]:ValidationError[]};
}

/* Used for enum storage using extendEnum */
type ExtEnumValInner    = string | number;
type ExtEnumVal         = ExtEnumValInner[];
type ExtEnum            = Record<string, ExtEnumVal>;
const ENUM_STORE:Map<string, Set<ExtEnumValInner>> = new Map();

/* Used for regex storage using extendRegex */
type ExtRegExpVal   = RegExp;
type ExtRegExp      = Record<string, ExtRegExpVal>;
const REGEX_STORE:Map<string, ExtRegExpVal> = new Map();

/* Used for schema storage using extendSchema */
const SCHEMA_STORE:Map<string, Validator<RulesRaw>> = new Map(); /* eslint-disable-line */

/* Rule storage */
type RuleFn = (...args:any[]) => boolean;
type DefaultRuleDictionary = {
    alpha_num_spaces: typeof vAlphaNumSpaces;
    alpha_num_spaces_multiline: typeof vAlphaNumSpaces;
    array: (val:unknown) => val is unknown[];
    array_ne: typeof isNotEmptyArray;
    base64: typeof vBase64;
    between: typeof vBetween;
    between_inc: typeof vBetweenInclusive;
    blob: typeof vBlob;
    boolean: typeof isBoolean;
    color_hex: typeof vColorHex;
    continent: typeof vContinent;
    country: typeof vCountry;
    country_alpha3: typeof vCountryAlpha3;
    date: typeof isDate;
    date_string: typeof vDateString;
    date_day: typeof vDateDay;
    date_iso: typeof vDateISO;
    email: typeof vEmail;
    equal_to: typeof equal;
    false: typeof vFalse;
    formdata: typeof isFormData;
    function: typeof isFunction;
    async_function: typeof isAsyncFunction;
    geo_latitude: typeof vGeoLatitude;
    geo_longitude: typeof vGeoLongitude;
    greater_than: typeof vGreaterThan;
    greater_than_or_equal: typeof vGreaterThanOrEqual;
    guid: typeof vGuid;
    in: typeof vIn;
    integer: (val:unknown) => val is number;
    less_than: typeof vLessThan;
    less_than_or_equal: typeof vLessThanOrEqual;
    max: typeof vLessThanOrEqual;
    min: typeof vGreaterThanOrEqual;
    null: typeof vNull;
    number: (val:unknown) => val is number;
    object: typeof isObject;
    object_ne: typeof isNotEmptyObject;
    phone: typeof vPhone;
    required: typeof vRequired;
    size: typeof vSize;
    string: typeof isString;
    string_ne: typeof isNotEmptyString;
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
    url_vid: typeof vUrlVideo;
    url_aud: typeof vUrlAudio;
    url_med: typeof vUrlMedia;
    gt: typeof vGreaterThan;
    gte: typeof vGreaterThanOrEqual;
    lt: typeof vLessThan;
    lte: typeof vLessThanOrEqual;
    eq: typeof equal;
};

type CustomRuleDictionary = Record<string, RuleFn>;

type RuleDictionary = DefaultRuleDictionary & CustomRuleDictionary;

/* Regexes used in processing */
const RGX_PARAM_NAME    = /^[a-zA-Z0-9_.]+$/i;
const RGX_EXT_NAME      = /^[A-Za-z_0-9-]+$/;
const RGX_GROUP_MATCH   = /\([^()]+\)/g;

const RULE_STORE:Record<string, RuleFn> = {
    alpha_num_spaces: vAlphaNumSpaces,
    alpha_num_spaces_multiline: vAlphaNumSpacesMultiline,
    array: Array.isArray,
    array_ne: isNotEmptyArray,
    base64: vBase64,
    between: vBetween,
    between_inc: vBetweenInclusive,
    blob: vBlob,
    boolean: isBoolean,
    color_hex: vColorHex,
    continent: vContinent,
    country: vCountry,
    country_alpha3: vCountryAlpha3,
    date: isDate,
    date_day: vDateDay,
    date_iso: vDateISO,
    date_string: vDateString,
    email: vEmail,
    equal_to: equal,
    false: vFalse,
    formdata: isFormData,
    function: isFunction,
    async_function: isAsyncFunction,
    geo_latitude: vGeoLatitude,
    geo_longitude: vGeoLongitude,
    greater_than: vGreaterThan,
    greater_than_or_equal: vGreaterThanOrEqual,
    guid: vGuid,
    in: vIn,
    integer: Number.isInteger,
    less_than: vLessThan,
    less_than_or_equal: vLessThanOrEqual,
    max: vLessThanOrEqual,
    min: vGreaterThanOrEqual,
    null: vNull,
    number: Number.isFinite,
    object: isObject,
    object_ne: isNotEmptyObject,
    phone: vPhone,
    required: vRequired,
    size: vSize,
    string: isString,
    string_ne: isNotEmptyString,
    sys_mac: vSysMac,
    sys_ipv4: vSysIPv4,
    sys_ipv6: vSysIPv6,
    sys_ipv4_or_v6: vSysIPv4_or_v6,
    sys_port: vSysPort,
    time_zone: vTimeZone,
    true: vTrue,
    url: vUrl,
    url_noquery: vUrlNoQuery,
    url_img: vUrlImage,
    url_vid: vUrlVideo,
    url_aud: vUrlAudio,
    url_med: vUrlMedia,
    gt: vGreaterThan,
    gte: vGreaterThanOrEqual,
    lt: vLessThan,
    lte: vLessThanOrEqual,
    eq: equal,
};

/**
 * Check whether or not a value is a valid extension name
 *
 * @param {string} val - Value to verify
 * @returns {boolean} Whether or not the extension name is valid
 */
function validExtensionName (val:string):boolean {
    return typeof val === 'string' && RGX_EXT_NAME.test(val);
}

/**
 * Validate whether or not a passed object has valid names/values
 *
 * @param obj - Object to validate
 * @param valueFn - Function to use for value checks
 *
 * @throws {Error} Will throw if the extension is invalid
 */
function validExtension <T> (
    obj:Record<string, T>,
    valueFn:(arg0:T, key?:string) => void
) {
    if (!isObject(obj)) throw new Error('Invalid extension');

    for (const [key, val] of Object.entries(obj)) {
        if (!validExtensionName(key)) throw new Error('Invalid extension');
        valueFn(val, key);
    }
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
    let cursor: DataVal = obj;

    for (let i = 0; i < parts.length; i++) {
        if (cursor === undefined) return undefined;
        cursor = (cursor as DataObject)?.[parts[i]];
    }

    return cursor;
}

/* Configuration for an iterable dictionary handler */
const iterableDictHandler = {
    typ: isObject,
    len: (obj:GenericObject) => Object.keys(obj).length,
    val: (obj:GenericObject) => Object.values(obj),
};

/* Configuration for an iterable array handler */
const iterableArrayHandler = {
    typ: Array.isArray,
    len: (obj:any[]) => obj.length,
    val: (obj:any[]) => obj,
};

/**
 * Parse raw string into iterable configuration
 *
 * @param val - Value to determine config from, eg: 'unique|min:1|max:5'
 *
 * @returns {ValidationIterable} Iterable configuration
 */
function getIterableConfig (val:string, dict:boolean = false):ValidationIterable {
    const unique = val.includes('unique');
    const len = val.length;

    // Extracting max and min values
    const max_ix = val.indexOf('max:');
    const min_ix = val.indexOf('min:');
    const rslt:ValidationIterable = {
        unique,
        max: Number.MAX_SAFE_INTEGER,
        min: -1,
        handler: dict ? iterableDictHandler : iterableArrayHandler,
    };

    if (max_ix !== -1) {
        const end_ix = val.indexOf('|', max_ix);
        rslt.max = parseInt(val.slice(max_ix + 4, end_ix !== -1 ? end_ix : len), 10);
    }

    if (min_ix !== -1) {
        const end_ix = val.indexOf('|', min_ix);
        rslt.min = parseInt(val.slice(min_ix + 4, end_ix !== -1 ? end_ix : len), 10);
    }

    return rslt;
}

/**
 * Parse a rule into a sub validator pipeline
 *
 * @param raw - Raw validation rule
 *
 * @returns {ValidationRules} Parsed validation rule
 */
function parseRule (raw:string):ValidationRules {
    /* ([...]) Check for iterable behavior */
    let iterable:ValidationIterable|false = false;

    const arr_start_idx = raw.indexOf('[');
    const arr_end_idx   = raw.indexOf(']');
    if (arr_start_idx > -1 || arr_end_idx > -1) {
        if (arr_start_idx !== 0 || arr_end_idx < 0) throw new TypeError(`Iterable misconfiguration, verify rule config for ${raw}`);

        iterable    = getIterableConfig(raw.slice(0, arr_end_idx));
        raw         = raw.slice(arr_end_idx + 1);
    } else {
        const obj_start_idx = raw.indexOf('{');
        const obj_end_idx   = raw.indexOf('}');
        if (obj_start_idx > -1 || obj_end_idx > -1) {
            if (obj_start_idx !== 0 || obj_end_idx < 0) throw new TypeError(`Iterable misconfiguration, verify rule config for ${raw}`);

            iterable    = getIterableConfig(raw.slice(0, obj_end_idx), true);
            raw         = raw.slice(obj_end_idx + 1);
        }
    }

    /**
     * Accumulate all the checks that need to be run for this field
     * (eg: string_ne|min:20 will become an array with two checks)
     */
    const list  = [];
    const parts = raw.split('|');
    for (let y = 0; y < parts.length; y++) {
        let params:string[]|string[][]|unknown[]|unknown[][] = parts[y].split(':');
        let type = params.shift() as string;

        /* Get 'not' flag */
        const not = type[0] === '!';
        if (not) type = type.slice(1);

        /* Get parameters */
        let params_length = params.length;
        if (params_length) {
            params = (params[0] as string).split(',');
            params_length = params.length;
            if (type === 'in' && params_length > 1) {
                params = [params];
            } else {
                /* Parse parameters into callback functions */
                for (let i = 0; i < params_length; i++) {
                    let param = params[i] as string;
                    const param_len = param.length;
                    if (param[0] === '<' && param[param_len - 1] === '>') {
                        param = param.slice(1, -1);
                        /* Ensure we validate that parameterized string value is correct eg: <meta.myval> */
                        if (!RGX_PARAM_NAME.test(param)) {
                            throw new TypeError(`Parameterization misconfiguration, verify rule config for ${raw}`);
                        }

                        params[i] = (data:DataObject) => deepGet(data, param);
                    }
                }
            }
        }
        list.push({type, params, params_length, not});
    }

    return {iterable, list, list_length: list.length};
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
    /* (?) Parse sometimes flag */
    const sometimes = raw[0] === '?';
    if (sometimes) raw = raw.slice(1);

    const acc:ValidationGroup = {key, sometimes, rules: []};

    /* Conditional or group */
    if (raw[0] !== '(') {
        acc.rules.push(parseRule(raw));
    } else {
        const conditionals = raw.match(RGX_GROUP_MATCH) as string[];
        for (let i = 0; i < conditionals.length; i++) {
            acc.rules.push(parseRule(conditionals[i].slice(1, -1)));
        }
    }

    return acc;
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
    rule:ValidationRules,
    data:DataObject
):{
    errors:ValidationError[];
    is_valid:boolean;
} {
    const errors:ValidationError[] = [];
    for (let i = 0; i < rule.list_length; i++) {
        const {type, not, params, params_length} = rule.list[i];
        const rulefn = RULE_STORE[type];

        /* Check if rule exists */
        if (!rulefn) {
            errors.push({msg: 'rule_not_found', params: [type]});
            continue;
        }

        /* Get params that need to be passed, each param is either a function or a primitive */
        const n_params = [];
        for (let x = 0; x < params_length; x++) {
            const p = params[x];
            n_params.push(typeof p === 'function' ? p(data) : p);
        }

        /* Run rule - if check fails (not valid && not not | not && valid) push into errors */
        if (rulefn(cursor, ...n_params) === not) {
            errors.push({msg: (not ? 'not_' : '') + type, params: n_params});
        }
    }

    return {errors, is_valid: errors.length === 0};
}

/**
 * Check a rule list against a certain field cursor
 *
 * @param cursor - Cursor value to run the rule list against
 * @param rule - Rule to validate against the cursor
 * @param data - Original data object (used in param checks)
 *
 * @returns {boolean} Whether or not the value is valid
 */
function checkRule (
    cursor:unknown,
    rule:ValidationRules,
    data:DataObject
):boolean {
    if (!rule.iterable) {
        for (let i = 0; i < rule.list_length; i++) {
            const {type, not, params, params_length} = rule.list[i];
            const rulefn = RULE_STORE[type];
            if (!rulefn) return false;

            /* Get params that need to be passed, each param is either a function or a primitive */
            const n_params = [];
            for (let x = 0; x < params_length; x++) {
                const p = params[x];
                n_params.push(typeof p === 'function' ? p(data) : p);
            }

            /* Run rule - if check fails (not valid && not not | not && valid) */
            if (rulefn(cursor, ...n_params) === not) return false;
        }
    } else {
        /* If not a valid type for the iterable -> invalid */
        if (!rule.iterable.handler.typ(cursor)) return false;

        /* Get len of cursor and check with min/max */
        const len = rule.iterable.handler.len(cursor);
        if (len < rule.iterable.min || len > rule.iterable.max) return false;

        /**
         * If rule.iterable.unique is set create map to store hashes and keep tabs
         * on uniqueness as we run through the array
         */
        const unique_set    = new Set();
        const values        = rule.iterable.handler.val(cursor);
        const param_acc     = [];
        let cursor_value;
        for (let idx = 0; idx < len; idx++) {
            cursor_value = values[idx];
            for (let i = 0; i < rule.list_length; i++) {
                const {type, not, params, params_length} = rule.list[i];
                const rulefn = RULE_STORE[type];

                /* Check if rule exists */
                if (!rulefn) return false;

                /* Get params that need to be passed, each param is either a function or a primitive */
                if (!param_acc[i]) {
                    const n_params = [];
                    for (let x = 0; x < params_length; x++) {
                        const p = params[x];
                        n_params.push(typeof p === 'function' ? p(data) : p);
                    }
                    param_acc[i] = n_params;
                }

                /* Run rule - if check fails (not valid && not not | not && valid) */
                if (rulefn(cursor_value, ...param_acc[i]) === not) return false;
            }

            /* Compute fnv hash if uniqueness needs to be checked, if map size differs its not unique */
            if (rule.iterable.unique) {
                unique_set.add(fnv1A(cursor_value));
                if (unique_set.size !== (idx + 1)) return false;
            }
        }
    }

    return true;
}

/**
 * Recursor used during validator construction to parse and convert a raw rule object into a validation plan
 *
 * @param {ValidationGroup[]} plan - Plan accumulator
 * @param {RulesRawVal} val - Raw rules value cursor
 * @param {string?} key - Cursor key prefix (used when recursing in sub structure)
 */
function recursor (plan:ValidationGroup[], val:RulesRawVal, key?:string):void {
    /**
     * If   the cursor is a string -> parse
     * Elif the cursor is an object -> recurse
     * El   throw error as misconfiguration
     */
    if (typeof val === 'string') {
        if (val.trim().length === 0) throw new TypeError('Rule value is empty');
        plan.push(parseGroup(key || '', val));
    } else if (isObject(val)) {
        for (const val_key in val) recursor(plan, val[val_key], key ? key + '.' + val_key : val_key);
    } else {
        /* Throw a type error if neither a string nor an object */
        throw new TypeError('Invalid rule value');
    }
}

/**
 * Freeze a store for public consumption through Validator.rules
 *
 * @param store - Rule store to freeze
 *
 * @returns Frozen rule store
 */
function freezeStore (dict:Record<string, RuleFn>):Readonly<RuleDictionary>  {
    const store = {} as RuleDictionary;
    for (const key in dict) store[key] = dict[key];
    return Object.freeze(store);
}

let FROZEN_RULE_STORE:Readonly<RuleDictionary> = freezeStore(RULE_STORE);

type TV<T> = {
    [K in keyof T]: T[K] extends Array<any>
        ? string
        : T[K] extends Record<string, any>
            ? TV<T[K]>|string
            : string;
};

class Validator <T extends GenericObject, TypedValidator = TV<T>> {

    /* Validation plan */
    #plan:ValidationGroup[];

    /* Length of plan */
    #plan_length:number;

    constructor (rules:TypedValidator) {
        /* Check for rules */
        if (!isObject(rules)) throw new TypeError('Provide an object to define the rules of this validator');

        /* Recursively parse our validation rules, to allow for deeply nested validation to be done */
        const plan:ValidationGroup[] = [];
        recursor(plan, rules as RulesRawVal);

        /* Set the parsed plan as a get property on our validation instance */
        this.#plan = plan;
        this.#plan_length = plan.length;
    }

    /**
     * Checks if the provided data is valid against the validator's rules
     *
     * @param {GenericObject|FormData} raw - Raw object or FormData instance to check
     * @returns {boolean} Whether or not it's valid
     */
    /* eslint-disable-next-line */
    /* @ts-ignore */
    check <K extends GenericObject|FormData> (raw:K):data is T {
        const plan_len = this.#plan_length;

        /* No data passed? Check if rules were set up */
        const data = raw instanceof FormData ? toObject<GenericObject>(raw) : raw as GenericObject;
        if (!isObject(data)) return !plan_len;

        const plan = this.#plan;

        for (let i = 0; i < plan_len; i++) {
            const {key, sometimes, rules} = plan[i];

            /* Retrieve cursor that part is run against */
            const cursor = deepGet(data as DataObject, key);

            /* If we cant find cursor we need to validate for the 'sometimes' flag */
            if (cursor === undefined) {
                if (!sometimes) return false;
                continue;
            }

            /* Go through rules in cursor: if all of them are invalid return false immediately */
            let is_valid = false;
            for (let x = 0; x < rules.length; x++) {
                is_valid = checkRule(cursor, rules[x], data);
                if (is_valid) break;
            }

            if (!is_valid) return false;
        }

        return true;
    }

    /**
     * Checks if a FormData instance is valid against the validator and returns its parsed
     * content as an object if it is
     *
     * @param {FormData} raw - FormData instance to check
     * @returns {T|false} Returns the formdata as an object if valid or false if not valid
     */
    checkForm (raw:FormData):T|false {
        if (!(raw instanceof FormData)) return false;
        const data = toObject<GenericObject>(raw);
        return this.check(data) ? data as T : false;
    }

    /**
     * Fully validates the provided data against the validator's rules
     *
     * @param {GenericObject|FormData} raw - Raw object or FormData instance to check
     * @returns {ValidationResult}
     */
    validate <K extends GenericObject|FormData> (raw:K):ValidationResult {
        const plan_len = this.#plan_length;

        /* No data passed? Check if rules were set up */
        const data = raw instanceof FormData ? toObject<GenericObject>(raw) : raw as GenericObject;
        if (!isObject(data)) {
            return {
                is_valid: !plan_len,
                count: plan_len,
                errors: plan_len ? 'NO_DATA' : {},
            };
        }

        const plan = this.#plan;
        const errors:{[key:string]: ValidationError[]} = {};
        let count:number = 0;
        for (let i = 0; i < plan_len; i++) {
            const part = plan[i];
            /* Retrieve cursor that part is run against */
            const cursor = deepGet(data as DataObject, part.key);

            /* If we cant find cursor we need to validate for the 'sometimes' flag */
            if (cursor === undefined) {
                if (!part.sometimes) {
                    count++;
                    errors[part.key] = [{msg: 'not_found', params: []}];
                }
                continue;
            }

            let has_valid = false;
            const part_errors:(ValidationError|ValidationError[])[] = [];
            for (let x = 0; x < part.rules.length; x++) {
                const rule = part.rules[x];

                /* Check for iterable config */
                if (rule.iterable) {
                    const error_cursor:ValidationError[] = [];

                    /* Check type */
                    if (!rule.iterable.handler.typ(cursor)) {
                        error_cursor.push({msg: 'iterable', params: []});
                    } else {
                        const len = rule.iterable.handler.len(cursor);

                        /**
                         * if   rule.iterable.min is set and len is below the min -> invalid
                         * Elif rule.iterable.max is set and len is above max -> invalid
                         * El   iterable validation
                         */
                        if (len < rule.iterable.min) {
                            error_cursor.push({msg: 'iterable_min', params: [rule.iterable.min]});
                        } else if (len > rule.iterable.max) {
                            error_cursor.push({msg: 'iterable_max', params: [rule.iterable.max]});
                        } else {
                            /**
                             * If rule.iterable.unique is set create map to store hashes and keep tabs
                             * on uniqueness as we run through the array
                             */
                            let unique_set = rule.iterable.unique ? new Set() : false;
                            const values = rule.iterable.handler.val(cursor);
                            let cursor_value;
                            for (let idx = 0; idx < len; idx++) {
                                cursor_value = values[idx];
                                const evaluation = validateField(cursor_value, rule, data as DataObject);
                                if (!evaluation.is_valid) {
                                    for (let z = 0; z < evaluation.errors.length; z++) {
                                        error_cursor.push({idx, ...evaluation.errors[z]});
                                    }
                                }

                                /**
                                 * Compute fnv hash if uniqueness needs to be checked, if map size differs from
                                 * our current point in the iteration add uniqueness error
                                 */
                                if (unique_set) {
                                    unique_set.add(fnv1A(cursor_value));
                                    if (unique_set.size !== (idx + 1)) {
                                        unique_set = false;
                                        error_cursor.unshift({msg: 'iterable_unique', params: []});
                                    }
                                }
                            }
                        }
                    }

                    if (!error_cursor.length) {
                        has_valid = true;
                        break;
                    }

                    part_errors.push(error_cursor);
                } else {
                    const evaluation = validateField(cursor, rule, data as DataObject);
                    if (evaluation.is_valid) {
                        has_valid = true;
                        break;
                    }
                    part_errors.push(evaluation.errors);
                }
            }

            if (!has_valid) {
                count++;
                errors[part.key] = part.rules.length > 1
                    ? (part_errors as ValidationError[])
                    : (part_errors[0] as ValidationError[]);
            }
        }

        return {is_valid: !count, count, errors};
    }

    static get rules ():Readonly<RuleDictionary> {
        return FROZEN_RULE_STORE;
    }

    /**
     * Extend validator rule set with a new rule
     *
     * @param {string} name - Name of the rule you want to add
     * @param {RuleFn} fn - Rule Function (function that returns a boolean and as its first value will get the value being validated)
     */
    static extend (name:string, fn:RuleFn):void {
        if (!validExtensionName(name)) throw new Error('Invalid extension');
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
     * @param {CustomRuleDictionary} obj - Function kv-map to extend the validator with
     */
    static extendMulti<K extends CustomRuleDictionary> (obj:K):void {
        validExtension(obj, val => {
            if (typeof val !== 'function') throw new Error('Invalid extension');
        });

        /* Register each rule */
        for (const [key, value] of Object.entries(obj)) RULE_STORE[key] = value;

        /* Freeze Rule store */
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
     *  new Validator({a: 'is_fruit', b: 'is_pet'}).check({a: 'kiwi', b: 'dog'});  false
     *  new Validator({a: 'is_fruit', b: 'is_pet'}).check({a: 'aPple', b: 'Dog'}); true
     *
     * @param {ExtRegExp} obj - RegExp kv-map to extend the validator with
     */
    static extendRegex (obj:ExtRegExp):void {
        validExtension(obj, (val:ExtRegExpVal) => {
            if (val instanceof RegExp) return;
            throw new Error('Invalid extension');
        });

        /* For each key in object, check if its value is a function */
        for (const key in obj) {
            /* Create function and transfer key to it */
            let f = function (val:string):boolean {
                /* eslint-disable-next-line */
                /* @ts-ignore */
                return typeof val === 'string' && val.match(REGEX_STORE.get(this.uid)) !== null; /* eslint-disable-line no-invalid-this */
            };

            /* eslint-disable-next-line */
            /* @ts-ignore */
            f.uid = key;

            f = f.bind(f);
            REGEX_STORE.set(key, new RegExp(obj[key])); /* Copy regex */

            /* Store on map */
            Validator.extendMulti({[key]: f});
        }

        /* Freeze Rule store */
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
     *  new Validator({a: 'is_fruit', b: 'is_pet'}).check({a: 'kiwi', b: 'dog'}); false
     *  new Validator({a: 'is_fruit', b: 'is_pet'}).check({a: 'apple', b: 'dog'}); true
     *
     * @param {ExtEnum} obj - Enumeration kv-map to extend the validator with
     */
    static extendEnum (obj:ExtEnum):void {
        validExtension(obj, (val:ExtEnumVal):void => {
            if (isNotEmptyArray(val) && val.filter(el => isNotEmptyString(el) || Number.isFinite(el)).length === val.length) return;
            throw new Error('Invalid extension');
        });

        /* For each key in object, check if its value is a function */
        for (const key in obj) {
            /* Convert array to set (also dedupes) */
            const enum_set:Set<ExtEnumValInner> = new Set();
            for (const el of obj[key]) enum_set.add(el);

            /* Create function and transfer key to it */
            let f = function (val:ExtEnumValInner):boolean {
                /* eslint-disable-next-line */
                /* @ts-ignore */
                return ENUM_STORE.get(this.uid)!.has(val); /* eslint-disable-line no-invalid-this */
            };

            /* eslint-disable-next-line */
            /* @ts-ignore */
            f.uid = key;

            f = f.bind(f);
            ENUM_STORE.set(key, enum_set);

            /* Store on map */
            Validator.extendMulti({[key]: f});
        }

        /* Freeze Rule store */
        FROZEN_RULE_STORE = freezeStore(RULE_STORE);
    }

    /**
     * Extend the validator using a schema kv-map
     *
     * Example:
     *  Validator.extendSchema('user', {
     *      first_name: 'string_ne|min:3',
     *      last_name: 'string_ne|min:3',
     *      email: '?email',
     *      phone: '?phone',
     *  });
     *
     * Usage:
     *  new Validator({a: 'user', b: '?[unique|min:1]user'}).check({a: {first_name: 'Peter', last_name: 'Vermeulen'}}); true
     *  new Validator({a: '[unique|min:1]user'}).check({a: [{first_name: false, last_name: 'Vermeulen'}]}); false
     *
     * @param {string} name - Name for the schema
     * @param {TypedKValidator} obj - Rule object for the schema
     */
    static extendSchema <K extends GenericObject, TypedKValidator = TV<K>> (name:string, obj:TypedKValidator):void {
        if (!validExtensionName(name) || !isNotEmptyObject(obj)) throw new Error('Invalid extension');
        let validator:Validator<RulesRaw>;
        try {
            validator = new Validator(obj);
        } catch {
            throw new Error('Invalid extension');
        }

        let f = function (val:GenericObject):boolean {
            /* eslint-disable-next-line */
            /* @ts-ignore */
            return SCHEMA_STORE.get(this.uid)!.check(val); /* eslint-disable-line no-invalid-this */
        };

        /* eslint-disable-next-line */
        /* @ts-ignore */
        f.uid = name;

        f = f.bind(f);
        SCHEMA_STORE.set(name, validator);

        /* Store on map */
        Validator.extendMulti({[name]: f});

        /* Freeze Rule store */
        FROZEN_RULE_STORE = freezeStore(RULE_STORE);
    }

}

export {Validator, Validator as default};
