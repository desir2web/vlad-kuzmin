var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Collections.News = Backbone.Collection.extend({
	url: $('#newsItemTemplate').data('url') + '/?json=get_posts&category_name=news',
	parse: function (response) {
		return response.posts;
	},
	initialize: function () {
		this.fetch({
			reset: true
		});
		this.on('reset', function () {
			console.count('News collection');
		});
	}
});
