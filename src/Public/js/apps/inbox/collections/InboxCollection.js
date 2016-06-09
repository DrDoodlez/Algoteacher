define(function (require) {
	var Backbone = require('Backbone');
	var Schema = require('./../models/Schema');

	var InboxCollection = Backbone.Collection.extend({
		model: Schema,

		url: '/api/inbox'
	});

	return InboxCollection;
});