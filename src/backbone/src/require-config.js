// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'src',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        requirejs: '../bower_components/requirejs/require',
        underscore: '../bower_components/lodash/dist/lodash.compat',
        moment: '../bower_components/moment/moment',
        hbs: '../bower_components/require-handlebars-plugin/hbs'
    },
    hbs: { // optional
        helpers: true,            // default: true
        i18n: false,              // default: false
        templateExtension: 'hbs', // default: 'hbs'
        partialsUrl: ''           // default: ''
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['views/app']);