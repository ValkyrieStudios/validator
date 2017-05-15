import {isBoolean} from '@valkyriestudios/core-utils/boolean';

export default function vBoolean (val, equals = null) {
    return (isBoolean(val) && (equals !== null))
        ? (!!val === !!equals)
        : isBoolean(val);
}
