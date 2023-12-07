'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = void 0;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/string/is.js"));
var _isNotEmpty = _interopRequireDefault(require("@valkyriestudios/utils/string/isNotEmpty.js"));
var _is2 = _interopRequireDefault(require("@valkyriestudios/utils/date/is.js"));
var _isNotEmpty2 = _interopRequireDefault(require("@valkyriestudios/utils/array/isNotEmpty.js"));
var _is3 = _interopRequireDefault(require("@valkyriestudios/utils/object/is.js"));
var _isNotEmpty3 = _interopRequireDefault(require("@valkyriestudios/utils/object/isNotEmpty.js"));
var _equal = _interopRequireDefault(require("@valkyriestudios/utils/equal.js"));
var _get = _interopRequireDefault(require("@valkyriestudios/utils/deep/get.js"));
var _set = _interopRequireDefault(require("@valkyriestudios/utils/deep/set.js"));
var _fnv1A = _interopRequireDefault(require("@valkyriestudios/utils/hash/fnv1A.js"));
var _vAlphaNumSpaces = _interopRequireDefault(require("./functions/vAlphaNumSpaces.js"));
var _vAlphaNumSpacesMultiline = _interopRequireDefault(require("./functions/vAlphaNumSpacesMultiline.js"));
var _vBetween = _interopRequireDefault(require("./functions/vBetween.js"));
var _vBetweenInclusive = _interopRequireDefault(require("./functions/vBetweenInclusive.js"));
var _vBoolean = _interopRequireDefault(require("./functions/vBoolean.js"));
var _vColorHex = _interopRequireDefault(require("./functions/vColorHex.js"));
var _vContinent = _interopRequireDefault(require("./functions/vContinent.js"));
var _vCountry = _interopRequireDefault(require("./functions/vCountry.js"));
var _vCountryAlpha = _interopRequireDefault(require("./functions/vCountryAlpha3.js"));
var _vDateString = _interopRequireDefault(require("./functions/vDateString.js"));
var _vEmail = _interopRequireDefault(require("./functions/vEmail.js"));
var _vGeoLatitude = _interopRequireDefault(require("./functions/vGeoLatitude.js"));
var _vGeoLongitude = _interopRequireDefault(require("./functions/vGeoLongitude.js"));
var _vGreaterThan = _interopRequireDefault(require("./functions/vGreaterThan.js"));
var _vGreaterThanOrEqual = _interopRequireDefault(require("./functions/vGreaterThanOrEqual.js"));
var _vGuid = _interopRequireDefault(require("./functions/vGuid.js"));
var _vIn = _interopRequireDefault(require("./functions/vIn.js"));
var _vLessThan = _interopRequireDefault(require("./functions/vLessThan.js"));
var _vLessThanOrEqual = _interopRequireDefault(require("./functions/vLessThanOrEqual.js"));
var _vMax = _interopRequireDefault(require("./functions/vMax.js"));
var _vMin = _interopRequireDefault(require("./functions/vMin.js"));
var _vPhone = _interopRequireDefault(require("./functions/vPhone.js"));
var _vTimeZone = _interopRequireDefault(require("./functions/vTimeZone.js"));
var _vRequired = _interopRequireDefault(require("./functions/vRequired.js"));
var _vSize = _interopRequireDefault(require("./functions/vSize.js"));
var _vSysMac = _interopRequireDefault(require("./functions/vSysMac.js"));
var _vSysIPv = _interopRequireDefault(require("./functions/vSysIPv4.js"));
var _vSysIPv2 = _interopRequireDefault(require("./functions/vSysIPv6.js"));
var _vSysIPv4_or_v = _interopRequireDefault(require("./functions/vSysIPv4_or_v6.js"));
var _vUrl = _interopRequireDefault(require("./functions/vUrl.js"));
var _vUrlNoQuery = _interopRequireDefault(require("./functions/vUrlNoQuery.js"));
var _vUrlImage = _interopRequireDefault(require("./functions/vUrlImage.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: !0 }; return { done: !1, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = !0, didErr = !1, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = !0; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: !1 }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var validateFn = {
  alpha_num_spaces: _vAlphaNumSpaces["default"],
  alpha_num_spaces_multiline: _vAlphaNumSpacesMultiline["default"],
  array: Array.isArray,
  array_ne: _isNotEmpty2["default"],
  between: _vBetween["default"],
  between_inc: _vBetweenInclusive["default"],
  "boolean": _vBoolean["default"],
  color_hex: _vColorHex["default"],
  continent: _vContinent["default"],
  country: _vCountry["default"],
  country_alpha3: _vCountryAlpha["default"],
  date: _is2["default"],
  date_string: _vDateString["default"],
  email: _vEmail["default"],
  equal_to: _equal["default"],
  geo_latitude: _vGeoLatitude["default"],
  geo_longitude: _vGeoLongitude["default"],
  greater_than: _vGreaterThan["default"],
  greater_than_or_equal: _vGreaterThanOrEqual["default"],
  guid: _vGuid["default"],
  "in": _vIn["default"],
  integer: Number.isInteger,
  less_than: _vLessThan["default"],
  less_than_or_equal: _vLessThanOrEqual["default"],
  max: _vMax["default"],
  min: _vMin["default"],
  number: Number.isFinite,
  object: _is3["default"],
  object_ne: _isNotEmpty3["default"],
  phone: _vPhone["default"],
  required: _vRequired["default"],
  size: _vSize["default"],
  string: _is["default"],
  string_ne: _isNotEmpty["default"],
  sys_mac: _vSysMac["default"],
  sys_ipv4: _vSysIPv["default"],
  sys_ipv6: _vSysIPv2["default"],
  sys_ipv4_or_v6: _vSysIPv4_or_v["default"],
  time_zone: _vTimeZone["default"],
  url: _vUrl["default"],
  url_noquery: _vUrlNoQuery["default"],
  url_img: _vUrlImage["default"],
  gt: _vGreaterThan["default"],
  gte: _vGreaterThanOrEqual["default"],
  lt: _vLessThan["default"],
  lte: _vLessThanOrEqual["default"],
  eq: _equal["default"]
};
function getIterableConfig(val) {
  return {
    unique: val.indexOf('unique') >= 0,
    max: val.match(/max:\d{1,}(\||$)/) ? parseInt("".concat(val).split('max:')[1].split('|').shift()) : !1,
    min: val.match(/min:\d{1,}(\||$)/) ? parseInt("".concat(val).split('min:')[1].split('|').shift()) : !1
  };
}
var Validator = exports["default"] = function () {
  function Validator() {
    var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    _classCallCheck(this, Validator);
    if (!(0, _is3["default"])(rules)) throw new TypeError('Please provide an object to define the rules of this validator');
    function parse(acc, key) {
      var cursor = (0, _get["default"])(rules, key);
      if ((0, _is3["default"])(cursor)) {
        Object.keys(cursor).map(function (cursor_key) {
          return "".concat(key, ".").concat(cursor_key);
        }).reduce(parse, acc);
      } else if ((0, _isNotEmpty["default"])(cursor)) {
        var startix = 0;
        var iterable = /(\[|\])/g.test(cursor);
        var sometimes = !1;
        if (iterable) {
          var iterable_startix = cursor.indexOf('[');
          var iterable_endix = cursor.indexOf(']');
          if (iterable_startix < 0 || iterable_endix < 0 || iterable_startix > iterable_endix) throw new TypeError("Iterable misconfiguration, please verify rule config for ".concat(cursor));
          if (cursor.substring(0, 2) === '?[') {
            iterable = getIterableConfig(cursor.substring(2, iterable_endix));
            sometimes = !0;
            startix = iterable_endix + 1;
          } else if (cursor.charAt(0) === '[') {
            iterable = getIterableConfig(cursor.substring(1, iterable_endix));
            startix = iterable_endix + 1;
          } else {
            throw new Error("Invalid iterable found, please verify rule config for ".concat(cursor));
          }
        } else if (cursor.charAt(0) === '?') {
          sometimes = !0;
          startix = 1;
        }
        (0, _set["default"])(acc, key, cursor.substring(startix).split('|').reduce(function (rule_acc, rule_string) {
          var params = rule_string.split(':');
          var type = params.shift().trim();
          var not = type.charAt(0) === '!';
          if (not) type = type.replace(/!/g, '');
          params = params.length > 0 ? params[0].split(',') : [];
          params = params.reduce(function (params_acc, param) {
            if (param.charAt(0) === '<' && param.charAt(param.length - 1) === '>') {
              if (!/^[a-zA-Z0-9_.]{1,}$/ig.test(param.substr(1, param.length - 2))) {
                throw new TypeError("Parameterization misconfiguration, please verify rule config for ".concat(cursor));
              }
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
        throw new TypeError('The rule for a key needs to be a string value');
      }
      return acc;
    }
    var parsed_rules = Object.keys(rules).reduce(parse, {});
    this.evaluation = Object.seal({
      is_valid: !1,
      errors: {}
    });
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
      this.evaluation.is_valid = !0;
      this.evaluation.errors = {};
      if (!data) {
        this.evaluation.is_valid = keys.length === 0;
      } else {
        var run = function run(key) {
          var cursor = (0, _get["default"])(_this.rules, key);
          if ((0, _isNotEmpty3["default"])(cursor)) {
            return Object.keys(cursor).map(function (cursor_key) {
              cursor_key = "".concat(key, ".").concat(cursor_key);
              (0, _set["default"])(_this.evaluation.errors, cursor_key, []);
              return cursor_key;
            }).forEach(run);
          } else {
            (0, _set["default"])(_this.evaluation.errors, key, []);
          }
          var val = (0, _get["default"])(data, key);
          var iterable_unique = !0;
          var iterable_err = !1;
          var iterable_min_err = !1;
          var iterable_max_err = !1;
          if (!(0, _isNotEmpty2["default"])(cursor)) return;
          var _iterator = _createForOfIteratorHelper(cursor),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var rule = _step.value;
              if (!validateFn[rule.type]) throw new Error("Rule: ".concat(rule.type, " was not found"));
              var params = [];
              var _iterator2 = _createForOfIteratorHelper(rule.params),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var rule_param = _step2.value;
                  params.push(rule_param(data));
                }
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
                  _this.evaluation.is_valid = !1;
                }
                continue;
              }
              if ((0, _is3["default"])(rule.iterable)) {
                if (!Array.isArray(val)) {
                  iterable_err = !0;
                  break;
                }
                if (Number.isFinite(rule.iterable.min) && val.length < rule.iterable.min) {
                  iterable_min_err = rule.iterable.min;
                  break;
                }
                if (Number.isFinite(rule.iterable.max) && val.length > rule.iterable.max) {
                  iterable_max_err = rule.iterable.max;
                  break;
                }
                var unique_map = iterable_unique && rule.iterable.unique ? new Map() : !1;
                for (var i = 0; i < val.length; i++) {
                  var _validateFn$rule$type;
                  var rule_valid = (_validateFn$rule$type = validateFn[rule.type]).call.apply(_validateFn$rule$type, [_this, val[i]].concat(params));
                  if (!rule_valid && !rule.not || rule_valid && rule.not) {
                    (0, _get["default"])(_this.evaluation.errors, key).push({
                      msg: "".concat(rule.not ? 'not_' : '').concat(rule.type),
                      params: params,
                      idx: i
                    });
                    _this.evaluation.is_valid = !1;
                  }
                  if (unique_map && iterable_unique) {
                    unique_map.set((0, _fnv1A["default"])(val[i]), !0);
                    if (unique_map.size !== i + 1) iterable_unique = !1;
                  }
                }
              } else {
                var _validateFn$rule$type2;
                var _rule_valid = (_validateFn$rule$type2 = validateFn[rule.type]).call.apply(_validateFn$rule$type2, [_this, val].concat(params));
                if (!_rule_valid && !rule.not || _rule_valid && rule.not) {
                  (0, _get["default"])(_this.evaluation.errors, key).push({
                    msg: "".concat(rule.not ? 'not_' : '').concat(rule.type),
                    params: params
                  });
                  _this.evaluation.is_valid = !1;
                }
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          if (iterable_err === !0) {
            (0, _get["default"])(_this.evaluation.errors, key).push({
              msg: 'iterable',
              params: []
            });
            _this.evaluation.is_valid = !1;
          } else if (Number.isFinite(iterable_min_err)) {
            (0, _get["default"])(_this.evaluation.errors, key).push({
              msg: 'iterable_min',
              params: [iterable_min_err]
            });
            _this.evaluation.is_valid = !1;
          } else if (Number.isFinite(iterable_max_err)) {
            (0, _get["default"])(_this.evaluation.errors, key).push({
              msg: 'iterable_max',
              params: [iterable_max_err]
            });
            _this.evaluation.is_valid = !1;
          } else if (!iterable_unique) {
            (0, _get["default"])(_this.evaluation.errors, key).unshift({
              msg: 'iterable_unique',
              params: []
            });
            _this.evaluation.is_valid = !1;
          }
        };
        var _iterator3 = _createForOfIteratorHelper(keys),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var key = _step3.value;
            (0, _set["default"])(this.evaluation.errors, key, {});
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
  }], [{
    key: "rules",
    get: function get() {
      return Object.freeze(Object.assign({}, validateFn));
    }
  }, {
    key: "extend",
    value: function extend(name, fn) {
      if (typeof name !== 'string' || name.trim().length === 0) throw new Error('Invalid extension: please ensure a valid name is passed');
      var sanitized_name = name.trim();
      if (typeof fn !== 'function') throw new Error("Invalid extension: ".concat(sanitized_name, ", please ensure a valid function is passed"));
      if (validateFn[sanitized_name]) delete validateFn[sanitized_name];
      Object.defineProperty(validateFn, sanitized_name, {
        configurable: !0,
        enumerable: !0,
        get: function get() {
          return fn;
        }
      });
    }
  }, {
    key: "extendMulti",
    value: function extendMulti(obj) {
      if (!(0, _is3["default"])(obj)) throw new Error('Please provide an object to extendMulti');
      for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
        var name = _Object$keys[_i];
        Validator.extend(name, obj[name]);
      }
    }
  }]);
  return Validator;
}();