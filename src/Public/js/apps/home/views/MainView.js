define([
    "Backbone",
    "lodash",
    "ExpressionGenerator",
    "rpnBuilder",
    "./HeaderView",
    "./FooterView"
], function(
    Backbone,
    _,
    expressionGenerator,
    rpnBuilder,
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
            var nodes = [];
            var oldMath = "";
            var mathResultString = "";
            var self = this;
            this.$el.find("#in").on("click", function() {
                // TODO: need validation for input value
                var expression = expressionGenerator.generate(4);
                var $expression = self.$el.find("#expression");
                $expression.text(_.join(expression, " "));
                var inputValue = $expression.text();
                inputValue = inputValue.replace(/ /g, "");
                oldMath = _.toArray(inputValue);
                mathResultString = inputValue;
                var RPN = new rpnBuilder(inputValue);
                var RPNObjectCollection = RPN.getTokensWithIds();
                //createGraphFromRPN(RPNObjectCollection);
                var resDiv = self.$el.find("#res");

                // var rpn = [];
                // _.each(RPNObjectCollection, el => {
                //     rpn.push(el.token);
                // });
                var resString = RPN.getString();
                resDiv.text(resString);
                console.log(resString);
                self.$el.find("#math").text(mathResultString);
                //initGraph();
            });
            return this;
        }
    });

    return MainView;
});
