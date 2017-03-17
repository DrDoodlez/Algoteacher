define([
    "Backbone",
    "Underscore",
    "jQuery",
    "knockout",
    "text!./../templates/LoginView.html"
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
                self.$el.find("#userName").text(data.userName);
                // Cache the access token in session storage.
                sessionStorage.setItem("accessToken", data.access_token);
            }).fail(()=>{console.error("Register Error");});
        },

        logout: function() {
            // Log out from the cookie based logon.
            var self = this;
            var token = sessionStorage.getItem("accessToken");
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
                self.$el.find("#userName").text("Авторизируйся");
                console.log("Logout!!");
                sessionStorage.removeItem("accessToken");
            }).fail(()=>{console.error("Register Error");});
        }
    });

    return MainView;
});
