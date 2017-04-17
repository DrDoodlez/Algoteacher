define([
    "Backbone",
    "lodash",
    "jQuery",
    "./subviews/ExpressionView",
    "./subviews/NotationsView",
    "text!./../templates/configurationTemplate.html"
], function(
    Backbone,
    _,
    $,
    ExpressionView,
    NotationsView,
    ConfTemplate
) {

    var MainView = Backbone.View.extend({
        initialize: function() {
            this.subviews = [];
            this.options = {
                operations: ["+", "-", "*", "/"],
                mode: "expression"
            };
            //this.user = { goodAnswer: 0, wrongAnswer: 0 , currentWrongAnswers: 0 };
        },
        template: _.template(ConfTemplate),

        render: function() {
            this.$el.html(this.template());
            // template
            this.openView();
            return this;
        },

        openView: function() {
            let view;
            if (this.options.mode == "expression") {
                view = new ExpressionView(this.options.operations);
            } else if (this.options.mode == "notation") {

            }
            //this.$el.remove();
            this.$el.append(view.render().el);
            this.subviews.push(view);
        }
    });

    return MainView;
});
