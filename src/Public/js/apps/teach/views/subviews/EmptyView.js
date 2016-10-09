define([
    "Backbone",
    "text!./../../templates/EmptyView.html"
], function(
    Backbone,
    EmptyViewTemplate
) {

    var EmptyView = Backbone.View.extend({
        tagName: "div",

        template: EmptyViewTemplate,

        render: function() {
            this.$el.html(this.template({ title: this.options.teachSchema.title }));
            return this;
        }
    });

    return EmptyView;
});
