// External dependancies
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");

// Minify and copy all JavaScript
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
    	.pipe(gulp.dest('js'))
});

// Default task
gulp.task('default', function() {
	gulp.run('scripts');

	// Watch files and run tasks if they change
	gulp.watch('js/*', function(event) {
		gulp.run('scripts');
	});
});