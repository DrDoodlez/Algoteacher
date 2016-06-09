define(function (require) {
	var Backbone = require('Backbone');

	var TaskView = Backbone.View.extend({
        tagName: "a",

        className: "list-group-item",

		render: function () {
            var model = this.model.toJSON();
            this.$el.attr("href", "/teach/" + model.name);
			this.$el.html(model.label);
			return this;
		}
	});

	return TaskView;
});