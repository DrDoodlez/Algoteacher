define([
    "Backbone",
    "jquery",
    "Underscore",
    "text!./../templates/RegisterView.html"
], function(
    Backbone,
    $,
    _,
    RegisterTemplate
) {
    var MainView = Backbone.View.extend({
        template: _.template(RegisterTemplate),
        initialize: function() {
            //this.subviews = [];
            //this.result = ko.observable();
            this.user = ko.observable();

            this.registerEmail = ko.observable();
            this.registerPassword = ko.observable();
            this.registerPassword2 = ko.observable();
        },

        render: function() {
            this.$el.html(this.template());

            this.register = function() {
                var self = this;
                self.result("");
                self.errors.removeAll();

                var data = {
                    Email: self.registerEmail(),
                    Password: self.registerPassword(),
                    ConfirmPassword: self.registerPassword2()
                };

                $.ajax({
                    type: "POST",
                    url: "Account/Register",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data)
                }).done(function(d) {
                    //self.result("Done!");
                    console.log("Registered!" + d);
                }).fail(()=>{console.error("Register Error");});
            };
        }
    });

    return MainView;
});
