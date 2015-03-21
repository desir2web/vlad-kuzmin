var App = App || {};
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
