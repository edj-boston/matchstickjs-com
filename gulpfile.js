// External dependancies
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

// Minify and combine all JavaScript
gulp.task('scripts', function() {
	gulp.src('js/custom.js')
		.pipe(rename('custom.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));

	gulp.src([
		'js/boostrap.min.js',
		'js/jquery-1.11.0.min.js',
		'js/custom.min.js'
	]).pipe(concat('all.min.js'))
    	.pipe(gulp.dest('build'))
});

// Minify and combine all CSS
gulp.task('css', function() {
	gulp.src([
		'css/bootstrap.min.css',
		'css/custom.css',
		'css/font-awesome.min.css'
	]).pipe(concat('all.min.css'))
    	.pipe(gulp.dest('build'))
});

// Minify and combine all CSS
gulp.task('static', function() {
	gulp.src('fonts/*')
		.pipe(gulp.dest('build/fonts'));
	gulp.src('inc/*')
		.pipe(gulp.dest('build/inc'));
	gulp.src('img/*')
		.pipe(gulp.dest('build/img'));
	gulp.src([
		'index.html',
		'favicon.ico',
		'robots.txt'
	])
		.pipe(gulp.dest('build'));
});

// Default task
gulp.task('default', function() {
	gulp.src('build/*', {
		read : false
	}).pipe(clean());

	gulp.run('scripts');
	gulp.run('css');
	gulp.run('static');

	// Watch files and run tasks if they change
	gulp.watch('js/*', function(event) {
		gulp.run('scripts');
	});
});