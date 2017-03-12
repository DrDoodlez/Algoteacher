define(
    "mathIt",
    [
        "lodash",
        "jquery",
    ],
    function(
        _,
        $
    ) {
        // usage mathIt["+"](a, b);
        var mathItUp = {
            "+": function(x, y) { return _.toNumber(x) + _.toNumber(y); },
            "-": function(x, y) { return _.toNumber(x) - _.toNumber(y); },
            "*": function(x, y) { return _.toNumber(x) * _.toNumber(y); },
            "/": function(x, y) {return _.toNumber(x) / _.toNumber(y); },
            "^": function(x, y) { return _.toNumber(x) ^ _.toNumber(y); } };
        return mathItUp;
    });
