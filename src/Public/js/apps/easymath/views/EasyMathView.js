define([
    "Backbone",
    "lodash",
    "jQuery",
    "ExpressionGenerator",
    "rpnBuilder",
    "rpn",
    "Statistic",
    "PopupManager",
    "MathNodesHelper",
    "text!./../templates/mathTemplate.html"
], function(
    Backbone,
    _,
    $,
    expressionGenerator,
    rpnBuilder,
    rpn,
    Statistic,
    PopupManager,
    MathNodesHelper,
    MathTemplate
) {
    var popupContent = {
        insertValue: "<div><div class='question-input_attention' hidden = true> Неправильно! </div>" +
                        "<div class='question-input_text'> Введи результат операции </div>" +
                        "<input type = 'text' class = 'question-input' id = 'question-input_input' /></div>",
        wrongNode: "Данную операцию нельзя выполнить в данный момент, выбери другую!",
        leaf: "Это операнд, выбери операцию"
    };

    var MainView = Backbone.View.extend({
        initialize: function() {
            this.subviews = [];
            const options = {
                operations: ["+", "-", "*", "/"]
            };
            //this.user = { goodAnswer: 0, wrongAnswer: 0 , currentWrongAnswers: 0 };
            this.statistic = new Statistic();
            this.popupManager = new PopupManager();
            this.mathNodesHalper = new MathNodesHelper(options);

        },
        template: _.template(MathTemplate),

        render: function() {
            this.$el.html(this.template());
            this._update.bind(this);

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
            this.createExpressionInDOM($expression);

            this.$el.find(".lettering-item").on("click", this._openPopup.bind(this));

            mathResultString = inputValue;
            var rpnResult =  rpn.exp2rpnWithIds(inputValue);
            var rpnString = rpnResult.string;
            var rpnObjectCollection =  rpnResult.map;

            this.mathNodesHalper.createGraphFromRPN(rpnObjectCollection);
            var resDiv = this.$el.find("#res");

            //var resString = RPN.getString();
            resDiv.text(rpnString);
            console.log(rpnString);
            this.$el.find("#math").text(mathResultString);
            this._highlightNextOperation();
            //initGraph();
        },

        // Добавить отдельную логику для генерации контента попапа в случае неправильной операции (нужно объяснять почему)
        _openPopup: function(event) {
            event.stopPropagation();
            event.preventDefault();
            if (this.popupManager.isOpen()) {
                this.popupManager.closePopup(event);
                return;
            };

            var id = event.target.dataset.id;
            var node = this.mathNodesHalper.getNodeById(id);

            // POPUP content generation and change statistic!!
            var content;
            if (!node) {
                content = popupContent.wrongNode;
                this.statistic.addWrongAnswer();
            } else if (this.mathNodesHalper.isCalculatable(node)) {
                //TODO: Можно добавить оброботчики правильно и не правильно ответа.
                this._removeHighlight();
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
            input.on("change", this._onSetAnswer.bind(this, node));
            // TODO может не тут нужно добавлять действие
            this._checkUserStat();
        },

        _onSetAnswer: function(node, event) {
            var curValue = event.currentTarget.value;
            //TODO: Можно использовать метод из rpn Calculate
            this.mathNodesHalper.checkNodeValue(node, curValue) ?
                this._goodAnswer(node, curValue) : this._wrongAnswer();
            this._updateDebagStatistic();
        },

        _goodAnswer: function(node, curValue) {
            this._update(node, curValue);
            this.popupManager.closePopup();
            this.statistic.addGoodAnswer();
        },

        _wrongAnswer: function() {
            var attentionText = this.popupManager.getElement().find(".question-input_attention");
            var input = this.popupManager.getElement().find("input");
            this.statistic.addWrongAnswer();
            attentionText.show();
            input.val("");
        },

        _updateDebagStatistic: function() {
            this.$el.find("#goodAnswer").text(this.statistic.goodAnswer);
            this.$el.find("#wrongAnswer").text(this.statistic.wrongAnswer);
            this.$el.find("#currentWrongAnswers").text(this.statistic.currentWrongAnswers);
            this.$el.find("#questionNumber").text(this.statistic.questionNumber);
        },

        createExpressionInDOM: function($expression) {
            $expression.lettering("words");
        },

        _autoCalc: function() {
            var node = this.mathNodesHalper.getNextOperation();
            if (node) {
                var label = this.mathNodesHalper.calculateNode(node);
                this._update(node, label);
            }
        },

        //TODO: нужна логика для действий системы на пользовательскую статистику
        _checkUserStat: function() {
            const wrong = this.statistic.wrongAnswers();
            if (wrong > 3) {
                this._autoCalc();
            } else if (wrong = 2) {
                this._highlightNextOperation();
            }
        },

        _highlightNextOperation: function() {
            var node = this.mathNodesHalper.getNextOperation();
            if (node) {
                const id = node.origId;
                $(this.$el.find(".lettering-item")[id]).addClass("highlight-item");
            }
        },

        _removeHighlight: function() {
            $(".highlight-item").removeClass("highlight-item");
        },

        _update: function(node, label) {
            var oldExpression = this.expression.slice();
            // Получение элеентов для удаления
            var child1ID = node.childs[0].origId;
            var child2ID = node.childs[1].origId;
            var left;
            var right;
            for (var i = child1ID - 1; i >= 0; i--) {
                if (this.expression[i] != "") {
                    left = i;
                    break;
                }
            }
            for (var i = child2ID + 1; i <= this.expression.length; i++) {
                if (this.expression[i] != "") {
                    right = i;
                    break;
                }
            }

            // expression
            this._updateExpression(node.origId, child1ID, child2ID, left, right, label);
            // nodes
            this._updateNodes(node, label);
            // dom
            this._updateNodesInDOM(node.origId, child1ID, child2ID, label);
            // expression result
            this._updateExpressionResult(oldExpression);
            if (this.mathNodesHalper.getNodesNumber() == 1) {
                this._showExpressionAnswer();
            }
        },

        _updateNodesInDOM: function(nodeId, firstChildId, secondChildId, label) {
            // node.origId
            let nodeRoot = $("#word" + nodeId);
            nodeRoot.text(label);
            this._removeWordById(firstChildId);
            this._removeWordById(secondChildId);
        },

        _updateNodes: function(node, label) {
            this.mathNodesHalper.changeLabel(node,label);
            this.mathNodesHalper.toLeaf(node);
        },

        _updateExpression: function(nodeId, firstChildId, secondChildId, left, right ,label) {
            this.expression[nodeId] = label;
            this.expression[firstChildId] = "";
            this.expression[secondChildId] = "";
            if (this.expression[left] == "(" && this.expression[right] == ")") {
                this.expression[left] = "";
                this.expression[right] = "";
                this._removeWordById(left);
                this._removeWordById(right);
            }
        },

        _updateExpressionResult: function(oldExpression) {
            let $math = $("#math");
            let resultExpression = $(".result-expression")[0];
            let newText = $math.text() + " = " + _.join(this.expression, " ");
            const text2 = _.join(oldExpression, " ") + " = ";
            $(resultExpression).append($("<div>" + text2 + "</div>"));
            $math.text(newText);
        },

        _showExpressionAnswer: function() {
            let resultExpression = $(".result-expression")[0];
            resultExpression.lastChild.innerText += " " + _.join(this.expression, "");
            var $expression = this.$el.find("#expression");
            $expression.hide();
            // TODO: ЛИбо генерировать новый пример, либо показывать ообщение и ждать нажатия на кнопку.
            // Либо ввода примера
        },

        _removeWordById: function(id) {
            $("#word" + id).remove();
        }
    });

    return MainView;
});
