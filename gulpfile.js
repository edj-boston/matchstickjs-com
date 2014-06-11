// External dependencies
var fs     = require('fs'),
	md     = require('marked'),
	ms     = require('matchstick'),
	gulp   = require('gulp'),
	clean  = require('gulp-clean'),
	concat = require('gulp-concat'),
	gzip   = require('gulp-gzip'),
	hb     = require('gulp-compile-handlebars'),
	gulpif = require('gulp-if'),
	minify = require('gulp-minify-css'),
	mocha  = require('gulp-mocha'),
	s3     = require('gulp-s3'),
	moment = require('moment'),
	prompt = require('gulp-prompt'),
	uglify = require('gulp-uglify');


// Initialize
var aws = JSON.parse(fs.readFileSync('aws.json', 'utf-8'));


/* *
 * Helper tasks
 */

// Clean the build dir
gulp.task('clean', function() {
	return gulp.src('build', {
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
	]).pipe(concat('all.min.js'))
		.pipe(uglify({
			preserveComments : 'some'
		}))
		.pipe(gulp.dest('build/js'));
});

// Minify and combine all CSS
gulp.task('styles', ['clean'], function() {
	return gulp.src([
		'assets/bower/bootstrap/dist/css/bootstrap.css',
		'assets/css/custom.css',
		'assets/bower/fontawesome/css/font-awesome.css'
	]).pipe(concat('all.min.css'))
		.pipe(minify())
		.pipe(gulp.dest('build/css'));
});

// Compile HB template
gulp.task('views', ['clean'], function() {

	md.setOptions({
		renderer : new md.Renderer(),
		gfm : true
	});

	var data = {
		title : 'MatchstickJS',
		year : moment().format('YYYY'),
		timestamp : moment().format('YYYY-MM-DD-HH-mm-ss'),
		readme : md.parse(fs.readFileSync('node_modules/matchstick/README.md', 'utf-8'))
	};

	var opts = {
		partials : {
			header : fs.readFileSync('assets/views/partials/header.html', 'utf-8'),
			footer : fs.readFileSync('assets/views/partials/footer.html', 'utf-8'),
			share : fs.readFileSync('assets/views/partials/share.html', 'utf-8')
		}
	}

	return gulp.src('assets/views/*.html')
		.pipe(hb(data, opts))
		.pipe(gulp.dest('build'));
});

// Test
gulp.task('test', ['build'], function () {
    return gulp.src('test/*')
        .pipe(mocha({
        	reporter : 'spec'
        }));
});

// Prompt
gulp.task('prompt', ['test'], function() {
	return gulp.src('build', { read : false })
		.pipe(prompt.prompt({
			type : 'list',
			name : 'env',
			message : 'Which environment would you like to deploy to?',
			choices : [
				'Stage',
				'Live'
			]
	    }, function(res) {
			aws.bucket = ( res.env == 'Live' ) ? 'matchstickjs-com' : 'stage-matchstickjs-com';
		}));
});

// Deploy
gulp.task('deploy', ['prompt'], function() {
	var s3MaxAge = function(maxAge) {
		return s3(aws, {
			gzippedOnly : true,
			headers : { 'Cache-Control': 'max-age=' + maxAge + ', s-maxage=3600' }
		});
	};

	return gulp.src('build/**')
		.pipe(gzip())
		.pipe(gulpif(/.*(\.html\.gz)$/, s3MaxAge(3600), s3MaxAge(31536000)));
});


/* *
 * Default tasks
 */

// Perform a build
gulp.task('build', [
	'clean',
	'static',
	'fonts',
	'styles',
	'scripts',
	'views'
]);

// Watch certain files
gulp.task('watch', ['build'], function() {
	gulp.watch([
		'assets/**',
		'node_modules/matchstick/**'
	], ['build']);
});

// What to do when you run `$ gulp`
gulp.task('default', ['watch']);