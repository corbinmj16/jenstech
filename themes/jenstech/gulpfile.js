const {task, watch, pipe, dest, src, series} = require('gulp');
const sass = require('gulp-sass');

const SCSS_INPUT = './source/scss/styles.scss';
const CSS_OUTPUT = './source/css';

function scssWatch() {
  return watch(SCSS_INPUT, () => {
    task(css);
  })
  .on('change', (event) => {
    console.log('changed file: ', event);
  });
}

function css() {
  return src(SCSS_INPUT)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(CSS_OUTPUT));
}

exports.watchStyles = series(scssWatch);
exports.default = series(css);

// gulp.task('scss:watch', function() {
//   return gulp
//     // Watch input folder for changes
//     // then run the 'scss' task
//     .watch(SCSS_INPUT, 'scss')
//     // Whent here is a change log it to the console
//     .on('change', (event) => {
//       console.log(event);
//     });
// });
