// https://github.com/gulpjs/gulp/tree/master/docs
// https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');

// https://www.npmjs.com/package/gulp-webpack/
var webpack = require("gulp-webpack");

// https://www.npmjs.com/package/gulp-watch/
var watch = require('gulp-watch');

// https://github.com/terinjokes/gulp-uglify
var uglify = require('gulp-uglify');

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/server-with-livereload-and-css-injection.md
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// https://github.com/stevelacy/gulp-stylus
var stylus = require('gulp-stylus');

// https://github.com/floridoo/gulp-sourcemaps
var sourcemaps = require('gulp-sourcemaps');

// https://www.npmjs.com/package/gulp-concat/
var concat = require('gulp-concat');

// TODO https://www.npmjs.com/package/gulp-css-globbing/

// https://www.npmjs.com/package/del/
var del = require('del');

gulp.task('clear', function () {
    del([
        'dist/app*'
    ], function (err, deletedFiles) {
        console.log('###### clear dist done ######');
    });
});

gulp.task('pack_local', function() {
    gulp.src('')
        .pipe(webpack(require('./webpack.local.js')))
        // .pipe(uglify()) 总是报错 待解决 压缩先放到独立的`task:min`里
        .pipe(gulp.dest('./dist'))
    console.info('_____pack local: done');
});

gulp.task('app', function() {
    gulp.src(['dist/app.js'])
        .pipe(concat('app.min.js', {newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
    console.info('_____js concat and min: done');
});

// watch files for changes and reload
gulp.task('watch', ['pack_local'], function() {
    // console.log('__dirname:' + __dirname);
    browserSync({
        server: {
            baseDir: './'
        },
        open: "external"
    });

    gulp.watch([
        'src/**/*.js'
    ], ['pack_local', function () {
        setTimeout(function () {
            reload();
        }, 1000);
    }]);
});
