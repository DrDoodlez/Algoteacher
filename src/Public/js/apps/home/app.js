define(function(require) {
    var HomeView = require("./views/HomeView");

    return {
        run: function(viewManager) {
            var view = new HomeView();
            viewManager.show(view);
        }
    };
});
