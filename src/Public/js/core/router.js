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
			'inbox': 'inbox',
			'inbox/compose': 'inboxCompose',
			'tasks': 'tasks'
		},

		home: function () {
			require('./../apps/home/app').run(this.viewManager);
		},

		inbox: function () {
			require('./../apps/inbox/app').run(this.viewManager);
		},

		inboxCompose: function () {
			require('./../apps/inbox/subapps/compose/app').run(this.viewManager);
		},

		tasks: function () {
			require('./../apps/tasks/app').run(this.viewManager);
		}
	});

	return Router;
});