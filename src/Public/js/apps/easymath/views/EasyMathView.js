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
            // var footerView = new FooterView();
            // this.subviews.push(footerView);
            // this.$el.append(footerView.render().el);
            //var oldMath = "";
            var mathResultString = "";
            var self = this;
            this.$el.find("#in").on("click", function() {
                // TODO: need validation for input value
                self.expression = expressionGenerator.generate(4);
                $(".result-expression").empty();
                var $expression = self.$el.find("#expression");
                $expression.text(_.join(self.expression, " "));
                var inputValue = $expression.text();
                inputValue = inputValue.replace(/ /g, " ");
                //var inputArr = _.toArray(inputValue);

                self.createExpressionInDOM($expression);

                self.$el.find(".lettering-item").on("click", event => {
                    //event.preventDefault();
                    if (self.activePopup) {
                        //$(".drop").remove();
                        self.activePopup.close();
                        self.activePopup.remove();
                        self.activePopup = null;
                        return;
                    }
                    // id - номер В обратной польской нотации
                    var id = event.target.dataset.id;

                    var content;
                    var node = self.nodes.get(+id);
                    if (!node) {
                        content = popupContent.wrongNode;
                    } else if (self.isCalculatable(node)) {
                        //TODO: Можно добавить оброботчики правильно и не правильно ответа.
                        content = popupContent.insertValue;
                    } else if (node.leaf) {
                        content = popupContent.leaf;
                    } else {
                        content = popupContent.wrongNode;
                    };
                    self.activePopup = self._createPopup(content, event.target);
                    self.activePopup.open();
                    var input = $(self.activePopup.drop).find("input");
                    var attentionText = $(self.activePopup.drop).find(".question-input_attention");
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
                });

                mathResultString = inputValue;

                //var RPN = new rpnBuilder(inputValue);

                // Вариант с дефолтной функцией, только выражение без id
                //var rpnString = rpn.infix2rpn(inputValue);

                var rpnResult =  rpn.exp2rpnWithIds(inputValue);
                var rpnString = rpnResult.string;

                //var RPNObjectCollection = RPN.getTokensWithIds();
                var rpnObjectCollection =  rpnResult.map;

                self.nodes = new Map();
                self.createGraphFromRPN(rpnObjectCollection);
                //createGraphFromRPN(RPNObjectCollection);
                var resDiv = self.$el.find("#res");

                //var resString = RPN.getString();
                resDiv.text(rpnString);
                console.log(rpnString);
                self.$el.find("#math").text(mathResultString);
                //initGraph();
            });


            ///  TODO: обработка клика!!!


            return this;
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
            const text2 = _.join(lastMath, " ") + " => ";
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
            if (newMath[child1ID - 1] == "(" && newMath[child2ID + 1] == ")") {
                newMath[child1ID - 1] = "";
                newMath[child2ID + 1] = "";
                this._removeWordById(child1ID - 1);
                this._removeWordById(child2ID + 1);
            }
            // newMath.splice(child1ID, 1);
            // newMath.splice(child2ID, 1);

            // TODO: НАписать удаление слов из дома (ПРОВЕРИТЬ!!!)
            this._removeWordById(child1ID);
            this._removeWordById(child2ID);
            // removeGraphNodeById(child1ID);
            // removeGraphNodeById(child2ID);
            // removeGraphEdgesById(node.id, child1ID, child2ID);

            // // удаление из g:
            // g.nodes().splice(node.childs[0].label, 2);

            delete node.childs[0];
            delete node.childs[1];
            node.childs = [];
            node.leaf = true;
            // Проверить удаление из списка.
            // resize element:
            // var w = nodeRoot.find("text").children()[0].getBBox().width;
            // var el = $(g.node(0).elem)
            // el.children("rect").width(w + 20);
            //}
            console.log(newMath);
            var $math = $("#math");
            var newText = $math.text() + " => " + _.join(newMath, " ");
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
