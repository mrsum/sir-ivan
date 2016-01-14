'use strict';

// Depends
const Mn = require('backbone.marionette');

/**
 * Example of new widget
 * @param  {[type]} params) {               this.model [description]
 * @return {[type]}         [description]
 */
module.exports = Mn.LayoutView.extend({
  slug: 'image',
  type: 'Widgets::Widget::Image',
  className: 'st-widget__image',
  template: require('./templates/layout.jade'),

  /**
   * Initialize
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  initialize: function(params) {
    // define private attributes
    this.model    = params.model;
    this.config   = params.config;
    this.buffer   = params.buffer;
    this.actions  = params.actions;

    // temporary hack
    this.model.set('type', this.type);
    this.model.set('slug', this.slug);

    // template helper data
    this.templateHelpers = function() {
      return {
        headline: this.config.locale.blocks.image.title
      };
    };
  },

  onRender: function() {}
});
