var App = App || {};
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
