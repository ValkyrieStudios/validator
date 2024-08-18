/**
 * Validate that a provided value is a valid latitude value
 *
 * @param {unknown} val - Value to verify
 * @returns {boolean} Whether or not it's valid
 */
function vGeoLatitude (val:unknown):val is number {
    return Number.isFinite(val) && val as number >= -90 && val as number <= 90;
}

export {vGeoLatitude, vGeoLatitude as default};
