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
var _vFalse = _interopRequireDefault(require("./functions/vFalse.js"));
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
var _vTrue = _interopRequireDefault(require("./functions/vTrue.js"));
var _vUrl = _interopRequireDefault(require("./functions/vUrl.js"));
var _vUrlNoQuery = _interopRequireDefault(require("./functions/vUrlNoQuery.js"));
var _vUrlImage = _interopRequireDefault(require("./functions/vUrlImage.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }); } else { obj[key] = value; } return obj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || !1; descriptor.configurable = !0; if ("value" in descriptor) descriptor.writable = !0; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: !1 }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: !0 }; return { done: !1, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = !0, didErr = !1, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = !0; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var ENUM_STORE = new Map();
var REGEX_STORE = new Map();
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
  "false": _vFalse["default"],
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
  "true": _vTrue["default"],
  url: _vUrl["default"],
  url_noquery: _vUrlNoQuery["default"],
  url_img: _vUrlImage["default"],
  gt: _vGreaterThan["default"],
  gte: _vGreaterThanOrEqual["default"],
  lt: _vLessThan["default"],
  lte: _vLessThanOrEqual["default"],
  eq: _equal["default"]
};
function validExtension(obj, valueFn) {
  if (!(0, _is3["default"])(obj) || Object.keys(obj).filter(function (val) {
    return !/^[A-Za-z_\-0-9]{1,}$/g.test(val);
  }).length > 0) throw new Error('Invalid extension');
  for (var _i = 0, _Object$values = Object.values(obj); _i < _Object$values.length; _i++) {
    var val = _Object$values[_i];
    valueFn(val);
  }
}
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
  var max = val.match(/max:\d{1,}/);
  var min = val.match(/min:\d{1,}/);
  return {
    unique: val.indexOf('unique') >= 0,
    max: max ? parseInt("".concat(max).split('max:', 2)[1]) : !1,
    min: min ? parseInt("".concat(min).split('min:', 2)[1]) : !1
  };
}
function parseRule(raw) {
  var cursor = "".concat(raw);
  var iterable = /(\[|\]){1,}/.test(cursor);
  if (iterable) {
    var start_ix = cursor.indexOf('[');
    var end_ix = cursor.indexOf(']');
    if (start_ix !== 0 || end_ix < 0) throw new TypeError("Iterable misconfiguration, verify rule config for ".concat(raw));
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
              throw new TypeError("Parameterization misconfiguration, verify rule config for ".concat(raw));
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
    iterable: iterable,
    list: list
  };
}
function parseGroups(raw) {
  var cursor = "".concat(raw);
  var sometimes = cursor.charAt(0) === '?';
  if (sometimes) cursor = cursor.substring(1);
  var rules = [];
  var conditionals = cursor.match(/\([a-zA-Z0-9|?.[\],:<>]{1,}\)/g);
  if (!conditionals) {
    rules.push(parseRule(cursor));
  } else {
    var _iterator = _createForOfIteratorHelper(conditionals),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var el = _step.value;
        rules.push(parseRule(el.replace(/(\(|\))/g, '')));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return {
    sometimes: sometimes,
    rules: rules
  };
}
function validateField(cursor, list, data) {
  var errors = [];
  var _iterator2 = _createForOfIteratorHelper(list),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var rule = _step2.value;
      if (!RULE_STORE[rule.type]) {
        errors.push(M_Error('rule_not_found', [rule.type]));
        continue;
      }
      var params = [];
      var _iterator3 = _createForOfIteratorHelper(rule.params),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var p = _step3.value;
          params.push(typeof p === 'function' ? p(data) : p);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      var rule_valid = RULE_STORE[rule.type].apply(RULE_STORE, [cursor].concat(params));
      if (!rule_valid && !rule.not || rule_valid && rule.not) {
        errors.push(M_Error("".concat(rule.not ? 'not_' : '').concat(rule.type), params));
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return {
    errors: errors,
    is_valid: errors.length === 0
  };
}
function checkField(cursor, list, data) {
  var _iterator4 = _createForOfIteratorHelper(list),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var rule = _step4.value;
      if (!RULE_STORE[rule.type]) return !1;
      var params = [];
      var _iterator5 = _createForOfIteratorHelper(rule.params),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var p = _step5.value;
          params.push(typeof p === 'function' ? p(data) : p);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      var rule_valid = RULE_STORE[rule.type].apply(RULE_STORE, [cursor].concat(params));
      if (!rule_valid && !rule.not || rule_valid && rule.not) return !1;
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return !0;
}
var Validator = exports["default"] = function () {
  function Validator() {
    var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    _classCallCheck(this, Validator);
    if (!(0, _is3["default"])(rules)) throw new TypeError('Provide an object to define the rules of this validator');
    var plan = [];
    function recursor(val, key) {
      if ((0, _is3["default"])(val)) {
        Object.keys(val).forEach(function (val_key) {
          return recursor(val[val_key], key ? "".concat(key, ".").concat(val_key) : val_key);
        });
      } else if ((0, _isNotEmpty["default"])(val)) {
        var rule = parseGroups(val);
        rule.key = key;
        plan.push(rule);
      } else {
        throw new TypeError('The rule for a key needs to be a string value');
      }
    }
    recursor(rules);
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
      var _iterator6 = _createForOfIteratorHelper(this.plan),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var part = _step6.value;
          var cursor = deepGet(data, part.key);
          if (cursor === undefined) {
            if (part.sometimes) continue;
            return !1;
          }
          var valid_count = 0;
          var _iterator7 = _createForOfIteratorHelper(part.rules),
            _step7;
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              var rule = _step7.value;
              var is_valid = !0;
              if (rule.iterable) {
                if (!Array.isArray(cursor) || Number.isFinite(rule.iterable.min) && cursor.length < rule.iterable.min || Number.isFinite(rule.iterable.max) && cursor.length > rule.iterable.max) {
                  is_valid = !1;
                } else {
                  var unique_map = new Map();
                  for (var idx = 0; idx < cursor.length; idx++) {
                    if (!checkField(cursor[idx], rule.list, data)) {
                      is_valid = !1;
                      break;
                    }
                    if (!rule.iterable.unique) continue;
                    unique_map.set((0, _fnv1A["default"])(cursor[idx]), !0);
                    if (unique_map.size !== idx + 1) {
                      is_valid = !1;
                      break;
                    }
                  }
                }
              } else if (!checkField(cursor, rule.list, data)) {
                is_valid = !1;
              }
              if (is_valid) valid_count++;
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
          if (!valid_count) return !1;
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
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
      var _iterator8 = _createForOfIteratorHelper(this.plan),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var part = _step8.value;
          var cursor = deepGet(data, part.key);
          if (cursor === undefined) {
            if (!part.sometimes) errors[part.key] = [M_Error('not_found')];
            continue;
          }
          var has_valid = !1;
          var part_errors = [];
          var _iterator9 = _createForOfIteratorHelper(part.rules),
            _step9;
          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
              var rule = _step9.value;
              var error_cursor = [];
              if (rule.iterable) {
                if (!Array.isArray(cursor)) {
                  error_cursor.push(M_Error('iterable'));
                } else if (Number.isFinite(rule.iterable.min) && cursor.length < rule.iterable.min) {
                  error_cursor.push(M_Error('iterable_min', [rule.iterable.min]));
                } else if (Number.isFinite(rule.iterable.max) && cursor.length > rule.iterable.max) {
                  error_cursor.push(M_Error('iterable_max', [rule.iterable.max]));
                } else {
                  var iterable_unique = !0;
                  var unique_map = iterable_unique && rule.iterable.unique ? new Map() : !1;
                  var _loop2 = function _loop2(idx) {
                    var _error_cursor;
                    var evaluation = validateField(cursor[idx], rule.list, data);
                    if (!evaluation.is_valid) (_error_cursor = error_cursor).push.apply(_error_cursor, _toConsumableArray(evaluation.errors.map(function (el) {
                      return Object.assign({
                        idx: idx
                      }, el);
                    })));
                    if (!unique_map || !iterable_unique) return 1;
                    unique_map.set((0, _fnv1A["default"])(cursor[idx]), !0);
                    if (unique_map.size !== idx + 1) {
                      iterable_unique = !1;
                      error_cursor.unshift(M_Error('iterable_unique'));
                    }
                  };
                  for (var idx = 0; idx < cursor.length; idx++) {
                    if (_loop2(idx)) continue;
                  }
                }
              } else {
                var evaluation = validateField(cursor, rule.list, data);
                if (!evaluation.is_valid) error_cursor = evaluation.errors;
              }
              if (error_cursor.length === 0) {
                has_valid = !0;
                break;
              } else {
                part_errors.push(error_cursor);
              }
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
          if (!has_valid) errors[part.key] = part.rules.length > 1 ? part_errors : part_errors[0];
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
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
      if (typeof name !== 'string') throw new Error('Invalid extension');
      Validator.extendMulti(_defineProperty({}, name, fn));
    }
  }, {
    key: "extendMulti",
    value: function extendMulti(obj) {
      validExtension(obj, function (val) {
        if (typeof val !== 'function') throw new Error('Invalid extension');
      });
      for (var _i2 = 0, _Object$keys = Object.keys(obj); _i2 < _Object$keys.length; _i2++) {
        var key = _Object$keys[_i2];
        RULE_STORE[key] = obj[key];
      }
    }
  }, {
    key: "extendRegex",
    value: function extendRegex(obj) {
      validExtension(obj, function (val) {
        if (Object.prototype.toString.call(val) !== '[object RegExp]') throw new Error('Invalid extension');
      });
      for (var _i3 = 0, _Object$keys2 = Object.keys(obj); _i3 < _Object$keys2.length; _i3++) {
        var key = _Object$keys2[_i3];
        var f = function f(val) {
          return typeof val === 'string' && REGEX_STORE.get(this.uid).test(val);
        };
        f.uid = key;
        f = f.bind(f);
        REGEX_STORE.set(key, new RegExp(obj[key]));
        RULE_STORE[key] = f;
      }
    }
  }, {
    key: "extendEnum",
    value: function extendEnum(obj) {
      validExtension(obj, function (val) {
        if (!Array.isArray(val) || val.length === 0 || val.filter(function (el) {
          return (0, _isNotEmpty["default"])(el) || Number.isFinite(el);
        }).length !== val.length) throw new Error('Invalid extension');
      });
      for (var _i4 = 0, _Object$keys3 = Object.keys(obj); _i4 < _Object$keys3.length; _i4++) {
        var key = _Object$keys3[_i4];
        var enum_map = new Map();
        var _iterator10 = _createForOfIteratorHelper(obj[key]),
          _step10;
        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            var el = _step10.value;
            enum_map.set(el, !0);
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
        var f = function f(val) {
          return (typeof val === 'string' || Number.isFinite(val)) && ENUM_STORE.get(this.uid).has(val);
        };
        f.uid = key;
        f = f.bind(f);
        ENUM_STORE.set(key, enum_map);
        RULE_STORE[key] = f;
      }
    }
  }]);
  return Validator;
}();