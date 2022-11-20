'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
var _get = _interopRequireDefault(require("@valkyriestudios/utils/deep/get"));
var _set = _interopRequireDefault(require("@valkyriestudios/utils/deep/set"));
var _fnv1A = _interopRequireDefault(require("@valkyriestudios/utils/hash/fnv1A"));
var _vAlphaNumSpaces = _interopRequireDefault(require("./functions/vAlphaNumSpaces"));
var _vAlphaNumSpacesMultiline = _interopRequireDefault(require("./functions/vAlphaNumSpacesMultiline"));
var _vArray = _interopRequireDefault(require("./functions/vArray"));
var _vArrayNe = _interopRequireDefault(require("./functions/vArrayNe"));
var _vBetween = _interopRequireDefault(require("./functions/vBetween"));
var _vBoolean = _interopRequireDefault(require("./functions/vBoolean"));
var _vColorHex = _interopRequireDefault(require("./functions/vColorHex"));
var _vDate = _interopRequireDefault(require("./functions/vDate"));
var _vEmail = _interopRequireDefault(require("./functions/vEmail"));
var _vEqualTo = _interopRequireDefault(require("./functions/vEqualTo"));
var _vGreaterThan = _interopRequireDefault(require("./functions/vGreaterThan"));
var _vGreaterThanOrEqual = _interopRequireDefault(require("./functions/vGreaterThanOrEqual"));
var _vIn = _interopRequireDefault(require("./functions/vIn"));
var _vInteger = _interopRequireDefault(require("./functions/vInteger"));
var _vLessThan = _interopRequireDefault(require("./functions/vLessThan"));
var _vLessThanOrEqual = _interopRequireDefault(require("./functions/vLessThanOrEqual"));
var _vMax = _interopRequireDefault(require("./functions/vMax"));
var _vMin = _interopRequireDefault(require("./functions/vMin"));
var _vNumber = _interopRequireDefault(require("./functions/vNumber"));
var _vObject = _interopRequireDefault(require("./functions/vObject"));
var _vObjectNe = _interopRequireDefault(require("./functions/vObjectNe"));
var _vRequired = _interopRequireDefault(require("./functions/vRequired"));
var _vSize = _interopRequireDefault(require("./functions/vSize"));
var _vString = _interopRequireDefault(require("./functions/vString"));
var _vStringNe = _interopRequireDefault(require("./functions/vStringNe"));
var _vUrl = _interopRequireDefault(require("./functions/vUrl"));
var _vUrlNoQuery = _interopRequireDefault(require("./functions/vUrlNoQuery"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var validateFn = {
  alpha_num_spaces: _vAlphaNumSpaces["default"],
  alpha_num_spaces_multiline: _vAlphaNumSpacesMultiline["default"],
  array: _vArray["default"],
  array_ne: _vArrayNe["default"],
  between: _vBetween["default"],
  "boolean": _vBoolean["default"],
  color_hex: _vColorHex["default"],
  date: _vDate["default"],
  email: _vEmail["default"],
  equal_to: _vEqualTo["default"],
  greater_than: _vGreaterThan["default"],
  greater_than_or_equal: _vGreaterThanOrEqual["default"],
  "in": _vIn["default"],
  integer: _vInteger["default"],
  less_than: _vLessThan["default"],
  less_than_or_equal: _vLessThanOrEqual["default"],
  max: _vMax["default"],
  min: _vMin["default"],
  number: _vNumber["default"],
  object: _vObject["default"],
  object_ne: _vObjectNe["default"],
  required: _vRequired["default"],
  size: _vSize["default"],
  string: _vString["default"],
  string_ne: _vStringNe["default"],
  url: _vUrl["default"],
  url_noquery: _vUrlNoQuery["default"]
};

//  Get the config for an iterable validation
//
//  @param string   val     Value to determine config from, eg: 'unique|min:1|max:5'
function getIterableConfig(val) {
  return {
    unique: val.indexOf('unique') >= 0,
    max: val.match(/max:\d{1,}(\||$)/) ? parseInt("".concat(val).split('max:')[1].split('|').shift()) : false,
    min: val.match(/min:\d{1,}(\||$)/) ? parseInt("".concat(val).split('min:')[1].split('|').shift()) : false
  };
}
var Validator = /*#__PURE__*/function () {
  function Validator() {
    var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    _classCallCheck(this, Validator);
    //  Check for rules
    if (!_is["default"].Object(rules)) throw new TypeError('Please provide an object to define the rules of this validator');

    //  Recursively parse our validation rules, to allow for deeply nested validation to be done
    function parse(acc, key) {
      var cursor = (0, _get["default"])(rules, key);

      //  If the cursor is an object, go deeper into the object
      if (_is["default"].Object(cursor)) {
        Object.keys(cursor).map(function (cursor_key) {
          return "".concat(key, ".").concat(cursor_key);
        }).reduce(parse, acc);
      } else if (_is["default"].NotEmptyString(cursor)) {
        //  If the cursor is a string, we've hit a rule

        var startix = 0; // Adjust to determine start of config rule
        var iterable = false; //  Iterable flag (false or an object, see iterable config)
        var sometimes = false; //  Sometimes flag
        if (cursor.substring(0, 2) === '?[') {
          var iterable_endix = cursor.indexOf(']');
          if (iterable_endix < 0) throw new TypeError("Iterable end not found, please verify rule config for ".concat(cursor));
          iterable = getIterableConfig(cursor.substring(2, iterable_endix));
          sometimes = true;
          startix = iterable_endix + 1;
        } else if (cursor.substring(0, 1) === '[') {
          var _iterable_endix = cursor.indexOf(']');
          if (_iterable_endix < 0) throw new TypeError("Iterable end not found, please verify rule config for ".concat(cursor));
          iterable = getIterableConfig(cursor.substring(1, _iterable_endix));
          startix = _iterable_endix + 1;
        } else if (cursor.substring(0, 1) === '?') {
          sometimes = true;
          startix = 1;
        }
        (0, _set["default"])(acc, key, cursor.substring(startix).split('|').reduce(function (rule_acc, rule_string) {
          var params = rule_string.split(':');
          var type = params.shift().trim();

          //  Get 'not' flag
          var not = type.startsWith('!');
          if (not) type = type.replace(/!/g, '');

          //  Get parameters
          params = params.length > 0 ? params[0].split(',') : [];

          //  Parse parameters into callback functions
          params = params.reduce(function (params_acc, param) {
            if (/^<([A-z]|[0-9]|_|\.)+>$/g.test(param)) {
              param = param.substr(1, param.length - 2);
              params_acc.push(function (data) {
                try {
                  return (0, _get["default"])(data, param);
                } catch (err) {
                  return undefined;
                }
              });
            } else {
              params_acc.push(function () {
                return param;
              });
            }
            return params_acc;
          }, []);
          rule_acc.push({
            type: type,
            params: params,
            not: not,
            sometimes: sometimes,
            iterable: iterable
          });
          return rule_acc;
        }, []));
      } else {
        //  Throw a type error if neither a string nor an object
        throw new TypeError('The rule for a key needs to a string value');
      }
      return acc;
    }
    var parsed_rules = Object.keys(rules).reduce(parse, Object.create(null));

    //  Set is_valid as a property on the validator, this will reflect the
    //  validity even if evaluation results are not caught
    this.evaluation = Object.seal({
      is_valid: false,
      errors: {}
    });

    //  Set the parsed rules as a get property on our validation instance
    Object.defineProperty(this, 'rules', {
      get: function get() {
        return parsed_rules;
      }
    });
  }
  _createClass(Validator, [{
    key: "is_valid",
    get: function get() {
      return this.evaluation.is_valid;
    }
  }, {
    key: "errors",
    get: function get() {
      return this.evaluation.errors;
    }
  }, {
    key: "validate",
    value: function validate(data) {
      var _this = this;
      var keys = Object.keys(this.rules);

      //  Reset evaluation
      this.evaluation.is_valid = true;
      this.evaluation.errors = Object.create(null);

      //  No data passed? Check if rules were set up
      if (!data) {
        this.evaluation.is_valid = !!(keys.length === 0);
      } else {
        var run = function run(key) {
          var cursor = (0, _get["default"])(_this.rules, key);

          //  Recursively validate
          if (_is["default"].NotEmptyObject(cursor)) {
            return Object.keys(cursor).map(function (cursor_key) {
              cursor_key = "".concat(key, ".").concat(cursor_key);
              (0, _set["default"])(_this.evaluation.errors, cursor_key, []);
              return cursor_key;
            }).forEach(run);
          } else {
            (0, _set["default"])(_this.evaluation.errors, key, []);
          }

          //  Get value
          var val = (0, _get["default"])(data, key);

          //  Iterable error flags
          var iterable_unique = true;
          var iterable_err = false;
          var iterable_min_err = false;
          var iterable_max_err = false;

          //  Validate array of rules for this property
          if (!_is["default"].NotEmptyArray(cursor)) return;
          var _iterator = _createForOfIteratorHelper(cursor),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var rule = _step.value;
              //  Check if rule exists
              if (!validateFn[rule.type]) throw new Error("Rule: ".concat(rule.type, " was not found"));

              //  Each param rule is a cb function that should be executed on each run, retrieving
              //  the value inside of the dataset
              var params = [];
              var _iterator2 = _createForOfIteratorHelper(rule.params),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var rule_param = _step2.value;
                  params.push(rule_param(data));
                }

                //  If rule.sometimes is set and val is not provided, break
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              if (val === undefined) {
                if (!rule.sometimes) {
                  (0, _get["default"])(_this.evaluation.errors, key).push({
                    msg: "".concat(rule.not ? 'not_' : '').concat(rule.type),
                    params: params
                  });
                  _this.evaluation.is_valid = false;
                }
                continue;
              }

              //  If this is an iterable
              if (_is["default"].Object(rule.iterable)) {
                //  If not an array -> invalid
                if (!_is["default"].Array(val)) {
                  iterable_err = true;
                  break;
                }

                //  rule.iterable.min is set and val length is below the min -> invalid
                if (_is["default"].Number(rule.iterable.min) && val.length < rule.iterable.min) {
                  iterable_min_err = rule.iterable.min;
                  break;
                }

                //  rule.iterable.min is set and val length is below the min -> invalid
                if (_is["default"].Number(rule.iterable.max) && val.length > rule.iterable.max) {
                  iterable_max_err = rule.iterable.max;
                  break;
                }
                var unique_map = iterable_unique && rule.iterable.unique ? new Map() : false;
                for (var i = 0; i < val.length; i++) {
                  var _validateFn$rule$type;
                  //  Run validation
                  var rule_valid = (_validateFn$rule$type = validateFn[rule.type]).call.apply(_validateFn$rule$type, [_this, val[i]].concat(params));

                  //  If check fails (not valid && not not | not && valid)
                  if (!rule_valid && !rule.not || rule_valid && rule.not) {
                    (0, _get["default"])(_this.evaluation.errors, key).push({
                      msg: "".concat(rule.not ? 'not_' : '').concat(rule.type),
                      params: params,
                      idx: i
                    });
                    _this.evaluation.is_valid = false;
                  }

                  //  Uniqueness checks for iterable
                  if (unique_map && iterable_unique) {
                    unique_map.set((0, _fnv1A["default"])(val[i]), true);
                    if (unique_map.size !== i + 1) iterable_unique = false;
                  }
                }
              } else {
                var _validateFn$rule$type2;
                //  Run validation
                var _rule_valid = (_validateFn$rule$type2 = validateFn[rule.type]).call.apply(_validateFn$rule$type2, [_this, val].concat(params));

                //  If check fails (not valid && not not | not && valid)
                if (!_rule_valid && !rule.not || _rule_valid && rule.not) {
                  (0, _get["default"])(_this.evaluation.errors, key).push({
                    msg: "".concat(rule.not ? 'not_' : '').concat(rule.type),
                    params: params
                  });
                  _this.evaluation.is_valid = false;
                }
              }
            }

            //  Inject iterable errors
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          if (iterable_err === true) {
            (0, _get["default"])(_this.evaluation.errors, key).push({
              msg: 'iterable',
              params: []
            });
            _this.evaluation.is_valid = false;
          } else if (_is["default"].Number(iterable_min_err)) {
            (0, _get["default"])(_this.evaluation.errors, key).push({
              msg: 'iterable_min',
              params: [iterable_min_err]
            });
            _this.evaluation.is_valid = false;
          } else if (_is["default"].Number(iterable_max_err)) {
            (0, _get["default"])(_this.evaluation.errors, key).push({
              msg: 'iterable_max',
              params: [iterable_max_err]
            });
            _this.evaluation.is_valid = false;
          } else if (!iterable_unique) {
            (0, _get["default"])(_this.evaluation.errors, key).unshift({
              msg: 'iterable_unique',
              params: []
            });
            _this.evaluation.is_valid = false;
          }
        };

        //  Prep the evaluation for the keys in the rules
        var _iterator3 = _createForOfIteratorHelper(keys),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var key = _step3.value;
            (0, _set["default"])(this.evaluation.errors, key, Object.create(null));
            run(key);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      return Object.assign({}, this.evaluation);
    }

    //  Extend validator rule set
    //
    //  @param string   name    Name of the rule
    //  @param Function fn      Validation function
  }], [{
    key: "extend",
    value: function extend(name, fn) {
      if (!_is["default"].NotEmptyString(name) || !_is["default"].Function(fn)) {
        throw new Error("Invalid extension: ".concat(name, ", please ensure a valid function/name is passed"));
      }

      //  If prop already exists, delete it
      if (validateFn[name]) delete validateFn[name];

      //  Define property with a configurable flag to allow reconfiguration
      Object.defineProperty(validateFn, name.trim(), {
        configurable: true,
        get: function get() {
          return fn;
        }
      });
    }

    //  Run multiple validator extensions in one go by passing an object
    //
    //  @param object   obj     Object in the format of {rule_1: Function, rule_2: Function, ...}
  }, {
    key: "extendMulti",
    value: function extendMulti(obj) {
      //  Check if passed variable is an object
      if (!_is["default"].Object(obj)) return;

      //  For each key in object, check if its value is a function
      for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
        var name = _Object$keys[_i];
        Validator.extend(name, obj[name]);
      }
    }
  }]);
  return Validator;
}();
exports["default"] = Validator;