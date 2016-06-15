define(function(require) {
	var Backbone = require('Backbone');

	var TeachView = require('./subviews/TeachView');
	var TeachView2 = require('./subviews/TeachView2');
	var EmptyView = require('./subviews/EmptyView');

	var MainView = Backbone.View.extend({
		initialize: function () {
			this.subviews = [];
		},

		render: function () {
			var schema = this.options.teachSchema.attributes;
			var view;
			// TODO: В будущем заменить данные костыли на парсинг схемы от сервера. 
			// Сейчас смотрим какое имя схемы пришло, и грузим определённое Вью. 
			// В будущем нужно создавать вью на основе схемы!!
			if (schema.name == "matrix mult"){
			    view = new TeachView({ teachSchema: schema });
			}
			else if (schema.name == "transport"){
				view = new TeachView2({ teachSchema: schema });
			}
			else {
				view = new EmptyView({teachSchema: schema});
			}
			
			this.$el.append(view.render().el);
			this.subviews.push(view);

			return this;
		}
	});

	return MainView;
});