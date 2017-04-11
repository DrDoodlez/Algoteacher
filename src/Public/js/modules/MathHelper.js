define([
    "jQuery",
    "lodash",
    "mathIt"
], function(
    $,
    _,
    mathIt
) {
    "use strict";

    class MathHelper {
        constructor() {

        }
        //FOR INT and Float value
        campare(a, b) {
            const EPS = 0.1;
            if (Math.abs(Math.abs(a) - Math.abs(b)) < EPS) {
                return true;
            }
            return false;
        }
    }

    return MathHelper;
});
