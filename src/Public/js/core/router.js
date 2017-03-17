define([
    "Backbone",
    "./ViewManager",
    "./../apps/home/app",
    "./../apps/teach/app",
    "./../apps/tasks/app",
    "./../apps/login/app",
    "./../apps/register/app",
], function(
    Backbone,
    ViewManager,
    HomeApp,
    TeachApp,
    TaskApp,
    LoginApp,
    RegisterApp
) {
    var Router = Backbone.Router.extend({
        initialize: function() {
            this.viewManager = new ViewManager();
        },

        routes: {
            "": "home",
            "info": "info",
            "account/login": "login",
            "account/register": "register",
            "teach/:page": "teach",
            "tasks": "tasks"
        },

        home: function() {
            HomeApp.run(this.viewManager);
        },

        login: function() {
            LoginApp.run(this.viewManager);
        },

        register: function() {
            RegisterApp.run(this.viewManager);
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
