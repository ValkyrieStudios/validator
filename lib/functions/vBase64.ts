const RGX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

/**
 * Validate that a string is a valid base64 encoded value
 *
 * @param {unknown} val - Value to verify
 */
function vBase64 (val:unknown):val is string {
    return typeof val === 'string' && val.length > 0 &&
        RGX.test(val);
}

export {vBase64, vBase64 as default};
