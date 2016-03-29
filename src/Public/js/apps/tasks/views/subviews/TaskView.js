define(function (require) {
	var Backbone = require('Backbone');

	var EmailView = Backbone.View.extend({
        tagName: "a",

        className: "list-group-item",

        attributes: {
            href: "/inbox"
        },

		//template: require('hbs!./../../templates/TaskView'),

		render: function () {
            var model = this.model.toJSON();
			this.$el.html(model.label);
			return this;
		}
	});

	return EmailView;
});