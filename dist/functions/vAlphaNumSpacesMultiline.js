'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vAlphaNumSpacesMultiline;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/string/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vAlphaNumSpacesMultiline(val) {
  if (!(0, _is["default"])(val)) return false;
  return val ? /^[a-zA-Z0-9\s]*$/igm.test(val) : false;
}