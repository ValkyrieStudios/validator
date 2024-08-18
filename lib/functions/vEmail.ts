const RGX_USERNAME  = /^(")?[A-Z0-9&._%+-]+(")?$/i;
const RGX_DOMAIN    = /^(\w{1,})([.-]?\w)*(\.\w{2,63})+$/;

/**
 * Validate that a provided value is a valid email address
 * For more info: RFC3696 (https://datatracker.ietf.org/doc/html/rfc3696)
 * Take note: This does not validate email existence
 *
 * @param {unknown} val - Value to verify
 * @returns {boolean} Whether or not it's valid
 */
function vEmail (val:unknown):val is string {
    if (typeof val !== 'string') return false;

    /* Check that string has content and does not contain spaces */
    const len = val.length;
    if (!len || val.trim().length !== len) return false;

    /* Split into user and domain parts, eg: 'contact@valkyriestudios.be' => ['contact', 'valkyriestudios.be'] */
    const parts = val.split('@');

    /* Validate 2 parts exist (a single @ sign needs to be present) */
    if (parts.length !== 2) return false;

    const [user, domain] = parts;
    const user_len = user.length;

    /* Base validation */
    if (
        user_len > 64 ||                /* Validate username length (max 64 chars) */
        !RGX_USERNAME.test(user) ||     /* Baseline validation for username */
        user[0] === '.' ||              /* Username Special case: can not start with dot (.) */
        user[user_len - 1] === '.' ||   /* Username Special case: can not end with dot (.) */
        user.indexOf('..') >= 0 ||      /* Username Special case: can not contain consecutive dot chars (.) */
        domain.length > 253             /* Validate domain length */
    ) return false;

    return RGX_DOMAIN.test(domain);
}

export {vEmail, vEmail as default};
