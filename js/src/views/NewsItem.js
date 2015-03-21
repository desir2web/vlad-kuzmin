var App = App || {};
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
