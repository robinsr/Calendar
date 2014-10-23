'use strict';


/**
 * Application bootstrap.
 */
var $ = require("jquery");
var Backbone = require("backbone");

// jQuery: Backbone needs explicit set and bootstrap needs global. (Sigh).
Backbone.$ = $;
window.jQuery = $;

var AppView = require('./views/app');

var App = new AppView();