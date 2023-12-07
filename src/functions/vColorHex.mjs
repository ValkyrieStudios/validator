'use strict';

export default function vColorHex (val) {
    return typeof val === 'string' && /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(val);
}
