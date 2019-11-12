'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vRequired;

var _number = require("@valkyriestudios/utils/number");

var _string = require("@valkyriestudios/utils/string");

var _array = require("@valkyriestudios/utils/array");

function vRequired(val) {
  if (val === null || val === undefined) return false;
  if ((0, _string.isString)(val)) return !(val.trim() === '');
  if ((0, _array.isArray)(val)) return !(val.length === 0);
  if ((0, _number.isNumericalNaN)(val)) return false;
  return true;
}