'use strict';

/**
 * Validate that a provided value is a valid longitude value
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vGeoLongitude (val:number):boolean {
    return Number.isFinite(val) && val >= -180 && val <= 180;
}
