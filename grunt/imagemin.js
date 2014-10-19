module.exports = {
	dynamic: {
		files: [{
			expand: true,
			cwd: 'img/src',
			src: ['**/*.{png,jpg,gif}'],
			dest: 'img/'
		}]
	}
};