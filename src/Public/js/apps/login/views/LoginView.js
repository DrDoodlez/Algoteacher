define([
    "Backbone",
    "Underscore",
    "jQuery",
    "knockout",
    "text!./../templates/LoginTemplate.html"
], function(
    Backbone,
    _,
    $,
    ko,
    LoginTemplate
) {
    var MainView = Backbone.View.extend({
        template: _.template(LoginTemplate),
        initialize: function() {
        },

        render: function() {
            this.$el.html(this.template());
            var $form = this.$el.find("#loginForm");
            $form.on("submit", e => {
                e.preventDefault();
                var data = $form.serializeArray().reduce(function(obj, item) {
                    obj[item.name] = item.value;
                    return obj;
                }, {});
                this.login(data);
            });

            var $logoutButton = this.$el.find("#logout");
            $logoutButton.on("click", e => {
                this.logout();
            });
        },

        login: function(data) {
            var self = this;
            var err = self.$el.find("#form-error");

            var loginData = {
                grant_type: "password",
                username: data.email,
                password: data.password
            };

            $.ajax("/Token", {
                type: "POST",
                data: loginData
            }).done(function(data) {
                //self.user(data.userName);
                console.log(data.userName + ", Привет!");
                $("#user-name-label").text(data.userName);
                // Cache the access token in session storage.
                sessionStorage.setItem("accessToken", data.access_token);
                sessionStorage.setItem("userName", data.userName);
                err.hide();
                document.location.href = document.origin +  "/";
            }).fail(error=>{
                console.error("Login Error");
                err.show();
                err.text(error.responseText);
            });
        },

        logout: function() {
            // Log out from the cookie based logon.
            var self = this;
            var token = sessionStorage.getItem("accessToken");
            var err = self.$el.find("#form-error");
            var headers = {};
            if (token) {
                headers.Authorization = "Bearer " + token;
            }

            $.ajax("/api/Account/Logout", {
                type: "POST",
                headers: headers
            }).done(function(data) {
                // Successfully logged out. Delete the token.
                //self.user('');
                $("#user-name-label").text("Авторизируйся");
                console.log("Logout!!");
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("userName");
                err.hide();
                document.location.href = document.origin +  "/account/login";
            }).fail(error=>{
                console.error("Logout Error");
                err.show();
                err.text(error.responseText);
            });
        }
    });

    return MainView;
});
