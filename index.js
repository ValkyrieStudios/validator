import {isObject} from '@valkyriestudios/core-utils/object';
import {deepGet, deepSet, deepFreeze} from '@valkyriestudios/core-utils/deep';
import {isString} from '@valkyriestudios/core-utils/string';
import {isArray} from '@valkyriestudios/core-utils/array';

import vAlphaNumSpaces  from './functions/vAlphaNumSpaces';
import vArray           from './functions/vArray';
import vBoolean         from './functions/vBoolean';
import vEmail           from './functions/vEmail';
import vMax             from './functions/vMax';
import vMin             from './functions/vMin';
import vNumber          from './functions/vNumber';
import vRequired        from './functions/vRequired';
import vSize            from './functions/vSize';

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
                    const params = rule_string.split(':');
                    const type = params.shift();

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

        //  Set the parsed rules as a get property on our validation instance
        Object.defineProperty(this, '$$validationrules', {
            get : () => parsed_rules,
        });
    }

    validate (data) {
        const keys = Object.keys(this.$$validationrules);
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
            const cursor = deepGet(this.$$validationrules, key);

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

                    if (!_validateFn[rule.type].apply(this, [val, ...rule.params])) {
                        deepGet(evaluation.errors, key).push({
                            msg: rule.type,
                        });
                        evaluation.is_valid = false;
                    }
                });
            }
        }

        //  Prep the evaluation for the keys in the validationrules
        keys.forEach((key) => {
            deepSet(evaluation.errors, key, Object.create(null));
            run(key);
        });

        return deepFreeze(evaluation);
    }
}
