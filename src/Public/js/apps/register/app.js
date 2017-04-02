define(function(require) {
    var RegisterView = require("./views/RegisterView");

    return {
        run: function(viewManager) {
            var view = new RegisterView();
            viewManager.show(view);
        }
    };
});
