/**
 * Validate that a provided value is an instance of File
 *
 * @param {unknown} val - Value to verify
 */
function vFile (val: unknown): val is File {
    return val instanceof File;
}

export {vFile, vFile as default};
