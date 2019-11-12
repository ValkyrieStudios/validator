'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vIn;

var _string = require("@valkyriestudios/utils/string");

var _boolean = require("@valkyriestudios/utils/boolean");

var _number = require("@valkyriestudios/utils/number");

var _hash = require("@valkyriestudios/utils/hash");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function vIn(val) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (params === undefined) return false;

  if ((0, _string.isString)(val) || (0, _number.isNumber)(val) || (0, _boolean.isBoolean)(val)) {
    return params.indexOf(val) > -1;
  }

  var hashed = _toConsumableArray(params).map(function (el) {
    return (0, _hash.fnv1A)(el);
  });

  return hashed.indexOf((0, _hash.fnv1A)(val)) > -1;
}