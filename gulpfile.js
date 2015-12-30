var argv    = require('yargs').argv,
    concat  = require('gulp-concat'),
    cssNano = require('gulp-cssnano'),
    del     = require('del'),
    eslint  = require('gulp-eslint'),
    express = require('express'),
    fs      = require('fs'),
    gulp    = require('gulp'),
    gulpif  = require('gulp-if'),
    gutil   = require('gulp-util'),
    gzip    = require('gulp-gzip'),
    hb      = require('handlebars'),
    htmlMin = require('gulp-htmlmin'),
    layouts = require('handlebars-layouts'),
    less    = require('gulp-less'),
    marked  = require('marked'),
    moment  = require('moment'),
    mocha   = require('gulp-mocha'),
    path    = require('path'),
    tap     = require('gulp-tap'),
    uglify  = require('gulp-uglify');


// Configure handlebars
layouts.register(hb);


/* *
 * Build step 0
 */

// Catchall to copy static files to build
gulp.task('clean', function(done) {
    del(['build/**', '!build'])
        .then(done());
});


/* *
 * Build step 1
 */

// Catchall to copy static files to build
gulp.task('static', ['clean'], function() {
    return gulp.src('src/static/**')
        .pipe(gzip({ append: false }))
        .pipe(gulp.dest('build'));
});


// Copy fonts from bower packages
gulp.task('fonts', ['clean'], function() {
    return gulp.src([
        'node_modules/font-awesome/fonts/*',
        'node_modules/npm-font-open-sans/fonts/Regular/*',
        'node_modules/connect-fonts-sourcecodepro/fonts/default/sourcecodepro-regular.*'
    ])
    .pipe(gzip({ append: false }))
    .pipe(gulp.dest('build/fonts'));
});


// Minify and combine all JavaScript
gulp.task('scripts', ['clean'], function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'src/js/*.js'
    ])
    .pipe(concat('all.min.js'))
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(gzip({ append: false }))
    .pipe(gulp.dest('build/js'));
});


// Minify and combine all CSS
gulp.task('styles', ['clean'], function() {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/font-awesome/css/font-awesome.css',
        'src/less/custom.less'
    ])
    .pipe(gulpif(/[.]less$/, less()))
    .pipe(cssNano())
    .pipe(concat('all.min.css'))
    .pipe(gzip({ append: false }))
    .pipe(gulp.dest('build/css'));
});

// Partials
gulp.task('partials', ['clean'], function() {
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
            .pipe(htmlMin({ collapseWhitespace: true }))
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
    // Step 0: clean
    // Step 1: static, fonts, scripts, styles, partials
    // Step 2: views
    // Step 3: test
    'lint'
]);


// Watch certain files
gulp.task('watch', ['serve', 'build'], function() {
    gulp.watch([
        'src/**',
        'test/**'
    ], ['build']);
});

// What to do when you run `$ gulp`
gulp.task('default', ['watch']);