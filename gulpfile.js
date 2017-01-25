'use strict'

var paths = require('./config/paths.json')
var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('default', function () {
  console.log('Default task')
})

// Compile Sass to CSS
gulp.task('styles', function () {
  gulp.src(paths.assetsScss + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.publicCss))
})
