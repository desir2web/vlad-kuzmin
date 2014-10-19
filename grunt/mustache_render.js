module.exports = {
	options: {
		directory: 'templates/partials',
		clear_cache: true
	},
	all: {
		files: [{
			data: "json/data.json",
			template: "templates/index.mustache",
			dest: "index.html"
		}]
	}
};