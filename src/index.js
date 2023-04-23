'use strict';

import Is       from '@valkyriestudios/utils/is';
import deepGet  from '@valkyriestudios/utils/deep/get';
import deepSet  from '@valkyriestudios/utils/deep/set';
import fnv1A    from '@valkyriestudios/utils/hash/fnv1A';

import vAlphaNumSpaces          from './functions/vAlphaNumSpaces';
import vAlphaNumSpacesMultiline from './functions/vAlphaNumSpacesMultiline';
import vBetween                 from './functions/vBetween';
import vBetweenInclusive        from './functions/vBetweenInclusive';
import vBoolean                 from './functions/vBoolean';
import vColorHex                from './functions/vColorHex';
import vDateString              from './functions/vDateString';
import vEmail                   from './functions/vEmail';
import vGeoLatitude             from './functions/vGeoLatitude';
import vGeoLongitude            from './functions/vGeoLongitude';
import vGreaterThan             from './functions/vGreaterThan';
import vGreaterThanOrEqual      from './functions/vGreaterThanOrEqual';
import vGuid                    from './functions/vGuid';
import vIn                      from './functions/vIn';
import vLessThan                from './functions/vLessThan';
import vLessThanOrEqual         from './functions/vLessThanOrEqual';
import vMax                     from './functions/vMax';
import vMin                     from './functions/vMin';
import vPhone                   from './functions/vPhone';
import vRequired                from './functions/vRequired';
import vSize                    from './functions/vSize';
import vSysMac                  from './functions/vSysMac';
import vSysIPv4                 from './functions/vSysIPv4';
import vSysIPv6                 from './functions/vSysIPv6';
import vSysIPv4_or_v6           from './functions/vSysIPv4_or_v6';
import vUrl                     from './functions/vUrl';
import vUrlNoQuery              from './functions/vUrlNoQuery';

const validateFn = {
    alpha_num_spaces            : vAlphaNumSpaces,
    alpha_num_spaces_multiline  : vAlphaNumSpacesMultiline,
    array                       : Is.Array,
    array_ne                    : Is.NeArray,
    between                     : vBetween,
    between_inc                 : vBetweenInclusive,
    boolean                     : vBoolean,
    color_hex                   : vColorHex,
    date                        : Is.Date,
    date_string                 : vDateString,
    email                       : vEmail,
    equal_to                    : Is.Eq,
    geo_latitude                : vGeoLatitude,
    geo_longitude               : vGeoLongitude,
    greater_than                : vGreaterThan,
    greater_than_or_equal       : vGreaterThanOrEqual,
    guid                        : vGuid,
    in                          : vIn,
    integer                     : Is.Int,
    less_than                   : vLessThan,
    less_than_or_equal          : vLessThanOrEqual,
    max                         : vMax,
    min                         : vMin,
    number                      : Is.Number,
    object                      : Is.Object,
    object_ne                   : Is.NeObject,
    phone                       : vPhone,
    required                    : vRequired,
    size                        : vSize,
    string                      : Is.String,
    string_ne                   : Is.NeString,
    sys_mac                     : vSysMac,
    sys_ipv4                    : vSysIPv4,
    sys_ipv6                    : vSysIPv6,
    sys_ipv4_or_v6              : vSysIPv4_or_v6,
    url                         : vUrl,
    url_noquery                 : vUrlNoQuery,
    //  Aliases
    gt                          : vGreaterThan,
    gte                         : vGreaterThanOrEqual,
    lt                          : vLessThan,
    lte                         : vLessThanOrEqual,
    eq                          : Is.Eq,
};

//  Get the config for an iterable validation
//
//  @param string   val     Value to determine config from, eg: 'unique|min:1|max:5'
function getIterableConfig (val) {
    return {
        unique  : val.indexOf('unique') >= 0,
        max     : val.match(/max:\d{1,}(\||$)/) ? parseInt(`${val}`.split('max:')[1].split('|').shift()) : false,
        min     : val.match(/min:\d{1,}(\||$)/) ? parseInt(`${val}`.split('min:')[1].split('|').shift()) : false,
    };
}

export default class Validator {

