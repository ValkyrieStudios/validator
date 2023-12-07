'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vUrlNoQuery;
var _vUrl = _interopRequireDefault(require("./vUrl.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vUrlNoQuery(val) {
  return (0, _vUrl["default"])(val) && val.indexOf('?') < 0 && val.indexOf('&') < 0;
}