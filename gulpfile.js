var gulp = require('gulp');
var hub = require('gulp-hub');

gulp.task('default', function () {
  return hub([
    './src/main/resources/public/common/gulpfile.js',
    './src/main/resources/public/backbone/gulpfile.js',
    './src/main/resources/public/knockout/gulpfile.js',
    './src/main/resources/public/angular/gulpfile.js',
    './src/main/resources/public/vanilla/gulpfile.js',
    './src/main/resources/public/react/gulpfile.js',
  ]);
})