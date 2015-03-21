module.exports = {
	options: {
		separator: ';',
	},
	dist: {
		src: [
			'js/src/app.js',
			'js/src/collections/*.js',
			'js/src/views/*.js',
			'js/src/models/*.js',
			'js/src/routers/*.js'
		],
		dest: 'js/app.js',
	}
};
