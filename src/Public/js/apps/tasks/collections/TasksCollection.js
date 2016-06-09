define(function (require) {
	var Backbone = require('Backbone');
	var Task = require('./../models/Task');

	var TasksCollection = Backbone.Collection.extend({
		model: Task,

		url: '/api/tasks'
	});

	return TasksCollection;
});