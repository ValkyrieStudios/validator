'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vInteger;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vInteger(val) {
  return _is["default"].Integer(val);
}