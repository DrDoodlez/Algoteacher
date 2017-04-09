(function () {
    "use strict";


    var rpn = {
        _precedence: { "√": 3, "%": 3, "!": 3, "^": 3, "/": 2, "*": 2, "-": 1, "+": 1, "#": 0 },

        /**
         * operations
         * @private
         */
        _operation: {
            "+": (a, b) => (+a) + (+b),
            "-": (a, b) => (+a) - (+b),
            "*": (a, b) => (+a) * (+b),
            "/": (a, b) => (+a) / (+b),
            "^": (x, n) => Math.pow(+x, +n),
            "!": function(n) {
                for (var i = 1, r = 1; i <= +n; i++) {
                    r = r * i;
                }
                return (+n < 0) ? NaN : r;
            },
            "%": n => +n / 100,
            "√": n => Math.sqrt(+n)
        },

        /**
         * split expression to array
         * @private
         * @param exp - infix expression
         * @returns {Array|null}
         */
        _splitExp: function(exp) {
            exp = exp.replace(/[a-zA-Z]/g, "").replace(/([\d%!])\-(\d√)/g, "$1 - $2").replace(/([+\-\*\/^])\-(\d)/g, "$1 -$2");
            return (/^[+*\/!^%]|\d\(|[\d\)]√|%[\d\(]|![\d\(]|%%|[+\-*\/^]{2,}|[+\-*\/√^]$/.test(exp)) ?
                null : exp.match(/(-?(?:\d+\.?\d*|-?\.\d*))|[()+\-*\/√!^%]/gi);
        },

        /**
         * check character, is or not a operator
         * @private
         * @param char - character
         * @returns {boolean}
         */
        _isOperator: function(char) {
            return /^[√%!^\/\*\-\+#]$/.test(char);
        },

        /**
         * check character, is or not a unary operator
         * @private
         * @param char - character
         * @returns {boolean}
         */
        _isUnaryOperator: function(char) {
            return /^[√%!]$/.test(char);
        },

        /**
         * check character, is or not a bracket
         * @private
         * @param char - character
         * @returns {boolean}
         */
        _isBrackets: function(char) {
            return /^[\(\)]$/.test(char);
        },

        /**
         * check string, is or not a number
         * @private
         * @param str - character
         * @returns {boolean}
         */
        _isNumber: function(str) {
            return /^-?\d+\.\d+$|^-?\d+$/.test(str);
        },

        /**
         * transfer infix expression to reverse polish notation
         * @param exp - infix expression
         * @returns {string|null}
         */
        infix2rpn: function(exp) {
            var arrExp = rpn._splitExp(exp),
                expStack = [], opStack = [], opItem, stackItem;
            if (!arrExp) {
                return null;
            }
            arrExp = arrExp.concat("#");
            for (var looper = 0; looper < arrExp.length; looper++) {
                opItem = arrExp[looper];

                if (rpn._isNumber(opItem)) {
                    expStack.push(opItem);
                } else if (rpn._isOperator(opItem)) {
                    while (opStack.length) {
                        stackItem = opStack.pop();
                        if ((opItem === "√" && stackItem === "√" && rpn._precedence[stackItem] > rpn._precedence[opItem]) ||
                            ((opItem !== "√" || stackItem !== "√") && rpn._precedence[stackItem] >= rpn._precedence[opItem])) {
                            expStack.push(stackItem);
                        } else {
                            opStack.push(stackItem);
                            break;
                        }
                    }
                    opStack.push(opItem);
                } else if (rpn._isBrackets(opItem)) {
                    if (opItem === "(") {
                        opStack.push(opItem);
                    } else {
                        while (opStack.length) {
                            stackItem = opStack.pop();
                            if (stackItem !== "(") {
                                expStack.push(stackItem);
                            } else {
                                break;
                            }
                        }
                    }
                }
            }
            return expStack.length ? expStack.join(" ") : null;
        },


        /**
         * transfer infix expression to reverse polish notation
         * @param exp - infix expression
         * @returns {string|null}
         */
        exp2rpnWithIds: function(exp) {
            var arrExp = rpn._splitExp(exp),
                expStack = [], opStack = [], opItem, stackItem, mapitem;
            if (!arrExp) {
                return null;
            }
            arrExp = arrExp.concat("#");
            for (var looper = 0; looper < arrExp.length; looper++) {
                opItem = arrExp[looper];
                var tokenidmap = { token: opItem, id: looper };
                if (rpn._isNumber(opItem)) {
                    //expStack.push(opItem);
                    expStack.push(tokenidmap);
                } else if (rpn._isOperator(opItem)) {
                    while (opStack.length) {
                        mapitem = opStack.pop();
                        stackItem = mapitem.token;
                        if ((opItem === "√" && stackItem === "√" && rpn._precedence[stackItem] > rpn._precedence[opItem]) ||
                            ((opItem !== "√" || stackItem !== "√") && rpn._precedence[stackItem] >= rpn._precedence[opItem])) {
                            //expStack.push(stackItem);
                            expStack.push(mapitem);
                        } else {
                            //opStack.push(stackItem);
                            opStack.push(mapitem);
                            break;
                        }
                    }
                    //opStack.push(opItem);
                    opStack.push(tokenidmap);
                } else if (rpn._isBrackets(opItem)) {
                    if (opItem === "(") {
                        // opStack.push(opItem);
                        opStack.push(tokenidmap);
                    } else {
                        while (opStack.length) {
                            //stackItem = opStack.pop();
                            mapitem = opStack.pop();
                            stackItem = mapitem.token;
                            if (stackItem !== "(") {
                                //expStack.push(stackItem);
                                expStack.push(mapitem);
                            } else {
                                break;
                            }
                        }
                    }
                }
            }
            let tokens = expStack.map(el => {
                return el.token;
            });
            return { string: tokens.length ? tokens.join(" ") : null, map: expStack };
        },

        /**
         * calculate reverse polish notation
         * @param exp - reverse polish notation
         * @returns {number}
         */
        rpnCalculate: function(exp) {
            var arrExp = exp.split(" "), calcStack = [], opItem, param1, param2;

            for (var looper = 0; looper < arrExp.length; looper++) {
                opItem = arrExp[looper];
                if (rpn._isNumber(opItem)) {
                    calcStack.push(opItem);
                } else if (rpn._isOperator(opItem)) {
                    if (rpn._isUnaryOperator(opItem)) {
                        calcStack.push(rpn._operation[opItem](calcStack.pop()));
                    } else {
                        param2 = calcStack.pop();
                        param1 = calcStack.pop();
                        calcStack.push(rpn._operation[opItem](param1, param2));
                    }
                }
            }
            return +calcStack.pop().toFixed(3);
        },

        /**
         * calculate expression
         * @param exp - expression string
         * @returns {number|null}
         */
        calculate: function(exp) {
            return rpn.rpnCalculate(rpn.infix2rpn(exp));
        }

    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = rpn;
    }

    if (typeof window !== "undefined") {
        window.rpn = rpn;
    }
}());
