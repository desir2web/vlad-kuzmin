var App = App || {};
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
