'use strict'

var paths = require('./config/paths.json')
var gulp = require('gulp')
var gutil = require('gulp-util')
var sass = require('gulp-sass')
var rename = require('gulp-rename')

gulp.task('default', function () {
  console.log('Default task')
})

// Styles build task ---------------------
// Compiles CSS from Sass
// Output both a minified and non-minified version into /public/css.
// ---------------------------------------

gulp.task('styles', function () {
  gulp.src(paths.assetsScss + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.publicCss))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.publicCss))
})
