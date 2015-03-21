var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Views.GalleryItem = Backbone.View.extend({
	initialize: function () {
		this.render();
		console.count('GalleryItem View');
	},
	tagName: 'li',
	className: 'gallery__item',
	template: $('#galleryItemTemplate').html(),
	render: function () {
		var rendered = Mustache.render(this.template, this.model.toJSON());
		this.$el.html(rendered);
		return this;
	}
});
