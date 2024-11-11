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
import {vFile}                      from './functions/vFile';
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
import {vISBN, vISBN10, vISBN13}    from './functions/vISBN';
import {vSSN}                       from './functions/vSSN';
import {vEAN, vEAN8, vEAN13}        from './functions/vEAN';
import {vUlid}                      from './functions/vUlid';
import {
    vUuid,
    vUuidV1,
    vUuidV2,
    vUuidV3,
    vUuidV4,
    vUuidV5,
} from './functions/vUuid';
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

/* Validator components */
type TV<T> = {
    [K in keyof T]: T[K] extends Array<any>
        ? string
        : T[K] extends Record<string, any>
            ? TV<T[K]>|string
            : string;
};

type RuleFn = (...args:any[]) => boolean;
type RuleExtension = RuleFn | RegExp | (string|number)[] | TV<GenericObject>;

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

/* Used for enum storage */
const ENUM_STORE:Map<string, Set<string | number>> = new Map();
const REGEX_STORE:Map<string, RegExp> = new Map();
const SCHEMA_STORE:Map<string, Validator<RulesRaw>> = new Map(); /* eslint-disable-line */

/* Regexes used in processing */
const RGX_PARAM_NAME    = /^[a-zA-Z0-9_.]+$/i;
const RGX_EXT_NAME      = /^[A-Za-z_0-9-]+$/;
const RGX_GROUP_MATCH   = /\([^()]+\)/g;

const RULE_STORE = {
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
    ean: vEAN,
    ean_8: vEAN8,
    ean_13: vEAN13,
    email: vEmail,
    equal_to: equal,
    false: vFalse,
    file: vFile,
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
    isbn: vISBN,
    isbn_10: vISBN10,
    isbn_13: vISBN13,
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
    ssn: vSSN,
    string: isString,
    string_ne: isNotEmptyString,
    sys_mac: vSysMac,
    sys_ipv4: vSysIPv4,
    sys_ipv6: vSysIPv6,
    sys_ipv4_or_v6: vSysIPv4_or_v6,
    sys_port: vSysPort,
    time_zone: vTimeZone,
    true: vTrue,
    ulid: vUlid,
    url: vUrl,
    url_noquery: vUrlNoQuery,
    url_img: vUrlImage,
    url_vid: vUrlVideo,
    url_aud: vUrlAudio,
    url_med: vUrlMedia,
    uuid: vUuid,
    uuid_v1: vUuidV1,
    uuid_v2: vUuidV2,
    uuid_v3: vUuidV3,
    uuid_v4: vUuidV4,
    uuid_v5: vUuidV5,
    gt: vGreaterThan,
    gte: vGreaterThanOrEqual,
    lt: vLessThan,
    lte: vLessThanOrEqual,
    eq: equal,
} as const;

type CustomRuleDictionary = Record<string, RuleFn>;

type RuleDictionary = typeof RULE_STORE & CustomRuleDictionary;

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
        const rulefn = RULE_STORE[type as keyof typeof RULE_STORE];

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
        /* eslint-disable-next-line */
        /* @ts-ignore */
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
            const rulefn = RULE_STORE[type as keyof typeof RULE_STORE];
            if (!rulefn) return false;

            /* Get params that need to be passed, each param is either a function or a primitive */
            const n_params = [];
            for (let x = 0; x < params_length; x++) {
                const p = params[x];
                n_params.push(typeof p === 'function' ? p(data) : p);
            }

            /* Run rule - if check fails (not valid && not not | not && valid) */
            /* eslint-disable-next-line */
            /* @ts-ignore */
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
                const rulefn = RULE_STORE[type as keyof typeof RULE_STORE];

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
                /* eslint-disable-next-line */
                /* @ts-ignore */
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
    check <K extends GenericObject|FormData> (raw:K):raw is T {
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
     * @param {RuleExtension} ext - Rule Extension
     */
    static extend (name:string, ext:RuleExtension):void {
        if (typeof name !== 'string' || !RGX_EXT_NAME.test(name)) throw new Error('Invalid extension');
        Validator.extendMulti({[name]: ext});
    }

    /**
     * Run multiple validator extends using a function kv-map
     *
     * Example:
     *  Validator.extendMulti({
     *      is_fruit: ['apple', 'pear', 'orange'],
     *      ...
     *  });
     *
     * @param {Record<string, RuleExtension>} obj - KV Map of rule extensions
     */
    static extendMulti (obj:Record<string, RuleExtension>):void {
        /* Check if rules are valid */
        if (!isObject(obj)) throw new Error('Invalid extension');

        const schemas_map:Record<string, Validator<RulesRaw>> = {};
        for (const [key, val] of Object.entries(obj)) {
            if (typeof key !== 'string' || !RGX_EXT_NAME.test(key)) throw new Error('Invalid extension');

            /* RegExp/Enum/Fn extensions */
            if (
                val instanceof RegExp ||
                (isNotEmptyArray(val) && val.filter(el => isNotEmptyString(el) || Number.isFinite(el)).length === val.length) ||
                (isFunction(val) && !isAsyncFunction(val))
            ) continue;

            /* Schema-like extension */
            if (isNotEmptyObject(val)) {
                try {
                    schemas_map[key] = new Validator(val);
                    continue;
                } catch {
                    throw new Error('Invalid extension');
                }
            }

            throw new Error('Invalid extension');
        }

        /* Register each rule */
        for (const [key, value] of Object.entries(obj)) {
            let builtValue:RuleFn;
            if (value instanceof RegExp) {
                /* Create function and transfer key to it */
                builtValue = function (val:string):boolean {
                    /* eslint-disable-next-line */
                    /* @ts-ignore */
                    return typeof val === 'string' && val.match(REGEX_STORE.get(this.uid)) !== null; /* eslint-disable-line no-invalid-this,max-len */
                };

                /* eslint-disable-next-line */
                /* @ts-ignore */
                builtValue.uid = key;

                builtValue = builtValue.bind(builtValue);
                REGEX_STORE.set(key, new RegExp(value)); /* Copy regex */
            } else if (Array.isArray(value)) {
                /* Convert array to set (also dedupes) */
                const enum_set:Set<string|number> = new Set([...value]);

                /* Create function and transfer key to it */
                builtValue = function (val:string|number):boolean {
                    /* eslint-disable-next-line */
                    /* @ts-ignore */
                    return ENUM_STORE.get(this.uid)!.has(val); /* eslint-disable-line no-invalid-this */
                };

                /* eslint-disable-next-line */
                /* @ts-ignore */
                builtValue.uid = key;

                builtValue = builtValue.bind(builtValue);
                ENUM_STORE.set(key, enum_set);
            } else if (isObject(value)) {
                builtValue = function (val:GenericObject):boolean {
                    /* eslint-disable-next-line */
                    /* @ts-ignore */
                    return SCHEMA_STORE.get(this.uid)!.check(val); /* eslint-disable-line no-invalid-this */
                };

                /* eslint-disable-next-line */
                /* @ts-ignore */
                builtValue.uid = key;

                builtValue = builtValue.bind(builtValue);
                SCHEMA_STORE.set(key, schemas_map[key]);
            } else {
                builtValue = value;
            }

            /* eslint-disable-next-line */
            /* @ts-ignore */
            RULE_STORE[key] = builtValue;
        }

        /* Freeze Rule store */
        FROZEN_RULE_STORE = freezeStore(RULE_STORE);
    }

}

export {Validator, Validator as default};
