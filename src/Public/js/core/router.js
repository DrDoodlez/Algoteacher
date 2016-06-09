define(function(require) {
	var Backbone = require('Backbone');
	var ViewManager = require('./ViewManager');

	var Router = Backbone.Router.extend({
		initialize: function () {
			this.viewManager = new ViewManager();
		},

		routes: {
			'': 'tasks',
			'info': 'info',
			'learning': 'learning',
			'settings': 'settings', 
			'inbox/:page': 'inbox',
			'tasks': 'tasks'
		},

		home: function () {
			require('./../apps/home/app').run(this.viewManager);
		},

		inbox: function (page) {
			require('./../apps/inbox/app').run(this.viewManager, page);
		},

		tasks: function () {
			require('./../apps/tasks/app').run(this.viewManager);
		}
	});

	return Router;
});