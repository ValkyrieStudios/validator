'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vNumber;

var _number = require("@valkyriestudios/utils/number");

function vNumber(val) {
  return (0, _number.isNumber)(val) && !(0, _number.isNumericalNaN)(val);
}