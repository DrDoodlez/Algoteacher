define(function(require) {
    var LoginView = require("./views/LoginView");

    return {
        run: function(viewManager) {
            var view = new LoginView();
            viewManager.show(view);
        }
    };
});
