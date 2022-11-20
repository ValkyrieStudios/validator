'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vDate;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vDate(data) {
  return _is["default"].Date(data);
}