var gulp = require('gulp');
var inject = require('gulp-inject');
var watch = require('gulp-watch');

gulp.task('index', function () {
    var sources = gulp
    .src(['./src/components/*.tag'], {read: false})

    var transform = function (filepath, file, i, length) {
        return '<script src="src/' + filepath + '" type="riot/tag"></script>';
    };

    return gulp.src('./src/index.html')
    .pipe(inject(sources,{transform: transform,relative:true}))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function () {
    return gulp.watch('./src/**/*.tag',[ 'index' ] );
});
