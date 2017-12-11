'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify');


//server connect
gulp.task('connect', function () {
    connect.server({
        port: 8080,
        livereload: true
    });
});


//helpers
gulp.task('sass', function () {
    gulp.src('./scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCss())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});


//html
gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(connect.reload());
});


//js
gulp.task('js', function () {
    gulp.src('./js/main/main.js')
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./js/main'))
        .pipe(connect.reload());

});


//watch
gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./*.html', ['html']);
    gulp.watch('./js/main/*.js', ['js']);
});


//default
gulp.task('default', ['connect', 'watch']);