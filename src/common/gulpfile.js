var gulp = require('gulp');
var sass = require('gulp-sass');

var sassOpt = {outputStyle: 'compressed'};

gulp.task('build-styles', function () {
  return gulp.src('./*.scss')
    .pipe(sass(sassOpt).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
})