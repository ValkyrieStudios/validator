const RGX = /^[0-9A-Z]{26}$/;

type ULID = string & {readonly brand: unique symbol};

/**
 * Validate that a provided value is a valid ulid
 *
 * @param {unknown} val - Value to verify
 */
function vUlid (val: unknown): val is ULID {
    return typeof val === 'string' && RGX.test(val);
}

export {vUlid, vUlid as default};
