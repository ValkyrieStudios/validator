'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vEqualTo;

var _equal = _interopRequireDefault(require("@valkyriestudios/utils/equal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vEqualTo(val_a) {
  var val_b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  if (val_b === undefined) return false;
  return !!(0, _equal["default"])(val_a, val_b);
}