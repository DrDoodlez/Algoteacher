define(function(require) {
	var Backbone = require('Backbone');
	//var EmailView = require('./EmailView');
	var MatrixBuilder = require('MatrixBuilder');
	var Animation = require('Animation');

	var InboxView = Backbone.View.extend({
		template: require('hbs!./../../templates/InboxView'),

		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			this.$el.html(this.template());

			console.log(this.template());

			var values1 = [[1,2,3], [4,5,6]];
			var $matr1 = MatrixBuilder.create(values1, 2, 3);

			var values2 = [[1,2], [3,4], [5,6]];
			var $matr2 = MatrixBuilder.create(values2, 3, 2);

			var values3 = [[1,2,0], [2,1,3]];
			var $matr3 = MatrixBuilder.create(values3, 2, 3);

			var values4 = [[1,2], [1,3], [1,0]];
			var $matr4 = MatrixBuilder.create(values4, 3, 2);

			var values5 = [[3,8], [6,7]];
			var $matr5 = MatrixBuilder.create(values5, 2, 2);

			this.$("#matrix1").append($matr1);
			MatrixBuilder.highlightRow($matr1, 1);

			this.$("#matrix2").append($matr2);
			MatrixBuilder.highlightColumn($matr2, 1);

			this.$("#matrix3").append($matr3);
			this.$("#matrix4").append($matr4);
			this.$("#matrix5").append($matr5);

			var query = this.$(".learning-div");
			Animation.animateQueryOpacity(query);

			// this.$("#matrix1").on("mouseover", function(){
			// 	$("#ggg .mn")[0].innerText = 666;
			// 	Animation.Animation($("#div1"));
			// 	//$("#div1").fadeTo(5500, 1);
			// });
			return this;
		}
	});

	return InboxView;
});