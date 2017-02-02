'use strict'

const paths = require('./config/paths.json')
const gulp = require('gulp')
const gutil = require('gulp-util')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const del = require('del')
const runsequence = require('run-sequence')
const nodemon = require('gulp-nodemon')
const mocha = require('gulp-mocha')

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

// Develop task --------------------------
// Runs build task and sets up watches.
// ---------------------------------------
gulp.task('develop', cb => {
  runsequence('build',
              'watch',
              'server', cb)
})

// Server task --------------------------
// Runs build task and sets up watches.
// ---------------------------------------
gulp.task('server', () => {
  nodemon({
    script: 'server.js',
    ext: '*',
    ignore: [
      paths.public + '*',
      paths.assets + '*',
      paths.nodeModules + '*'
    ]
  })
})

// Watch task ----------------------------
// When a file is changed, re-run the build task.
// ---------------------------------------

gulp.task('watch', ['watch:styles', 'watch:scripts', 'watch:images'])

gulp.task('watch:styles', () => {
  return gulp.watch(paths.assetsScss + '**/*.scss', ['styles'])
})

gulp.task('watch:scripts', () => {
  return gulp.watch(paths.assetsJs + '**/*.js', ['scripts'])
})

gulp.task('watch:images', () => {
  return gulp.watch(paths.assetsImg + '**/*', ['images'])
})

// Test task --------------------------
// Check that the build task copies assets
// to /public and that the app runs.
// ---------------------------------------
gulp.task('test', cb => {
  runsequence('build', ['test:app'], cb)
})

gulp.task('test:app', () => gulp.src(paths.testSpecs + 'app_spec.js', {read: false})
  .pipe(mocha({reporter: 'spec'}))
  // https://github.com/sindresorhus/gulp-mocha#test-suite-not-exiting
  .once('error', () => {
    process.exit(1)
  })
  .once('end', () => {
    process.exit()
  })
)

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
