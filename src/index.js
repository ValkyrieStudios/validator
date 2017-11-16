import {isObject} from '@valkyriestudios/utils/object';
import {deepGet, deepSet, deepFreeze} from '@valkyriestudios/utils/deep';
import {isString} from '@valkyriestudios/utils/string';
import {isArray} from '@valkyriestudios/utils/array';

import vAlphaNumSpaces  from './functions/vAlphaNumSpaces';
import vArray           from './functions/vArray';
import vBoolean         from './functions/vBoolean';
import vEmail           from './functions/vEmail';
import vMax             from './functions/vMax';
import vMin             from './functions/vMin';
import vNumber          from './functions/vNumber';
import vRequired        from './functions/vRequired';
import vSize            from './functions/vSize';
import vEqualTo         from './functions/vEqualTo';

const _validateFn = Object.freeze({
    alpha_num_spaces    : vAlphaNumSpaces,
    array               : vArray,
    boolean             : vBoolean,
    email               : vEmail,
    number              : vNumber,
    max                 : vMax,
    min                 : vMin,
    required            : vRequired,
    size                : vSize,
    equal_to            : vEqualTo,
});

export default class Validator {

    constructor (rules) {
        //  Recursively parse our validation rules, to allow for deeply nested validation to be done
        function parse (acc, key) {
            const cursor = deepGet(rules, key);

            if (isObject(cursor)) {
                Object.keys(cursor)
                    .map((cursor_key) => `${key}.${cursor_key}`)
                    .reduce(parse, acc);
            }

            if (isString(cursor)) {
                deepSet(acc, key, cursor.split('|').reduce((rule_acc, rule_string) => {
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

                    rule_acc.push({
                        type : type,
                        params : params
                    });
                    return rule_acc;
                }, []));
            }

            return acc;
        }

        const parsed_rules = deepFreeze(Object.keys(rules).reduce(parse, Object.create(null)));

        //  Set is_valid as a property on the validator, this will reflect the
        //  validity even if evaluation results are not caught
        this.is_valid = false;

        //  Set the parsed rules as a get property on our validation instance
        Object.defineProperty(this, 'rules', {
            get : () => parsed_rules,
        });
    }

    validate (data) {
        const keys = Object.keys(this.rules);
        const evaluation = {
            is_valid : true,
            errors : Object.create(null),
        };

        //  No data passed ? Check if rules were set up
        if (!data) {
            evaluation.is_valid = !!(keys.length === 0);
            return deepFreeze(evaluation);
        }

        const run = (key) => {
            const cursor = deepGet(this.rules, key);

            //  Recursively validate
            if (isObject(cursor) && !isArray(cursor)) {
                return Object.keys(cursor).map((cursor_key) => {
                    cursor_key = `${key}.${cursor_key}`;
                    deepSet(evaluation.errors, cursor_key, []);
                    return cursor_key;
                }).forEach(run);
            } else {
                deepSet(evaluation.errors, key, []);
            }

            //  Validate array of rules for this property
            if (isArray(cursor)) {
                cursor.forEach((rule) => {
                    const val = deepGet(data, key);
                    //  Each param rule is a cb function that should be
                    //  executed on each run, retrieving the value inside of the dataset
                    const params = rule.params.reduce((acc, param_rule) => {
                        acc.push(param_rule(data));
                        return acc;
                    }, []);

                    if (!_validateFn[rule.type].apply(this, [val, ...params])) {
                        deepGet(evaluation.errors, key).push({
                            msg: rule.type,
                        });
                        evaluation.is_valid = false;
                    }
                });
            }
        }

        //  Prep the evaluation for the keys in the rules
        keys.forEach((key) => {
            deepSet(evaluation.errors, key, Object.create(null));
            run(key);
        });

        //  Set is_valid based on this evaluation
        this.is_valid = evaluation.is_valid;

        return deepFreeze(evaluation);
    }
}
