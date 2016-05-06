define(
    'MatrixBuilder',
    function(require){

    function createCell(value, row, col) {
      return $("<td class='" + classes.cell + "'>" +  value + "</td>");
    };

    function createRow(){
      return $("<tr class='" + classes.row + "'> </tr>");
    };

    var classes = {
      active: "matrix_cell--active",
      row: "matrix_row",
      cell: "matrix_cell",
      matrix: "matrix"
    };

    var MatrixBuilder = {
      create: function create(values, rows, columns) {
        //  { [1,2,3],
        //    [4,5,6] }
        var $matrix = $("<table class='" + classes.matrix + "'></table>");
        for (var i = 0; i < rows; i++) {
          var $row = createRow();
          for(var j = 0; j < columns; j++){
            var $cell = createCell(values[i][j],i, j);
            $row.append($cell);
          }
          $matrix.append($row);
        }
        return $matrix;
      },

      highlightCell: function ($matrix ,i, j) {
        var $row = $($matrix.find("." + classes.row)[i]);
        var $cell = $($row.find("." + classes.cell)[j]);
        $cell.addClass(classes.active);
      },

      highlightRow: function($matrix, row) {
        var $row = $($matrix.find("." + classes.row)[row]);
        var $cells = $row.find("." + classes.cell);
        $cells.addClass(classes.active);
      },

      highlightColumn: function($matrix, col) {
        var $rows = $($matrix.find("." + classes.row));
        _.each($rows, function(rows){
            var cell = $(rows).find("." + classes.cell)[col];
            $(cell).addClass(classes.active);
        });
      },

      resetAll: function($matrix) {
         var $cells = $($matrix.find("." + classes.cell));
         $cells.removeClass(classes.active);
      }

    };
    values = [ [1,2,3], [4,5,6] ];

    var matr1 = MatrixBuilder.create(values, 2, 3);
    var matr2 = MatrixBuilder.create(values, 2, 3);
    $(".app").append(matr1);

    //MatrixBuilder.highlightCell(matr1,1,1);
    //MatrixBuilder.highlightColumn(matr1,1);
  

    return MatrixBuilder;
});