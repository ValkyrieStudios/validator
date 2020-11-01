'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vIn;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/string/is"));

var _is2 = _interopRequireDefault(require("@valkyriestudios/utils/boolean/is"));

var _is3 = _interopRequireDefault(require("@valkyriestudios/utils/number/is"));

var _fnv1A = _interopRequireDefault(require("@valkyriestudios/utils/hash/fnv1A"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function vIn(val) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (params === undefined) return false;

  if ((0, _is["default"])(val) || (0, _is3["default"])(val) || (0, _is2["default"])(val)) {
    return params.indexOf(val) > -1;
  }

  var hashed = _toConsumableArray(params).map(function (el) {
    return (0, _fnv1A["default"])(el);
  });

  return hashed.indexOf((0, _fnv1A["default"])(val)) > -1;
}