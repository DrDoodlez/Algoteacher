define([
    "Backbone",
    "./../models/Task"
], function(
    Backbone,
    Task
) {
    var TasksCollection = Backbone.Collection.extend({
        model: Task,

        url: "/api/tasks"
    });

    return TasksCollection;
});
