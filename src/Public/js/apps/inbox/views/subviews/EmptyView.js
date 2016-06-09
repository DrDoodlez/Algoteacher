define(function (require) {
	var Backbone = require('Backbone');

	var EmptyView = Backbone.View.extend({
		tagName: 'div',

		template: require('hbs!./../../templates/EmptyView'),

		render: function () {
			this.$el.html(this.template({title: this.options.teachSchema.title}));
			return this;
		}
	});

	return EmptyView;
});