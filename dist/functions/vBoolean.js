'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vBoolean;

var _boolean = require("@valkyriestudios/utils/boolean");

function vBoolean(val) {
  var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return (0, _boolean.isBoolean)(val) && equals !== null ? !!val === !!equals : (0, _boolean.isBoolean)(val);
}