var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Views.NewsArchive = Backbone.View.extend({
	el: '.js-newsView',
	events: {
		'click .js-showNewsArchiveBtn': 'showArchive',
		'click .js-newsArchiveBtn': 'openArchiveItem'
	},
	openArchiveItem: function (e) {
		e.preventDefault();
		newsCollection.fetch({
			url: $(e.currentTarget).attr('href'),
			reset: true
		});
	},
	showArchive: function (e) {
		var url = $(e.currentTarget).data('url') + '?json=get_date_index';
		this.collection.url = url;
		this.collection.fetch({
			reset: true
		});
	},
	initialize: function () {
		this.collection.on('reset', function () {
			this.render();
		}, this);
		console.count('NewsArchive view');
	},
	render: function () {
		this.$('.js-newsPage').html('');
		this.collection.each(function (newsArchiveItem, index) {
			var newsArchiveItemView = new App.Views.NewsArchiveItem({
				model: newsArchiveItem
			});
			newsArchiveItemView.$el.attr('data-wow-delay', index * 0.3 + 's');
			this.$('.js-newsPage').append(newsArchiveItemView.el);
		});
		App.router.resetWow();
	}
});
