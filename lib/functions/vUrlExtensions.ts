import {vUrl} from './vUrl';

export const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'ico', 'cur', 'tiff', 'tif', 'gif', 'webp', 'bmp', 'dib', 'svg', 'svgz', 'heif', 'heifs', 'heic', 'heics', 'avci', 'avcs', 'avif', 'hif']); /* eslint-disable-line max-len */

export const VIDEO_EXTENSIONS = new Set(['webm', 'mkv', 'flv', 'vob', 'ogv', 'ogg', 'drc', 'gifv', 'mng', 'mov', 'qt', 'mp4', 'm4p', 'm4v', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'svi', '3gp', '3g2', 'mxf', 'roq', 'nsv', 'f4v', 'f4p', 'f4a', 'f4b']); /* eslint-disable-line max-len */

export const AUDIO_EXTENSIONS = new Set(['mp3', 'aac', 'ogg', 'oga', 'wav', 'flac', 'alac', 'aiff', 'ape', 'wma', 'm4a', 'm4b', 'opus']);

export const MEDIA_EXTENSIONS = new Set([...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS, ...AUDIO_EXTENSIONS]);

function vUrlWithExtension (val:unknown, EXTENSIONS:Set<string>):val is string {
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

/**
 * Validate that a provided value is a url linking to an image file (eg: https://mywebsite.com/123.jpg)
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vUrlImage (val: unknown) {
    return vUrlWithExtension(val, IMAGE_EXTENSIONS);
}

/**
 * Validate that a provided value is a url linking to a video file
 * (eg: https://mywebsite.com/123.mp4)
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vUrlVideo (val: unknown): val is string {
    return vUrlWithExtension(val, VIDEO_EXTENSIONS);
}

/**
 * Validate that a provided value is a url linking to an audio file
 * (eg: https://mywebsite.com/123.mp4)
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vUrlAudio (val: unknown): val is string {
    return vUrlWithExtension(val, AUDIO_EXTENSIONS);
}

/**
 * Validate that a provided value is a url linking to an audio/video/image file
 * (eg: https://mywebsite.com/123.mp4)
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vUrlMedia (val: unknown): val is string {
    return vUrlWithExtension(val, MEDIA_EXTENSIONS);
}

export {vUrlImage, vUrlVideo, vUrlAudio, vUrlMedia};
