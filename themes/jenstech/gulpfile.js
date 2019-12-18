// Init modules
const { src, dest, watch, pipe, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const jsConcat = require('gulp-concat');
const uglify = require('gulp-uglify');

// File path variables
const files = {
  scssPath: './source/_scss/**/*.scss',
  cssPath: './source/css',
  jsDevPath: './source/_js/**/*.js',
  jsPublicPath: './source/js',
};


// Scss tasks
function scssTask() {
  return src('./source/_scss/styles.scss')
    // put sourcemaps here if you need them
    .pipe(sass().on('error', sass.logError))
    .pipe(sass())
    .pipe(cssnano())
    .pipe(dest(files.cssPath));
}

// JS tasks
function jsTask() {
  return src(files.jsDevPath)
    .pipe(jsConcat('bundle.js'))
    .pipe(uglify())
    .pipe(dest(files.jsPublicPath));
}

// Watch task
function watchTask() {
  watch(
    [files.scssPath, files.jsDevPath],
    parallel(scssTask, jsTask)
  );
}

// Default task
exports.default = series(
  parallel(scssTask, jsTask),
  watchTask
);
