import {type GeoLongitude} from '../types';

/**
 * Validate that a provided value is a valid longitude value
 *
 * @param {unknown} val - Value to verify
 */
function vGeoLongitude (val:unknown):val is GeoLongitude {
    return Number.isFinite(val) && val as number >= -180 && val as number <= 180;
}

export {vGeoLongitude, vGeoLongitude as default};
