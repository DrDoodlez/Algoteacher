define([
    "Backbone",
    "lodash",
    "jQuery",
    "drop",
    "ExpressionGenerator",
    "rpnBuilder",
    "rpn",
    "mathIt",
    "knockout",
    "text!./../templates/mathTemplate.html"
], function(
    Backbone,
    _,
    $,
    drop,
    expressionGenerator,
    rpnBuilder,
    rpn,
    mathIt,
    ko,
    MathTemplate
) {
    var popupContent = {
        insertValue: "<div><div class='question-input_attention' hidden = true> Неправильно! </div>" +
                        "<div class='question-input_text'> Введи результат операции </div>" +
                        "<input type = 'text' class = 'question-input' id = 'question-input_input' /></div>",
        wrongNode: "Данную операцию нельзя выполнить в данный момент, выбери другую!",
        leaf: "Это операнд, выбери операцию"
    };

    var DEFAULT_OPTIONS = {
        position: "bottom center",
        remove: true,
        classes: "drop-theme-arrows"
    };

    var operations = ["+", "-", "*", "/"];

    var MainView = Backbone.View.extend({
        initialize: function() {
            this.subviews = [];
        },
        template: _.template(MathTemplate),

        render: function() {
            this.$el.html(this.template());
            this.changeNode.bind(this);

            this.$el.find("#expression").hide();
            this.$el.find("#in").on("click", this._newExpression.bind(this));

            return this;
        },

        _newExpression: function() {
            var mathResultString = "";
            var self = this;
            this.expression = expressionGenerator.generate(4);
            $(".result-expression").empty();
            var $expression = this.$el.find("#expression");
            $expression.show();
            $expression.text(_.join(this.expression, " "));
            var inputValue = $expression.text();
            inputValue = inputValue.replace(/ /g, " ");
            //var inputArr = _.toArray(inputValue);

            this.createExpressionInDOM($expression);

            this.$el.find(".lettering-item").on("click", this._openPopup.bind(this));

            mathResultString = inputValue;

            //var RPN = new rpnBuilder(inputValue);

            // Вариант с дефолтной функцией, только выражение без id
            //var rpnString = rpn.infix2rpn(inputValue);

            var rpnResult =  rpn.exp2rpnWithIds(inputValue);
            var rpnString = rpnResult.string;

            //var RPNObjectCollection = RPN.getTokensWithIds();
            var rpnObjectCollection =  rpnResult.map;

            this.nodes = new Map();
            this.createGraphFromRPN(rpnObjectCollection);
            //createGraphFromRPN(RPNObjectCollection);
            var resDiv = this.$el.find("#res");

            //var resString = RPN.getString();
            resDiv.text(rpnString);
            console.log(rpnString);
            this.$el.find("#math").text(mathResultString);
            //initGraph();
        },

        // Добавить отдельную логику для генерации контента попапа в случае неправильной операции (нужно объяснять почему)
        _openPopup: function(event) {
            if (this.activePopup) {
                //$(".drop").remove();
                this.activePopup.close();
                this.activePopup.remove();
                this.activePopup = null;
                return;
            }
            // id - номер В обратной польской нотации
            var id = event.target.dataset.id;

            var content;
            var node = this.nodes.get(+id);
            if (!node) {
                content = popupContent.wrongNode;
            } else if (this.isCalculatable(node)) {
                //TODO: Можно добавить оброботчики правильно и не правильно ответа.
                content = popupContent.insertValue;
            } else if (node.leaf) {
                content = popupContent.leaf;
            } else {
                content = popupContent.wrongNode;
            };
            this.activePopup = this._createPopup(content, event.target);
            this.activePopup.open();
            var input = $(this.activePopup.drop).find("input");
            var attentionText = $(this.activePopup.drop).find(".question-input_attention");
            var self = this;
            input.on("change", e => {
                var curValue = e.currentTarget.value;
                //TODO: Можно использовать метод из rpn Calculate
                if (self._campare(curValue, self.calculateNode(node))) {
                    //TODO: ПРОВЕРИТЬ КАК РАБОТАЕТ ДЛЯ ПРИМЕРОВ
                    self.changeNode(node, curValue);
                    self.activePopup.close();
                    self.activePopup.remove();
                    self.activePopup = null;
                } else {
                    attentionText.show();
                    input.val("");
                }
            });
        },

        //FOR INT and Float value
        _campare: function(a, b) {
            const EPS = 0.1;
            if (Math.abs(Math.abs(a) - Math.abs(b)) < EPS) {
                return true;
            }
            return false;
        },

        createExpressionInDOM: function($expression) {
            $expression.lettering("words");

            //TODO: добавить обработчики... !!!!
            // обращение через #word + i;
            // + можно повесить на + - и тд обработку по  наведению\нажатию.
            // можно пройти по всем элементам в $expression добавлять обработчик в зависимости от элемента


        },

        createGraphFromRPN: function(rpnWithIds) {
            var self = this;
            // var rpn = [];
            // _.each(rpnWithIds, e => {
            //     rpn.push(e.token);
            // })
            var tokensAndId = _.reverse(rpnWithIds);
            var lastId = 0;
            _.each(tokensAndId, t => {
                var node = { id: lastId, origId: t.id ,label: t.token,
                    childs: [], leaf: !operations.find(op => op == t.token) };
                lastId++;
                self.nodes.set(t.id, node);
            });

            var stack = [];
            var curHead;
            //_.each(self.nodes.values(), node => {
            self.nodes.forEach((node, id) => {
                curHead = _.last(stack);
                //console.log(stack);
                if (curHead) {
                    //console.log("curHead: " + curHead.label);
                    curHead.childs.unshift(node);
                    //console.log("push childs: " + node.label);
                    if (curHead.childs.length == 2) {
                        var t = stack.pop();
                        //console.log(stack);
                        //console.log("pop: " + t.label);
                    }
                }
                if (!node.leaf) {
                    stack.push(node);
                    //console.log(stack);
                    //console.log("push: " + node.label);
                }
            });
        },

        calculateNode: function(node) {
            //var node = nodes[nodeId];
            //if (isCalculatable(node)) {
            return mathIt[node.label](node.childs[0].label, node.childs[1].label);
        },

        isCalculatable: function(node) {
            // only binar operation
            if (node.childs.length == 2) {
                return node.childs[0].leaf && node.childs[1].leaf;
            }
            return false;
        },

        changeNode: function(node, label) {
            node.label = label;
            var newMath = this.expression;
            var lastMath = this.expression;
            const text2 = _.join(lastMath, " ") + " = ";
            var resultExpression = $(".result-expression")[0];
            // if (resultExpression.children.length == 0) {
            //     const text = _.join(newMath, " ");
            //     resultExpression.append($("<div>" + text + "</div>"));
            // }
            console.log(newMath);
            newMath[node.origId] = label;
            console.log(node.origId);

            var nodeRoot = $("#word" + node.origId);
            nodeRoot.text(node.label);

            // удаление элементов из узла (грф вид)
            var child1ID = node.childs[0].origId;
            var child2ID = node.childs[1].origId;
            console.log(node.childs[0].origId);
            console.log(node.childs[1].origId);
            newMath[child1ID] = "";
            newMath[child2ID] = "";
            var left;
            var right;
            for (var i = child1ID; i >= 0; i--) {
                if (newMath[i] != "") {
                    left = i;
                    break;
                }
            }
            for (var i = child2ID; i <= newMath.length; i++) {
                if (newMath[i] != "") {
                    right = i;
                    break;
                }
            }
            if (newMath[left] == "(" && newMath[right] == ")") {
                newMath[left] = "";
                newMath[right] = "";
                this._removeWordById(left);
                this._removeWordById(right);
            }

            this._removeWordById(child1ID);
            this._removeWordById(child2ID);


            delete node.childs[0];
            delete node.childs[1];
            node.childs = [];
            node.leaf = true;
            console.log(newMath);
            var $math = $("#math");
            var newText = $math.text() + " = " + _.join(newMath, " ");
            $(resultExpression).append($("<div>" + text2 + "</div>"));
            $math.text(newText);
        },

        _removeWordById: function(id) {
            $("#word" + id).remove();
        },

        //TODO: добавить popup + обработчики нажатия и ввода ответа с использованием этих методов

        ////////////////////////////////////////  POPUP ------------ START ////////////////////////////////////////////////////

        _createPopup: function(content, target, options) {
            if (content && target) {
                options = options || {};
                options.content = content;
                options.target = target;
                options = _.extend(_.clone(DEFAULT_OPTIONS), options);

                // Create Tether element
                var popover = new drop(options);
                return popover;
            } else {
                console.warn("Tried to open popover with insufficient parameters.");
            }
        }

      ///////////////////////////////////////  POPUP ------------ END ////////////////////////////////////////////////////

    });

    return MainView;
});
