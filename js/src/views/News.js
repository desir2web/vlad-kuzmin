var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Views.News = Backbone.View.extend({
	el: '.js-newsPage',
	initialize: function () {
		this.collection.on('reset', function () {
			this.render();
		}, this);
		console.count('News view');
	},
	render: function () {
		if (this.collection.models.length === 0) {
			App.appView.$('.js-showNewsArchiveBtn').hide();
		} else {
			App.appView.$('.js-showNewsArchiveBtn').show();
		}

		this.$el.html('');
		this.collection.each(function (newsItem, index) {
			var newsItemView = new App.Views.NewsItem({
				model: newsItem
			});
			newsItemView.$el.attr('data-wow-delay', index * 0.3 + 's');
			this.$el.append(newsItemView.el);
		}, this);
		App.router.resetWow();
	}
});
