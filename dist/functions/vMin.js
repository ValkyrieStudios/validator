'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vMin;
var _vGreaterThanOrEqual = _interopRequireDefault(require("./vGreaterThanOrEqual.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vMin(val) {
  var minimum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  return (0, _vGreaterThanOrEqual["default"])(val, minimum);
}