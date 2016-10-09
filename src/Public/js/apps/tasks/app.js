define([
    "Backbone",
    "./collections/TasksCollection",
    "./views/MainView"
], function(
    Backbone,
    TasksCollection,
    MainView
) {
    return {
        run: function(viewManager) {
            var tasksCollection = new TasksCollection();
            tasksCollection.fetch({
                success: function(collection) {
                    var view = new MainView({ collection: collection });
                    viewManager.show(view);
                }
            });
        }
    };
});
