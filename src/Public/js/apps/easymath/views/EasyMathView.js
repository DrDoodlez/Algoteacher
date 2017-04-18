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
    const defaultConfig = {
        operations: ["+", "-", "*", "/"],
        inputMode: "Random", // Random, Manual
        type: "int", // int, double, x8, x2,
        numberOfOperations: 4,
        max: 9,
        min: 1
    };

    // const manualConfig = {
    //     inputMode: "Manual"
    // };
    //
    // const x2Config = {
    //     operations: ["+", "-", "*"],
    //     inputMode: "Random",
    //     numberOfOperations: 2,
    //     type: "x2", // int, double, x8, x2,
    //     max: 10,
    //     min: 0
    // };

    var MainView = Backbone.View.extend({
        initialize: function() {
            this.subviews = [];
            this.options = {
                mode: "expression",
            };
            this.config = defaultConfig;
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
                view = new ExpressionView(this.config);
            } else if (this.options.mode == "notation") {

            }
            //this.$el.remove();
            this.$el.append(view.render().el);
            this.subviews.push(view);
        }
    });

    return MainView;
});
