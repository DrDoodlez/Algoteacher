define([
    "Backbone"
], function(
    Backbone
) {

    var Schema = Backbone.Model.extend({
        urlRoot: "/api/teach",
        url: function() {
            return this.urlRoot + "/" + this.id;
        }
    });

    return Schema;
});
