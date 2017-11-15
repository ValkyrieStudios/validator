'use strict';

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('@valkyriestudios/utils/object');

var _deep = require('@valkyriestudios/utils/deep');

var _string = require('@valkyriestudios/utils/string');

var _array = require('@valkyriestudios/utils/array');

var _vAlphaNumSpaces = require('./functions/vAlphaNumSpaces');

var _vAlphaNumSpaces2 = _interopRequireDefault(_vAlphaNumSpaces);

var _vArray = require('./functions/vArray');

var _vArray2 = _interopRequireDefault(_vArray);

var _vBoolean = require('./functions/vBoolean');

var _vBoolean2 = _interopRequireDefault(_vBoolean);

var _vEmail = require('./functions/vEmail');

var _vEmail2 = _interopRequireDefault(_vEmail);

var _vMax = require('./functions/vMax');

var _vMax2 = _interopRequireDefault(_vMax);

var _vMin = require('./functions/vMin');

var _vMin2 = _interopRequireDefault(_vMin);

var _vNumber = require('./functions/vNumber');

var _vNumber2 = _interopRequireDefault(_vNumber);

var _vRequired = require('./functions/vRequired');

var _vRequired2 = _interopRequireDefault(_vRequired);

var _vSize = require('./functions/vSize');

var _vSize2 = _interopRequireDefault(_vSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _validateFn = Object.freeze({
    alpha_num_spaces: _vAlphaNumSpaces2.default,
    array: _vArray2.default,
    boolean: _vBoolean2.default,
    email: _vEmail2.default,
    number: _vNumber2.default,
    max: _vMax2.default,
    min: _vMin2.default,
    required: _vRequired2.default,
    size: _vSize2.default
});

var Validator = function () {
    function Validator(rules) {
        _classCallCheck(this, Validator);

        //  Recursively parse our validation rules, to allow for deeply nested validation to be done
        function parse(acc, key) {
            var cursor = (0, _deep.deepGet)(rules, key);

            if ((0, _object.isObject)(cursor)) {
                Object.keys(cursor).map(function (cursor_key) {
                    return key + '.' + cursor_key;
                }).reduce(parse, acc);
            }

            if ((0, _string.isString)(cursor)) {
                (0, _deep.deepSet)(acc, key, cursor.split('|').reduce(function (rule_acc, rule_string) {
                    var params = rule_string.split(':');
                    var type = params.shift();

                    rule_acc.push({
                        type: type,
                        params: params
                    });
                    return rule_acc;
                }, []));
            }

            return acc;
        }

        var parsed_rules = (0, _deep.deepFreeze)(Object.keys(rules).reduce(parse, Object.create(null)));

        //  Set is_valid as a property on the validator, this will reflect the validity even if evaluation
        //  results are not caught
        this.is_valid = !1;

        //  Set the parsed rules as a get property on our validation instance
        Object.defineProperty(this, 'rules', {
            get: function get() {
                return parsed_rules;
            }
        });
    }

    _createClass(Validator, [{
        key: 'validate',
        value: function validate(data) {
            var _this = this;

            var keys = Object.keys(this.rules);
            var evaluation = {
                is_valid: !0,
                errors: Object.create(null)
            };

            //  No data passed ? Check if rules were set up
            if (!data) {
                evaluation.is_valid = !!(keys.length === 0);
                return (0, _deep.deepFreeze)(evaluation);
            }

            var run = function run(key) {
                var cursor = (0, _deep.deepGet)(_this.rules, key);

                //  Recursively validate
                if ((0, _object.isObject)(cursor) && !(0, _array.isArray)(cursor)) {
                    return Object.keys(cursor).map(function (cursor_key) {
                        cursor_key = key + '.' + cursor_key;
                        (0, _deep.deepSet)(evaluation.errors, cursor_key, []);
                        return cursor_key;
                    }).forEach(run);
                } else {
                    (0, _deep.deepSet)(evaluation.errors, key, []);
                }

                //  Validate array of rules for this property
                if ((0, _array.isArray)(cursor)) {
                    cursor.forEach(function (rule) {
                        var val = (0, _deep.deepGet)(data, key);

                        if (!_validateFn[rule.type].apply(_this, [val].concat(_toConsumableArray(rule.params)))) {
                            (0, _deep.deepGet)(evaluation.errors, key).push({
                                msg: rule.type
                            });
                            evaluation.is_valid = !1;
                        }
                    });
                }
            };

            //  Prep the evaluation for the keys in the rules
            keys.forEach(function (key) {
                (0, _deep.deepSet)(evaluation.errors, key, Object.create(null));
                run(key);
            });

            //  Set is_valid based on this evaluation
            this.is_valid = evaluation.is_valid;

            return (0, _deep.deepFreeze)(evaluation);
        }
    }]);

    return Validator;
}();

exports.default = Validator;