define([
    "Backbone",
    "Underscore",
    "text!./../templates/FooterView.html"
], function(
	Backbone,
    _,
    FooterViewTemplate
) {
    var FooterView = Backbone.View.extend({
        template: _.template(FooterViewTemplate),
        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });
    return FooterView;
});
