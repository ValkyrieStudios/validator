/**
 * Validate that a provided value is a valid longitude value
 *
 * @param {unknown} val - Value to verify
 * @returns {boolean} Whether or not it's valid
 */
function vGeoLongitude (val:unknown):val is number {
    return Number.isFinite(val) && val as number >= -180 && val as number <= 180;
}

export {vGeoLongitude, vGeoLongitude as default};
