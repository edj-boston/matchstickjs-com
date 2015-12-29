var argv      = require('yargs').argv,
    concat    = require('gulp-concat'),
    eslint    = require('gulp-eslint'),
    express   = require('express'),
    fs        = require('fs'),
    gulp      = require('gulp'),
    gulpif    = require('gulp-if'),
    gutil     = require('gulp-util'),
    gzip      = require('gulp-gzip'),
    hb        = require('handlebars'),
    layouts   = require('handlebars-layouts'),
    less      = require('gulp-less'),
    marked    = require('marked'),
    moment    = require('moment'),
    minCSS    = require('gulp-minify-css'),
    minHTML   = require('gulp-minify-html'),
    minJS     = require('gulp-uglify'),
    mocha     = require('gulp-mocha'),
    path      = require('path'),
    tap       = require('gulp-tap');


// Configure handlebars
layouts.register(hb);


/* *
 * Build step 1
 */

// Catchall to copy static files to build
gulp.task('static', function() {
    return gulp.src('src/static/**')
        .pipe(gzip({ append: false }))
        .pipe(gulp.dest('build'));
});


// Copy fonts from bower packages
gulp.task('fonts', function() {
    return gulp.src([
        'node_modules/font-awesome/fonts/*',
        'node_modules/npm-font-open-sans/fonts/Regular/*'
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
        'src/less/*.less'
    ])
    .pipe(gulpif(/[.]less$/, less()))
    .pipe(minCSS())
    .pipe(concat('all.min.css'))
    .pipe(gzip({ append: false }))
    .pipe(gulp.dest('build/css'));
});

// Partials
gulp.task('partials', function() {
    return gulp.src([
        'src/views/partials/*',
        'src/views/layouts/*'
    ])
    .pipe(tap(function(file) {
        var name = path.parse(file.path).name;
        hb.registerPartial(name, file.contents.toString());
    }));
});


/* *
 * Build step 2
 */

// Compile HB template
gulp.task('views', ['static', 'fonts', 'scripts', 'styles', 'partials'], function(done) {
    fs.readFile('node_modules/matchstick/README.md', 'utf-8', function(err, file) {
        var data = {
            title     : 'MatchstickJS',
            year      : moment().format('YYYY'),
            timestamp : moment().format('YYYY-MM-DD-HH-mm-ss'),
            readme    : marked(file)
        };

        gulp.src('src/views/*.html')
            .pipe(tap(function(file) {
                var template = hb.compile(file.contents.toString());
                file.contents = new Buffer(template(data));
            }))
            .pipe(minHTML())
            .pipe(gzip({ append: false }))
            .pipe(gulp.dest('build'))
            .on('end', done);
    });
});


/* *
 * Build step 3
 */

// Run tests
gulp.task('test', ['views'], function () {
    return gulp.src('test/*.js')
        .pipe(mocha());
});


/* *
 * Build step 4
 */

// Lint as JS files (including this one)
gulp.task('lint', ['test'], function () {
    return gulp.src([
        'src/js/*.js',
        'gulpfile.js',
        'test/*.js',
        '!node_modules/**'
    ])
    .pipe(eslint())
    .pipe(eslint.format());
});


/* *
 * Helper tasks
 */

// Serve files for local development
gulp.task('serve', function(callback) {
    var port = argv.p || 3000;

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
        .listen(port, function() {
            gutil.log('Server listening on port', port);
            callback();
        });
});


// Perform a build
gulp.task('build', [
    // Step 1: static, fonts, scripts, styles, partials
    // Step 2: views
    // Step 3: test
    'lint'
]);


// Watch certain files
gulp.task('watch', ['serve', 'lint'], function() {
    gulp.watch([
        'src/**',
        'test/**'
    ], ['lint']);
});

// What to do when you run `$ gulp`
gulp.task('default', ['watch']);