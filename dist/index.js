'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));

var _get = _interopRequireDefault(require("@valkyriestudios/utils/deep/get"));

var _set = _interopRequireDefault(require("@valkyriestudios/utils/deep/set"));

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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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

var Validator = /*#__PURE__*/function () {
  function Validator() {
    var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

    _classCallCheck(this, Validator);

    //  Check for rules
    if (!_is["default"].Object(rules)) throw new TypeError('Please provide an object to define the rules of this validator'); //  Recursively parse our validation rules, to allow for deeply nested validation to be done

    function parse(acc, key) {
      var cursor = (0, _get["default"])(rules, key); //  If the cursor is an object, go deeper into the object

      if (_is["default"].Object(cursor)) {
        Object.keys(cursor).map(function (cursor_key) {
          return "".concat(key, ".").concat(cursor_key);
        }).reduce(parse, acc);
      } else if (_is["default"].NotEmptyString(cursor)) {
        //  If the cursor is a string, we've hit a rule
        var sometimes = !!(cursor.substr(0, 1) === '?');
        (0, _set["default"])(acc, key, (sometimes ? cursor.substr(1) : cursor).split('|').reduce(function (rule_acc, rule_string) {
          var params = rule_string.split(':');
          var type = params.shift(); //  Get parameters

          params = params.length > 0 ? params[0].split(',') : []; //  Parse parameters into callback functions

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
            sometimes: sometimes
          });
          return rule_acc;
        }, []));
      } else {
        //  Throw a type error if neither a string nor an object
        throw new TypeError('The rule for a key needs to a string value');
      }

      return acc;
    }

    var parsed_rules = Object.keys(rules).reduce(parse, Object.create(null)); //  Set is_valid as a property on the validator, this will reflect the
    //  validity even if evaluation results are not caught

    this.evaluation = Object.seal({
      is_valid: false,
      errors: {}
    }); //  Set the parsed rules as a get property on our validation instance

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

      var keys = Object.keys(this.rules); //  Reset evaluation

      this.evaluation.is_valid = true;
      this.evaluation.errors = Object.create(null); //  No data passed? Check if rules were set up

      if (!data) {
        this.evaluation.is_valid = !!(keys.length === 0);
      } else {
        var run = function run(key) {
          var cursor = (0, _get["default"])(_this.rules, key); //  Recursively validate

          if (_is["default"].NotEmptyObject(cursor)) {
            return Object.keys(cursor).map(function (cursor_key) {
              cursor_key = "".concat(key, ".").concat(cursor_key);
              (0, _set["default"])(_this.evaluation.errors, cursor_key, []);
              return cursor_key;
            }).forEach(run);
          } else {
            (0, _set["default"])(_this.evaluation.errors, key, []);
          } //  Validate array of rules for this property


          if (!_is["default"].NotEmptyArray(cursor)) return;
          cursor.forEach(function (rule) {
            var _validateFn$rule$type;

            var val = (0, _get["default"])(data, key); //  If no value is provided and rule.sometimes is set to true, simply return

            if (!val && rule.sometimes) return; //  Each param rule is a cb function that should be executed on each run, retrieving
            //  the value inside of the dataset

            var params = rule.params.reduce(function (acc, param_rule) {
              acc.push(param_rule(data));
              return acc;
            }, []);

            if (!(_validateFn$rule$type = validateFn[rule.type]).call.apply(_validateFn$rule$type, [_this, val].concat(_toConsumableArray(params)))) {
              (0, _get["default"])(_this.evaluation.errors, key).push({
                msg: rule.type,
                params: params
              });
              _this.evaluation.is_valid = false;
            }
          });
        }; //  Prep the evaluation for the keys in the rules


        keys.forEach(function (key) {
          (0, _set["default"])(_this.evaluation.errors, key, Object.create(null));
          run(key);
        });
      }

      return Object.assign({}, this.evaluation);
    }
  }], [{
    key: "extend",
    value: function extend(name, fn) {
      //  If prop already exists, delete it
      if (validateFn[name]) delete validateFn[name]; //  Define property with a configurable flag to allow reconfiguration

      Object.defineProperty(validateFn, name, {
        configurable: true,
        get: function get() {
          return fn;
        }
      });
    }
  }]);

  return Validator;
}();

exports["default"] = Validator;