module.exports = {
    dist: {
        options: {
            sourceMap: false
        },
        files: {
            'vendors/plugins.min.js': [
                'bower_components/momentjs/moment.js',
                'bower_components/momentjs/locale/ru.js',
                'bower_components/jquery/dist/jquery.js',
                'bower_components/mustache/mustache.js',
                'bower_components/jquery-colorbox/jquery.colorbox.js',
                'bower_components/jquery-colorbox/i18n/jquery.colorbox-ru.js',
                'bower_components/perfect-scrollbar/min/perfect-scrollbar.with-mousewheel.min.js',
                'bower_components/jquery.columnizer/src/jquery.columnizer.js',
                'bower_components/WOW/dist/wow.js',
                'bower_components/mustache/mustache.js',
                'bower_components/underscore/underscore.js',
                'bower_components/backbone/backbone.js'
            ]
        }
    }
};