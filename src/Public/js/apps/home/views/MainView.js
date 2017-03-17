define([
    "Backbone",
    "lodash",
    "jQuery",
    "ExpressionGenerator",
    "rpnBuilder",
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
            return this;
        }
    });

    return MainView;
});
