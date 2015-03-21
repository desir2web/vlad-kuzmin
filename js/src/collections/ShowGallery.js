var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Collections.ShowGallery = Backbone.Collection.extend({
	url: $('#showGalleryItemTemplate').data('url'),
	parse: function (response) {
		var galleryContent = response.page.content,
			$galleryContent = $(galleryContent);
		var attachments = response.page.attachments,
			galleryItems = _.map($galleryContent.find('a'), function (item, i) {
				return {
					id: i,
					thumb: $(item).find('img').attr('src'),
					img: $(item).attr('href')
				};
			});
		return galleryItems;

	},
	initialize: function () {
		this.fetch({
			reset: true
		});
		this.on('reset', function () {
			console.count('ShowGallery collection');
		});
	}
});
