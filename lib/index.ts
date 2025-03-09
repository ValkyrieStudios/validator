/* eslint-disable max-statements,complexity */

import {isArray}                    from '@valkyriestudios/utils/array/is';
import {isNotEmptyArray}            from '@valkyriestudios/utils/array/isNotEmpty';
import {isBoolean}                  from '@valkyriestudios/utils/boolean/is';
import {isDate}                     from '@valkyriestudios/utils/date/is';
import {deepFreeze}                 from '@valkyriestudios/utils/deep/freeze';
import {deepGet}                    from '@valkyriestudios/utils/deep/get';
import {isFormData}                 from '@valkyriestudios/utils/formdata/is';
import {toObject}                   from '@valkyriestudios/utils/formdata/toObject';
import {isFunction}                 from '@valkyriestudios/utils/function/is';
import {isAsyncFunction}            from '@valkyriestudios/utils/function/isAsync';
import {isNumber}                   from '@valkyriestudios/utils/number/is';
import {isInteger}                  from '@valkyriestudios/utils/number/isInteger';
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
import {vUndefined}                 from './functions/vUndefined';
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
import {
    type DataObject,
    type DataVal,
    type DeepMutable,
    type GenericObject,
    type RulesRaw,
    type RulesRawVal,
    type RuleExtension,
    type RuleFn,
    type ValidationError,
    type ValidationGroup,
    type ValidationIterable,
    type ValidationResult,
    type ValidationRules,
    type ValidationNested,
    type InferredSchema,
    type MergeExtensions,
    type MappedExtensions,
    type TV,
} from './internalTypes';

/* Used for enum storage */
const ENUM_STORE:Map<string, Set<string | number>> = new Map();

/* Used for regexp storage */
const REGEX_STORE:Map<string, RegExp> = new Map();

/* Used for schema storage */
const SCHEMA_STORE:Map<string, Validator<RulesRaw>> = new Map(); /* eslint-disable-line no-use-before-define */

/* Global rule storage */
const RULE_STORE = {
    alpha_num_spaces: vAlphaNumSpaces,
    alpha_num_spaces_multiline: vAlphaNumSpacesMultiline,
    array: isArray,
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
    integer: isInteger,
    isbn: vISBN,
    isbn_10: vISBN10,
    isbn_13: vISBN13,
    less_than: vLessThan,
    less_than_or_equal: vLessThanOrEqual,
    max: vLessThanOrEqual,
    min: vGreaterThanOrEqual,
    null: vNull,
    number: isNumber,
    object: isObject,
    object_ne: isNotEmptyObject,
    phone: vPhone,
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
    '?': vUndefined,
} as const;

type CustomRuleDictionary = Record<string, RuleFn>;

type RuleDictionary = typeof RULE_STORE & CustomRuleDictionary;

const NOEXISTS = () => false;

/* Configuration for an iterable dictionary handler */
const iterableDictHandler = (val:unknown) => {
    if (!isObject(val)) return null;

    const values = Object.values(val);
    return {len: values.length, values};
};

/* Configuration for an iterable array handler */
const iterableArrayHandler = (val:unknown) => {
    if (!Array.isArray(val)) return null;

    return {len: val.length, values: val};
};

/**
 * Parse raw string into iterable configuration
 *
 * @param {string} val - Value to determine config from, eg: 'unique|min:1|max:5'
 * @param {boolean} dict - Whether or not it's a dictionary style (eg: Object)
 */
