define([
    "Backbone",
    "Underscore",
    "jquery",
    "text!./../templates/LoginView.html"
], function(
    Backbone,
    _,
    $,
    LoginTemplate
) {
    var MainView = Backbone.View.extend({
        template: _.template(LoginTemplate),
        initialize: function() {
            //this.subviews = [];
            //this.result = ko.observable();
            this.user = ko.observable();

            this.loginEmail = ko.observable();
            this.loginPassword = ko.observable();
            this.errors = ko.observableArray([]);
        },

        render: function() {
            this.$el.html(this.template());
            this.login = function() {
                var self = this;
                //self.result("");
                //self.errors.removeAll();

                var loginData = {
                    grant_type: "password",
                    username: self.loginEmail(),
                    password: self.loginPassword()
                };

                $.ajax({
                    type: "POST",
                    url: "/Token",
                    data: loginData
                }).done(function(data) {
                    self.user(data.userName);
                    // Cache the access token in session storage.
                    sessionStorage.setItem("accessToken", data.access_token);
                }).fail(()=>{console.error("Register Error");});
            };
        },
    });

    return MainView;
});
