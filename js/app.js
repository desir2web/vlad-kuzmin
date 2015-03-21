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
;var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Collections.Breadcrumbs = Backbone.Collection.extend();
;var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Collections.Gallery = Backbone.Collection.extend({
	url: $('#galleryItemTemplate').data('url'),
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
			console.count('Gallery collection');
		});
	}
});
;var App = App || {};
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
;var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Collections.NewsArchive = Backbone.Collection.extend({
	initialize: function () {
		this.on('reset', function () {
			console.count('NewsArchive collection');
		});
	},
	parse: function (response) {
		return _.map(response.permalinks, function (item) {
			return {
				date: moment(item.split('=')[1], 'YYYYMM').format('YYYY-MM'),
				year: moment(item.split('=')[1], 'YYYYMM').format('YYYY'),
				month: moment(item.split('=')[1], 'YYYYMM').format('MMMM'),
				link: '?json=get_date_posts&date=' + moment(item.split('=')[1], 'YYYYMM').format('YYYY-MM') + '&category_name=news'
			};
		});
	},
});
;var App = App || {};
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
;var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Views.Accordion = Backbone.View.extend({
	el: '.js-accordion',
	events: {
		'click .js-accordionBtn': 'click'
	},
	initialize: function () {
		console.count('Accordion view');
	},
	click: function (e) {
		e.preventDefault();

		if ($(e.currentTarget).hasClass('expanded')) {
			this.close(e);
		} else {
			this.open(e);
		}
	},
	open: function (e) {
		var $currentBtn = $(e.currentTarget),
			$accordion = $(e.currentTarget).closest('.js-accordion'),
			$content = $accordion.find('.js-accordionContent'),
			$plus = $accordion.find('.js-accordionPlus'),
			$minus = $accordion.find('.js-accordionMinus');

		$currentBtn.addClass('expanded');
		$content.slideDown('fast');
		$plus.hide();
		$minus.show();
	},
	close: function (e) {
		var $currentBtn = $(e.currentTarget),
			$accordion = $(e.currentTarget).closest('.js-accordion'),
			$content = $accordion.find('.js-accordionContent'),
			$plus = $accordion.find('.js-accordionPlus'),
			$minus = $accordion.find('.js-accordionMinus');

		$currentBtn.removeClass('expanded');
		$content.slideUp('fast');
		$plus.show();
		$minus.hide();
	}
});
;var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Views.App = Backbone.View.extend({
	el: 'body',
	routeCounter: 0,
	events: {
		'click .js-slideArrowLeft': 'prevPage',
		'click .js-slideArrowRight': 'nextPage',
		'click .js-showVideoSliderBtn': 'showVideoSlider',
		'click .js-showPhotoSliderBtn': 'showPhotoSlider',

		'click .js-showreelVideoBtn': 'showreelVideo',
		'click .js-showProgrammVideoBtn': 'showProgrammVideo',
		'click .js-schoolVideoBtn': 'schoolVideo',

		'keyup': 'arrowSlide',
		'click .js-menuLink': 'setPointer',
		'click .js-recentNewsBtn': 'renderRecentNews',

		'mouseover .js-hoverBtn': 'mouseoverBtn',
		'mouseout .js-hoverBtn': 'mouseoutBtn'
	},
	frameWidth: 0,
	frameHeight: 0,
	framesCount: 0,
	currentFrame: 0,
	headerHeight: 0,
	footerHeight: 0,
	animationSpeed: 500,
	mouseoverBtn: function (e) {
		var $currentTarget = $(e.currentTarget);
		var self = this;

		// Fade other buttons
		this.$('.js-hoverBtn').addClass('hover-fade');
		$currentTarget.removeClass('hover-fade');
		this.$('.js-vlad').css({
			opacity: 0.6
		});

		// Add overlay
		this.$('.js-hoverOverlayHome').css({
			opacity: 0.2
		});
		this.$('.js-hoverOverlayResume').css({
			opacity: 0.2
		});
		this.$('.js-hoverOverlayShow').css({
			opacity: 0.2
		});
		this.$('.js-hoverOverlaySchool').css({
			opacity: 0.2
		});
		this.$('.js-hoverOverlayGallery').css({
			opacity: 0.2
		});
		this.$('.js-hoverOverlayNews').css({
			opacity: 0.2
		});
		this.$('.js-hoverOverlayContacts').css({
			opacity: 0.2
		});

	},
	mouseoutBtn: function (e) {
		var $currentTarget = $(e.currentTarget);
		this.$('.js-hoverBtn').removeClass('hover-fade');
		this.$('.js-vlad').css({
			opacity: 1
		});
		// Remove overlay
		var hoverOverlays = '';
		hoverOverlays += '.js-hoverOverlayHome, ';
		hoverOverlays += '.js-hoverOverlayResume, ';
		hoverOverlays += '.js-hoverOverlayShow, ';
		hoverOverlays += '.js-hoverOverlaySchool, ';
		hoverOverlays += '.js-hoverOverlayGallery, ';
		hoverOverlays += '.js-hoverOverlayNews, ';
		hoverOverlays += '.js-hoverOverlayContacts';
		this.$(hoverOverlays).css({
			opacity: 0
		});

	},
	showreelVideo: function () {
		this.$('.js-showreelVideoPopup').find('a:first').click();
	},
	showProgrammVideo: function () {
		this.$('.js-showProgrammVideoPopup').find('a:first').click();
	},
	schoolVideo: function () {
		this.$('.js-schoolVideoPopup').find('a:first').click();
	},
	isAdmin: function () {
		if ($('html.js-isAdmin').length > 0) {
			return true;
		} else {
			return false;
		}
	},
	renderRecentNews: function (e) {
		var $currentTarget = $(e.currentTarget);

		if ($currentTarget.hasClass('active')) {
			App.newsCollection.fetch({
				url: $currentTarget.data('url'),
				reset: true
			});
		} else {
			$currentTarget.addClass('active');
			App.newsCollection.fetch({
				url: $currentTarget.data('url'),
				reset: true
			});
		}
	},
	setPointer: function (e) {
		e.stopPropagation();
		var $currentTarget = $(e.currentTarget),
			$pointer = this.$('.js-menuPointer'),
			menuItemWidth = $currentTarget.outerWidth(),
			menuItemPosition = $currentTarget.position().left;
		$pointer.css({
			'-webkit-transform': 'translate3d(' + (menuItemPosition + (menuItemWidth / 2) - 5) + 'px, 0, 0)',
			'-moz-transform': 'translate3d(' + (menuItemPosition + (menuItemWidth / 2) - 5) + 'px, 0, 0)',
			'-ms-transform': 'translate3d(' + (menuItemPosition + (menuItemWidth / 2) - 5) + 'px, 0, 0)',
			'transform': 'translate3d(' + (menuItemPosition + (menuItemWidth / 2) - 5) + 'px, 0, 0)'
		});

		// Reset active class for recent news btn
		this.$('.js-menuItem').removeClass('active');
	},
	getFramesInfo: function () {
		var $window = $(window);
		this.frameWidth = $window.width() >= 940 ? $window.width() : 940;
		this.frameHeight = $window.height() >= 620 ? $window.height() : 620;
		this.framesCount = this.$('.js-section').length;

		this.headerHeight = this.$('.js-siteHeader').height();
		this.footerHeight = this.$('.js-siteFooter').height();
	},
	resize: function (e) {
		var self = this;

		$(window).off('resize');

		setTimeout(function () {
			self.setSizes();
			App.router.setActiveFrame(self.currentFrame);
			// Update custom scroll
			self.$('.js-scroll').perfectScrollbar('update');
			$(window).on('resize', function (e) {
				self.resize(e);
			});
		}, 700);
	},
	setSizes: function () {
		console.time('App view set sizes');
		var self = this;
		this.getFramesInfo();

		this.$('.js-framesContainer').css({
			'width': this.frameWidth * this.framesCount,
			'height': this.frameHeight
		});
		this.$('.js-section, .js-frame').css({
			'width': this.frameWidth,
			'height': this.frameHeight
		});
		this.$('.js-section').each(function (index, el) {
			$(el).css({
				'left': index * self.frameWidth
			});
		});
		this.$('.js-container').css({
			'height': (this.frameHeight - this.headerHeight - 30 - this.footerHeight) - (this.isAdmin() ? 32 : 0),
			'margin-top': (this.headerHeight + 30) + (this.isAdmin() ? 32 : 0)
		});
		this.$('.js-article').css({
			'height': this.frameHeight - this.headerHeight - 30 - this.footerHeight - 100 - (this.isAdmin() ? 32 : 0)
		});
		this.$('.js-tabsContent').css({
			'height': this.frameHeight - this.headerHeight - 30 - this.footerHeight - 30 - (this.isAdmin() ? 32 : 0)
		});
		this.$('.js-newsContainer').css({
			'height': this.frameHeight - this.headerHeight - 30 - this.footerHeight - 100 - (this.isAdmin() ? 32 : 0)
		});
		this.$('.js-galleryContainer').css({
			'height': this.frameHeight - this.headerHeight - 30 - this.footerHeight - 30 - (this.isAdmin() ? 32 : 0)
		});
		if (this.isAdmin()) {
			this.$('.js-siteHeader').css({
				'top': 32
			});
		}
		console.timeEnd('App view set sizes');
	},
	initialize: function () {
		var self = this;
		$(window).on('resize', function (event) {
			self.resize(event);
		});

		this.setSizes();

		// Columnizer
		this.$('.js-article').columnize({
			columns: 3,
			lastNeverTallest: true,
			buildOnce: true,
			doneFunc: function (e) {
				self.$('.column').addClass('wow fadeInDown');
				self.$('.column').each(function (index, el) {
					$(el).attr('data-wow-delay', 0.3 * (index + 0.3) + 's');
				});
			}
		});

		this.$('.js-scroll').perfectScrollbar();

		// Group show photos and video
		this.$('.js-showPhotoPopup').find('a').attr('rel', 'show-photos');
		this.$('.js-showVideoPopup').find('a').attr('rel', 'show-video');

		this.$('.js-showreelVideoPopup').find('a').attr('rel', 'showreelVideo');
		this.$('.js-showProgrammVideoPopup').find('a').attr('rel', 'showProgrammVideo');
		this.$('.js-schoolVideoPopup').find('a').attr('rel', 'schoolVideo');

		this.$('[id^="gallery-"]').each(function (index, el) {
			$(el).find('a').attr('rel', $(el).attr('id'));
		});

		// Remove wp panel
		$('html, body').attr('style', 'margin-top: 0 !important');
		console.count('App view');

	},
	setRoute: function (id) {
		App.router.navigate(App.Routes[id].route, {
			trigger: true
		});
	},
	arrowSlide: function (e) {
		switch (e.keyCode) {
		case 37:
			this.$('.js-slideArrowLeft').trigger('click');
			break;
		case 39:
			this.$('.js-slideArrowRight').trigger('click');
			break;
		}
	},
	prevPage: function () {
		console.time('App view prevPage');
		var self = this;

		self.currentFrame--;
		// To prevent dbl click
		self.$el.undelegate('.js-slideArrowLeft', 'click');
		if (self.currentFrame >= 0) {
			App.router.setActiveFrame(self.currentFrame);

			self.$el.find('.js-menuLink[data-id="' + self.currentFrame + '"]').trigger('click');

			// To prevent dbl click
			setTimeout(function () {
				self.$el.delegate('.js-slideArrowLeft', 'click', function () {
					self.prevPage();
				});
			}, 1000);
		} else {
			// To prevent dbl click
			setTimeout(function () {
				self.$el.delegate('.js-slideArrowLeft', 'click keyup', function () {
					self.prevPage();
				});
			}, 1000);

			self.$('.js-section').each(function (index, el) {
				if (index === self.framesCount - 1) {
					$(el).css({
						'left': 0 * self.frameWidth
					});
				} else {
					$(el).css({
						'left': (index + 1) * self.frameWidth
					});
				}
			});

			self.$('.js-framesContainer').css({
				'-webkit-transition': 'none',
				'-moz-transition': 'none',
				'-ms-transition': 'none',
				'transition': 'none',
				'-webkit-transform': 'translate3d(' + -1 * self.frameWidth + 'px, 0, 0)',
				'-moz-transform': 'translate3d(' + -1 * self.frameWidth + 'px, 0, 0)',
				'-ms-transform': 'translate3d(' + -1 * self.frameWidth + 'px, 0, 0)',
				'transform': 'translate3d(' + -1 * self.frameWidth + 'px, 0, 0)'
			});

			setTimeout(function () {
				self.$('.js-framesContainer').css({
					'-webkit-transition': '-webkit-transform ' + self.animationSpeed / 1000 + 's',
					'-moz-transition': '-moz-transform ' + self.animationSpeed / 1000 + 's',
					'-ms-transition': '-ms-transform ' + self.animationSpeed / 1000 + 's',
					'transition': 'transform ' + self.animationSpeed / 1000 + 's',
					'-webkit-transform': 'translate3d(' + 0 + 'px, 0, 0)',
					'-moz-transform': 'translate3d(' + 0 + 'px, 0, 0)',
					'-ms-transform': 'translate3d(' + 0 + 'px, 0, 0)',
					'transform': 'translate3d(' + 0 + 'px, 0, 0)'
				});

				setTimeout(function () {
					self.$('.js-section').each(function (index, el) {
						$(el).css({
							'left': index * self.frameWidth
						});
					});

					self.$('.js-framesContainer').css({
						'-webkit-transition': 'none',
						'-moz-transition': 'none',
						'-ms-transition': 'none',
						'transition': 'none',
						'-webkit-transform': 'translate3d(' + -(self.framesCount - 1) * self.frameWidth + 'px, 0, 0)',
						'-moz-transform': 'translate3d(' + -(self.framesCount - 1) * self.frameWidth + 'px, 0, 0)',
						'-ms-transform': 'translate3d(' + -(self.framesCount - 1) * self.frameWidth + 'px, 0, 0)',
						'transform': 'translate3d(' + -(self.framesCount - 1) * self.frameWidth + 'px, 0, 0)'
					});
					self.currentFrame = self.framesCount - 1;
				}, self.animationSpeed);

				App.router.navigate(App.Routes[(self.framesCount - 1)].route, {
					trigger: false
				});

				App.router.setOverlayColor(self.framesCount - 1);

				self.$('.js-menuLink').removeClass('active');
				self.$('.js-menuLink[data-id="' + (self.framesCount - 1) + '"]').addClass('active');

				self.$('[href="#contacts"]').trigger('click');
			}, 200);
		}
		console.timeEnd('App view prevPage');

	},
	nextPage: function () {
		console.time('App view nextPage');
		var self = this;
		self.currentFrame++;
		// To prevent dbl click
		this.$el.undelegate('.js-slideArrowRight', 'click');
		if (self.currentFrame < self.framesCount) {
			App.router.setActiveFrame(self.currentFrame);

			self.$('.js-menuLink[data-id="' + self.currentFrame + '"]').trigger('click');

			setTimeout(function () {
				self.$el.delegate('.js-slideArrowRight', 'click keyup', function () {
					self.nextPage();
				});
			}, 1000);
		} else {
			self.$('.js-section').each(function (index, el) {
				if (index === 0) {
					$(el).css({
						'left': (self.framesCount - 1) * self.frameWidth
					});
				} else {
					$(el).css({
						'left': (index - 1) * self.frameWidth
					});
				}
			});

			self.$('.js-framesContainer').css({
				'-webkit-transition': 'none',
				'-moz-transition': 'none',
				'-ms-transition': 'none',
				'transition': 'none',
				'-webkit-transform': 'translate3d(' + -(self.framesCount - 2) * self.frameWidth + 'px, 0, 0)',
				'-moz-transform': 'translate3d(' + -(self.framesCount - 2) * self.frameWidth + 'px, 0, 0)',
				'-ms-transform': 'translate3d(' + -(self.framesCount - 2) * self.frameWidth + 'px, 0, 0)',
				'transform': 'translate3d(' + -(self.framesCount - 2) * self.frameWidth + 'px, 0, 0)'
			});

			setTimeout(function () {
				self.currentFrame = 0;

				self.$('.js-framesContainer').css({
					'-webkit-transition': '-webkit-transform ' + self.animationSpeed / 1000 + 's',
					'-moz-transition': '-moz-transform ' + self.animationSpeed / 1000 + 's',
					'-ms-transition': '-ms-transform ' + self.animationSpeed / 1000 + 's',
					'transition': 'transform ' + self.animationSpeed / 1000 + 's',
					'-webkit-transform': 'translate3d(' + -(self.framesCount - 1) * self.frameWidth + 'px, 0, 0)',
					'-moz-transform': 'translate3d(' + -(self.framesCount - 1) * self.frameWidth + 'px, 0, 0)',
					'-ms-transform': 'translate3d(' + -(self.framesCount - 1) * self.frameWidth + 'px, 0, 0)',
					'transform': 'translate3d(' + -(self.framesCount - 1) * self.frameWidth + 'px, 0, 0)'
				});

				setTimeout(function () {
					self.$('.js-section').each(function (index, el) {
						$(el).css({
							'left': index * self.frameWidth
						});
					});
					self.$('.js-framesContainer').css({
						'-webkit-transition': 'none',
						'-moz-transition': 'none',
						'-ms-transition': 'none',
						'transition': 'none',
						'-webkit-transform': 'translate3d(' + self.currentFrame * self.frameWidth + 'px, 0, 0)',
						'-moz-transform': 'translate3d(' + self.currentFrame * self.frameWidth + 'px, 0, 0)',
						'-ms-transform': 'translate3d(' + self.currentFrame * self.frameWidth + 'px, 0, 0)',
						'transform': 'translate3d(' + self.currentFrame * self.frameWidth + 'px, 0, 0)'
					});

					setTimeout(function () {
						self.$el.delegate('.js-slideArrowRight', 'click keyup', function () {
							self.nextPage();
						});
					}, 300);
				}, self.animationSpeed);

				App.router.navigate(App.Routes[0].route, {
					trigger: false
				});

				App.router.setOverlayColor(0);
				self.$('[href="#home"]').trigger('click');

				self.$('.js-menuLink').removeClass('active');
				self.$('.js-menuLink[data-id="0"]').addClass('active');

				App.router.resetWow();
			}, 200);
		}
		console.timeEnd('App view nextPage');
	},
	showVideoSlider: function () {
		this.$('.js-showVideoPopup a').eq(0).trigger('click');
	},
	showPhotoSlider: function (e) {
		e.preventDefault();
		var $currentTarget = $(e.currentTarget);
		self.$('.js-showPhotoSlider').fadeIn('fast', function () {
			App.showPhotoSlider.$('.js-sliderContainer').css({
				'margin-left': (App.showPhotoSlider.$('.js-sliderInner').width() - App.showPhotoSlider.slideWidth) / 2
			});

			App.showPhotoSlider.currentSlide = 0;
			App.showPhotoSlider.setActiveSlide(0);

			$('body').off('keyup');

			$('body').on('keyup', function (e) {
				App.showPhotoSlider.arrowSlide(e);
			});
		});
	}
});
;var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Views.Gallery = Backbone.View.extend({
	el: '.js-gallery',
	events: {
		'click .js-galleryPopup': 'openGallerySlider'
	},
	openGallerySlider: function (e) {
		e.preventDefault();
		var $currentTarget = $(e.currentTarget);
		App.appView.$('.js-galleryPhotoSlider').fadeIn('fast', function () {
			galleryPhotoSlider.$('.js-sliderContainer').css({
				'margin-left': (galleryPhotoSlider.$('.js-sliderInner').width() - galleryPhotoSlider.slideWidth) / 2
			});

			galleryPhotoSlider.currentSlide = $currentTarget.attr('href');
			galleryPhotoSlider.setActiveSlide($currentTarget.attr('href'));

			$('body').off('keyup');

			$('body').on('keyup', function (e) {
				galleryPhotoSlider.arrowSlide(e);
			});
		});
	},
	initialize: function () {
		this.collection.on('reset', function () {
			this.render();
		}, this);
		console.count('Gallery view');
	},
	colorbox: function (element, isIframe, width, height, iWidth, iHeight) {
		var popupsCount = $(element).length;
		App.appView.$(element).colorbox({
			maxWidth: width,
			maxHeight: height,
			innerWidth: iWidth,
			innerHeight: iHeight,
			className: 'colorbox-overlay',
			closeButton: false,
			transition: 'elastic',
			iframe: isIframe,
			onOpen: function () {
				var closeTpl = '<div class="close-popup js-colorboxCloseBtn"><div class="sprite icon icon-close"></div></div>',
					leftArrow = '<div class="arrow arrow_left arrow_always js-colorboxArrowLeft"><svg viewBox="0 0 64.347 127.279" class="icon icon-slida-arrow-left"><use xlink:href="#slide-arrow-left"></use></svg></div>',
					rightArrow = '<div class="arrow arrow_right arrow_always js-colorboxArrowRight"><svg viewBox="0 0 64.347 127.279" class="icon icon-slida-arrow-right"><use xlink:href="#slide-arrow-right"></use></svg></div>',
					miniLogo = '<div class="js-colorboxLogo colorbox-logo"></div>';

				$('.js-colorboxLogo').remove();
				if ($('.js-colorboxLogo').length === 0 && isIframe) {
					$('body').append(miniLogo);
				}

				$('.js-colorboxArrowLeft, .js-colorboxArrowRight').remove();
				if ($('.js-colorboxCloseBtn').length === 0) {
					$('body').append(closeTpl);
				}
				if (popupsCount > 1) {
					$('body').append(leftArrow + rightArrow);
				}

				// close
				$('body').on('click', '.js-colorboxCloseBtn', function () {
					$.colorbox.close();
					$(this).remove();
				});

				// prev
				$('body').on('click', '.js-colorboxArrowLeft', function () {
					$.colorbox.prev();
				});
				// next
				$('body').on('click', '.js-colorboxArrowRight', function () {
					$.colorbox.next();
				});



				$('body').off('keyup');
			},
			onCleanup: function () {
				$('.js-colorboxCloseBtn, .js-colorboxArrowLeft, .js-colorboxArrowRight').remove();
				$('body').on('keyup', function (e) {
					App.appView.arrowSlide(e);
				});
				$('.js-colorboxLogo').remove();
			}
		});
	},
	render: function () {
		var self = this;
		this.collection.each(function (galleryItem) {
			var galleryItemView = new App.Views.GalleryItem({
				model: galleryItem
			});
			this.$('.js-galleryContainer').find('ul').append(galleryItemView.el);
		}, this);

		// Gallery scroll init
		this.$('.js-scroll').perfectScrollbar({
			wheelSpeed: 40
		});

		// Color box
		this.colorbox('.gallery-icon a', false, '70%', '70%', '', '');

		this.colorbox('.js-showreelVideoPopup a', true, 768, 480, 768, 768);
		this.colorbox('.js-showProgrammVideoPopup a', true, 768, 480, 768, 768);
		this.colorbox('.js-schoolVideoPopup a', true, 768, 480, 768, 768);

		this.colorbox('.js-showVideoPopup a', true, 768, 480, 768, 768);
		this.colorbox('.js-showResumeVideoSliderBtn', true, 768, 480, 768, 768);
	}
});
;var App = App || {};
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
;var App = App || {};
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
;var App = App || {};
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
;var App = App || {};
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
;var App = App || {};
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
;var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Views.NewsArchiveItem = Backbone.View.extend({
	template: $('#newsArchiveItemTemplate').html(),
	tagName: 'li',
	className: 'news__item news__item_archive wow rollIn',
	initialize: function () {
		this.render();
		console.count('NewsArchiveItem view');
	},
	render: function () {
		var rendered = Mustache.render(this.template, this.model.toJSON());
		this.$el.html(rendered);
		return this;
	}
});
;var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Views.NewsItem = Backbone.View.extend({
	template: $('#newsItemTemplate').html(),
	tagName: 'li',
	className: 'news__item wow rollIn',
	events: {
		'click': 'openNews'
	},
	openNews: function (e) {
		var $currentTarget = $(e.currentTarget),
			newsContent = $currentTarget.find('.js-newsText').data('content');
		var $newsContent = $('.js-newsPage').html($(newsContent).addClass('wow rotateInUpLeft'));

		// Colorbox reinit
		App.appView.$('.js-newsPage').find('a').attr('rel', 'news-gallery-' + this.model.get('date'));
		galleryView.colorbox('.gallery-icon a', false, '70%', '70%', '', '');

		// Accordion reinit
		newsView.$('.js-accordionBtn').on('click', function (e) {
			e.preventDefault();
			accordionView.click(e);
		});
	},
	initialize: function () {
		this.render();
		console.count('NewsItem view');
	},
	render: function () {
		var date = this.model.get('date'),
			slug = this.model.get('categories')[0].slug;
		// Set day number and month
		this.model.set('dayNumber', moment(date).format('DD'));
		this.model.set('month', moment(date).format('MMMM'));
		// Set important from slug
		if (slug === 'important') {
			this.model.set('important', true);
		}

		var rendered = Mustache.render(this.template, this.model.toJSON());
		this.$el.html(rendered);
		return this;
	}
});
;var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Views.Slider = Backbone.View.extend({
	events: {
		'click .js-slideLeft': 'prevSlide',
		'click .js-slideRight': 'nextSlide',
		'click .js-closeBtn': 'close'
	},
	slidesCount: 0,
	slideWidth: 0,
	currentSlide: 0,
	arrowSlide: function (e) {
		switch (e.keyCode) {
		case 37:
			this.$('.js-slideLeft').trigger('click');
			break;
		case 39:
			this.$('.js-slideRight').trigger('click');
			break;
		case 27:
			this.close();
			break;
		}
	},
	escape: function (e) {
		if (e.keyCode === 27) {
			this.close();
		}
	},
	close: function () {
		this.$el.fadeOut('fast');
		$('body').on('keyup', function (e) {
			App.appView.arrowSlide(e);
		});
	},
	initialize: function () {
		var self = this;

		this.collection.on('reset', function () {
			this.slidesCount = this.collection.models.length;
			this.slideWidth = this.$('.js-sliderItem').width();
			this.$('.js-slideLeft').hide();

			this.$('.js-sliderContainer').css({
				'width': this.slidesCount * this.slideWidth
			});

			$('body').on('keyup', function (e) {
				self.escape(e);
			});

			this.$('.js-slideArrow').show();
		}, this);
		console.count('Slider view');
	},
	setActiveSlide: function (slide) {
		this.$('.js-sliderItem').removeClass('active');
		this.$('.js-sliderItem[data-id="' + slide + '"]').addClass('active');
		this.$('.js-sliderContainer').animate({
			'left': -slide * this.slideWidth
		}, App.appView.animationSpeed);

		this.$('.js-slideArrow').show();

		if (parseInt(slide, 10) === 0) {
			this.$('.js-slideLeft').hide();
		} else if (parseInt(slide, 10) === this.slidesCount - 1) {
			this.$('.js-slideRight').hide();
		} else {
			this.$('.js-slideArrow').show();
		}

	},
	prevSlide: function (e) {
		var self = this;
		this.currentSlide--;
		if (this.currentSlide > 0) {
			this.$('.js-slideArrow').show();
			this.setActiveSlide(this.currentSlide);
		} else {
			this.currentSlide = 0;
			this.setActiveSlide(this.currentSlide);
			$(e.currentTarget).hide();
		}
	},
	nextSlide: function (e) {
		var self = this;
		this.currentSlide++;
		if (this.currentSlide < this.slidesCount - 1) {
			this.$('.js-slideArrow').show();
			this.setActiveSlide(this.currentSlide);
		} else {
			this.currentSlide = this.slidesCount - 1;
			this.setActiveSlide(this.currentSlide);
			$(e.currentTarget).hide();
		}
	}
});
;var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Views.Tabs = Backbone.View.extend({
	el: '.js-tabs',
	events: {
		'click .js-tabBtn': 'setTab'
	},
	initialize: function () {
		setTimeout(function () {
			$('.js-tabBtn.active').trigger('click');
		}, 0);
		console.count('Tabs view');
	},
	setTab: function (e) {
		e.preventDefault();

		var $currentTab = $(e.currentTarget),
			currentTabId = $currentTab.attr('href');

		if (!$currentTab.hasClass('active') || !this.$('.js-tabsContent').is(':visible')) {
			this.resetTabsContent();
			$(currentTabId).fadeIn('slow');
			$currentTab.addClass('active');
		}
	},
	resetTabsContent: function () {
		this.$('.js-tabsContent').hide();
		this.$('.js-tabBtn').removeClass('active');
	}
});
;var App = App || {};
App.Collections = App.Collections || {};
App.Models = App.Models || {};
App.Views = App.Views || {};
App.Router = App.Router || {};

