var gulp = require('gulp');
var inject = require('gulp-inject');
var watch = require('gulp-watch');

var riotTrans = function( path ) {
    return '<script src="src/' + path + '" type="riot/tag"></script>';
};

var jsTrans = function ( path ) {
    return '<script src="src/' + path + '"></script>';
};

var jsonTrans = function ( file ) {
    var contents = file.contents.toString('utf8');
    return '<script tpye="application/json">APP_DATA=' + contents + '</script>'; 
}

gulp.task('inject', function () {
    var sources = gulp
    .src(['./src/**/*.{tag,js}', '../common/items.json']);

    var transform = function (path, file, i, length) {
        if ( /\.tag/.test( path ) ) return riotTrans( path );
        if ( /\.js$/.test( path ) ) return jsTrans( path );
        if ( /\.json$/.test( path ) ) return jsonTrans( file );
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
    return gulp.watch('./src/**/*.{tag,js,html}',[ 'inject' ] );
});

gulp.task('default', [ 'inject' ]);
