'use strict';

/**
 * Validate that a provided value is a valid longitude value
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vGeoLongitude (val:number):boolean {
    return typeof val === 'number' && Number.isFinite(val) && val >= -180 && val <= 180;
}

export {vGeoLongitude, vGeoLongitude as default};
