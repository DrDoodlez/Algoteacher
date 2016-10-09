define([
    "Backbone",
    "Underscore",
    "./TaskView",
    "text!./../../templates/TasksView.html"
], function(
    Backbone,
    _,
    TaskView,
    TasksViewTemplate
) {
    var TasksView = Backbone.View.extend({
        template: _.template(TasksViewTemplate),

        initialize: function() {
            this.subviews = [];
        },

        render: function() {
            this.$el.html(this.template());
            var $list = this.$("#task-list");
            this.collection.forEach(function(task) {
                var view = new TaskView({ model: task });
                $list.append(view.render().el);
                this.subviews.push(view);
            }, this);

            return this;
        }
    });

    return TasksView;
});
