define(
    "ExpressionGenerator",
    [
        "lodash",
        "jQuery",
    ],
    function(
        _,
        $
    ) {
        class Number {
            constructor(minNumber, maxNumber) {
                this.min = minNumber;
                this.max = maxNumber;
            }

            getRandom() {}
        }
        class intNumber extends Number {
            getRandom() {
                return this.min + Math.floor(Math.random() * (this.max + 1 - this.min));
            }
        }
        class floatNumber extends Number {
            getRandom() {
                return Math.random() * (this.max - this.min) + this.min;
            }
        }
        class x2Number extends intNumber {
            getRandom() {
                return super.getRandom().toString(2);
            }
        }
        class x8Number extends intNumber {
            getRandom() {
                return super.getRandom().toString(8);
            }
        }
        class x16Number extends intNumber {
            getRandom() {
                return super.getRandom().toString(16);
            }
        }
        class divadedNumber extends intNumber {
            getRandom() {
                const a  = super.getRandom();
                let b = 0;
                while (b = 0) {
                    b  = super.getRandom();
                }
                const tex = "\frac{" + a + "}{" + b + "}";
                return { a: a, b: b, string: a + "/" + b , tex: tex };
            }
        }

        const types = {
            "int" : intNumber,
            "float" : floatNumber,
            "x2" : x2Number,
            "x8" : x8Number,
            "x16" : x16Number,
            "div" : divadedNumber
        };
        // отладить работу с ^ и 0
        const defaultOperations = ["+", "-", "*", "/"];
        const defaultMaxNumber = 9;
        const defaultMinNumber = 1;
        const openBrakets = 0;
        const defaultType = "int";
        // Можно задать частоту
        const brakets = [0, 0, 1];

        function generateExpression(numberOfOperations, type, max, min, operations) {
            let expression = [];
            const operations = operations || defaultOperations;
            const minNumber = min || defaultMinNumber;
            const maxNumber = max || defaultMaxNumber;
            const type = type || defaultType;
            openBrakets = 0;
            const currentType = types[type] || intNumber;
            const currentNumberType = new currentType(minNumber, maxNumber);
            let number = currentNumberType.getRandom();
            let braket = getOpenBraket();
            expression.push(braket);
            expression.push(number);

            for (var i = 1; i <= numberOfOperations; i++) {
                braket = "";
                // Выбор операции из массива
                let operation = getRandomFromArray(operations);
                expression.push(operation);
                // Выбор операнда
                number = currentNumberType.getRandom();
                // Расставить скобку
                if (openBrakets && numberOfOperations - i <= openBrakets) {
                    braket = ")";
                    openBrakets--;
                }
                if (!braket && openBrakets) {
                    braket = getCloseBraket();
                }
                if (!braket && openBrakets < numberOfOperations - i) {
                    braket = getOpenBraket();
                }
                if (braket == "(") {
                    expression.push(braket);
                }
                expression.push(number);
                if (braket == ")") {
                    expression.push(braket);
                }
            }
            if (expression[0] == "") {
                expression.shift();
            }
            return expression;
        }

        function getRandomFromArray(arr) {
            const rand = Math.floor(Math.random() * arr.length);
            return arr[rand];
        }

        function getOpenBraket() {
            const res = getBraket("(");
            if (!!res) {
                openBrakets++;
            }
            return res;
        }

        function getCloseBraket() {
            const res = getBraket(")");
            if (!!res) {
                openBrakets--;
            }
            return res;
        }

        function getBraket(braketSymbol) {
            return getRandomFromArray(brakets) ? braketSymbol : "";
        }

        return {
            generate: generateExpression
        };
    });
