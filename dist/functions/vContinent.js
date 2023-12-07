'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports["default"] = vContinent;
var MAP = new Map();
for (var _i = 0, _arr = ['AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA']; _i < _arr.length; _i++) {
  var el = _arr[_i];
  MAP.set(el, !0);
}
function vContinent(val) {
  return typeof val === 'string' && MAP.has(val);
}