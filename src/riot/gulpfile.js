var gulp = require('gulp');
var inject = require('gulp-inject');
var watch = require('gulp-watch');

gulp.task('inject', function () {
    var sources = gulp
    .src(['./src/**/*.{tag,js}'], {read: false});

    var transform = function (filepath, file, i, length) {
        if ( /\.tag/.test( filepath ) ) {
            return '<script src="src/' + filepath + '" type="riot/tag"></script>';
        } else {
            return '<script src="src/' + filepath + '"></script>';
        }
    };

    var injectOpts = { 
        transform: transform, 
        relative: true 
    };

    return gulp.src('./src/index.html')
    .pipe(inject(sources, injectOpts))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    return gulp.watch('./src/**/*.{tag,js}',[ 'inject' ] );
});

gulp.task('default', [ 'inject' ]);
