'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vSize;

var _number = require("@valkyriestudios/utils/number");

var _string = require("@valkyriestudios/utils/string");

var _array = require("@valkyriestudios/utils/array");

function vSize(val) {
  var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (!val || !equals) return false; //  Convert equals into float

  var check = parseFloat(equals); //  If equals is not numerical or nan, return false

  if (!(0, _number.isNumber)(check) || (0, _number.isNumericalNaN)(check)) return false;
  return (0, _string.isString)(val) || (0, _array.isArray)(val) ? val.length === check : false;
}