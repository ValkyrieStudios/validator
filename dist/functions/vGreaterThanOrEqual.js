'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vGreaterThanOrEqual;

var _number = require("@valkyriestudios/utils/number");

var _string = require("@valkyriestudios/utils/string");

var _array = require("@valkyriestudios/utils/array");

function vGreaterThanOrEqual(val) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (param === undefined) return false; //  Convert param into float

  var check = parseFloat(param); //  If param is not numerical or nan, return false

  if (!(0, _number.isNumber)(check) || (0, _number.isNumericalNaN)(check)) return false; //  Is value is string, use length for validation

  if ((0, _string.isString)(val) || (0, _array.isArray)(val)) return val.length >= check; //  If value is numerical, use primitive for validation

  if ((0, _number.isNumber)(val) && !(0, _number.isNumericalNaN)(val)) return val >= check;
  return false;
}