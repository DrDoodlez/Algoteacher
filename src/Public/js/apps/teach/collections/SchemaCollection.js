define([
    "Backbone",
    "./../models/Schema"
], function(
    Backbone,
    Schema
) {
    var SchemaCollection = Backbone.Collection.extend({
        model: Schema,

        url: "/api/teach"
    });

    return SchemaCollection;
});
