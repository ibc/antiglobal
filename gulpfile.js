/**
 * Dependencies.
 */
var browserify = require('browserify');
var vinyl_transform = require('vinyl-transform');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodeunit = require('gulp-nodeunit-runner');
var pkg = require('./package.json');


// Build filenames.
var builds = {
	uncompressed: pkg.name + '-' + pkg.version + '.js',
	compressed:   pkg.name + '-' + pkg.version + '.min.js'
};


gulp.task('lint', function() {
	var src = ['gulpfile.js', 'index.js', 'test/**/*.js'];
	return gulp.src(src)
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish', {verbose: true}))
		.pipe(jshint.reporter('fail'));
});


gulp.task('browserify', function() {
	var browserified = vinyl_transform(function(filename) {
		var b = browserify(filename, {
			standalone: pkg.name
		});
		return b.bundle();
	});

	var src = pkg.main;
	return gulp.src(src)
		.pipe(browserified)
		.pipe(rename(builds.uncompressed))
		.pipe(gulp.dest('dist/'));
});


gulp.task('uglify', function() {
	var src = 'dist/' + builds.uncompressed;
	return gulp.src(src)
		.pipe(uglify())
		.pipe(rename(builds.compressed))
		.pipe(gulp.dest('dist/'));
});


gulp.task('copy', function() {
	var src = 'dist/' + builds.uncompressed;
	return gulp.src(src)
		.pipe(rename(pkg.name + '.js'))
		.pipe(gulp.dest('dist/'));
});


gulp.task('test', function() {
	var src = 'test/*.js';
	return gulp.src(src)
		.pipe(nodeunit({reporter: 'default'}));
});


gulp.task('dist', gulp.series('lint', 'test', 'browserify', 'uglify', 'copy'));
gulp.task('default', gulp.series('dist'));
