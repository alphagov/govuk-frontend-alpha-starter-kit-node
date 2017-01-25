'use strict'

var paths = require('./config/paths.json')
var gulp = require('gulp')
var gutil = require('gulp-util')
var sass = require('gulp-sass')
var rename = require('gulp-rename')

// Default task --------------------------
// Lists out available tasks.
// ---------------------------------------

gulp.task('default', function () {
  const cyan = gutil.colors.cyan
  const green = gutil.colors.green

  gutil.log(green('----------'))

  gutil.log(('The following main ') + cyan('tasks') + (' are available:'))

  gutil.log(cyan('build'
    ) + ': builds the contents to the public directory.'
  )
  gutil.log(cyan('develop'
    ) + ': performs an initial build then sets up watches.'
  )

  gutil.log(green('----------'))
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
