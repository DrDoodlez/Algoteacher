define(
    "rpnBuilder",
    [
        "lodash",
        "jquery",
    ],
    function(
        _,
        $
    ) {

        var priorityTable = {
            "(": 0,
            ")": 1,
            "+": 2,
            "-": 2,
            "*": 3,
            "/": 3,
            "^": 4
        };

        class rpnBuilder {
            constructor(expression) {
                var tokens = _.split(expression, "");
                var stack = [];
                var result = [];
                this.rpnResultWithIds = [];
                var id = -1;
                _.each(tokens, token => {
                    id++;
                    // число
                    //let number = _.toNumber(token);
                    // если есть приорити, то операция - иначе что-то непонятное.
                    var tokenidmap = { token: token, id: id };
                    let priority = priorityTable[token];
                    if (_.isUndefined(priority)) {
                        result.push(tokenidmap);
                        return;
                    }
                    if (_.isEmpty(stack)) {
                        stack.push(tokenidmap);
                        return;
                    }
                    if (token == "(") {
                        stack.push(tokenidmap);
                        return;
                    }
                    var reversed = _.reverse(_.slice(stack));
                    _.each(reversed, s => {
                        let nextPriority = priorityTable[s.token];
                        if (nextPriority >= priority && token != "(") {
                            stack.pop();
                            result.push(s);
                        }
                        else if (token == ")" && s.token == "(") {
                            stack.pop();
                            return false;
                        } else if (s.token == "(") {
                            return false;
                        }
                    });
                    if (priority > 1) {
                        stack.push(tokenidmap);
                    }
                });
                // В result хранится массив значений с оригинальными id нужно вернуть rpn и массив Id

                var allstacks = [];
                stack = stack.reverse();
                //stackids = stackids.reverse();
                _.each(stack, s => {
                    allstacks.push(s);
                });
                this.rpnResultWithIds = _.concat(result, allstacks);
                // result = rpnResultWithIds.token;
                // var resString = _.join(result, " ");
                //return rpnResultWithIds;
            }

            getString() {
                var tokens = _.map(this.rpnResultWithIds, "token");
                return _.join(tokens, " ");
            }

            getTokensWithIds() {
                return this.rpnResultWithIds;
            }
        }

        return rpnBuilder;
    });
