import {type GeoLatitude} from '../types';

/**
 * Validate that a provided value is a valid latitude value
 *
 * @param {unknown} val - Value to verify
 */
function vGeoLatitude (val:unknown):val is GeoLatitude {
    return Number.isFinite(val) && val as number >= -90 && val as number <= 90;
}

export {vGeoLatitude, vGeoLatitude as default};
