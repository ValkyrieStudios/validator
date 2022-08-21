'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vInteger;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vInteger(val) {
  if (!_is["default"].Number(val)) return false;
  if (!Number.isFinite(val)) return false;
  return Math.floor(val) === val;
}