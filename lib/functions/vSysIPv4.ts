const RGX = /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; /* eslint-disable-line max-len */

/**
 * Validate that a provided value is a valid IPv4 address
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vSysIPv4 (val:unknown):val is string {
    return typeof val === 'string' && RGX.test(val);
}

export {vSysIPv4, vSysIPv4 as default};
