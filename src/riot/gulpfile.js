var gulp = require('gulp');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var tap = require('gulp-tap');

gulp.task('index', function () {
    var sources = gulp
    .src(['./components/*.comp.js'], {read: false})

    var transform = function (filepath, file, i, length) {
        return '<script src="' + filepath + '" type="riot/tag"></script>';
    }


    return gulp.src('./index.html')
    .pipe(inject(sources,{transform: transform,relative:true}))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function () {
    return gulp.watch('./**/*.comp.js',[ 'index' ] );
});


