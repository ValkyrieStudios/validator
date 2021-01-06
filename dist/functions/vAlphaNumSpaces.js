'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vAlphaNumSpaces;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/string/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vAlphaNumSpaces(val) {
  if (!(0, _is["default"])(val)) return false;
  return /^[a-zA-Z0-9 ]*$/ig.test(val);
}