App.Router.App = Backbone.Router.extend({
	routes: {
		'': 'home',
		'home': 'home',
		'resume': 'resume',
		'show': 'show',
		'schools': 'schools',
		'schools/:id': 'school',
		'schools/:id/teachers': 'schoolTeachers',
		'schools/:id/teachers/:id': 'schoolTeacher',
		'schools/:id/photo': 'schoolPhoto',
		'schools/:id/schedule': 'schoolSchedule',
		'schools/:id/video': 'schoolVideo',
		'gallery': 'gallery',
		'news': 'news',
		'contacts': 'contacts',
		'*path': 'home'
	},
	activeFrame: 0,
	isActiveMenuItemSet: false,
	breadcrumbsTemplate: $('#breadcrumbsTemplate').html(),
	resetWow: function () {
		$('.animated').not('.pace, .js-loadingFade').removeClass('animated');
		new WOW().init();
	},
	setActiveFrame: function (frame) {
		console.time('Router setActiveFrame');
		App.appView.$('.js-menuLink').removeClass('active');
		var $activeMenuLink = App.appView.$('.js-menuLink[data-id="' + frame + '"]'),
			self = this;
		$activeMenuLink.addClass('active');

		if (!this.isActiveMenuItemSet) {
			setTimeout(function () {
				$activeMenuLink.trigger('click');
			}, 300);
			this.isActiveMenuItemSet = true;
		}

		// WOW css animation init
		this.resetWow();

		App.appView.$('.js-framesContainer').css({
			'-webkit-transform': 'translate3d(' + -frame * App.appView.frameWidth + 'px, 0, 0)',
			'-moz-transform': 'translate3d(' + -frame * App.appView.frameWidth + 'px, 0, 0)',
			'-ms-transform': 'translate3d(' + -frame * App.appView.frameWidth + 'px, 0, 0)',
			'transform': 'translate3d(' + -frame * App.appView.frameWidth + 'px, 0, 0)',
			'-webkit-transition': '-webkit-transform ' + App.appView.animationSpeed / 1000 + 's',
			'-moz-transition': '-moz-transform ' + App.appView.animationSpeed / 1000 + 's',
			'-ms-transition': '-ms-transform ' + App.appView.animationSpeed / 1000 + 's',
			'transition': 'transform ' + App.appView.animationSpeed / 1000 + 's'
		});

		this.navigate(App.Routes[frame].route, {
			trigger: false
		});

		self.setOverlayColor(frame);

		// Close all accordions
		var $accordionBtn = App.appView.$('.js-accordionBtn'),
			$accordion = App.appView.$('.js-accordion'),
			$content = $accordion.find('.js-accordionContent'),
			$plus = $accordion.find('.js-accordionPlus'),
			$minus = $accordion.find('.js-accordionMinus');

		$accordionBtn.removeClass('expanded');
		$content.slideUp('fast');
		$plus.show();
		$minus.hide();

		console.info('Set route: ' + App.Routes[frame].route + ' #' + frame);
		console.timeEnd('Router setActiveFrame');
	},
	getRouteId: function (routeName) {
		var pageId = null;
		_.find(App.Routes, function (route, i) {
			if (route.route === routeName) {
				pageId = i;
				return route;
			}
		});

		return pageId;
	},
	setOverlayColor: function (frame) {
		App.appView.$('.js-colorOverlay').css({
			'background-color': App.Routes[frame].color,
			'background': 'url(' + App.Routes[frame].img + ')'
		});
	},
	setBreadcrumbs: function () {
		console.info('Add crumb');

		var $breadcrumbs = App.appView.$('.js-breadcrumbs'),
			crumbsArray = Backbone.history.fragment.split('/'),
			schoolId = crumbsArray[1],
			teacherId = crumbsArray[3];

		App.breadcrumbsCollection.reset();

		console.log(crumbsArray[1]);

		_.each(crumbsArray, function (crumb, index) {
			switch (index) {
			case 0:
				App.breadcrumbsCollection.add({
					name: 'Школы танцев',
					link: '#schools'
				});
				break;
			case 1:
				App.breadcrumbsCollection.add({
					name: 'Школа №' + schoolId,
					link: '#schools/' + schoolId
				});
				break;
			case 2:
				if (crumb === 'photo') {
					App.breadcrumbsCollection.add({
						name: 'Фото школы №' + schoolId,
						link: '#schools/' + schoolId + '/photo'
					});
				}
				if (crumb === 'video') {
					App.breadcrumbsCollection.add({
						name: 'Видео школы №' + schoolId,
						link: '#schools/' + schoolId + '/video'
					});
				}
				if (crumb === 'schedule') {
					App.breadcrumbsCollection.add({
						name: 'Расписание школы №' + schoolId,
						link: '#schools/' + schoolId + '/schedule'
					});
				}
				if (crumb === 'teachers') {
					App.breadcrumbsCollection.add({
						name: 'Преподаватели',
						link: '#schools/' + schoolId + '/teachers'
					});
				}
				break;
			case 3:
				App.breadcrumbsCollection.add({
					name: 'Преподаватель №' + teacherId,
					link: '#schools/' + schoolId + '/teachers/' + teacherId
				});
				break;
			}
		});
		var breadcrumbsData = {
			breadcrumbs: App.breadcrumbsCollection.toJSON()
		};
		var rendered = Mustache.render(this.breadcrumbsTemplate, breadcrumbsData);
		$breadcrumbs.html(rendered);
	},
	home: function () {
		var id = this.getRouteId('home');
		this.setActiveFrame(id);
		App.appView.currentFrame = id;

		// Replay logo animation
		var $logoAnimation = App.appView.$('.js-logoAnimation'),
			gifUrl = $logoAnimation.data('url');
		$logoAnimation.attr('src', gifUrl);
	},
	resume: function () {
		var id = this.getRouteId('resume');
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
	},
	show: function () {
		var id = this.getRouteId('show');
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
	},
	schools: function () {
		var id = this.getRouteId('schools'),
			crumb = {
				link: App.Routes[id].route,
				name: 'Школы танцев'
			};

		this.setBreadcrumbs();
		this.setActiveFrame(id);
		App.appView.currentFrame = id;

		console.log('all schools');
	},
	school: function (schoolId) {
		var id = this.getRouteId('schools'),
			crumb = {
				link: App.Routes[id].route + '/' + schoolId,
				name: 'School #' + schoolId
			};


		this.setBreadcrumbs();


		this.setActiveFrame(id);
		App.appView.currentFrame = id;
		// Set route
		this.navigate(App.Routes[id].route + '/' + schoolId, {
			trigger: false
		});
		console.log('current school is: ' + schoolId);
	},
	schoolPhoto: function (schoolId) {
		var id = this.getRouteId('schools');
		this.setActiveFrame(id);
		this.setBreadcrumbs();
		App.appView.currentFrame = id;
		// Set route
		this.navigate(App.Routes[id].route + '/' + schoolId + '/photo', {
			trigger: false
		});
		console.log('Photo of school number: ' + schoolId);
	},
	schoolSchedule: function (schoolId) {
		var id = this.getRouteId('schools');
		this.setBreadcrumbs();
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
		// Set route
		this.navigate(App.Routes[id].route + '/' + schoolId + '/schedule', {
			trigger: false
		});
		console.log('Schedule of school number: ' + schoolId);
	},
	schoolVideo: function (schoolId) {
		var id = this.getRouteId('schools');
		this.setBreadcrumbs();
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
		// Set route
		this.navigate(App.Routes[id].route + '/' + schoolId + '/video', {
			trigger: false
		});
		console.log('Video of school number: ' + schoolId);
	},
	schoolTeachers: function (schoolId) {
		var id = this.getRouteId('schools');
		this.setBreadcrumbs();
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
		// Set route
		this.navigate(App.Routes[id].route + '/' + schoolId + '/teachers', {
			trigger: false
		});
		console.log('Teachers of school number: ' + schoolId);
	},
	schoolTeacher: function (schoolId, teacherId) {
		var id = this.getRouteId('schools');
		this.setBreadcrumbs();
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
		// Set route
		this.navigate(App.Routes[id].route + '/' + schoolId + '/teachers/' + teacherId, {
			trigger: false
		});
		console.log('Teacher: ' + teacherId + ' of school number: ' + schoolId);
	},
	gallery: function () {
		var id = this.getRouteId('gallery');
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
	},
	news: function () {
		var id = this.getRouteId('news');
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
	},
	contacts: function () {
		var id = this.getRouteId('contacts');
		this.setActiveFrame(id);
		App.appView.currentFrame = id;
	}
});
;//# sourceMappingURL=app.js.map