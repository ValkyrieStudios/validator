'use strict';

import {vUrl} from './vUrl';

export const EXTENSIONS = new Set([
    'jpg',
    'jpeg',
    'jpe',
    'jif',
    'jfif',
    'jfi',
    'png',
    'ico',
    'cur',
    'tiff',
    'tif',
    'gif',
    'webp',
    'bmp',
    'dib',
    'svg',
    'svgz',
    'heif',
    'heifs',
    'heic',
    'heics',
    'avci',
    'avcs',
    'avif',
    'hif',
]);

/**
 * Validate that a provided value is a url linking to an image file (eg: https://mywebsite.com/123.jpg)
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vUrlImage (val:string):boolean {
    if (!vUrl(val)) return false;

    /**
     * Deprotocolize -> take before query -> take before anchor -> split by /
     * eg: 'https://mysite.com/123.jpg#hello?this=iscool' -> ['mysite.com', '123.jpg']
     */
    let sanitized = val.replace(/^(https?|ftp):\/\//g, '').split(/(\?|#)/g, 1)[0].split('/');
    if (sanitized.length < 2) return false;

    /**
     * Pop and split by dot
     * eg: ['mysite.com', '123.jpg'] -> ['123', 'jpg']
     */
    sanitized = sanitized[sanitized.length - 1].split('.');

    /* Get extension */
    const ext = sanitized.pop();
    if (!EXTENSIONS.has(ext)) return false;

    return sanitized.join('.').length > 0;
}

export {vUrlImage, vUrlImage as default};
