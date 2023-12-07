'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vIn;
var _fnv1A = _interopRequireDefault(require("@valkyriestudios/utils/hash/fnv1A.js"));
var _memoize = _interopRequireDefault(require("@valkyriestudios/utils/caching/memoize.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: !0 }; return { done: !1, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = !0, didErr = !1, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = !0; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var memoizedHashParams = (0, _memoize["default"])(function (params) {
  var hashed = [];
  if (typeof params === 'string') {
    var _iterator = _createForOfIteratorHelper(params.split(',')),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var el = _step.value;
        hashed.push((0, _fnv1A["default"])(el));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    var _iterator2 = _createForOfIteratorHelper(params),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _el = _step2.value;
        hashed.push((0, _fnv1A["default"])(_el));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  return hashed;
});
function vIn(val) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (!(typeof params === 'string' && params.trim().length > 0) && !(Array.isArray(params) && params.length > 0)) return !1;
  if (typeof val === 'string' || Number.isFinite(val) || val === !0 || val === !1) return params.indexOf(val) > -1;
  return memoizedHashParams(params).indexOf((0, _fnv1A["default"])(val)) > -1;
}