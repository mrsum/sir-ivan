'use strict';

// Depends
const Bb = require('backbone');

/**
 * StatusBar helper
 * @return {[type]}
 */
module.exports = Bb.View.extend({
  attributes: {
    'data-cursor': '0:0',
    'data-lines-count': 0
  },
  template: false,
  className: 'status-bar',
  updateCursor: function(value) {
    this.$el.attr('data-cursor', value);
  },
  updateLineCounts: function(value) {
    this.$el.attr('data-lines-count', value);
  }
});
