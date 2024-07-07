/**
 * Validate that a provided value is a valid latitude value
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vGeoLatitude (val:unknown):val is number {
    return typeof val === 'number' && Number.isFinite(val) && val >= -90 && val <= 90;
}

export {vGeoLatitude, vGeoLatitude as default};
