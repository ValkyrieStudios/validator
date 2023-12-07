'use strict';

export default function vRequired (val) {
    if (val === null || val === undefined || Number.isNaN(val)) return false;

    if (typeof val === 'string') {
        return val.trim().length > 0;
    }

    if (Array.isArray(val)) {
        return val.length > 0;
    }

    return true;
}
