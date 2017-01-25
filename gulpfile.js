'use strict'

const paths = require('./config/paths.json')
const gulp = require('gulp')
const gutil = require('gulp-util')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const del = require('del')
const runsequence = require('run-sequence')

// Clean task ----------------------------
// Deletes the /public directory
// ---------------------------------------

gulp.task('clean', () => {
  return del(paths.public)
})

// Styles build task ---------------------
// Compiles CSS from Sass
// Output both a minified and non-minified version into /public/css.
// ---------------------------------------

gulp.task('styles', () => {
  return gulp.src(paths.assetsScss + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.publicCss))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.publicCss))
})

// Images build task ---------------------
// Copies images to /public/css
// ---------------------------------------

gulp.task('images', () => {
  return gulp.src(paths.assetsImg + '**/*')
    .pipe(gulp.dest(paths.publicImg))
})

// Scripts build task ---------------------
// Copies javascript to /public/js
// ---------------------------------------
gulp.task('scripts', () => {
  return gulp.src(paths.assetsJs + '**/*.js')
    .pipe(gulp.dest(paths.publicJs))
})

// Build task ----------------------------
// Runs other tasks that produce a built project in the public directory.
// ---------------------------------------

gulp.task('build', cb => {
  runsequence('clean', ['styles', 'images', 'scripts'], cb)
})

// Default task --------------------------
// Lists out available tasks.
// ---------------------------------------

gulp.task('default', () => {
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
