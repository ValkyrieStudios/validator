'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vSysMac;
var _is = _interopRequireDefault(require("@valkyriestudios/utils/is"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//  M stands for manufacturer digits
//  S stands for device digits
//  When 48-bit addresses get converted to 64-bit addresses a hardcoded 16-bit value (FFFE)
//  gets inserted between the manufacturer and device digits.
function vSysMac(val) {
  if (!_is["default"].NotEmptyString(val)) return false;

  //  Check for MM-MM-MM-SS-SS-SS format
  if (/^([0-9A-Fa-f]{2}-){5}([0-9A-Fa-f]{2})$/.test(val)) return true;

  //  Check for MM:MM:MM:SS:SS:SS format
  if (/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/.test(val)) return true;

  //  Check for MMM.MMM.SSS.SSS format
  if (/^([0-9A-Fa-f]{3}\.){3}([0-9A-Fa-f]{3})$/.test(val)) return true;

  //  Special Case: Check for MM:MM:MM:FF:FE:SS:SS:SS (48-bit address converted to a 64-bit)
  if (/^([0-9A-Fa-f]{2}:){3}FF:FE:([0-9A-Fa-f]{2}:){2}[0-9A-Fa-f]{2}$/.test(val)) return true;

  //  Special Case: Check for MM-MM-MM-FF-FE-SS-SS-SS (48-bit address converted to a 64-bit)
  if (/^([0-9A-Fa-f]{2}-){3}FF-FE-([0-9A-Fa-f]{2}-){2}[0-9A-Fa-f]{2}$/.test(val)) return true;

  //  Special Case: Check for MMMM:MMFF:FESS:SSSS format (48-bit address converted to a 64-bit)
  if (/^[0-9A-Fa-f]{4}:[0-9A-Fa-f]{2}FF:FE[0-9A-Fa-f]{2}:[0-9A-Fa-f]{4}$/.test(val)) return true;

  //  Special Case: Check for MMMM-MMFF-FESS-SSSS format (48-bit address converted to a 64-bit)
  if (/^[0-9A-Fa-f]{4}-[0-9A-Fa-f]{2}FF-FE[0-9A-Fa-f]{2}-[0-9A-Fa-f]{4}$/.test(val)) return true;
  return false;
}