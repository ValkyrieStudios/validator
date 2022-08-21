'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vObject;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vObject(data) {
  return _is["default"].Object(data);
}