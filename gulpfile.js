// External dependencies
var fs     = require('fs'),
	md     = require('marked'),
	ms     = require('matchstick'),
	gulp   = require('gulp'),
	awsPub = require('gulp-awspublish'),
	clean  = require('gulp-clean'),
	concat = require('gulp-concat'),
	hb     = require('gulp-compile-handlebars'),
	minify = require('gulp-minify-css'),
	mocha  = require('gulp-mocha'),
	prompt = require('gulp-prompt'),
	uglify = require('gulp-uglify');

// Variables
var aws = JSON.parse(fs.readFileSync('aws.json', 'utf-8'));
var bucketLive = 'matchstickjs-com';
var bucketStage = 'stage-matchstickjs-com';
var ttlClient = 3600; // Client cache: 1 hour in seconds
var ttlEdge = 86400; // Edge cache: 1 day in seconds


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
	return gulp.src('assets/static/**')
		.pipe(gulp.dest('build'));
});

// Copy fonts from bower packages
gulp.task('fonts', ['clean'], function() {
	return gulp.src([
		'assets/bower/fontawesome/fonts/fontawesome-webfont.eot',
		'assets/bower/fontawesome/fonts/fontawesome-webfont.svg',
		'assets/bower/fontawesome/fonts/fontawesome-webfont.ttf',
		'assets/bower/fontawesome/fonts/fontawesome-webfont.woff'
	]).pipe(gulp.dest('build/fonts'));
});

// Minify and combine all JavaScript
gulp.task('scripts', ['clean'], function() {
	return gulp.src([
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
	return gulp.src([
		'assets/bower/bootstrap/dist/css/bootstrap.css',
		'assets/css/custom.css',
		'assets/bower/fontawesome/css/font-awesome.css'
	]).pipe(minify())
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest('build/css'));
});

// Compile HB template
gulp.task('views', ['clean'], function() {

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

	return gulp.src('views/*.html')
		.pipe(hb(data, opts))
		.pipe(gulp.dest('build'));
});

// Test
gulp.task('test', build, function () {
    return gulp.src('test/*')
        .pipe(mocha({reporter: 'spec'}));
});

// Deploy
gulp.task('deploy', ['test'], function() {
	return gulp.src('build')
		.pipe(prompt.prompt({
			type: 'list',
			name: 'env',
			message: 'Which environment would you like to deploy to?',
			choices: ['Stage', 'Live']
	    }, function(res) {
			var headers = { 'Cache-Control': 's-maxage='+ttlEdge+', max-age='+ttlClient };
			if(res.env == 'Live') {
				aws.bucket = bucketLive;
				var s3 = awsPub.create(aws);
				gulp.src('build/**')
					.pipe(awsPub.gzip())
					.pipe(s3.publish(headers))
					.pipe(s3.sync())
					.pipe(awsPub.reporter());
	        } else {
				aws.bucket = bucketStage;
				var s3 = awsPub.create(aws);
				gulp.src('build/**')
					.pipe(awsPub.gzip())
					.pipe(s3.publish(headers))
					.pipe(s3.sync())
					.pipe(awsPub.reporter());
	        }
		}));
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
	'views'
];

// Watch certain files
gulp.task('watch', function() {
	return gulp.watch([
		'assets/**',
		'views/**'
	], build);
});

// What to do when you run `$ gulp`
gulp.task('default', build.concat('watch'));