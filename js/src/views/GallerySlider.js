var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Views.GallerySlider = Backbone.View.extend({
	// el: '.js-sliderContainer',
	initialize: function () {
		this.collection.on('reset', function () {
			this.render();
		}, this);
		console.count('GallerySlider view');
	},
	render: function () {
		this.$el.html('');
		this.collection.each(function (sliderItem) {
			var gallarySliderItemView = new App.Views.GallerySliderItem({
				model: sliderItem
			});
			this.$el.append(gallarySliderItemView.el);
		}, this);
	}
});
