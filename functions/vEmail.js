export default function vEmail (val) {
    return val
        ? (/[A-Z0-9._%+-]+\@[A-Z0-9.-]+\.[A-Z]{2,10}/igm.test(val.trim()))
        : false;
}
