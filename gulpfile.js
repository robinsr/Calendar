var gulp = require('gulp');
var hub = require('gulp-hub');

gulp.task('default', function () {
  return hub([
    './src/common/gulpfile.js',
    './src/backbone/gulpfile.js',
    './src/angular/gulpfile.js'
  ]);
})