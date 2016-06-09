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
			'teach/:page': 'teach',
			'tasks': 'tasks'
		},

		home: function () {
			require('./../apps/home/app').run(this.viewManager);
		},

		teach: function (page) {
		    require('./../apps/teach/app').run(this.viewManager, page);
		},

		tasks: function () {
			require('./../apps/tasks/app').run(this.viewManager);
		}
	});

	return Router;
});