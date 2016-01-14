'use strict';

// Depends
const _      = require('underscore');
const Config = require('./config');
const Editor = require('./commons/editor');
const Storage = require('./collections/storage');
const Widgets = require('./collections/widgets');
const Locale = require('../locales/ru');

/**
 * Sir Trevor function
 * @param {[type]} options [description]
 */
const SirTrevor = function(options) {
  this.Config   = _.extend(Config, options, {
    locale: Locale
  });
  // create storage for data
  this.Storage  = new Storage;
  // create widgets storage
  this.Widgets  = new Widgets;
  // lets go
  this.Editor   = new Editor({
    config: this.Config,
    storage: this.Storage,
    widgets: this.Widgets,
  }).render();
};

// Styles
require('./stylesheets/main.styl');

// return
module.exports = SirTrevor;
