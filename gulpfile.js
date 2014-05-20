/*jslint node:true*/

(function() {

    'use strict';

    var gulp = require('gulp'),
        clean = require('gulp-clean'),
        jshint = require('gulp-jshint'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        filesize = require('gulp-filesize'),
        gccompiler = require('gulp-closure-compiler');


    gulp.task('lint', function() {
        return gulp.src('hunk.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(gccompiler({
              compilerPath: '../lib/gclosure-compiler.jar',
              fileName: 'temp.js'
            }))
    });


    gulp.task('build-js', function() {
        return gulp.src('hunk.js')
            .pipe(uglify())
            .pipe(gulp.dest('dist'))
            .pipe(filesize());
    });

    gulp.task('default', ['lint', 'build-js']);
    gulp.task('build', ['default']);

    gulp.task('watch', function() {
        gulp.watch('hunk.js', ['build']);
    });

}());
