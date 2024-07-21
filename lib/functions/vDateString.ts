/**
 * Validate that a provided value is a valid date string
 *
 * @param val - Value to verify
 *
 * @returns {boolean} Whether or not it's valid
 */
function vDateString (val:unknown):val is string {
    return (
        typeof val === 'string' &&
        val.trim().length &&
        !isNaN(Date.parse(val)) &&
        !isNaN(new Date(val).getTime())
    ) as boolean;
}

export {vDateString, vDateString as default};
