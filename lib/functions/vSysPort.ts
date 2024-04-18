'use strict';

/**
 * Validate that a provided value is a valid port number, a port number needs
 * to be between 0 and 65535 with 0 being a reserved port (hence not allowed here)
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vSysPort (val:number):boolean {
    return Number.isInteger(val) && val > 0 && val <= 65535;
}

export {vSysPort, vSysPort as default};
