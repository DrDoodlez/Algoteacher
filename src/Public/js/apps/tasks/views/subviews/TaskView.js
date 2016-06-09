define(function (require) {
	var Backbone = require('Backbone');

	var EmailView = Backbone.View.extend({
        tagName: "a",

        className: "list-group-item",

        // attributes: {
        //     href: function() { 
        //         var model = this.model.toJSON();
        //         return "/inbox/" + model.name;
        //     }
        // },

		//template: require('hbs!./../../templates/TaskView'),

		render: function () {
            var model = this.model.toJSON();
            this.$el.attr("href", "/inbox/" + model.name);
			this.$el.html(model.label);
			return this;
		}
	});

	return EmailView;
});