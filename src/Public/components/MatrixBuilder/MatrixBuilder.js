define(
    "MatrixBuilder",
    [
        "underscore",
        "jQuery",
    ],
    function(
        _,
        $
    ) {
        function createCell(value, row, col) {
            return $("<td id='" + (10 * (row + 1) + (col + 1)) + "' class='" + classes.cell + "'>" +  value + "</td>");
        };

        function createRow() {
            return $("<tr class='" + classes.row + "'> </tr>");
        };

        var classes = {
            active: "matrix_cell--active",
            row: "matrix_row",
            cell: "matrix_cell",
            matrix: "matrix"
        };

        class Matrix {
            constructor(values, rows, columns) {
                //  { [1,2,3],
                //    [4,5,6] }
                this.$el = $("<table class='" + classes.matrix + "'></table>");
                for (var i = 0; i < rows; i++) {
                    var $row = createRow();
                    for (var j = 0; j < columns; j++) {
                        var $cell = createCell(values[i][j], i, j);
                        $cell.data("row", i);
                        $cell.data("col", j);
                        $row.append($cell);
                    }
                    this.$el.append($row);
                }
            }

            highlightCell(i, j) {
                var $row = $(this.$el.find("." + classes.row)[i]);
                var $cell = $($row.find("." + classes.cell)[j]);
                $cell.addClass(classes.active);
            }

            highlightRow(row) {
                var $row = $(this.$el.find("." + classes.row)[row]);
                var $cells = $row.find("." + classes.cell);
                $cells.addClass(classes.active);
            }

            highlightColumn(col) {
                var $rows = $(this.$el.find("." + classes.row));
                _.each($rows, function(rows) {
                    var cell = $(rows).find("." + classes.cell)[col];
                    $(cell).addClass(classes.active);
                });
            }

            resetAll() {
                var $cells = $(this.$el.find("." + classes.cell));
                $cells.removeClass(classes.active);
            }
        }
        // values = [ [1,2,3], [4,5,6] ];
        //
        // var matr1 = MatrixBuilder.create(values, 2, 3);
        // var matr2 = MatrixBuilder.create(values, 2, 3);
        // $(".app").append(matr1);

        return {
            defaultMatrix: Matrix
        };
    });
