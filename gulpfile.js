'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat');


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
    gulp.src('./index.html')
        .pipe(connect.reload());
});


//handlebars
gulp.task('templates', function () {
    // Load templates from the client/templates/ folder relative to where gulp was executed
    gulp.src('templates/*.hbs')
    // Compile each Handlebars template source file to a template function
        .pipe(handlebars())
        // Wrap each template function in a call to Handlebars.template
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        // Declare template functions as properties and sub-properties of MyApp.templates
        .pipe(declare({
            namespace: 'MyApp.templates',
            noRedeclare: true // Avoid duplicate declarations
            /*processName: function(filePath) {
                // Allow nesting based on path using gulp-declare's processNameByPath()
                // You can remove this option completely if you aren't using nested folders
                // Drop the client/templates/ folder from the namespace path by removing it from the filePath
                return declare.processNameByPath(filePath.replace('templates/', ''));
            }*/
        }))
        // Concatenate down to a single file
        .pipe(concat('templates.js'))
        // Write the output into the build folder
        .pipe(gulp.dest('js/'))
        .pipe(connect.reload());
});


//js
gulp.task('js', function () {
    gulp.src('./js/main/modules/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/main'))
        .pipe(connect.reload());

});


//watch
gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./html/**/*.html', ['html']);
    gulp.watch('./index.html', ['html']);
    gulp.watch('./templates/*.hbs', ['templates']);
    gulp.watch('./js/main/modules/*.js', ['js']);
});


//default
gulp.task('default', ['connect', 'watch']);