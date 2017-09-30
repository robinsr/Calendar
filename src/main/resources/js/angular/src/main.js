'use strict';

// setup fancy box
var $ = require('jquery');
var fancybox = require('fancybox');
fancybox($);

var moment = require('moment');
var angular = require('angular');
require('angular-route');
require('angular-resource');
require('angular-animate');

var app = angular.module( 'calendar', [ 'ngRoute', 'ngResource', 'ngAnimate' ] );

require('./directives/drag-item.js');
require('./directives/drop-area.js');
require('./directives/fancybox.js');
require('./directives/sequence-render.js');
require('./directives/triggers-refresh.js');
require('./directives/center-scroll.js');
require('./factories/month.js');
require('./factories/items.js');
require('./filters/date-match.js');
require('./filters/has-items.js');
require('./filters/format-date.js');
require('./filters/month-class.js');
require('./controllers/month.js');
require('./controllers/scroll.js');

var tmpl = require('./partials/month.ngt');

app.config( [ '$routeProvider', function ( $routeProvider ) {
  $routeProvider.when( '/:year/:month', {
    controller: 'MonthController',
    templateUrl: tmpl,
    reloadOnSearch: false
  } )
  .otherwise( {
    redirectTo: function () {
      return moment().format( 'YYYY/M' );
    }
  } );
} ] );