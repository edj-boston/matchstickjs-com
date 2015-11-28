// External dependencies
var concat = require('gulp-concat'),
//    coveralls = require('gulp-coveralls'),
	del    = require('del'),
    eslint = require('gulp-eslint');
	fs     = require('fs'),
	gulp   = require('gulp'),
	gulpif = require('gulp-if'),
	gzip   = require('gulp-gzip'),
 //   istanbul = require('gulp-istanbul'),
	hb     = require('gulp-compile-handlebars'),
	marked = require('marked'),
	moment = require('moment'),
	minify = require('gulp-minify-css'),
	mocha  = require('gulp-mocha'),
	prompt = require('gulp-prompt'),
	s3     = require('gulp-s3'),
	sass   = require('gulp-sass'),
	uglify = require('gulp-uglify');


// Initialize
var aws = JSON.parse(fs.readFileSync('aws.json', 'utf-8'));


/* *
 * Helper tasks
 */


// Clean the build dir
gulp.task('clean', function() {
	return del('build');
});


// Catchall to copy static files to build
gulp.task('static', ['clean'], function() {
	return gulp.src('assets/static/**')
		.pipe(gulp.dest('build'));
});


// Copy fonts from bower packages
gulp.task('fonts', ['clean'], function() {
	return gulp.src([
		'node_modules/font-awesome/fonts/fontawesome-webfont.eot',
		'node_modules/font-awesome/fonts/fontawesome-webfont.svg',
		'node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
		'node_modules/font-awesome/fonts/fontawesome-webfont.woff'
	]).pipe(gulp.dest('build/fonts'));
});


// Minify and combine all JavaScript
gulp.task('scripts', ['clean'], function() {
	return gulp.src([
		'node_modules/jquery/dist/jquery.js',
		'node_modules/bootstrap/dist/js/bootstrap.js',
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
		'assets/scss/*.scss',
		'node_modules/bootstrap/dist/css/bootstrap.css',
		'node_modules/font-awesome/css/font-awesome.css'
	]).pipe(gulpif(/[.]scss$/, sass()))
		.pipe(minify())
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest('build/css'));
});


// Compile HB template
gulp.task('views', ['clean'], function() {

	marked.setOptions({
		renderer : new marked.Renderer(),
		gfm : true
	});

	var data = {
		title : 'MatchstickJS',
		year : moment().format('YYYY'),
		timestamp : moment().format('YYYY-MM-DD-HH-mm-ss'),
		readme : marked.parse(fs.readFileSync('node_modules/matchstick/README.md', 'utf-8'))
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


// Run tests
gulp.task('test', ['build'], function () {
    return gulp.src(['test/*.js'])
        .pipe(mocha());
});


// Run tests and product coverage
gulp.task('coveralls', ['test'], function () {
    return gulp.src('coverage/lcov.info')
        .pipe(coveralls());
});


// Lint as JS files (including this one)
gulp.task('lint', function () {
    return gulp.src([
            'assets/js/*.js',
            'gulpfile.js',
            'test/*.js',
            '!node_modules/**'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
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