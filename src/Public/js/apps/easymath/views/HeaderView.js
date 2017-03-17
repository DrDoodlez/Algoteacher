define([
    "Backbone",
    "Underscore",
    "text!./../templates/HeaderView.html"
], function(
    Backbone,
    _,
    HeaderViewTemplate
) {
    var HeaderView = Backbone.View.extend({
        template: _.template(HeaderViewTemplate),
        render: function() {
            this.$el.html(this.template());
            // can be used here :)
            //MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.$el.html()]);
            return this;
        }
    });
    return HeaderView;
});
