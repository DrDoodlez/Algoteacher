define([
    "Backbone",
    "jQuery",
    "knockout",
    "Underscore",
    "text!./../templates/RegisterTemplate.html"
], function(
    Backbone,
    $,
    ko,
    _,
    RegisterTemplate
) {
    var MainView = Backbone.View.extend({
        template: _.template(RegisterTemplate),
        initialize: function() {
            //this.subviews = [];
            //this.result = ko.observable();

        },

        render: function() {
            this.$el.html(this.template());
            var $form = this.$el.find("#registerForm");
            $form.on("submit", e => {
                e.preventDefault();
                var data = $form.serializeArray().reduce(function(obj, item) {
                    obj[item.name] = item.value;
                    return obj;
                }, {});
                this.register(data);
            });
        },

        register: function(data) {
            var self = this;
            var err = self.$el.find("#form-error");
            var data = {
                Email: data.email,
                Password: data.password,
                ConfirmPassword: data.confpassword
            };

            $.ajax("/api/Account/Register", {
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            }).done(function(d) {
                err.hide();
                console.log("Registered!" + d);
                document.location.href = document.origin +  "/account/login";
            }).fail(error=>{
                console.error("Register Error");
                err.show();
                err.text(error.responseText);
            });
        }
    });

    return MainView;
});
