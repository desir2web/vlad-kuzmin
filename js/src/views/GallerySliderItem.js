var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Views.GallerySliderItem = Backbone.View.extend({
	template: $('#gallerySliderItemTemplate').html(),
	initialize: function () {
		this.render();
		console.count('GallerySliderItem view');
	},
	render: function () {
		var rendered = Mustache.render(this.template, this.model.toJSON());
		this.$el.html(rendered);
		return this;
	}
});
