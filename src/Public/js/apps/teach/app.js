define([
    "./collections/SchemaCollection",
    "./models/Schema",
    "./views/MainView"
], function(
    SchemaCollection,
    Schema,
    MainView
) {

    return {
        run: function(viewManager, id) {
            var schema = new Schema({ id: id });
            schema.fetch({
                success: function(result) {
                    //attributes!! имя там
                    var view = new MainView({ teachSchema: result });
                    viewManager.show(view);
                }
            });
        }
    };
});