    constructor (rules = undefined) {
        //  Check for rules
        if (!Is.Object(rules)) throw new TypeError('Please provide an object to define the rules of this validator');

        //  Recursively parse our validation rules, to allow for deeply nested validation to be done
        function parse (acc, key) {
            const cursor = deepGet(rules, key);

            //  If the cursor is an object, go deeper into the object
            if (Is.Object(cursor)) {
                Object.keys(cursor).map(cursor_key => `${key}.${cursor_key}`).reduce(parse, acc);
            } else if (Is.NotEmptyString(cursor)) {
                //  If the cursor is a string, we've hit a rule

                let startix     = 0;        // Adjust to determine start of config rule
                let iterable    = false;    //  Iterable flag (false or an object, see iterable config)
                let sometimes   = false;    //  Sometimes flag
                if (cursor.substring(0, 2) === '?[') {
                    const iterable_endix = cursor.indexOf(']');
                    if (iterable_endix < 0) throw new TypeError(`Iterable end not found, please verify rule config for ${cursor}`);

                    iterable    = getIterableConfig(cursor.substring(2, iterable_endix));
                    sometimes   = true;
                    startix     = iterable_endix + 1;
                } else if (cursor.substring(0, 1) === '[') {
                    const iterable_endix = cursor.indexOf(']');
                    if (iterable_endix < 0) throw new TypeError(`Iterable end not found, please verify rule config for ${cursor}`);

                    iterable    = getIterableConfig(cursor.substring(1, iterable_endix));
                    startix     = iterable_endix + 1;
                } else if (cursor.substring(0, 1) === '?') {
                    sometimes = true;
                    startix = 1;
                }

                deepSet(acc, key, cursor.substring(startix).split('|').reduce((rule_acc, rule_string) => {
                    let params = rule_string.split(':');
                    let type = params.shift().trim();

                    //  Get 'not' flag
                    const not = type.startsWith('!');
                    if (not) type = type.replace(/!/g, '');

                    //  Get parameters
                    params = params.length > 0 ? params[0].split(',') : [];

                    //  Parse parameters into callback functions
                    params = params.reduce((params_acc, param) => {
                        if (/^<([A-z]|[0-9]|_|\.)+>$/g.test(param)) {
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
                throw new TypeError('The rule for a key needs to a string value');
            }

            return acc;
        }

        const parsed_rules = Object.keys(rules).reduce(parse, Object.create(null));

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
        this.evaluation.errors = Object.create(null);

        //  No data passed? Check if rules were set up
        if (!data) {
            this.evaluation.is_valid = !!(keys.length === 0);
        } else {
            const run = key => {
                const cursor = deepGet(this.rules, key);

                //  Recursively validate
                if (Is.NotEmptyObject(cursor)) {
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
                if (!Is.NotEmptyArray(cursor)) return;
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
                    if (Is.Object(rule.iterable)) {
                        //  If not an array -> invalid
                        if (!Is.Array(val)) {
                            iterable_err = true;
                            break;
                        }

                        //  rule.iterable.min is set and val length is below the min -> invalid
                        if (Is.Number(rule.iterable.min) && val.length < rule.iterable.min) {
                            iterable_min_err = rule.iterable.min;
                            break;
                        }

                        //  rule.iterable.min is set and val length is below the min -> invalid
                        if (Is.Number(rule.iterable.max) && val.length > rule.iterable.max) {
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
                } else if (Is.Number(iterable_min_err)) {
                    deepGet(this.evaluation.errors, key).push({msg: 'iterable_min', params: [iterable_min_err]});
                    this.evaluation.is_valid = false;
                } else if (Is.Number(iterable_max_err)) {
                    deepGet(this.evaluation.errors, key).push({msg: 'iterable_max', params: [iterable_max_err]});
                    this.evaluation.is_valid = false;
                } else if (!iterable_unique) {
                    deepGet(this.evaluation.errors, key).unshift({msg: 'iterable_unique', params: []});
                    this.evaluation.is_valid = false;
                }
            };

            //  Prep the evaluation for the keys in the rules
            for (const key of keys) {
                deepSet(this.evaluation.errors, key, Object.create(null));
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
        if (!Is.NotEmptyString(name) || !Is.Function(fn)) {
            throw new Error(`Invalid extension: ${name}, please ensure a valid function/name is passed`);
        }

        //  If prop already exists, delete it
        if (validateFn[name]) delete validateFn[name];

        //  Define property with a configurable flag to allow reconfiguration
        Object.defineProperty(validateFn, name.trim(), {configurable: true, enumerable: true, get : () => fn});
    }

    //  Run multiple validator extensions in one go by passing an object
    //
    //  @param object   obj     Object in the format of {rule_1: Function, rule_2: Function, ...}
    static extendMulti (obj) {
        //  Check if passed variable is an object
        if (!Is.Object(obj)) return;

        //  For each key in object, check if its value is a function
        for (const name of Object.keys(obj)) Validator.extend(name, obj[name]);
    }

}
