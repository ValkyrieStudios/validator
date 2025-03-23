/**
 * Validate that a provided value is strictly equal to a literal
 *
 * @param {unknown} val - Value to verify
 */
function vLiteral <T extends string = string> (val:unknown, literal:T):val is T {
    return typeof val === 'string' &&
        typeof literal === 'string' &&
        literal.trim().length > 0 &&
        val === literal;
}

export {vLiteral, vLiteral as default};
