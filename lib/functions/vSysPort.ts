'use strict';

/**
 * Validate that a provided value is a valid port number, a port number needs
 * to be between 0 and 65535 with 0 being a reserved port (hence not allowed here)
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vSysPort (val:unknown):val is number {
    return Number.isInteger(val) && (val as number) > 0 && (val as number) <= 65535;
}

export {vSysPort, vSysPort as default};
