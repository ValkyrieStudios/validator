export default function vAlphaNumSpaces (val) {
    return val
        ? /^([a-z0-9\s])+$/igm.test(val)
        : false;
}
