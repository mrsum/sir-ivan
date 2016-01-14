'use strict';

// Depends
const $ = require('jquery');
const Bb = require('backbone');

module.exports = Bb.View.extend({
  template: false,
  tagName: 'a',
  className: 'st-block-control',
  events: {
    click: 'chooseType'
  },
  initialize: function() {
    this.$el.attr('data-type', this.model.get('type')).text(this.model.get('text') || 'Виджет');
    this.$el.prepend($('<span/>', {
      class: this.model.get('icon') || 'zmdi zmdi-layers'
    }));
  },

  chooseType: function() {
    this.model.trigger('block:types:click', this.model);
  }
});
