'use strict';

import vUrl from './vUrl.mjs';

export const EXTENSIONS = Object.freeze([
    //	Joint Photographic Experts Group
    'jpg',
    'jpeg',
    'jpe',
    'jif',
    'jfif',
    'jfi',
    //	Portable Network Graphics
    'png',
    //	ICO & CUR
    'ico',
    'cur',
    //	Tagged Image File Format
    'tiff',
    'tif',
    //	Graphics Interchange Format
    'gif',
    // 	WEBP
    'webp',
    //	Bitmap ('bmp')
    'bmp',
    'dib',
    //	Scalable Vector Graphics (svg)
    'svg',
    'svgz',
    //	Heif (High Efficiency Image File Format)
    'heif',
    'heifs',
    'heic',
    'heics',
    'avci',
    'avcs',
    'avif',
    'hif',
]);

const MAP = new Map();
for (const el of EXTENSIONS) MAP.set(el, true);

export default function vUrlImage (val) {
    if (!vUrl(val)) return false;

    //	Deprotocolize -> take before query -> take before anchor -> split by / 
    //	eg: 'https://mysite.com/123.jpg#hello?this=iscool' -> ['mysite.com', '123.jpg']
    let sanitized = val.replace(/^(https?|ftp):\/\//g, '').split(/(\?|#)/g, 1)[0].split('/');
    if (sanitized.length < 2) return false;

    //  Pop and split by dot
    //  eg: ['mysite.com', '123.jpg'] -> ['123', 'jpg']
    sanitized = sanitized[sanitized.length - 1].split('.');

    //  Get extension
    const ext = sanitized.pop();

    return sanitized.join('.').length > 0 && MAP.has(ext);
}