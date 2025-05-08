import {type MAC} from '../types';

/**
 * Mac Address Quick summary:
 *
 * M stands for manufacturer digits
 * S stands for device digits
 * When 48-bit addresses get converted to 64-bit addresses a hardcoded 16-bit value (FFFE)
 * gets inserted between the manufacturer and device digits.
 */

/* MM-MM-MM-SS-SS-SS */
const RGX_DOUBLE_DASH = /^([0-9A-Fa-f]{2}-){5}([0-9A-Fa-f]{2})$/;

/* MM:MM:MM:SS:SS:SS */
const RGX_DOUBLE_COLON = /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/;

/* MMM.MMM.SSS.SSS */
const RGX_TRIPLE_DOT = /^([0-9A-Fa-f]{3}\.){3}([0-9A-Fa-f]{3})$/;

/* Special Case: MM:MM:MM:FF:FE:SS:SS:SS (48-bit address converted to a 64-bit) */
const RGX_64_DOUBLE_COLON = /^([0-9A-Fa-f]{2}:){3}FF:FE:([0-9A-Fa-f]{2}:){2}[0-9A-Fa-f]{2}$/;

/* Special Case: MM-MM-MM-FF-FE-SS-SS-SS (48-bit address converted to a 64-bit) */
const RGX_64_DOUBLE_DASH = /^([0-9A-Fa-f]{2}-){3}FF-FE-([0-9A-Fa-f]{2}-){2}[0-9A-Fa-f]{2}$/;

/* Special Case: MMMM:MMFF:FESS:SSSS format (48-bit address converted to a 64-bit) */
const RGX_64_QUAD_COLON = /^[0-9A-Fa-f]{4}:[0-9A-Fa-f]{2}FF:FE[0-9A-Fa-f]{2}:[0-9A-Fa-f]{4}$/;

/* Special Case: MMMM-MMFF-FESS-SSSS format (48-bit address converted to a 64-bit) */
const RGX_64_QUAD_DASH = /^[0-9A-Fa-f]{4}-[0-9A-Fa-f]{2}FF-FE[0-9A-Fa-f]{2}-[0-9A-Fa-f]{4}$/;

/**
 * Validate that a provided value is a valid MAC address
 *
 * @param {unknown} val - Value to verify
 */
function vSysMac (val:unknown):val is MAC {
    return typeof val === 'string' && (
        RGX_DOUBLE_DASH.test(val) ||
        RGX_DOUBLE_COLON.test(val) ||
        RGX_TRIPLE_DOT.test(val) ||
        RGX_64_DOUBLE_COLON.test(val) ||
        RGX_64_DOUBLE_DASH.test(val) ||
        RGX_64_QUAD_COLON.test(val) ||
        RGX_64_QUAD_DASH.test(val)
    );
}

export {vSysMac, vSysMac as default};
