define([
    "Backbone",
    "./ViewManager",
    "./../apps/home/app",
    "./../apps/teach/app",
    "./../apps/tasks/app"
], function(
    Backbone,
    ViewManager,
    HomeApp,
    TeachApp,
    TaskApp
) {
    var Router = Backbone.Router.extend({
        initialize: function() {
            this.viewManager = new ViewManager();
        },

        routes: {
            "": "home",
            "info": "info",
            "learning": "learning",
            "settings": "settings",
            "teach/:page": "teach",
            "tasks": "tasks"
        },

        home: function() {
            HomeApp.run(this.viewManager);
        },

        teach: function(page) {
            TeachApp.run(this.viewManager, page);
        },

        tasks: function() {
            TaskApp.run(this.viewManager);
        }
    });

    return Router;
});
