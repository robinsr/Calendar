// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'src',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        knockout: '../bower_components/knockout/dist/knockout',
        requirejs: '../bower_components/requirejs/require',
        lodash: '../bower_components/lodash/dist/lodash.compat',
        moment: '../bower_components/moment/moment'
    },
    packages: [

    ]
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['viewmodels/app']);