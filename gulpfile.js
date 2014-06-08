// External dependancies
var fs = require('fs');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var awspublish = require('gulp-awspublish');
var hb = require('gulp-compile-handlebars');
var md = require('marked');
var matchstick = require('matchstick');

// Variables
var awsCreds = JSON.parse(fs.readFileSync('aws.json', 'utf-8'));
var bucketLive = 'matchstickjs-com';
var bucketStage = 'stage-matchstickjs-com';
var TTLClient = 86400; // Client cache, in seconds
var TTLEdge = 86400; // Edge cache, in seconds

/* *
 * Helper tasks
 */

// Clean the build dir
gulp.task('clean', function() {
	return gulp.src('build/**/*', {
		read : false
	}).pipe(clean());
});

// Catchall to copy static files to build
gulp.task('static', ['clean'], function() {
	gulp.src('assets/static/**')
		.pipe(gulp.dest('build'));
});

// Copy fonts from bower packages
gulp.task('fonts', ['clean'], function() {
	gulp.src([
		'assets/bower/fontawesome/fonts/fontawesome-webfont.eot',
		'assets/bower/fontawesome/fonts/fontawesome-webfont.svg',
		'assets/bower/fontawesome/fonts/fontawesome-webfont.ttf',
		'assets/bower/fontawesome/fonts/fontawesome-webfont.woff'
	]).pipe(gulp.dest('build/fonts'));
});

// Minify and combine all JavaScript
gulp.task('scripts', ['clean'], function() {
	gulp.src([
		'assets/bower/jquery/dist/jquery.js',
		'assets/bower/bootstrap/dist/js/bootstrap.js',
		'assets/js/custom.js',
		'assets/js/google-analytics.js'
	]).pipe(uglify({
		preserveComments : 'some'
	})).pipe(concat('all.min.js'))
		.pipe(gulp.dest('build/js'));
});

// Minify and combine all CSS
gulp.task('styles', ['clean'], function() {
	gulp.src([
		'assets/bower/bootstrap/dist/css/bootstrap.css',
		'assets/css/custom.css',
		'assets/bower/fontawesome/css/font-awesome.css'
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

gulp.task('deploy-stage', function() {

	awsCreds.bucket = bucketStage;
	var publisher = awspublish.create(awsCreds);

	var headers = {
		'Cache-Control': 's-maxage=' + TTLEdge + ', max-age=' + TTLClient
	};

	return gulp.src('build/**')
		.pipe(publisher.publish())
		.pipe(publisher.sync())
		.pipe(awspublish.reporter());
});

/* *
 * Default tasks
 */

// Build steps (gulp task names)
var build = [
	'clean',
	'static',
	'fonts',
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