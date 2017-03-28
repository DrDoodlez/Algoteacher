define([
    "Backbone",
    "lodash",
    "jQuery",
    "ExpressionGenerator",
    "rpnBuilder",
    "rpn",
    "mathIt",
    "knockout",
    "./HeaderView",
    "./FooterView"
], function(
    Backbone,
    _,
    $,
    expressionGenerator,
    rpnBuilder,
    rpn,
    mathIt,
    ko,
    HeaderView,
    FooterView
) {
    var MainView = Backbone.View.extend({
        initialize: function() {
            this.subviews = [];
        },

        render: function() {
            var headerView = new HeaderView();
            this.subviews.push(headerView);
            this.$el.append(headerView.render().el);
            // var footerView = new FooterView();
            // this.subviews.push(footerView);
            // this.$el.append(footerView.render().el);
            this.nodes = [];
            //var oldMath = "";
            var mathResultString = "";
            var self = this;
            this.$el.find("#in").on("click", function() {
                // TODO: need validation for input value
                var expression = expressionGenerator.generate(4);
                var $expression = self.$el.find("#expression");
                $expression.text(_.join(expression, " "));
                var inputValue = $expression.text();
                inputValue = inputValue.replace(/ /g, " ");
                var inputArr = _.toArray(inputValue);

                self.createExpressionInDOM($expression);

                mathResultString = inputValue;

                //var RPN = new rpnBuilder(inputValue);

                // Вариант с дефолтной функцией, только выражение без id
                //var rpnString = rpn.infix2rpn(inputValue);

                var rpnResult =  rpn.exp2rpnWithIds(inputValue);
                var rpnString = rpnResult.string;

                //var RPNObjectCollection = RPN.getTokensWithIds();
                var rpnObjectCollection =  rpnResult.map;


                self.createGraphFromRPN(rpnObjectCollection);
                //createGraphFromRPN(RPNObjectCollection);
                var resDiv = self.$el.find("#res");

                //var resString = RPN.getString();
                resDiv.text(rpnString);
                console.log(rpnString);
                self.$el.find("#math").text(mathResultString);
                //initGraph();
            });
            return this;
        },

        createExpressionInDOM: function($expression) {
            $expression.lettering("words");
            //TODO: добавить обработчики... !!!!
            // обращение через #word + i;
            // + можно повесить на + - и тд обработку по  наведению\нажатию.
            // можно пройти по всем элементам в $expression добавлять обработчик в зависимости от элемента
        },

        createGraphFromRPN: function(rpnWithIds) {
            var operations = ["+", "-", "*", "/", "^"];
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
                self.nodes.push(node);
            });

            var stack = [];
            var curHead;
            _.each(self.nodes, node => {
                curHead = _.last(stack);
                console.log(stack);
                if (curHead) {
                    console.log("curHead: " + curHead.label);
                    curHead.childs.unshift(node);
                    console.log("push childs: " + node.label);
                    if (curHead.childs.length == 2) {
                        var t = stack.pop();
                        console.log(stack);
                        console.log("pop: " + t.label);
                    }
                }
                if (!node.leaf) {
                    stack.push(node);
                    console.log(stack);
                    console.log("push: " + node.label);
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

        changeNode: function(node, expressionArray, label) {
            node.label = label;
            var newMath = expressionArray;
            console.log(newMath);
            newMath[node.origId] = label;
            console.log(node.origId);

            var nodeRoot = $("#word" + node.id);
            nodeRoot.text(node.label);

            // удаление элементов из узла (грф вид)
            var child1ID = node.childs[0].id;
            var child2ID = node.childs[1].id;
            console.log(node.childs[0].origId);
            console.log(node.childs[1].origId);
            newMath[node.childs[0].origId] = " ";
            newMath[node.childs[1].origId] = " ";

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
            $math.text(newText);
        },

        _removeWordById: function(id) {
            $("#word" + id).remove();
        }

        //TODO: добавить popup + обработчики нажатия и ввода ответа с использованием этих методов

    });

    return MainView;
});
