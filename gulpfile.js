const gulp = require('gulp');
const rootPath = require('app-root-path');
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const sass = require('gulp-sass');

/**
 * Custom Requirements
 */
const webpackCommonConfig = require(rootPath + '/config/app.webpack.config.js');

/**
 * Clean FE Destination Folder
 */
gulp.task('clean-dist', [], () => {
	return gulp.src(rootPath + '/src/css', {read: false}).pipe(clean());
});

/**
 * Server
 */
gulp.task('server', [], () => {
	const bundler = webpack(webpackCommonConfig);
	const serverOptions = {
		stats: {
			colors: true
		},
		compress: true,
		contentBase: rootPath + '/src',
		historyApiFallback: true
	};

	const server = new WebpackDevServer(bundler, serverOptions);
	server.listen(3000);
});

/**
 * Sass
 */
gulp.task('sass', ['clean-dist'], () => {
	gulp.src(rootPath + '/src/scss/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(rootPath + '/src/css'));
})

gulp.task('watch', [], () => {
	gulp.watch(rootPath + '/src/scss/*.scss', ['sass']);
});

gulp.task('default', ['sass'], () => {
	gulp.start('watch', 'server');
});

