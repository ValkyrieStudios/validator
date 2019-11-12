'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vEmail;

var _string = require("@valkyriestudios/utils/string");

//  We don't use a single regex for validation as there is no one single
//  regex that works for all
function vEmail(val) {
  if (!val) return false;
  if (!(0, _string.isString)(val)) return false;
  var parts = val.split('@');
  if (parts.length !== 2) return false; //  Validate username part

  if (parts[0].length > 64) return false;
  if (/^(")?\w+([\+\.-]?\w+)*(")?$/.test(parts[0]) === false) return false; //  Validate domain part

  if (parts[1].length > 253) return false;
  if (/^(?:(?=[a-z0-9-]{1,63}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{1,63}\z)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ig.test(parts[1]) !== false) return true;
  if (/^\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(parts[1]) === false) return false;
  return true;
}