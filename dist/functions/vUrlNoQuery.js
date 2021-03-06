'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = vUrl;

var _is = _interopRequireDefault(require("@valkyriestudios/utils/string/is"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function vUrl(data) {
  if (!(0, _is["default"])(data)) return false; //  Check for query string identifier

  if (data.indexOf('?') > -1) return false; //  Check for ampersand identifier

  if (data.indexOf('&') > -1) return false;
  return new RegExp("^" + // protocol identifier
  "(?:(?:https?|ftp)://)" + // user:pass authentication
  "(?:\\S+(?::\\S*)?@)?" + "(?:" + // IP address exclusion
  // private & local networks
  "(?!10(?:\\.\\d{1,3}){3})" + "(?!127(?:\\.\\d{1,3}){3})" + "(?!169\\.254(?:\\.\\d{1,3}){2})" + "(?!192\\.168(?:\\.\\d{1,3}){2})" + "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" + // IP address dotted notation octets
  // excludes loopback network 0.0.0.0
  // excludes reserved space >= 224.0.0.0
  // excludes network & broacast addresses
  // (first & last IP address of each class)
  "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" + // host name
  "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" + // domain name
  "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" + // TLD identifier
  "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" + ")" + // port number
  "(?::\\d{2,5})?" + // resource path
  "(?:/[^\\s]*)?" + "$", "i").test(data.trim());
}