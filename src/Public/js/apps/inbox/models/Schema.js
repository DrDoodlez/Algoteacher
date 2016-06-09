define(function(require) {
	var Backbone = require('Backbone');

	var Schema = Backbone.Model.extend({
		urlRoot: '/api/inbox',
        url: function() {
            return this.urlRoot + '/' + this.id;
        }
	});

	return Schema;
});