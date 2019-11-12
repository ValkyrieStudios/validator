'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vInteger;

var _number = require("@valkyriestudios/utils/number");

function vInteger(val) {
  if (!(0, _number.isNumber)(val)) return false;
  if ((0, _number.isNumericalNaN)(val)) return false;
  return Math.floor(val) === val;
}