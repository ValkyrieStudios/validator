'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vBoolean;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/boolean/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vBoolean(val) {
  var equals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return (0, _is["default"])(val) && equals !== null ? !!val === !!equals : (0, _is["default"])(val);
}