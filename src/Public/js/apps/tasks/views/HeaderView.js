define(function (require) {
	var Backbone = require('Backbone');
    //var MathJax = require('mathjax');

	var HeaderView = Backbone.View.extend({
		template: require('hbs!./../templates/HeaderView'),

		render: function () {
			this.$el.html(this.template({title: 'Formula'}));

            // can be used here :)
            //MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.$el.html()]);
			return this;
		}
	});

	return HeaderView;
});