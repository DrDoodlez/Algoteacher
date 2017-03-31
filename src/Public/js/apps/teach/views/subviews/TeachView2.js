define([
    "Backbone",
    "jQuery",
    "Underscore",
    "MatrixBuilder",
    "Animation",
    "mathjax",
    "StepControl",
    "StepMatrixControl",
    "text!./../../templates/TeachView2.html"
], function(
    Backbone,
    $,
    _,
    MatrixBuilder,
    Animation,
    MathJax,
    StepControl,
    StepMatrixControl,
    TeachViewTemplate
) {
    var TeachView2 = Backbone.View.extend({
        template: _.template(TeachViewTemplate),
        initialize: function() {
            this.subviews = [];
        },

        render: function() {
            this.$el.html(this.template());
            console.log(this.options.teachSchema.Data);

            // var values1 = [["$a_{11}$", "$a_{12}$", "$a_{13}$"], ["$a_{21}$", "$a_{22}$", "$a_{23}$"]];
            // var $matr1 = new MatrixBuilder.defaultMatrix(values1, 2, 3);

            // var values2 = [["$b_{11}$", "$b_{12}$"], ["$b_{21}$", "$b_{22}$"], ["$b_{31}$", "$b_{32}$"]];
            // var $matr2 = new MatrixBuilder.defaultMatrix(values2, 3, 2);

            // var values3 = [[1,2,0], [2,1,3]];
            // var $matr3 = new MatrixBuilder.defaultMatrix(values3, 2, 3);

            // var values4 = [[1,2], [1,3], [1,0]];
            // var $matr4 = new MatrixBuilder.defaultMatrix(values4, 3, 2);

            // var values5 = [[3,8], [6,7]];
            // var $matr5 = new MatrixBuilder.defaultMatrix(values5, 2, 2);

            // this.$("#matrix1").append($matr1);
            // $matr1.highlightRow(0);

            // this.$("#matrix2").append($matr2);
            // $matr2.highlightColumn(1);

            // this.$("#matrix3").append($matr3);
            // this.$("#matrix4").append($matr4);
            // this.$("#matrix5").append($matr5);


            // // var elements = [
            // // 	"$c_{11}$",
            // // 	"$ = (a_{11}, ... , a_{13}) \\cdot (b_{12}, ... , b_{32})$",
            // // 	"$ = a_{11} \\cdot b_{12} +  ... + a_{13} \\cdot b_{32}$",
            // // 	"$ = a_{11} \\cdot b_{12} +  ... + a_{13} \\cdot b_{32}$",
            // // 	"$ = 4 \\cdot 2 + 5 \\cdot 4 + 6 \\cdot 6$",
            // // 	"$ = 8 + 20 + 36$",
            // // 	"$ = 64$"
            // // ]
            // var elements = [
            // 	" ",
            // 	"$ (a_{11}, a_{12}, a_{13}) \\cdot (b_{12}, b_{22}, b_{32}) =$",
            // 	"$ a_{11} \\cdot b_{12} + $",
            // 	"$ a_{12} \\cdot b_{22} + $",
            // 	"$ a_{13} \\cdot b_{32} = $",
            // 	"$ a_{11} \\cdot b_{12} + a_{12} \\cdot b_{22} + a_{13} \\cdot b_{32} $"
            // ]

            // // var formula1 = new StepControl(elements);
            // // this.$("#resultEx1").append(formula1.layout());

            // var formula2 = new StepMatrixControl(elements, $matr1, $matr2);
            // this.$("#resultEx1").append(formula2.layout());

            var values1 = [[1,2,0,6,3,6,2,6], [2,1,3,2,7,2,7,4], [5,8,1,1,0,9,4,9], [6,4,6,8,3,1,6,1],
                [5,6,2,1,7,6,2,1], [7,6,1,1,1,6,3,4]];
            var $matr1 = new MatrixBuilder.defaultMatrix(values1, 6, 8);
            this.$("#matrix1").append($matr1.$el);

            $matr1.highlightCell(0, 0);
            $matr1.highlightCell(1, 0);
            $matr1.highlightCell(1, 1);
            $matr1.highlightCell(1, 2);
            $matr1.highlightCell(2, 2);
            $matr1.highlightCell(2, 3);
            $matr1.highlightCell(3, 3);
            $matr1.highlightCell(3, 4);
            $matr1.highlightCell(3, 5);
            $matr1.highlightCell(4, 5);
            $matr1.highlightCell(4, 6);
            $matr1.highlightCell(5, 6);
            $matr1.highlightCell(5, 7);

            var query = this.$(".learning-div");
            Animation.animateQueryOpacity(query);

            // this.$("#matrix5").find(".matrix_cell").on("mouseover", function(){
            //      $matr3.highlightRow($(this).data().row);
            //      $matr4.highlightColumn($(this).data().col);
            //      $matr5.highlightCell($(this).data().row, $(this).data().col);
            // });

            // this.$("#matrix5").find(".matrix_cell").on("mouseout", function(){
            //      $matr3.resetAll();
            //      $matr4.resetAll();
            //      $matr5.resetAll();
            // });
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

    return TeachView2;
});
