define(function (require) {
    var SchemaCollection = require('./collections/SchemaCollection');
	var Schema = require('./models/Schema');
	var MainView = require('./views/MainView');

	return {
		run: function(viewManager, id) {
			var schema = new Schema({id: id});
			schema.fetch({
				success: function (result) {
					//attributes!! имя там
					var view = new MainView({teachSchema: result});
					viewManager.show(view);
				}
			});
		}
	};
});