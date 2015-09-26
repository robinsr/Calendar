// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    urlArgs: "bust=1443305600010",
    baseUrl: "src",
    paths: {
        backbone: "../bower_components/backbone/backbone",
        jquery: "../bower_components/jquery/dist/jquery",
        lodash: "../bower_components/lodash/lodash",
        moment: "../bower_components/moment/moment",
        "require-handlebars-plugin": "../bower_components/require-handlebars-plugin/hbs",
        hbs: "../bower_components/require-handlebars-plugin/hbs",
        requirejs: "../bower_components/requirejs/require",
        "requirejs-text": "../bower_components/requirejs-text/text",
        underscore: "../bower_components/underscore/underscore",
        fancybox: "../bower_components/fancybox/source/jquery.fancybox"
    },
    hbs: {
        helpers: true,
        i18n: false,
        templateExtension: "hbs",
        partialsUrl: ""
    },
    packages: [

    ],
    shim: {
        'fancybox': {
            deps: [ 'jquery' ],
            exports: 'Fancybox'
        }
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['views/app']);