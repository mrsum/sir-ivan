'use strict';

// Depends
const Bb = require('backbone');

module.exports = Bb.View.extend({
  tagName: 'a',
  className: 'st-block-ui-btn st-icon',
  template: false,
  events: {
    click: 'sendCommand'
  },

  /**
   * Initialize
   * @return {[type]} [description]
   */
  initialize: function(params) {
    this.parent = params.parent;
    this.model = params.model;
    this.$el.attr('data-icon', this.model.get('key'));
    this.$el.addClass(['st-block-btn', this.model.get('key')].join('-'));
  },

  /**
   * Send command from current block
   * @return {[type]} [description]
   */
  sendCommand: function() {
    this.parent.trigger('block:controls:click', this.model);
  }
});
