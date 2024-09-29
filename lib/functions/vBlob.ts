/**
 * Validate that a provided value is an instance of Blob
 *
 * @param {unknown} val - Value to verify
 */
function vBlob (val: unknown): val is Blob {
    return val instanceof Blob;
}

export {vBlob, vBlob as default};
