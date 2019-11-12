'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vAlphaNumSpacesMultiline;

var _string = require("@valkyriestudios/utils/string");

function vAlphaNumSpacesMultiline(val) {
  if (!(0, _string.isString)(val)) return false;
  return val ? /^[a-zA-Z0-9\s]*$/igm.test(val) : false;
}