define(function(require) {
    var EasyMathView = require("./views/EasyMathView");

    return {
        run: function(viewManager) {
            var view = new EasyMathView();
            viewManager.show(view);
        }
    };
});
