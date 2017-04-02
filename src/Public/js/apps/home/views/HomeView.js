define([
    "Backbone",
    "lodash",
    "jQuery",
    "ExpressionGenerator",
    "rpnBuilder",
    "mathIt",
    "text!./../templates/HomeTemplate.html"
], function(
    Backbone,
    _,
    $,
    expressionGenerator,
    rpnBuilder,
    mathIt,
    HomeTemplate
) {
    var MainView = Backbone.View.extend({
        initialize: function() {
            this.subviews = [];
        },
        template: _.template(HomeTemplate),

        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });

    return MainView;
});
