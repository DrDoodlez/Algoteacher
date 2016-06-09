define(function(require) {
	var Backbone = require('Backbone');

	var TasksView = require('./subviews/TasksView');

	var MainView = Backbone.View.extend({
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			var tasksView = new TasksView({collection: this.collection});
			this.$el.append(tasksView.render().el);
			this.subviews.push(tasksView);

			return this;
		}
	});

	return MainView;
});