var App = App || {};
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
