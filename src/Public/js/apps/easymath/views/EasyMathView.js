define([
    "Backbone",
    "lodash",
    "jQuery",
    "ExpressionGenerator",
    "rpnBuilder",
    "rpn",
    "mathIt",
    "Statistic",
    "PopupManager",
    "text!./../templates/mathTemplate.html"
], function(
    Backbone,
    _,
    $,
    expressionGenerator,
    rpnBuilder,
    rpn,
    mathIt,
    Statistic,
    PopupManager,
    MathTemplate
) {
    var popupContent = {
        insertValue: "<div><div class='question-input_attention' hidden = true> Неправильно! </div>" +
                        "<div class='question-input_text'> Введи результат операции </div>" +
                        "<input type = 'text' class = 'question-input' id = 'question-input_input' /></div>",
        wrongNode: "Данную операцию нельзя выполнить в данный момент, выбери другую!",
        leaf: "Это операнд, выбери операцию"
    };

    var operations = ["+", "-", "*", "/"];

    var MainView = Backbone.View.extend({
        initialize: function() {
            this.subviews = [];

            //this.user = { goodAnswer: 0, wrongAnswer: 0 , currentWrongAnswers: 0 };
            this.statistic = new Statistic();
            this.popupManager = new PopupManager();

        },
        template: _.template(MathTemplate),

        render: function() {
            this.$el.html(this.template());
            this.changeNode.bind(this);

            this.$el.find("#expression").hide();
            this._updateDebagStatistic();
            this.$el.find("#in").on("click", this._newExpression.bind(this));

            return this;
        },

        _newExpression: function() {
            var mathResultString = "";
            this.statistic.newQuestion();
            this._updateDebagStatistic();
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
            event.stopPropagation();
            if (this.popupManager.isOpen()) {
                this.popupManager.closePopup();
                return;
            };

            var id = event.target.dataset.id;
            var node = this.nodes.get(+id);

            // POPUP content generation and change statistic!!
            var content;
            if (!node) {
                content = popupContent.wrongNode;
                this.statistic.addWrongAnswer();
            } else if (this.isCalculatable(node)) {
                //TODO: Можно добавить оброботчики правильно и не правильно ответа.
                content = popupContent.insertValue;
            } else if (node.leaf) {
                content = popupContent.leaf;
                this.statistic.addWrongAnswer();
            } else {
                content = popupContent.wrongNode;
                this.statistic.addWrongAnswer();
            };

            this._updateDebagStatistic();

            // Open popup!
            this.popupManager.openPopup(event.target, content);

            //TODO:Можно ещё упростить Check answer from popup
            var input = this.popupManager.getElement().find("input");
            // TODO: Расширить текс - (генерировать контент в отдельном модуле?)!!!
            var attentionText = this.popupManager.getElement().find(".question-input_attention");
            var self = this;
            input.on("change", e => {
                var curValue = e.currentTarget.value;
                //TODO: Можно использовать метод из rpn Calculate
                if (self._campare(curValue, self.calculateNode(node))) {
                    //TODO: ПРОВЕРИТЬ КАК РАБОТАЕТ ДЛЯ ПРИМЕРОВ
                    self.changeNode(node, curValue);
                    self.popupManager.closePopup();
                    self.statistic.addGoodAnswer();
                } else {
                    self.statistic.addWrongAnswer();
                    attentionText.show();
                    input.val("");
                }
                self._updateDebagStatistic();
            });
        },

        _updateDebagStatistic: function() {
            this.$el.find("#goodAnswer").text(this.statistic.goodAnswer);
            this.$el.find("#wrongAnswer").text(this.statistic.wrongAnswer);
            this.$el.find("#currentWrongAnswers").text(this.statistic.currentWrongAnswers);
            this.$el.find("#questionNumber").text(this.statistic.questionNumber);
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

        //TODO: Можно вынести nodes и их построение в отдельный модуль!
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
                        stack.pop();
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

        _

      ///////////////////////////////////////  POPUP ------------ END ////////////////////////////////////////////////////

    });

    return MainView;
});
