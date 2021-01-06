'use strict';

import isString from '@valkyriestudios/utils/string/is';

export default function vUrl (data) {
    if (!isString(data)) return false;

    return !!(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?(\?)?([^\s]+)?$/igm.test(data.trim()));
}
