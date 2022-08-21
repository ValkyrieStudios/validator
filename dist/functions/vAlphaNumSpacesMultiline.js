'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vAlphaNumSpacesMultiline;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vAlphaNumSpacesMultiline(val) {
  if (!_is["default"].String(val)) return false;
  return /^[a-zA-Z0-9\s]*$/igm.test(val);
}