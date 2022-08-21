'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vNeArray;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vNeArray(data) {
  return _is["default"].NotEmptyArray(data);
}