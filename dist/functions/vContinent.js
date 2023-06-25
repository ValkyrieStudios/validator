'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vContinent;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
var _mapKey = _interopRequireDefault(require("@valkyriestudios/utils/array/mapKey"));
var _continents = _interopRequireDefault(require("@valkyriestudios/utils/data/continents.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var MAP = (0, _mapKey["default"])(_continents["default"], 'code');
function vContinent(val) {
  if (!_is["default"].NeString(val)) return !1;
  return MAP.hasOwnProperty(val);
}