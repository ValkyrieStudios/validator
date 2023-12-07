'use strict';

export default function vGeoLongitude (val) {
    return Number.isFinite(val) && val >= -180 && val <= 180;
}
