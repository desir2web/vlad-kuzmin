module.exports = {
    options: {
        sourceMap: true,
        sourceMapFilename: 'css/style.css.map',
        sourceMapRootpath: '../',
        yuicompress: false,
        compress: false
    },
    build: {
        files: {
            "css/main.css": "less/main.less"
        }
    }
};