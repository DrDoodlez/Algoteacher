define([
    "Backbone"
], function(
    Backbone
) {
    var Task = Backbone.Model.extend({
        urlRoot: "/api/tasks"
    });
    return Task;
});
