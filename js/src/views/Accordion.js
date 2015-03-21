var App = App || {};
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
