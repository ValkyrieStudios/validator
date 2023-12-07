'use strict';

export default function vGeoLatitude (val) {
    return Number.isFinite(val) && val >= -90 && val <= 90;
}
