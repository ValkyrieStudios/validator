'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vBetween;

var _number = require("@valkyriestudios/utils/number");

var _string = require("@valkyriestudios/utils/string");

var _array = require("@valkyriestudios/utils/array");

function vBetween(val) {
  var param_before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var param_after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  //  Convert param into float
  var check_after = parseFloat(param_after);
  var check_before = parseFloat(param_before); //  If param_after is not numerical or nan, return false

  if (!(0, _number.isNumber)(check_after) || (0, _number.isNumericalNaN)(check_after)) return false; //  If param_before is not numerical or nan, return false

  if (!(0, _number.isNumber)(check_before) || (0, _number.isNumericalNaN)(check_before)) return false; //  Is value is string, use length for validation

  if ((0, _string.isString)(val) || (0, _array.isArray)(val)) return val.length > check_before && val.length < check_after; //  If value is numerical, use primitive for validation

  if ((0, _number.isNumber)(val) && !(0, _number.isNumericalNaN)(val)) return val > check_before && val < check_after;
  return false;
}