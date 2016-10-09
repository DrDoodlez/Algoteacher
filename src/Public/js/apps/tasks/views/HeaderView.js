define([
    "Backbone",
    "Underscore",
    "text!./../templates/HeaderView.html"
], function(
    Backbone,
    _,
    HeaderViewTemplate
) {
    //var MathJax = require('mathjax');

    var HeaderView = Backbone.View.extend({
        template: _.template(HeaderViewTemplate),

        render: function() {
            this.$el.html(this.template({ title: "Formula" }));

            // can be used here :)
            //MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.$el.html()]);
            return this;
        }
    });

    return HeaderView;
});
