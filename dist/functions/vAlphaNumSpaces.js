'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vAlphaNumSpaces;

var _string = require("@valkyriestudios/utils/string");

function vAlphaNumSpaces(val) {
  if (!(0, _string.isString)(val)) return false;
  return val ? /^[a-zA-Z0-9 ]*$/ig.test(val) : false;
}