// External dependencies
var concat  = require('gulp-concat'),
    del     = require('del'),
    eslint  = require('gulp-eslint'),
    express = require('express'),
    fs      = require('fs'),
    gulp    = require('gulp'),
    gulpif  = require('gulp-if'),
    gzip    = require('gulp-gzip'),
    hb      = require('gulp-compile-handlebars'),
    less    = require('gulp-less'),
    marked  = require('marked'),
    moment  = require('moment'),
    minCSS  = require('gulp-minify-css'),
    minHTML = require('gulp-minify-html'),
    minJS   = require('gulp-uglify'),
    mocha   = require('gulp-mocha'),
    runSeq  = require('run-sequence'),
    zlib    = require('zlib');


// Catchall to copy static files to build
gulp.task('static', function() {
    return gulp.src('src/static/**')
        .pipe(gzip({ append: false }))
        .pipe(gulp.dest('build'));
});


// Copy fonts from bower packages
gulp.task('fonts', function() {
    return gulp.src([
        'node_modules/font-awesome/fonts/fontawesome-webfont.eot',
        'node_modules/font-awesome/fonts/fontawesome-webfont.svg',
        'node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
        'node_modules/font-awesome/fonts/fontawesome-webfont.woff',
        'node_modules/font-awesome/fonts/fontawesome-webfont.woff2'
    ])
    .pipe(gzip({ append: false }))
    .pipe(gulp.dest('build/fonts'));
});


// Minify and combine all JavaScript
gulp.task('scripts', function() {
    return gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'src/js/*.js'
        ])
        .pipe(concat('all.min.js'))
        .pipe(minJS({ preserveComments: 'some' }))
        .pipe(gzip({ append: false }))
        .pipe(gulp.dest('build/js'));
});


// Minify and combine all CSS
gulp.task('styles', function() {
    return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/font-awesome/css/font-awesome.css',
            'src/less/*.less',
        ])
        .pipe(gulpif(/[.]less$/, less()))
        .pipe(minCSS())
        .pipe(concat('all.min.css'))
        .pipe(gzip({ append: false }))
        .pipe(gulp.dest('build/css'));
});


// Compile HB template
gulp.task('views', function() {

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
        batch : ['src/views/partials/']
    }

    return gulp.src('src/views/*.html')
        .pipe(hb(data, opts))
        .pipe(minHTML())
        .pipe(gzip({ append: false }))
        .pipe(gulp.dest('build'));
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
            'src/js/*.js',
            'gulpfile.js',
            'test/*.js',
            '!node_modules/**'
        ])
        .pipe(eslint({
            rules : {
                'no-mixed-spaces-and-tabs' : 2,
                'space-after-keywords' : 2
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


// Serve files for local development
gulp.task('serve', function(callback) {
    express()
        .use(function(req, res, next) {
            res.header('Content-Encoding', 'gzip');
            next();
        })
        .use(express.static('build'))
        .use(function(req, res) {
            res.status(404)
                .sendFile(__dirname + '/build/error.html');
        })
        .listen(3000, callback);
});


// Perform a build
gulp.task('build', [
    'static',
    'fonts',
    'styles',
    'scripts',
    'views'
]);


// Watch certain files
gulp.task('watch', ['serve', 'build'], function() {
    gulp.watch('src/**', ['build']);
});


// What to do when you run `$ gulp`
gulp.task('default', ['watch']);