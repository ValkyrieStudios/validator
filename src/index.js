'use strict'

import {isObject}               from '@valkyriestudios/utils/object';
import {deepGet, deepSet }      from '@valkyriestudios/utils/deep';
import {isString}               from '@valkyriestudios/utils/string';
import {isArray}                from '@valkyriestudios/utils/array';

import vAlphaNumSpaces          from './functions/vAlphaNumSpaces';
import vAlphaNumSpacesMultiline from './functions/vAlphaNumSpacesMultiline';
import vArray                   from './functions/vArray';
import vBetween                 from './functions/vBetween';
import vBoolean                 from './functions/vBoolean';
import vDate                    from './functions/vDate';
import vEmail                   from './functions/vEmail';
import vEqualTo                 from './functions/vEqualTo';
import vGreaterThan             from './functions/vGreaterThan';
import vGreaterThanOrEqual      from './functions/vGreaterThanOrEqual';
import vIn                      from './functions/vIn';
import vInteger                 from './functions/vInteger';
import vLessThan                from './functions/vLessThan';
import vLessThanOrEqual         from './functions/vLessThanOrEqual';
import vMax                     from './functions/vMax';
import vMin                     from './functions/vMin';
import vNumber                  from './functions/vNumber';
import vObject                  from './functions/vObject';
import vRequired                from './functions/vRequired';
import vSize                    from './functions/vSize';
import vString                  from './functions/vString';

const _validateFn = {
    alpha_num_spaces            : vAlphaNumSpaces,
    alpha_num_spaces_multiline  : vAlphaNumSpacesMultiline,
    array                       : vArray,
    between                     : vBetween,
    boolean                     : vBoolean,
    date                        : vDate,
    email                       : vEmail,
    equal_to                    : vEqualTo,
    greater_than                : vGreaterThan,
    greater_than_or_equal       : vGreaterThanOrEqual,
    in                          : vIn,
    integer                     : vInteger,
    less_than                   : vLessThan,
    less_than_or_equal          : vLessThanOrEqual,
    max                         : vMax,
    min                         : vMin,
    number                      : vNumber,
    object                      : vObject,
    required                    : vRequired,
    size                        : vSize,
    string                      : vString,
};

export default class Validator {

    constructor (rules = undefined) {
        //  Check for rules
        if (rules === undefined || !isObject(rules) || isArray(rules)) {
            throw new TypeError('Please provide an object to define the rules of this validator');
        }

        //  Recursively parse our validation rules, to allow for deeply nested validation to be done
        function parse (acc, key) {
            const cursor = deepGet(rules, key);

            //  If the cursor is an object, go deeper into the object
            if (isObject(cursor)) Object.keys(cursor).map(cursor_key => `${key}.${cursor_key}`).reduce(parse, acc);

            //  If the cursor is a string, we've hit a rule
            if (isString(cursor)) {
                //  Get sometimes
                const sometimes = !!(cursor.substr(0, 1) === '?');

                deepSet(acc, key, (sometimes ? cursor.substr(1) : cursor).split('|').reduce((rule_acc, rule_string) => {
                    let params = rule_string.split(':');
                    const type = params.shift();

                    //  Parse parameters into callback functions
                    params = params.reduce((acc, param) => {
                        if (/^\<([A-z]|[0-9]|\_|\.)+\>$/g.test(param)) {
                            param = param.substr(1, param.length - 2);
                            acc.push((data) => deepGet(data, param));
                        } else {
                            acc.push(() => param);
                        }
                        return acc;
                    }, []);

                    rule_acc.push({ type, params, sometimes });
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
        this.evaluation = Object.seal({ is_valid: false, errors: {} });

        //  Set the parsed rules as a get property on our validation instance
        Object.defineProperty(this, 'rules', { get : () => parsed_rules });
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
            const run = (key) => {
                const cursor = deepGet(this.rules, key);

                //  Recursively validate
                if (isObject(cursor) && !isArray(cursor)) {
                    return Object.keys(cursor).map((cursor_key) => {
                        cursor_key = `${key}.${cursor_key}`;
                        deepSet(this.evaluation.errors, cursor_key, []);
                        return cursor_key;
                    }).forEach(run);
                } else {
                    deepSet(this.evaluation.errors, key, []);
                }

                //  Validate array of rules for this property
                if (isArray(cursor)) {
                    cursor.forEach((rule) => {
                        const val = deepGet(data, key);

                        //  If no value is provided and rule.sometimes is set to true, simply return
                        if (!val && rule.sometimes) return;

                        //  Each param rule is a cb function that should be executed on each run, retrieving
                        //  the value inside of the dataset
                        const params = rule.params.reduce((acc, param_rule) => {
                            acc.push(param_rule(data));
                            return acc;
                        }, []);

                        if (!_validateFn[rule.type].apply(this, [val, ...params])) {
                            deepGet(this.evaluation.errors, key).push({
                                msg: rule.type,
                                params,
                            });
                            this.evaluation.is_valid = false;
                        }
                    });
                }
            };

            //  Prep the evaluation for the keys in the rules
            keys.forEach((key) => {
                deepSet(this.evaluation.errors, key, Object.create(null));
                run(key);
            });
        }

        return Object.assign({}, this.evaluation);
    }

    static extend (name, fn) {
        //  TODO : Extend Logic
    }
}
