define(function (require) {
	var Backbone = require('Backbone');
	var Schema = require('./../models/Schema');

	var SchemaCollection = Backbone.Collection.extend({
		model: Schema,

		url: '/api/teach'
	});

	return SchemaCollection;
});