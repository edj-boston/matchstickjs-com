// External dependancies
var fs = require('fs');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var hb = require('gulp-compile-handlebars');
var matchstick = require('matchstick');
var md = require('marked');


/* *
 * Helper tasks
 */

// Clean the build dir
gulp.task('clean', function() {
	return gulp.src('build/**/*', {
		read : false
	}).pipe(clean());
});

// Copy static files to build
gulp.task('static', ['clean'], function() {
	gulp.src('static/**')
		.pipe(gulp.dest('build'));
});

// Minify and combine all JavaScript
gulp.task('scripts', ['clean'], function() {
	gulp.src([
		'static/js/boostrap.js',
		'static/js/jquery-2.1.1.js',
		'static/js/custom.js',
		'static/js/google-analytics.js'
	]).pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest('build/js'));
});

// Minify and combine all CSS
gulp.task('styles', ['clean'], function() {
	gulp.src([
		'static/css/bootstrap.css',
		'static/css/custom.css',
		'static/css/font-awesome.css'
	]).pipe(minify())
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest('build/css'));
});

// Compile HB template
gulp.task('templates', ['clean'], function() {

	md.setOptions({
		renderer: new md.Renderer(),
		gfm: true
	});

	var data = {
		title: 'MatchstickJS',
		readme: md.parse(fs.readFileSync('node_modules/matchstick/README.md', 'utf-8'))
	};

	var opts = {
		partials : {
			header : fs.readFileSync('views/partials/header.html', 'utf-8'),
			footer : fs.readFileSync('views/partials/footer.html', 'utf-8')
		}
	}

	gulp.src('views/*.html')
		.pipe(hb(data, opts))
		.pipe(gulp.dest('build'));
});


/* *
 * Default tasks
 */

// Build steps (gulp task names)
var build = [
	'clean',
	'static',
	'styles',
	'scripts',
	'templates'
];

// Watch certain files
gulp.task('watch', function() {
	gulp.watch([
		'static/**',
		'views/**'
	], build);
});

// What to do when you run `$ gulp`
gulp.task('default', build.concat('watch'));