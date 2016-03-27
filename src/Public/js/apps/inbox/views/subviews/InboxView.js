define(function(require) {
	var Backbone = require('Backbone');
	var EmailView = require('./EmailView');
	var MatrixBuilder = require('MatrixBuilder');

	var InboxView = Backbone.View.extend({
		template: require('hbs!./../../templates/InboxView'),

		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			this.$el.html(this.template());

			var values = [ [1,2,3], [4,5,6] ];
			var $matr1 = MatrixBuilder.create(values, 2, 3);

			$("#matrix1").append($matr1);
			MatrixBuilder.highlightColumn($matr1,1);


			var mails = this.$('.mails');
			this.collection.forEach(function (mail) {
				var view = new EmailView({model: mail});
				mails.append(view.render().el);
				this.subviews.push(view);
			}, this);

			return this;
		}
	});

	return InboxView;
});