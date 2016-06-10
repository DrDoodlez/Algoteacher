define(function(require) {
	var Backbone = require('Backbone');
	var TaskView = require('./TaskView');

	var TasksView = Backbone.View.extend({
		template: require('hbs!./../../templates/TasksView'),

		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			this.$el.html(this.template());

			var $list = this.$('#task-list');
			this.collection.forEach(function (task) {
				var view = new TaskView({model: task});
				$list.append(view.render().el);
				this.subviews.push(view);
			}, this);

			return this;
		}
	});

	return TasksView;
});