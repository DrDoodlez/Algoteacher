require.config({
    hbs: {
        templateExtension: "html",
        disableI18n: true,
        disableHelpers: true
    },

    shim: {
        "jQuery": {
            exports: "$"
        },

        "Underscore": {
            exports: "_"
        },

        "Backbone": {
            deps: ["Underscore", "jQuery"],
            exports: "Backbone"
        },

        "Handlebars": {
            deps: ["handlebars"],
            exports: "Handlebars"
        },

        "ApplicationRouter": {
            deps: ["jQuery", "Underscore", "Backbone"]
        },

        "MatrixBuilder" : {
            deps: ["jQuery"],
            exports: "MatrixBuilder"
        },

        "Animation" : {
            deps: ["jQuery"],
            exports: "Animation"
        },

        "StepControl" : {
            deps: ["jQuery"],
            exports: "StepControl"
        },

        "StepMatrixControl" : {
            deps: ["jQuery"],
            exports: "StepMatrixControl"
        },

        "mathjax": {
            exports: "MathJax",
            init: function() {
                MathJax.Hub.Config({
                    HTML: ["input/TeX","output/HTML-CSS"],
                    TeX: { extensions: ["AMSmath.js","AMSsymbols.js"],
                        equationNumbers: { autoNumber: "AMS" }},
                    extensions: ["tex2jax.js"],
                    jax: ["input/TeX","output/HTML-CSS"],
                    tex2jax: { inlineMath: [["$","$"], ["\\(","\\)"]],
                        displayMath: [["$$","$$"], ["\\[","\\]"]],
                        processEscapes: true },
                    "HTML-CSS": { availableFonts: ["TeX"],
                        linebreaks: { automatic: true }}
                });
                MathJax.Hub.Startup.onload();
                return MathJax;
            }
        }
    },
    // http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML&amp;delayStartupUntil=configured - удалённый путь
    paths: {
        jQuery: "./../components/jquery/jquery",
        Underscore: "./../components/underscore/underscore",
        underscore: "./../components/require-handlebars-plugin/hbs/underscore",
        Backbone: "./../components/backbone/backbone",
        handlebars: "./../components/require-handlebars-plugin/Handlebars",
        text: "./../components/require-handlebars-plugin/text",
        hbs: "./../components/require-handlebars-plugin/hbs",
        i18nprecompile : "./../components/require-handlebars-plugin/hbs/i18nprecompile",
        json2 : "./../components/require-handlebars-plugin/hbs/json2",
        MatrixBuilder : "./../components/MatrixBuilder/MatrixBuilder",
        mathjax: "./../components/mathJax/MathJax.js?config=TeX-AMS_HTML&amp;delayStartupUntil=configured",
        Animation : "./../components/Animation/Animation",
        StepControl : "./../components/StepControl/StepControl",
        StepMatrixControl : "./../components/StepControl/StepMatrixControl"
    }
});

require(["core/router", "core/client", "Backbone"], function(Router, client, Backbone) {
    var app = {
        root: "/"
    };

    window.Router = new Router();
    client.setup(window, app);

    Backbone.history.start({ pushState: true });

    window.onload = function() {
        window.Router.navigate("home", { trigger: true });
    };
});
