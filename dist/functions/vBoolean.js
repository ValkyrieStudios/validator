'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vBoolean;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function vBoolean(val) {
  var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return _is["default"].Boolean(val) && equals !== null ? !!val === !!equals : _is["default"].Boolean(val);
}