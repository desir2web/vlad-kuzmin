var App = App || {};
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
