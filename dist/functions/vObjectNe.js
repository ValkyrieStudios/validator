'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vNeObject;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vNeObject(data) {
  return _is["default"].NotEmptyObject(data);
}