function getIterableConfig (val:string, dict:boolean):ValidationIterable {
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
 */
function parseRule (raw: string): ValidationRules {
    let iterable: ValidationIterable | false = false;
    let pos = 0;
    const len = raw.length;

    /* Check if the rule starts with an iterable config ([...] or {...}) */
    if (len > 0 && (raw[0] === '[' || raw[0] === '{')) {
        const closingChar = raw[0] === '[' ? ']' : '}';
        let endPos = -1;
        /* Loop to find the closing bracket/brace. */
        for (let i = 1; i < len; i++) {
            if (raw[i] === closingChar) {
                endPos = i;
                break;
            }
        }
        if (endPos === -1) throw new TypeError(`Iterable misconfiguration, verify rule config for ${raw}`);

        iterable = getIterableConfig(raw.slice(0, endPos), raw[0] !== '[');
        pos = endPos + 1;
    }

    /**
     * Accumulate all the checks that need to be run for this field
     * (eg: string_ne|min:20 will become an array with two checks)
     */
    const list = [];

    /* Process rule parts separated by '|' */
    while (pos < len) {
        /* Identify the boundaries for the current part. */
        const partStart = pos;
        while (pos < len && raw[pos] !== '|') pos++;
        const part = raw.slice(partStart, pos);

        /* Parse the current part in the format "type[:params]" */
        let colonPos = -1;
        for (let i = 0; i < part.length; i++) {
            if (part[i] !== ':') continue;
            colonPos = i;
            break;
        }
        let ruleType: string;
        let not = false;
        let params: [unknown, boolean][] = [];

        if (colonPos === -1) {
            /* If no colon is present, the entire part is the rule type. */
            ruleType = part;
        } else {
            ruleType = part.slice(0, colonPos);
        }

        /* Get 'not' flag */
        if (ruleType[0] === '!') {
            not = true;
            ruleType = ruleType.slice(1);
        }

        /* If there is a colon, process parameters. */
        if (colonPos !== -1) {
            const paramsPart = part.slice(colonPos + 1);
            let pPos = 0;
            const pLen = paramsPart.length;
            while (pPos < pLen) {
                /* Read until next comma or end-of-string. */
                const start = pPos;
                while (pPos < pLen && paramsPart[pPos] !== ',') pPos++;

                let token = paramsPart.slice(start, pPos);
                let extract = false;
                /* Ensure we validate that parameterized string value is correct eg: <meta.myval> */
                if (token[0] === '<' && token[token.length - 1] === '>') {
                    token = token.slice(1, -1);
                    if (!isNotEmptyString(token)) throw new TypeError('Parameterization misconfiguration');
                    extract = true;
                }
                params.push([token, extract]);
                pPos++; /* Skip the comma */
            }

            /**
             * For type 'in' with multiple parameters, revert to original logic:
             * use the raw parameters split by comma as a single parameter.
             */
            if (ruleType === 'in' && params.length > 1) {
                params = [[paramsPart.split(','), false]];
            }
        }

        list.push({type: ruleType, not, msg: (not ? 'not_' : '') + ruleType, params, params_length: params.length});
        pos++; /* Skip the '|' character */
    }

    return {nested: false, iterable, list, list_length: list.length};
}

/**
 * Internal function which for a provided params array constructs the final product
 *
 * @param {ValidationRules['list'][0]} rule_el - Rule part for which to construct the params for
 * @param {number} size - Size of the params array
 * @param {DataObject} data - Data Object to extract from
 */
function constructParams (rule_el:ValidationRules['list'][0], data:DataObject) {
    const {params_length, params} = rule_el;
    const acc = new Array(params_length);
    for (let i = 0; i < params_length; i++) {
        const p = params[i];
        acc[i] = !p[1] ? p[0] : deepGet(data, p[0] as string);
    }
    return acc;
}

/**
 * Fully validate a rule list against a certain field cursor
 *
 * @param {DataVal} cursor - Cursor value to run the rule list against
 * @param {ValidationRules} rule - List of rules to run against the cursor
 * @param {DataObject} data - Original data object (used in param checks)
 * @param {number?} idx - The index of the array element if running validateField inside of an array
 */
function validateField (
    cursor:DataVal,
    rule:ValidationRules,
    data:DataObject,
    idx?:number
):{
    errors:ValidationError[];
    is_valid:boolean;
} {
    const errors:ValidationError[] = [];
    for (let i = 0; i < rule.list_length; i++) {
        const rule_el = rule.list[i];
        const rulefn = RULE_STORE[rule_el.type as keyof typeof RULE_STORE];

        /* Check if rule exists */
        if (!rulefn) {
            errors.push({msg: 'rule_not_found', params: [rule_el.type]});
            continue;
        }

        /* Get params */
        const params = constructParams(rule_el, data);

        /* Run rule - if check fails (not valid && not not | not && valid) push into errors */
        /* eslint-disable-next-line */
        /* @ts-ignore */
        if (rulefn(cursor, ...params) === rule_el.not) {
            errors.push({msg: rule_el.msg, params, ...idx !== undefined && {idx}});
        }
    }

    return {errors, is_valid: errors.length === 0};
}

/**
 * Check a rule list against a certain field cursor
 *
 * @param {unknown} cursor - Cursor value to run the rule list against
 * @param {ValidationRules} rule - Rule to validate against the cursor
 * @param {DataObject} data - Original data object (used in param checks)
 */
function checkRule (
    cursor:unknown,
    rule:ValidationRules,
    data:DataObject
):boolean {
    const {iterable, list_length, list} = rule;
    if (!iterable) {
        for (let i = 0; i < list_length; i++) {
            const rule_el = list[i];
            if ((RULE_STORE[rule_el.type as keyof typeof RULE_STORE] || NOEXISTS)(
                cursor,
                /* eslint-disable-next-line */
                /* @ts-ignore */
                ...constructParams(rule_el, data)
            ) === rule_el.not) return false;
        }

        return true;
    }

    /* If not a valid type for the iterable -> invalid */
    const iterable_data = iterable.handler(cursor);
    if (!iterable_data) return false;

    /* Check length with min/max */
    const {len, values} = iterable_data;
    if (len < iterable.min || len > iterable.max) return false;

    /**
     * If iterable.unique is set create map to store hashes and keep tabs
     * on uniqueness as we run through the array
     */
    const unique_set    = new Set();
    const param_acc     = [];
    let cursor_value;
    for (let idx = 0; idx < len; idx++) {
        cursor_value = values[idx];
        for (let i = 0; i < list_length; i++) {
            const rule_el = list[i];

            /* Get params */
            if (!param_acc[i]) param_acc[i] = constructParams(rule_el, data);

            if ((RULE_STORE[rule_el.type as keyof typeof RULE_STORE] || NOEXISTS)(
                cursor_value,
                /* eslint-disable-next-line */
                /* @ts-ignore */
                ...param_acc[i]
            ) === rule_el.not) return false;
        }

        /* Compute fnv hash if uniqueness needs to be checked, if map size differs its not unique */
        if (iterable.unique) {
            unique_set.add(fnv1A(cursor_value));
            if (unique_set.size !== (idx + 1)) return false;
        }
    }

    return true;
}

/**
 * Checks a data object against a validation group
 *
 * @param {DataObject} data - Data object to check
 * @param {ValidationGroup[]} plan - Plan to validate
 */
function checkPlan (data:DataObject, plan:ValidationGroup[]) {
    mainloop: for (let i = 0; i < plan.length; i++) { /* eslint-disable-line no-labels */
        const {key, sometimes, rules} = plan[i];

        /* Retrieve cursor that part is run against */
        const cursor = deepGet(data as DataObject, key);

        /* If we cant find cursor we need to validate for the 'sometimes' flag */
        if (cursor === undefined) {
            if (!sometimes) return false;
            continue;
        }

        /* Go through rules in cursor: if all of them are invalid return false immediately */
        for (let x = 0; x < rules.length; x++) {
            const rule = rules[x];
            if (!rule.nested) {
                if (checkRule(cursor, rule, data)) continue mainloop; /* eslint-disable-line no-labels */
            } else if (isObject(cursor) && checkPlan(data, rule.plan)) {
                continue mainloop; /* eslint-disable-line no-labels */
            }
        }

        return false;
    }

    return true;
}

/**
 * Recursor used during validator construction to parse and convert a raw rule object into a validation plan
 *
 * @param {ValidationGroup[]} plan - Plan accumulator
 * @param {RulesRawVal} val - Raw rules value cursor
 * @param {string} key - Cursor key prefix (used when recursing in sub structure)
 */
function recursor (plan:ValidationGroup[], val:RulesRawVal, key:string):void {
    if (!val) throw new TypeError('Invalid rule value');

    if (isString(val)) {
        const sometimes = val[0] === '?';
        plan.push({
            key,
            sometimes,
            rules: [parseRule(sometimes ? val.slice(1) : val)],
        });
    } else if (isArray(val)) {
        let sometimes = false;
        const rules: (ValidationRules|ValidationNested)[] = [];
        for (let i = 0, len = val.length; i < len; i++) {
            const branch = val[i];

            /* Special case as a branch can be just '?' */
            if (branch === '?') {
                sometimes = true;
            } else if (branch) {
                if (isString(branch)) {
                    rules.push(parseRule(branch));
                } else if (isObject(branch)) {
                    const nested_plan:ValidationGroup[] = [];
                    recursor(nested_plan, branch, key);
                    if (!nested_plan.length) throw new Error('Invalid rule value');
                    rules.push({
                        nested: true,
                        plan: nested_plan,
                    });
                }
            } else {
                throw new TypeError('Invalid Conditional group alternative');
            }
        }
        if (rules.length) {
            plan.push({key, sometimes, rules});
        } else {
            throw new TypeError('Invalid rule value');
        }
    } else if (isObject(val)) {
        for (const val_key in val) {
            recursor(plan, val[val_key], key ? key + '.' + val_key : val_key);
        }
    } else {
        throw new TypeError('Invalid rule value');
    }
}

/**
 * Freeze a store for public consumption through Validator.rules
 *
 * @param store - Rule store to freeze
 */
function freezeStore (dict:Record<string, RuleFn>):Readonly<RuleDictionary>  {
    const store:{[key:string]:RuleFn} = {};
    for (const key in dict) store[key as string] = dict[key];
    return Object.freeze(store) as Readonly<RuleDictionary>;
}

let FROZEN_RULE_STORE:Readonly<RuleDictionary> = freezeStore(RULE_STORE);

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
type CombinedRules<Extensions = {}> = typeof RULE_STORE & Extensions;

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface IValidator<Extensions extends Record<string, unknown> = {}> {
    /* eslint-disable-next-line no-use-before-define */
    new <T extends GenericObject, TypedValidator = TV<T>>(schema: TypedValidator): Validator<T, Extensions>;
    readonly rules: Readonly<CombinedRules<Extensions>>;
    extend<NewExtensions extends Record<string, RuleExtension>>(
      extensions: NewExtensions
    ): IValidator<MergeExtensions<Extensions, MappedExtensions<NewExtensions, typeof RULE_STORE>>>;
    create<const TSchema extends RulesRaw>(
        schema: TSchema
    /* eslint-disable-next-line no-use-before-define */
    ): Validator<InferredSchema<TSchema, CombinedRules<Extensions>>>;
}

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars */
class Validator <T extends GenericObject, Extensions = {}, TypedValidator = TV<T>> {

    /* Validation plan */
    #plan!:ValidationGroup[];

    /* Schema type prop */
    #schema!:DeepMutable<T>;

    constructor (schema:TypedValidator) {
        /* Check for rules */
        if (!isObject(schema)) throw new TypeError('Provide an object to define the rules of this validator');

        /* Recursively parse our validation rules, to allow for deeply nested validation to be done */
        const plan:ValidationGroup[] = [];
        recursor(plan, schema as RulesRawVal, '');

        /* Set the parsed plan as a get property on our validation instance */
        this.#plan = plan;
        this.#schema = deepFreeze(schema) as DeepMutable<T>;
    }

    /**
     * Getter for configured schema.
     * @note Using this with typeof (eg: typeof myValidator.schema) returns the type of the store
     */
    get schema ():DeepMutable<T> {
        return JSON.parse(JSON.stringify(this.#schema));
    }

    /**
     * Checks if the provided data is valid against the validator's rules
     *
     * @param {GenericObject|FormData} raw - Raw object or FormData instance to check
     */
    check (raw:unknown):raw is typeof this['schema'] {
        const data = raw instanceof FormData
            ? toObject<GenericObject>(raw)
            : raw as GenericObject;

        /* No data passed? Check if rules were set up */
        if (!isObject(data)) return !this.#plan.length;

        return checkPlan(data, this.#plan);
    }

    /**
     * Checks if a FormData instance is valid against the validator and returns its parsed
     * content as an object if it is
     *
     * @param {FormData} raw - FormData instance to check
     */
    checkForm (raw:FormData) {
        if (!(raw instanceof FormData)) return false;
        const data = toObject<GenericObject>(raw);
        return this.check(data) ? data : false;
    }

    /**
     * Fully validates the provided data against the validator's rules
     *
     * @param {GenericObject|FormData} raw - Raw object or FormData instance to check
     */
    validate <K extends GenericObject|FormData> (raw:K):ValidationResult {
        /* No data passed? Check if rules were set up */
        const data = raw instanceof FormData ? toObject<GenericObject>(raw) : raw as GenericObject;
        if (!isObject(data)) {
            const plan_length = this.#plan.length;
            return {
                is_valid: !plan_length,
                count: plan_length,
                errors: plan_length ? 'NO_DATA' : {},
            };
        }

        const plan = this.#plan;
        const errors:{[key:string]: ValidationError[]} = {};
        let count:number = 0;
        for (let i = 0; i < this.#plan.length; i++) {
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
                if (!rule.iterable) {
                    const evaluation = validateField(cursor, rule, data as DataObject);
                    if (evaluation.is_valid) {
                        has_valid = true;
                        break;
                    }
                    part_errors.push(evaluation.errors);
                    continue;
                }

                const iterable_data = rule.iterable.handler(cursor);

                /* Check type */
                if (!iterable_data) {
                    part_errors.push([{msg: 'iterable', params: []}]);
                    continue;
                }

                const error_cursor:ValidationError[] = [];
                const {len, values} = iterable_data;

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
                    let cursor_value;
                    for (let idx = 0; idx < len; idx++) {
                        cursor_value = values[idx];
                        const evaluation = validateField(cursor_value, rule, data as DataObject, idx);
                        if (!evaluation.is_valid) error_cursor.push(...evaluation.errors);

                        /**
                         * Compute fnv hash if uniqueness needs to be checked, if map size differs from
                         * our current point in the iteration add uniqueness error
                         */
                        if (unique_set) {
                            const hash = fnv1A(cursor_value);
                            if (unique_set.has(hash)) {
                                unique_set = false;
                                error_cursor.unshift({msg: 'iterable_unique', params: []});
                            } else {
                                unique_set.add(hash);
                            }
                        }
                    }
                }

                if (error_cursor.length) {
                    part_errors.push(error_cursor);
                } else {
                    has_valid = true;
                    break;
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

    /**
     * Getter for the rules object on the validator
     */
    static get rules ():Readonly<RuleDictionary> {
        return FROZEN_RULE_STORE;
    }

    /**
     * Extend the Validator
     *
     * Example:
     *  Validator.extend({
     *      is_fruit: ['apple', 'pear', 'orange'],
     *      ...
     *  });
     *
     * @param {Record<string, RuleExtension>} obj - KV Map of rule extensions
     */
    static extend <const NewExtensions extends Record<string, RuleExtension>> (
        obj:NewExtensions
    /* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
    ):IValidator<MergeExtensions<{}, MappedExtensions<NewExtensions, typeof Validator['rules']>>> {
        /* Check if rules are valid */
        if (!isObject(obj)) throw new Error('Invalid extension');

        const schemas_map:Record<string, Validator<RulesRaw>> = {};
        for (const [key, val] of Object.entries(obj)) {
            if (typeof key !== 'string' || !/^[A-Za-z_0-9-]+$/.test(key)) throw new Error('Invalid extension');

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

        /* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
        return this as unknown as IValidator<MergeExtensions<{}, MappedExtensions<NewExtensions, typeof Validator['rules']>>>;
    }

    /**
     * Create a validator instance and have its type auto-inferred
     */
    static create<const TSchema extends RulesRaw> (schema: TSchema): Validator<InferredSchema<TSchema, typeof Validator['rules']>> {
        return new Validator(schema);
    }

}

export {Validator, Validator as default};
