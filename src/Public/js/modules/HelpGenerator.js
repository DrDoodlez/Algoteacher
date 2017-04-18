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
    var priorityTable = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
        "^": 3
    };
    class HelpGenerator {
        constructor(operations) {
            this._operations = operations;
        }

        // выбраны скобки
        brackets() {
            return "Вы выбрали скобку, выберите операцию";
        }

        // есть операция с большим приоритетом
        lowPriority() {
            let str = "Неправильно, есть операция приоритетнее." +
                "Приоритет операций обозначен цифрами в пордке возрастания: ";
            str += _.join(_.map(this._operations, op => {
                const prior = _.get(priorityTable, op);
                return "'" + op + "'" + " : " + prior;
            }), " ");
            return str;
        }

        // выбран операнд
        leaf() {
            return "Вы вырали операнд, выберите операцию";
        }

        // wrongAnswer(currentValue, operation, op1, op2, answer) {
        //
        // }
    }

    return HelpGenerator;
});
