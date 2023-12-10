'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: !1 }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: !0 }; return { done: !1, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = !0, didErr = !1, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = !0; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ENUM_STORE = new Map();
var RULE_STORE = {
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
function M_Error(msg) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return {
    msg: msg,
    params: params
  };
}
function deepGet(obj, path) {
  var parts = path.split('.');
  var cursor = obj;
  while (parts.length > 0) {
    if ((0, _is3["default"])(cursor)) {
      var key = parts.shift();
      if (!Object.prototype.hasOwnProperty.call(cursor, key)) return undefined;
      cursor = cursor[key];
    }
    if (parts.length > 0 && !(0, _is3["default"])(cursor)) return undefined;
  }
  return cursor;
}
function getIterableConfig(val) {
  return {
    unique: val.indexOf('unique') >= 0,
    max: val.match(/max:\d{1,}(\||$)/) ? parseInt("".concat(val).split('max:', 2)[1].split('|', 1)[0]) : !1,
    min: val.match(/min:\d{1,}(\||$)/) ? parseInt("".concat(val).split('min:', 2)[1].split('|', 1)[0]) : !1
  };
}
function parseRule(raw) {
  var cursor = "".concat(raw);
  var sometimes = cursor.charAt(0) === '?';
  if (sometimes) cursor = cursor.substring(1);
  var iterable = /(\[|\])/g.test(cursor);
  if (iterable) {
    var start_ix = cursor.indexOf('[');
    var end_ix = cursor.indexOf(']');
    if (start_ix !== 0 || end_ix < 0) throw new TypeError("Iterable misconfiguration, please verify rule config for ".concat(raw));
    iterable = getIterableConfig(cursor.substring(0, end_ix));
    cursor = cursor.substring(end_ix + 1);
  }
  var list = cursor.split('|').reduce(function (acc, rule_part) {
    var params = rule_part.split(':');
    var type = params.shift().trim();
    var not = type.charAt(0) === '!';
    if (not) type = type.substring(1);
    if (params.length > 0) {
      if (type === 'in' && params[0].indexOf(',') > 0) {
        params = [params[0].split(',')];
      } else {
        params = params[0].split(',');
        var _loop = function _loop() {
          var param = params[i];
          if (param.charAt(0) === '<' && param.charAt(param.length - 1) === '>') {
            if (!/^[a-zA-Z0-9_.]{1,}$/ig.test(param.substr(1, param.length - 2))) {
              throw new TypeError("Parameterization misconfiguration, please verify rule config for ".concat(raw));
            }
            param = param.substr(1, param.length - 2);
            params[i] = function (data) {
              return deepGet(data, param);
            };
          } else {
            params[i] = param;
          }
        };
        for (var i = 0; i < params.length; i++) {
          _loop();
        }
      }
    }
    acc.push({
      type: type,
      params: params,
      not: not
    });
    return acc;
  }, []);
  return {
    sometimes: sometimes,
    iterable: iterable,
    list: list
  };
}
function validateField(cursor, list, data) {
  var errors = [];
  var _iterator = _createForOfIteratorHelper(list),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rule = _step.value;
      if (!RULE_STORE[rule.type]) {
        errors.push(M_Error('rule_not_found', [rule.type]));
        continue;
      }
      var params = [];
      var _iterator2 = _createForOfIteratorHelper(rule.params),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var p = _step2.value;
          params.push(typeof p === 'function' ? p(data) : p);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var rule_valid = RULE_STORE[rule.type].apply(RULE_STORE, [cursor].concat(params));
      if (!rule_valid && !rule.not || rule_valid && rule.not) {
        errors.push(M_Error("".concat(rule.not ? 'not_' : '').concat(rule.type), params));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return {
    errors: errors,
    is_valid: errors.length === 0
  };
}
function checkField(cursor, list, data) {
  var _iterator3 = _createForOfIteratorHelper(list),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var rule = _step3.value;
      if (!RULE_STORE[rule.type]) return !1;
      var params = [];
      var _iterator4 = _createForOfIteratorHelper(rule.params),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var p = _step4.value;
          params.push(typeof p === 'function' ? p(data) : p);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      var rule_valid = RULE_STORE[rule.type].apply(RULE_STORE, [cursor].concat(params));
      if (!rule_valid && !rule.not || rule_valid && rule.not) return !1;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return !0;
}
var Validator = exports["default"] = function () {
  function Validator() {
    var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    _classCallCheck(this, Validator);
    if (!(0, _is3["default"])(rules)) throw new TypeError('Please provide an object to define the rules of this validator');
    var plan = [];
    function parse(val, key) {
      if ((0, _is3["default"])(val)) {
        Object.keys(val).forEach(function (val_key) {
          return parse(val[val_key], key ? "".concat(key, ".").concat(val_key) : val_key);
        });
      } else if ((0, _isNotEmpty["default"])(val)) {
        var rule = parseRule(val);
        rule.key = key;
        plan.push(rule);
      } else {
        throw new TypeError('The rule for a key needs to be a string value');
      }
    }
    parse(rules);
    Object.defineProperty(this, 'plan', {
      get: function get() {
        return plan;
      }
    });
  }
  _createClass(Validator, [{
    key: "check",
    value: function check(data) {
      if (!(0, _is3["default"])(data)) return this.plan.length === 0;
      var _iterator5 = _createForOfIteratorHelper(this.plan),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var rule = _step5.value;
          var cursor = deepGet(data, rule.key);
          if (cursor === undefined) {
            if (rule.sometimes) continue;
            return !1;
          }
          if (rule.iterable) {
            if (!Array.isArray(cursor) || Number.isFinite(rule.iterable.min) && cursor.length < rule.iterable.min || Number.isFinite(rule.iterable.max) && cursor.length > rule.iterable.max) return !1;
            var unique_map = new Map();
            for (var idx = 0; idx < cursor.length; idx++) {
              if (!checkField(cursor[idx], rule.list, data)) return !1;
              if (!rule.iterable.unique) continue;
              unique_map.set((0, _fnv1A["default"])(cursor[idx]), !0);
              if (unique_map.size !== idx + 1) return !1;
            }
          } else if (!checkField(cursor, rule.list, data)) {
            return !1;
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return !0;
    }
  }, {
    key: "validate",
    value: function validate(data) {
      if (!(0, _is3["default"])(data)) {
        var is_valid = this.plan.length === 0;
        return {
          is_valid: is_valid,
          count: this.plan.length,
          errors: is_valid ? {} : 'NO_DATA'
        };
      }
      var errors = {};
      var _iterator6 = _createForOfIteratorHelper(this.plan),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var rule = _step6.value;
          var cursor = deepGet(data, rule.key);
          if (cursor === undefined) {
            if (!rule.sometimes) errors[rule.key] = [M_Error('not_found')];
            continue;
          }
          if (rule.iterable) {
            if (!Array.isArray(cursor)) {
              errors[rule.key] = [M_Error('iterable')];
              continue;
            }
            if (Number.isFinite(rule.iterable.min) && cursor.length < rule.iterable.min) {
              errors[rule.key] = [M_Error('iterable_min', [rule.iterable.min])];
              continue;
            }
            if (Number.isFinite(rule.iterable.max) && cursor.length > rule.iterable.max) {
              errors[rule.key] = [M_Error('iterable_max', [rule.iterable.max])];
              continue;
            }
            var iterable_unique = !0;
            var unique_map = iterable_unique && rule.iterable.unique ? new Map() : !1;
            for (var idx = 0; idx < cursor.length; idx++) {
              var field_evaluation = validateField(cursor[idx], rule.list, data);
              if (!field_evaluation.is_valid) {
                if (!errors[rule.key]) errors[rule.key] = [];
                var _iterator7 = _createForOfIteratorHelper(field_evaluation.errors),
                  _step7;
                try {
                  for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                    var obj = _step7.value;
                    errors[rule.key].push(Object.assign({
                      idx: idx
                    }, obj));
                  }
                } catch (err) {
                  _iterator7.e(err);
                } finally {
                  _iterator7.f();
                }
              }
              if (!unique_map || !iterable_unique) continue;
              unique_map.set((0, _fnv1A["default"])(cursor[idx]), !0);
              if (unique_map.size !== idx + 1) {
                iterable_unique = !1;
                if (!errors[rule.key]) errors[rule.key] = [];
                errors[rule.key].unshift(M_Error('iterable_unique'));
              }
            }
          } else {
            var _field_evaluation = validateField(cursor, rule.list, data);
            if (!_field_evaluation.is_valid) errors[rule.key] = _field_evaluation.errors;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      var count = Object.keys(errors).length;
      return {
        is_valid: !count,
        count: count,
        errors: errors
      };
    }
  }], [{
    key: "rules",
    get: function get() {
      return Object.freeze(Object.assign({}, RULE_STORE));
    }
  }, {
    key: "extend",
    value: function extend(name, fn) {
      if (typeof name !== 'string' || name.trim().length === 0) throw new Error('Invalid extension: please ensure a valid name is passed');
      var sanitized_name = name.trim();
      if (typeof fn !== 'function') throw new Error("Invalid extension: ".concat(sanitized_name, ", please ensure a valid function is passed"));
      if (RULE_STORE[sanitized_name]) delete RULE_STORE[sanitized_name];
      RULE_STORE[sanitized_name] = fn;
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
  }, {
    key: "extendEnum",
    value: function extendEnum(obj) {
      if (!(0, _is3["default"])(obj)) throw new Error('Please provide an object to extendEnum');
      for (var _i2 = 0, _Object$keys2 = Object.keys(obj); _i2 < _Object$keys2.length; _i2++) {
        var name = _Object$keys2[_i2];
        if (!Array.isArray(obj[name]) || obj[name].length === 0) throw new Error('Invalid enum extension: please ensure an extension provides an array with content');
        var enum_map = new Map();
        var _iterator8 = _createForOfIteratorHelper(obj[name]),
          _step8;
        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
            var el = _step8.value;
            if (!(0, _isNotEmpty["default"])(el) && !Number.isFinite(el)) {
              throw new Error("Invalid enum extension for ".concat(name, ": only primitive strings/numbers are allowed for now"));
            }
            enum_map.set(el, !0);
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
        var f = function f(val) {
          if (typeof val !== 'string' && !Number.isFinite(val)) return !1;
          return ENUM_STORE.get(this.uid).has(val);
        };
        f.uid = name;
        f = f.bind(f);
        ENUM_STORE.set(name, enum_map);
        RULE_STORE[name] = f;
      }
    }
  }]);
  return Validator;
}();