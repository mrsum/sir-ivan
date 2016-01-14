'use strict';

// Depends
const $ = require('jquery');
const Bb = require('backbone');
const Mn = require('backbone.marionette');
const Blocks = require('./blocks');
const BlockTypes = require('./block/block-types/');

module.exports = Mn.LayoutView.extend({
  // event buffer
  buffer: new Bb.Model,
  // events
  events: {
    'click .add-block-top:not(.with-st-controls)': 'prependNewBlock',
    'click .add-block:not(.with-st-controls)': 'appendNewBlock'
  },
  regions: {
    blocksRegion: '.st-blocks'
  },
  attributes: {
    dropzone: 'copy link move'
  },
  className: 'st-outer',
  template: require('../templates/commons/editor.jade'),

  /**
   * Initialize editor
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  initialize: function(params) {
    // set parent attributes to this context
    this.Config    = params.config;
    this.Storage   = params.storage;
    this.Widgets   = params.widgets;
  },

  /**
   * On Render
   * @return {[type]} [description]
   */
  onRender: function() {
    this.blocksRegion.show(
      new Blocks({
        config: this.Config,
        widgets: this.Widgets,
        collection: this.Storage
      })
    );
    // append content to parent container
    $(this.Config.el).append(this.$el);
  },

  /**
   * Choose which type of new block U want create
   * @return {[type]} [description]
   */
  renderBlockTypes: function($el, callback) {
    // create instance of new widget
    var $types = new BlockTypes({ collection: this.Widgets }).render().$el;

    // add class
    $el.addClass('with-st-controls');

    // append to zone
    $el.append($types);

    // a little bit magic for first release
    this.Widgets.on('block:types:click', (model) => {
      // describe to trigger
      this.Widgets.off('block:types:click');

      $types.remove();
      $el.removeClass('with-st-controls');
      callback(model.get('type'));
    }, this);
  },

  /**
   * Prepend to zero positrion
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  prependNewBlock: function(e) {
    this.renderBlockTypes($(e.currentTarget), (type) => {
      var position = $(e.currentTarget).attr('data-position');
      this
        .Storage
        .prependBlock(type, '', position);
    });
  },

  /**
   * Append new block
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  appendNewBlock: function(e) {
    this.renderBlockTypes($(e.currentTarget), (type) => {
      var position = $(e.currentTarget).attr('data-position');
      this
        .Storage
        .appendBlock(type, '', position);
    });
  }
});
