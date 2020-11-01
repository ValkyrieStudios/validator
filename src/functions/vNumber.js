'use strict';

import isNumber         from '@valkyriestudios/utils/number/is';
import isNumericalNaN   from '@valkyriestudios/utils/number/isNumericalNaN';

export default function vNumber (val) {
    return isNumber(val) && !isNumericalNaN(val);
}
