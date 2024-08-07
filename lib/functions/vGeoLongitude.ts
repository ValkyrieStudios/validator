/**
 * Validate that a provided value is a valid longitude value
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vGeoLongitude (val:unknown):val is number {
    return typeof val === 'number' && Number.isFinite(val) && val >= -180 && val <= 180;
}

export {vGeoLongitude, vGeoLongitude as default};
