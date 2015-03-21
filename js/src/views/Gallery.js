var App = App || {};
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
