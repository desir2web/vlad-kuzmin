var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

var imgUrl = $('.js-framesContainer').data('themeUrl') + '/img/';

$(function () {
	App.Routes = [{
		id: 0,
		route: 'home',
		color: 'rgba(72,47,31,.45)',
		img: imgUrl + 'overlay-home.png'
	}, {
		id: 1,
		route: 'resume',
		color: 'rgba(42,7,34,.45)',
		img: imgUrl + 'overlay-resume.png'
	}, {
		id: 2,
		route: 'show',
		color: 'rgba(72,47,31,0)',
		img: imgUrl + 'overlay-show.png'
	}, {
		id: 3,
		route: 'schools',
		color: 'rgba(17,64,94,.8)',
		img: imgUrl + 'overlay-school.png'
	}, {
		id: 4,
		route: 'gallery',
		color: 'rgba(0,0,0,.45)',
		img: imgUrl + 'overlay-gallery.png'
	}, {
		id: 5,
		route: 'news',
		color: 'rgba(50,43,21,.45)',
		img: imgUrl + 'overlay-news.png'
	}, {
		id: 6,
		route: 'contacts',
		color: 'rgba(54,76,91,.45)',
		img: imgUrl + 'overlay-contacts.png'
	}];
	/*App.Routes = [{
		id: 0,
		route: 'home',
		color: 'rgba(72,47,31,.45)'
	}, {
		id: 1,
		route: 'resume',
		color: 'rgba(42,7,34,.45)'
	}, {
		id: 2,
		route: 'show',
		color: 'rgba(72,47,31,0)'
	}, {
		id: 3,
		route: 'gallery',
		color: 'rgba(0,0,0,.45)'
	}, {
		id: 4,
		route: 'news',
		color: 'rgba(50,43,21,.45)'
	}, {
		id: 5,
		route: 'contacts',
		color: 'rgba(54,76,91,.45)'
	}];*/

	// Collections
	var galleryCollection = new App.Collections.Gallery(),
		showGalleryCollection = new App.Collections.ShowGallery(),
		newsArchiveCollection = new App.Collections.NewsArchive();
	App.newsCollection = new App.Collections.News();
	App.breadcrumbsCollection = new App.Collections.Breadcrumbs();

	// Views
	App.appView = new App.Views.App();
	var tabsView = new App.Views.Tabs(),
		accordionView = new App.Views.Accordion(),
		galleryView = new App.Views.Gallery({
			collection: galleryCollection
		}),
		gallerySliderView = new App.Views.GallerySlider({
			el: '.js-galleryPhotoSlider .js-sliderContainer',
			collection: galleryCollection
		}),
		showSliderView = new App.Views.GallerySlider({
			el: '.js-showPhotoSlider .js-sliderContainer',
			collection: showGalleryCollection
		}),
		galleryPhotoSlider = new App.Views.Slider({
			el: '.js-galleryPhotoSlider',
			collection: galleryCollection
		});
	App.showPhotoSlider = new App.Views.Slider({
		el: '.js-showPhotoSlider',
		collection: showGalleryCollection
	});
	var newsView = new App.Views.News({
		collection: App.newsCollection
	}),
		newsArchiveView = new App.Views.NewsArchive({
			collection: newsArchiveCollection
		});

	App.router = new App.Router.App();

	Backbone.history.start();

	console.info('App init');
});
