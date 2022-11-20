'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vMax;
var _vLessThanOrEqual = _interopRequireDefault(require("./vLessThanOrEqual"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vMax(val) {
  var maximum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  return (0, _vLessThanOrEqual["default"])(val, maximum);
}