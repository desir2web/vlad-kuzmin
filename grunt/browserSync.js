module.exports = {
	bsFiles: {
		src: [
			'css/*.css',
			'js/app.js',
			'index.php',
			'partials/*.php'
		]
	},
	options: {
		proxy: 'wordpress.loc',
		open: false,
		watchTask: true
	}
};
