define(function(require) {
	var Backbone = require('Backbone');
	//var EmailView = require('./EmailView');
	var MatrixBuilder = require('MatrixBuilder');
	var Animation = require('Animation');
	var MathJax = require('mathjax');
	var StepControl = require('StepControl');
	var StepMatrixControl = require('StepMatrixControl');

	var InboxView = Backbone.View.extend({
		template: require('hbs!./../../templates/InboxView'),

		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			this.$el.html(this.template());

			console.log(this.template());

			var values1 = [["$a_{11}$", "$a_{12}$", "$a_{13}$"], ["$a_{21}$", "$a_{22}$", "$a_{23}$"]];
			var $matr1 = MatrixBuilder.create(values1, 2, 3);

			var values2 = [["$b_{11}$", "$b_{12}$"], ["$b_{21}$", "$b_{22}$"], ["$b_{31}$", "$b_{32}$"]];
			var $matr2 = MatrixBuilder.create(values2, 3, 2);

			var values3 = [[1,2,0], [2,1,3]];
			var $matr3 = MatrixBuilder.create(values3, 2, 3);

			var values4 = [[1,2], [1,3], [1,0]];
			var $matr4 = MatrixBuilder.create(values4, 3, 2);

			var values5 = [[3,8], [6,7]];
			var $matr5 = MatrixBuilder.create(values5, 2, 2);

			this.$("#matrix1").append($matr1);
			//MatrixBuilder.highlightRow($matr1, 0);

			this.$("#matrix2").append($matr2);
			//MatrixBuilder.highlightColumn($matr2, 1);

			this.$("#matrix3").append($matr3);
			this.$("#matrix4").append($matr4);
			this.$("#matrix5").append($matr5);

			
			// var elements = [
			// 	"$c_{11}$",
			// 	"$ = (a_{11}, ... , a_{13}) \\cdot (b_{12}, ... , b_{32})$",
			// 	"$ = a_{11} \\cdot b_{12} +  ... + a_{13} \\cdot b_{32}$",
			// 	"$ = a_{11} \\cdot b_{12} +  ... + a_{13} \\cdot b_{32}$",
			// 	"$ = 4 \\cdot 2 + 5 \\cdot 4 + 6 \\cdot 6$",
			// 	"$ = 8 + 20 + 36$",
			// 	"$ = 64$"
			// ]
			var elements = [
				" ",
				"$ (a_{11}, a_{12}, a_{13}) \\cdot (b_{12}, b_{22}, b_{32}) =$",
				"$ a_{11} \\cdot b_{12} + $",
				"$ a_{12} \\cdot b_{22} + $",
				"$ a_{13} \\cdot b_{32} = $",
				"$ a_{11} \\cdot b_{12} + a_{12} \\cdot b_{22} + a_{13} \\cdot b_{32} $"
			]

			// var formula1 = new StepControl(elements);
			// this.$("#resultEx1").append(formula1.layout());

			var formula2 = new StepMatrixControl(elements, MatrixBuilder, $matr1, $matr2);
			this.$("#resultEx1").append(formula2.layout());

			var query = this.$(".learning-div");
			Animation.animateQueryOpacity(query);

			this.$("#matrix5").find(".matrix_cell").on("mouseover", function(){
			 	MatrixBuilder.highlightRow($matr3, $(this).data().row);
			 	MatrixBuilder.highlightColumn($matr4, $(this).data().col);
			 	MatrixBuilder.highlightCell($matr5, $(this).data().row, $(this).data().col);
			});
			
			this.$("#matrix5").find(".matrix_cell").on("mouseout", function(){
			 	MatrixBuilder.resetAll($matr3);
			 	MatrixBuilder.resetAll($matr4);
			 	MatrixBuilder.resetAll($matr5);
			});
			// });

			
			// this.$("#matrix1").on("mouseover", function(){
			// 	$("#MathExample")[0].innerText = "$a + b + c = 3 \\cdot 3$"
			// 	var math = MathJax.Hub.getAllJax("ggg")[0];
			// 	MathJax.Hub.Queue(["Text",math,"x+1"]);
			// 	MathJax.Hub.Queue(["Rerender",math]);
			// });

			// this.$("#matrix2").on("mouseover", function(){
			// 	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"MathExample"]);
			// });

			
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