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
        // отладить работу с ^ и 0
        var defaultOperations = ["+", "-", "*", "/"];
        var defaultMaxNumber = 9;
        var defaultMinNumber = 1;
        var openBrakets = 0;
        // Можно задать частоту
        var brakets = [0, 0, 1];

        function generateExpression(numberOfOperations, max, min, operations) {
            var expression = [];
            var operations = operations || defaultOperations;
            var minNumber = min || defaultMinNumber;
            var maxNumber = max || defaultMaxNumber;
            openBrakets = 0;
            var number = getRandomNumber(minNumber, maxNumber);
            var braket = getOpenBraket();
            expression.push(braket);
            expression.push(number);

            for (var i = 1; i <= numberOfOperations; i++) {
                braket = "";
                // Выбор операции из массива
                var operation = getRandomFromArray(operations);
                expression.push(operation);
                // Выбор операнда
                number = getRandomNumber(minNumber, maxNumber);
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
            var rand = Math.floor(Math.random() * arr.length);
            return arr[rand];
        }

        function getRandomNumber(min, max) {
            return min + Math.floor(Math.random() * (max + 1 - min));
        }

        function getRandomFloatNumber(min, max) {
            return Math.random() * (max - min) + min;
        }

        // TODO: проверить как будет работать
        function getRandom2Number(min, max) {
            return getRandomNumber(min, max).toString(2);
        }

        // TODO: проверить как будет работать
        function getRandom8Number(min, max) {
            return getRandomNumber(min, max).toString(8);
        }

        // TODO: проверить как будет работать
        function getRandom16Number(min, max) {
            return getRandomNumber(min, max).toString(16);
        }

        function getRandomDividedNumber(min, max){
            var a  = getRandomNumber(min, max);
            var b = 0;
            while (b = 0) {
                b  = getRandomNumber(min, max);
            }
            let tex = "\frac{" + a + "}{" + b + "}";
            return { a: a, b: b, string: a + "/" + b , tex: tex };
        }


        function getOpenBraket() {
            var res = getBraket("(");
            if (!!res) {
                openBrakets++;
            }
            return res;
        }

        function getCloseBraket() {
            var res = getBraket(")");
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
