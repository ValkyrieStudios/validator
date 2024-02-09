'use strict';

/**
 * Validate that a provided value is a valid latitude value
 * 
 * @param val - Value to verify
 * 
 * @returns {boolean} Whether or not it's valid
 */
export default function vGeoLatitude (val:number):boolean {
    return Number.isFinite(val) && val >= -90 && val <= 90;
}
