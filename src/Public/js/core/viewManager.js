define(function (require) {
	var $ = require('jQuery');
	var _ = require('Underscore');
	var MathJax = require('mathjax');

	var ViewManager = function () {
		return {
			show: showView
		};
	};

	function showView(view) {
		//debugger;
		if (this.currentView) {
			disposeView(this.currentView);
		}

		this.currentView = view;

		$("#app").html(this.currentView.el);		
		this.currentView.render();

		MathJax.Hub.Queue(["Typeset",MathJax.Hub,"app"]);
	}

	function disposeView(view) {
		_.each(view.subviews, function(subview) {
			disposeView(subview);
		});

		view.remove();
	}

	return ViewManager;

});