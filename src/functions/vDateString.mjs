'use strict';

export default function vDateString (val) {
    return (
        typeof val === 'string' && 
        val.trim().length > 0 && 
        !isNaN(Date.parse(val)) && 
        !isNaN(new Date(val).getTime())
    );
}
