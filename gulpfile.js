'use strict';

const argv  = require('yargs').argv,
    del     = require('del'),
    express = require('express'),
    fs      = require('fs'),
    g       = require('gulp-load-plugins')(),
    gulp    = require('gulp'),
    hb      = require('handlebars'),
    layouts = require('handlebars-layouts'),
    marked  = require('marked'),
    moment  = require('moment'),
    path    = require('path'),
    rules   = require('edj-eslint-rules');


// Configure handlebars
layouts.register(hb);


// Catchall to copy static files to build
gulp.task('clean', () => {
    return del([
        'build/**',
        '!build'
    ]);
});


// Catchall to copy static files to build
gulp.task('static', () => {
    return gulp.src('src/static/**')
        .pipe(g.if('robots.txt', g.tap(file => {
            if (process.env.TRAVIS_BRANCH == 'master') {
                file.contents = new Buffer('');
            }
        })))
        .pipe(gulp.dest('build'));
});


// Copy fonts from bower packages
gulp.task('fonts', () => {
    return gulp.src([
        'node_modules/font-awesome/fonts/*',
        'node_modules/npm-font-open-sans/fonts/Regular/*',
        'node_modules/connect-fonts-sourcecodepro/fonts/default/sourcecodepro-regular.*'
    ])
    .pipe(gulp.dest('build/fonts'));
});


// Minify and combine all JavaScript
gulp.task('scripts', () => {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'src/js/*.js'
    ])
    .pipe(g.sourcemaps.init({ loadMaps : true }))
    .pipe(g.babel({
        presets  : [ 'es2015' ],
        comments : true,
        compact  : false
    }))
    .pipe(g.concat('all.min.js'))
    .pipe(g.uglify({ preserveComments : 'some' }))
    .pipe(g.sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'));
});


// Minify and combine all CSS
gulp.task('styles', () => {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/font-awesome/css/font-awesome.css',
        'src/less/custom.less'
    ])
    .pipe(g.sourcemaps.init({ loadMaps : true }))
    .pipe(g.if('*.less', g.less()))
    .pipe(g.cssnano())
    .pipe(g.concat('all.min.css'))
    .pipe(g.sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'));
});

// Partials
gulp.task('partials', () => {
    return gulp.src([
        'src/views/partials/*',
        'src/views/layouts/*'
    ])
    .pipe(g.tap(file => {
        const name = path.parse(file.path).name;
        hb.registerPartial(name, file.contents.toString());
    }));
});


// Compile HB template
gulp.task('views', done => {
    fs.readFile('node_modules/matchstick/README.md', 'utf-8', (err, readme) => {
        if (err) throw err;

        const data = {
            title     : 'MatchstickJS',
            year      : moment().format('YYYY'),
            timestamp : moment().format('YYYY-MM-DD-HH-mm-ss'),
            readme    : marked(readme)
        };

        gulp.src('src/views/*.html')
            .pipe(g.tap(file => {
                const template = hb.compile(file.contents.toString());
                file.contents = new Buffer(template(data));
            }))
            .pipe(g.htmlmin({ collapseWhitespace : true }))
            .pipe(gulp.dest('build'))
            .on('end', done);
    });
});


// Run tests
gulp.task('test', () => {
    return gulp.src('test/*.js')
        .pipe(g.mocha({
            require : [ 'should' ]
        }));
});


// Lint as JS files (including this one)
gulp.task('lint', () => {
    return gulp.src([
        'src/js/*.js',
        'gulpfile.js',
        'test/*.js',
        '!node_modules/**'
    ])
    .pipe(g.eslint({
        extends : 'eslint:recommended',
        env     : { node : true, es6 : true, mocha : true },
        globals : { $ : true, window : true, document : true, ga : true },
        rules
    }))
    .pipe(g.eslint.format());
});


// Serve files for local development
gulp.task('serve', done => {
    const port = argv.p || 3000;

    express()
        .use(express.static('build'))
        .use((req, res) => {
            res.status(404)
                .sendFile(path.join(__dirname, '/build/error.html'));
        })
        .listen(port, () => {
            g.util.log('Server listening on port', port);
            done();
        });
});


// Check deps with David service
gulp.task('deps', () => {
    return gulp.src('package.json')
        .pipe(g.david({ update : true }))
        .pipe(gulp.dest('.'));
});


// Watch certain files
gulp.task('watch', () => {
    const globs = [
        'src/**/*',
        'test/*'
    ];

    gulp.watch(globs, [ 'build' ])
        .on('change', e => {
            g.util.log('File', e.type, e.path);
        });
});


// Build macro
gulp.task('build', done => {
    g.sequence(
        'clean',
        [ 'static', 'fonts', 'scripts', 'styles', 'partials' ],
        'views',
        'test',
        'lint'
    )(done);
});


// Deploy to AWS S3
gulp.task('deploy', () => {
    const publisher = g.awspublish.create({
        accessKeyId     : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
        region          : 'us-west-2',
        params          : { Bucket : argv.b }
    });

    return gulp.src('build/**')
        .pipe(g.awspublish.gzip())
        .pipe(publisher.publish())
        .pipe(publisher.sync())
        .pipe(g.awspublish.reporter());
});


// Examine package.json for unused deps (except for frontend and gulp)
gulp.task('package', g.depcheck({
    ignoreMatches : [
        'babel-preset-es2015',
        'bootstrap',
        'connect-fonts-sourcecodepro',
        'font-awesome',
        'gulp-*',
        'jquery',
        'matchstick',
        'npm-font-open-sans',
        'should'
    ]
}));


// What to do when you run `$ gulp`
gulp.task('default', done => {
    g.sequence(
        'deps',
        'package',
        'build',
        'watch',
        'serve'
    )(done);
});
